/**
 * agents-radar: daily digest for AI CLI tools and OpenClaw.
 *
 * Env vars:
 *   LLM_PROVIDER        - "anthropic" | "openai" | "github-copilot" | "openrouter" (default: anthropic)
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 *
 * Provider-specific env vars — see src/providers/ for full list.
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { type GitHubItem, type RepoFetch, createGitHubIssue } from "./github.ts";
import {
  type RepoDigest,
  buildCliPrompt,
  buildPeerPrompt,
  buildComparisonPrompt,
  buildPeersComparisonPrompt,
  buildSkillsPrompt,
} from "./prompts.ts";
import {
  buildTrendingPrompt,
  buildHighlightsPrompt,
  buildShaokandianRadarPrompt,
  buildOpportunityRadarPrompt,
  buildRadarCoverageContext,
  type ReportHighlights,
} from "./prompts-data.ts";
import { callLlm, saveFile, autoGenFooter, LLM_TOKENS_TRENDING } from "./report.ts";
import { buildCliReportContent, buildOpenclawReportContent } from "./report-builders.ts";
import {
  saveWebReport,
  saveTrendingReport,
  saveHnReport,
  savePhReport,
  saveArxivReport,
  saveHfReport,
  saveCommunityReport,
} from "./report-savers.ts";
import { fetchAllData, loadCollectedSnapshot } from "./collect.ts";
import { saveFallbackDailyReports } from "./daily-fallback.ts";
import { loadWebState } from "./web.ts";
import { type TrendingData } from "./trending.ts";
import { loadConfig } from "./config.ts";
import { toCstDateStr, toUtcStr } from "./date.ts";
import { type Lang, MSG, ISSUE_LABELS, CLI_ISSUE_TITLE, OPENCLAW_ISSUE_TITLE } from "./i18n.ts";

// ---------------------------------------------------------------------------
// Repo config — loaded from config.yml, falls back to built-in defaults
// ---------------------------------------------------------------------------

const { skillsRepo: CLAUDE_SKILLS_REPO, openclaw: OPENCLAW, openclawPeers: OPENCLAW_PEERS } = loadConfig();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Phase 2: LLM summaries
// ---------------------------------------------------------------------------

/** Call LLM with logging and error fallback. */
async function summarize(id: string, prompt: string, failMsg: string, maxTokens?: number): Promise<string> {
  console.log(`  [${id}] Calling LLM for summary...`);
  try {
    return await callLlm(prompt, maxTokens);
  } catch (err) {
    console.error(`  [${id}] LLM call failed: ${err}`);
    return failMsg;
  }
}

/** Summarize a repo's activity, returning a RepoDigest. Skips LLM if no data. */
async function summarizeRepo(
  { cfg, issues, prs, releases }: RepoFetch,
  prompt: string,
  noActivityMsg: string,
  failMsg: string,
): Promise<RepoDigest> {
  if (!issues.length && !prs.length && !releases.length) {
    console.log(`  [${cfg.id}] No activity, skipping LLM call`);
    return { config: cfg, issues, prs, releases, summary: noActivityMsg };
  }
  const summary = await summarize(cfg.id, prompt, failMsg);
  return { config: cfg, issues, prs, releases, summary };
}

async function generateSummaries(
  fetchedCli: RepoFetch[],
  fetchedOpenclaw: RepoFetch,
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] },
  fetchedPeers: RepoFetch[],
  trendingData: TrendingData,
  dateStr: string,
  lang: Lang = "zh",
): Promise<{
  cliDigests: RepoDigest[];
  openclawSummary: string;
  skillsSummary: string;
  peerDigests: RepoDigest[];
  trendingSummary: string;
}> {
  const noActivity = MSG.noActivity[lang];
  const fail = MSG.summaryFailed[lang];

  const [cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary] = await Promise.all([
    Promise.all(
      fetchedCli.map((f) =>
        summarizeRepo(f, buildCliPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, lang), noActivity, fail),
      ),
    ),
    summarizeRepo(
      fetchedOpenclaw,
      buildPeerPrompt(
        fetchedOpenclaw.cfg,
        fetchedOpenclaw.issues,
        fetchedOpenclaw.prs,
        fetchedOpenclaw.releases,
        dateStr,
        50,
        30,
        lang,
      ),
      noActivity,
      fail,
    ).then((d) => d.summary),
    summarize(
      "claude-code-skills",
      buildSkillsPrompt(skillsData.prs, skillsData.issues, dateStr, lang),
      MSG.skillsFailed[lang],
    ),
    Promise.all(
      fetchedPeers.map((f) =>
        summarizeRepo(
          f,
          buildPeerPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, undefined, undefined, lang),
          noActivity,
          fail,
        ),
      ),
    ),
    (async () => {
      const hasData =
        trendingData.trendingRepos.length > 0 ||
        trendingData.searchRepos.length > 0 ||
        trendingData.starSurgeRepos.length > 0;
      if (!hasData) {
        return MSG.trendingNoData[lang];
      }
      return summarize(
        "trending",
        buildTrendingPrompt(trendingData, dateStr, lang),
        MSG.trendingFailed[lang],
        LLM_TOKENS_TRENDING,
      );
    })(),
  ]);

  return { cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const now = new Date();
  const rawSnapshotFile = process.env["RAW_SNAPSHOT_PATH"] ?? "";
  let dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  const providerName = process.env["LLM_PROVIDER"] ?? "anthropic";
  console.log(`[${now.toISOString()}] Starting digest | provider: ${providerName}`);
  if (!process.env["GITHUB_TOKEN"]) {
    console.log("[github] GITHUB_TOKEN not set — using unauthenticated public API requests.");
  }

  // 1. Fetch all data in parallel or load a pre-collected snapshot
  const loadData = async (): Promise<{
    dateStr: string;
    data: Awaited<ReturnType<typeof fetchAllData>>;
    webState: ReturnType<typeof loadWebState>;
  }> => {
    if (rawSnapshotFile) {
      console.log(`  Loading collected snapshot: ${rawSnapshotFile}`);
      const snapshot = loadCollectedSnapshot(rawSnapshotFile);
      return {
        dateStr: snapshot.dateStr,
        webState: loadWebState(),
        data: {
          fetched: snapshot.fetched,
          skillsData: snapshot.skillsData,
          webResults: snapshot.webResults,
          trendingData: snapshot.trendingData,
          hnData: snapshot.hnData,
          phData: snapshot.phData,
          arxivData: snapshot.arxivData,
          hfData: snapshot.hfData,
          devtoData: snapshot.devtoData,
          lobstersData: snapshot.lobstersData,
        },
      };
    }

    const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const webState = loadWebState();
    return {
      dateStr,
      webState,
      data: await fetchAllData(since, webState),
    };
  };

  const loaded = await loadData();
  dateStr = loaded.dateStr;
  const webState = loaded.webState;
  const {
    fetched,
    skillsData,
    webResults,
    trendingData,
    hnData,
    phData,
    arxivData,
    hfData,
    devtoData,
    lobstersData,
  } = loaded.data;

  const peerIds = new Set(OPENCLAW_PEERS.map((p) => p.id));
  const fetchedCli = fetched.filter((f) => f.cfg.id !== OPENCLAW.id && !peerIds.has(f.cfg.id));
  const fetchedOpenclaw = fetched.find((f) => f.cfg.id === OPENCLAW.id)!;
  const fetchedPeers = fetched.filter((f) => peerIds.has(f.cfg.id));

  // 2. Generate per-repo LLM summaries in parallel (zh + en simultaneously)
  console.log("  Generating summaries in ZH and EN in parallel...");
  const [zhSummaries, enSummaries] = await Promise.all([
    generateSummaries(fetchedCli, fetchedOpenclaw, skillsData, fetchedPeers, trendingData, dateStr, "zh"),
    generateSummaries(fetchedCli, fetchedOpenclaw, skillsData, fetchedPeers, trendingData, dateStr, "en"),
  ]);

  // 3. Generate cross-repo comparisons in parallel (zh + en)
  console.log("  Calling LLM for comparative analyses (ZH + EN)...");
  const summariesByLang = { zh: zhSummaries, en: enSummaries };

  const makeOpenclawDigest = (lang: Lang): RepoDigest => ({
    config: OPENCLAW,
    issues: fetchedOpenclaw.issues,
    prs: fetchedOpenclaw.prs,
    releases: fetchedOpenclaw.releases,
    summary: summariesByLang[lang].openclawSummary,
  });

  const [zhComparison, zhPeersComparison, enComparison, enPeersComparison] = await Promise.all([
    callLlm(buildComparisonPrompt(zhSummaries.cliDigests, dateStr, "zh")),
    callLlm(buildPeersComparisonPrompt(makeOpenclawDigest("zh"), zhSummaries.peerDigests, dateStr, "zh")),
    callLlm(buildComparisonPrompt(enSummaries.cliDigests, dateStr, "en")),
    callLlm(buildPeersComparisonPrompt(makeOpenclawDigest("en"), enSummaries.peerDigests, dateStr, "en")),
  ]);

  const comparisonByLang = { zh: zhComparison, en: enComparison };
  const peersComparisonByLang = { zh: zhPeersComparison, en: enPeersComparison };

  // 4. Build + save all reports (zh + en)
  const cliContent: Record<Lang, string> = {} as Record<Lang, string>;
  const openclawContent: Record<Lang, string> = {} as Record<Lang, string>;

  for (const lang of ["zh", "en"] as const) {
    const s = summariesByLang[lang];
    const ft = autoGenFooter(lang);
    const suffix = lang === "en" ? "-en" : "";

    cliContent[lang] = buildCliReportContent(
      s.cliDigests,
      s.skillsSummary,
      comparisonByLang[lang],
      utcStr,
      dateStr,
      ft,
      CLAUDE_SKILLS_REPO,
      lang,
    );
    openclawContent[lang] = buildOpenclawReportContent(
      fetchedOpenclaw,
      s.peerDigests,
      s.openclawSummary,
      peersComparisonByLang[lang],
      utcStr,
      dateStr,
      ft,
      OPENCLAW,
      OPENCLAW_PEERS,
      lang,
    );

    console.log(`  Saved ${saveFile(cliContent[lang], dateStr, `ai-cli${suffix}.md`)}`);
    console.log(`  Saved ${saveFile(openclawContent[lang], dateStr, `ai-agents${suffix}.md`)}`);
  }

  // Web report: zh saves state, en skips state save
  for (const lang of ["zh", "en"] as const) {
    await saveWebReport(webResults, webState, utcStr, dateStr, digestRepo, autoGenFooter(lang), lang);
  }

  await Promise.all([
    saveTrendingReport(
      trendingData,
      zhSummaries.trendingSummary,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("zh"),
      "zh",
    ),
    saveTrendingReport(
      trendingData,
      enSummaries.trendingSummary,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("en"),
      "en",
    ),
    saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    savePhReport(phData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    savePhReport(phData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    saveHfReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveHfReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    saveCommunityReport(devtoData, lobstersData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveCommunityReport(devtoData, lobstersData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
  ]);

  // 5. Generate highlights for Telegram notification
  const readReport = (name: string): string | undefined => {
    const p = path.join("digests", dateStr, name);
    return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : undefined;
  };

  const zhReports: Record<string, string> = { "ai-cli": cliContent.zh, "ai-agents": openclawContent.zh };
  const enReports: Record<string, string> = { "ai-cli": cliContent.en, "ai-agents": openclawContent.en };
  for (const [id, zhFile, enFile] of [
    ["ai-trending", "ai-trending.md", "ai-trending-en.md"],
    ["ai-web", "ai-web.md", "ai-web-en.md"],
    ["ai-hn", "ai-hn.md", "ai-hn-en.md"],
    ["ai-ph", "ai-ph.md", "ai-ph-en.md"],
    ["ai-arxiv", "ai-arxiv.md", "ai-arxiv-en.md"],
    ["ai-hf", "ai-hf.md", "ai-hf-en.md"],
    ["ai-community", "ai-community.md", "ai-community-en.md"],
  ] as const) {
    const zh = readReport(zhFile);
    const en = readReport(enFile);
    if (zh) zhReports[id] = zh;
    if (en) enReports[id] = en;
  }

  console.log("  Generating 少看点 AI 雷达...");
  const coverageContext = buildRadarCoverageContext(webResults, phData, arxivData);
  try {
    const radarSummary = await callLlm(
      buildShaokandianRadarPrompt(zhReports, dateStr, coverageContext),
      4096,
    );
    const radarContent =
      radarSummary.trim() +
      "\n\n---\n\n" +
      `> 本页由今日中文报告二次筛选生成，保留原始来源入口。生成时间: ${utcStr} UTC` +
      autoGenFooter("zh");
    console.log(`  Saved ${saveFile(radarContent, dateStr, "ai-radar.md")}`);
    zhReports["ai-radar"] = radarContent;
  } catch (err) {
    console.error(`  [ai-radar] Generation failed: ${err}`);
    const { radarPath } = saveFallbackDailyReports(
      {
        collectedAt: now.toISOString(),
        dateStr,
        utcStr,
        fetched,
        skillsData,
        webResults,
        trendingData,
        hnData,
        phData,
        arxivData,
        hfData,
        devtoData,
        lobstersData,
      },
      { force: false },
    );
    if (radarPath) {
      console.log(`  Saved fallback ${radarPath}`);
      zhReports["ai-radar"] = readReport("ai-radar.md") ?? zhReports["ai-radar"] ?? "";
    }
  }

  console.log("  Generating AI 机会雷达...");
  try {
    const opportunitySummary = await callLlm(
      buildOpportunityRadarPrompt(zhReports, dateStr, coverageContext),
      4096,
    );
    const opportunityContent =
      opportunitySummary.trim() +
      "\n\n---\n\n" +
      `> 本页由今日中文报告二次筛选生成，优先回答“现在能做什么”。生成时间: ${utcStr} UTC` +
      autoGenFooter("zh");
    console.log(`  Saved ${saveFile(opportunityContent, dateStr, "ai-opportunity.md")}`);
    zhReports["ai-opportunity"] = opportunityContent;
  } catch (err) {
    console.error(`  [ai-opportunity] Generation failed: ${err}`);
    const { opportunityPath } = saveFallbackDailyReports(
      {
        collectedAt: now.toISOString(),
        dateStr,
        utcStr,
        fetched,
        skillsData,
        webResults,
        trendingData,
        hnData,
        phData,
        arxivData,
        hfData,
        devtoData,
        lobstersData,
      },
      { force: false },
    );
    if (opportunityPath) {
      console.log(`  Saved fallback ${opportunityPath}`);
      zhReports["ai-opportunity"] = readReport("ai-opportunity.md") ?? zhReports["ai-opportunity"] ?? "";
    }
  }

  console.log("  Generating highlights for Telegram...");
  const highlights: Record<Lang, ReportHighlights> = { zh: {}, en: {} };
  try {
    const [zhRaw, enRaw] = await Promise.all([
      callLlm(buildHighlightsPrompt(zhReports, "zh"), 2048),
      callLlm(buildHighlightsPrompt(enReports, "en"), 2048),
    ]);
    highlights.zh = JSON.parse(
      zhRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    );
    highlights.en = JSON.parse(
      enRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    );
  } catch (err) {
    console.error(`  [highlights] Generation failed: ${err}`);
  }

  const highlightsPath = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.log(`  Saved ${highlightsPath}`);

  // 6. Create GitHub issues for CLI + OpenClaw (zh + en)
  if (digestRepo) {
    for (const lang of ["zh", "en"] as const) {
      const cliUrl = await createGitHubIssue(
        CLI_ISSUE_TITLE(dateStr, lang),
        cliContent[lang],
        ISSUE_LABELS.cli[lang],
      );
      console.log(`  Created CLI issue (${lang}): ${cliUrl}`);

      const ocUrl = await createGitHubIssue(
        OPENCLAW_ISSUE_TITLE(dateStr, lang),
        openclawContent[lang],
        ISSUE_LABELS.openclaw[lang],
      );
      console.log(`  Created OpenClaw issue (${lang}): ${ocUrl}`);
    }
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
