import fs from "node:fs";
import path from "node:path";
import type { CollectedSnapshot } from "./collect.ts";
import type { RepoFetch } from "./github.ts";
import type { SearchRepo, StarSurgeRepo, TrendingRepo } from "./trending.ts";
import type { HnStory } from "./hn.ts";
import type { PhProduct } from "./ph.ts";
import type { ArxivPaper } from "./arxiv.ts";
import type { HfModel } from "./hf.ts";
import type { DevtoArticle } from "./devto.ts";
import type { LobstersStory } from "./lobsters.ts";
import type { SocialSignal } from "./social-signals.ts";
import type { WebPageItem } from "./web.ts";
import { buildRadarCoverageContext } from "./prompts-data.ts";
import { FOOTER } from "./i18n.ts";

const FALLBACK_MARKER = "本页由每日保底脚本生成";
const MAX_EVIDENCE_LINKS = 5;

interface ThemeMatch {
  key: string;
  title: string;
  summary: string;
  warming: string;
  caution: string;
  audience: string;
  pain: string;
  whyNow: string;
  mvp: string;
  monetization: string;
  nextStep: string;
  scores: number;
  evidence: EvidenceLink[];
}

type ThemeTemplate = Omit<ThemeMatch, "scores" | "evidence"> & { patterns: RegExp[] };
type ThemeKey = "code_context" | "runtime_guardrails" | "plugin_workflows" | "team_memory" | "browser_ops";

interface EvidenceLink {
  label: string;
  url: string;
}

interface SaveFallbackOptions {
  force?: boolean;
}

const THEME_LIBRARY: Record<ThemeKey, ThemeTemplate> = {
  code_context: {
    key: "code_context",
    title: "代码库上下文打底层",
    summary: "agent 要真正可用，先得稳定理解代码库、依赖边界和历史上下文。",
    warming: "代码知识图谱、私有搜索和 repo understanding 还在持续升温。",
    caution: "不要把“能索引代码”直接当成壁垒，关键是能不能接进真实任务前置环节。",
    audience: "10~200 人的软件团队，尤其是刚开始让 coding agent 进仓库的团队。",
    pain: "agent 会写，但经常找错文件、看不懂调用链、上下文成本高。",
    whyNow: "今天的热门仓库和社区讨论持续把注意力放在 code graph、repo understanding、knowledge layer 上。",
    mvp: "先做一个私有仓库上下文包生成器，把关键文件、模块关系和任务入口整理给 agent。",
    monetization: "团队会为更少返工和更低上下文成本买单，适合按席位或仓库收费。",
    nextStep: "先找 3 个已经在用 coding agent 的团队，验证他们最常卡住的是“找不到该改哪里”。",
    patterns: [
      /\bcodegraph\b/i,
      /\bunderstand\b/i,
      /\brepo\b/i,
      /\bcodebase\b/i,
      /\bvector\b/i,
      /\bknowledge\b/i,
      /\bsearch\b/i,
      /\brag\b/i,
      /\bwiki\b/i,
      /\bqdrant\b/i,
      /\bweaviate\b/i,
      /\bmilvus\b/i,
    ],
  },
  runtime_guardrails: {
    key: "runtime_guardrails",
    title: "Agent 执行护栏与回滚审计层",
    summary: "团队真正不敢放开的，通常不是生成能力，而是权限、验证和回滚。",
    warming: "runtime、sandbox、hook、benchmark 可信度这些问题正在反复出现。",
    caution: "不要一上来做完整平台，先验证团队最怕的是权限、泄露、卡死还是难追责。",
    audience: "已经让 agent 改代码、跑命令、触发 hook 的工程团队。",
    pain: "会话挂死、权限边界不清、结果难审计，出了错又很难回滚。",
    whyNow: "今天的 GitHub issue、HN 讨论和论文信号都在提醒：agent 真实生产问题已经暴露出来了。",
    mvp: "先做执行前检查、操作日志、产物校验和回滚建议，不必先做完整沙盒。",
    monetization: "这类产品贴近 DevInfra，接入流程后不容易切走，适合团队套餐或按执行量收费。",
    nextStep: "先访谈 5 个已经让 agent 跑命令的团队，确认他们最怕的失败类型。",
    patterns: [
      /\bsandbox\b/i,
      /\bpermission\b/i,
      /\bhook\b/i,
      /\bruntime\b/i,
      /\baudit\b/i,
      /\brollback\b/i,
      /\bconstraint\b/i,
      /\breward\b/i,
      /\bbenchmark\b/i,
      /\bverify\b/i,
      /\btest\b/i,
      /\bfragility\b/i,
      /\brate limit\b/i,
    ],
  },
  plugin_workflows: {
    key: "plugin_workflows",
    title: "团队级技能包与插件目录",
    summary: "工具层的机会不在再做一个聊天壳，而在把最佳实践封装成可分发的能力层。",
    warming: "skills、plugins、MCP、hooks 和 workflow 模板正在形成独立分发层。",
    caution: "不要先做开放 marketplace，先验证团队内部有没有值得复用的 skill 配方。",
    audience: "多位工程师共用 coding agent、内部已有 prompt 或 hook 配方的团队。",
    pain: "团队最佳实践分散在个人目录里，无法统一分发、升级和淘汰。",
    whyNow: "今天的热门仓库和社区文章持续把插件、skills、workflow automation 推到台前。",
    mvp: "先做内部 skill registry，支持模板、版本说明、适用场景和审批发布。",
    monetization: "它卖的是团队标准化和 onboarding 效率，适合按团队规模收费。",
    nextStep: "先验证目标团队是否已经沉淀出 5 个以上会重复使用的 agent 配方。",
    patterns: [
      /\bplugin\b/i,
      /\bplugins\b/i,
      /\bskill\b/i,
      /\bskills\b/i,
      /\bmcp\b/i,
      /\bworkflow\b/i,
      /\bautomation\b/i,
      /\btemplate\b/i,
      /\bhook\b/i,
    ],
  },
  team_memory: {
    key: "team_memory",
    title: "Agent 会话沉淀与团队记忆层",
    summary: "当团队开始长期使用 agent，最大的浪费是每次会话都从零开始。",
    warming: "memory、wiki、session archive、version snapshot 这条线正在慢慢成形。",
    caution: "如果用户从不回看 agent 会话，就不要把它误判成知识平台需求。",
    audience: "频繁用 agent 做排障、代码阅读、探索式开发的团队。",
    pain: "会话关掉就散，后续无法复用决策、命令和上下文。",
    whyNow: "社区已经开始把会话转成 wiki、dashboard、长期知识资产，而不只是一次性聊天记录。",
    mvp: "先做会话提炼和归档，把结论、文件引用和关键步骤整理成团队笔记。",
    monetization: "只要能减少重复排查和 onboarding 时间，就有明确的效率价值。",
    nextStep: "先验证团队是否真的会回看 agent 会话，再决定要不要扩成完整知识库。",
    patterns: [
      /\bmemory\b/i,
      /\bwiki\b/i,
      /\bsession\b/i,
      /\bversion\b/i,
      /\bhistory\b/i,
      /\barchive\b/i,
      /\bdashboard\b/i,
    ],
  },
  browser_ops: {
    key: "browser_ops",
    title: "浏览器/终端工作流模板包",
    summary: "当 agent 开始碰浏览器和终端，最先有价值的不是开放式智能，而是高频 SOP 模板。",
    warming: "DevTools、browser、CLI 和 task automation 的结合信号在变强。",
    caution: "不要先挑战开放式复杂任务，优先选已有明确 SOP 的人工流程。",
    audience: "做测试、后台运营、增长实验、数据录入的小团队。",
    pain: "大家知道 agent 能碰浏览器和终端，但不知道怎么把它拼成稳定流程。",
    whyNow: "浏览器和命令行能力正逐步进入 agent 工具层，工作流模板开始有现实价值。",
    mvp: "先做网页巡检、表单回归、后台操作复盘这类模板包，而不是通用自动化平台。",
    monetization: "只要能持续省掉人工重复操作，就适合按模板包或团队订阅收费。",
    nextStep: "先挑一个现成 SOP 最明确的场景，让真实用户拿现网流程试一次。",
    patterns: [/\bbrowser\b/i, /\bdevtools\b/i, /\bchrome\b/i, /\bcli\b/i, /\bterminal\b/i],
  },
};

function isFallbackReport(content: string): boolean {
  return content.includes(FALLBACK_MARKER);
}

function formatLinks(links: EvidenceLink[]): string {
  return links
    .slice(0, MAX_EVIDENCE_LINKS)
    .map((link) => `[${link.label}](${link.url})`)
    .join("、");
}

function saveDigestFile(content: string, dateStr: string, filename: string): string {
  const filepath = path.join("digests", dateStr, filename);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

function fallbackFooter(): string {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) return "";
  return `\n\n---\n*${FOOTER.autoGen.zh} [agents-radar](https://github.com/${digestRepo}) 自动生成。*`;
}

function formatSourceLine(links: EvidenceLink[]): string {
  return links.length ? formatLinks(links) : `[今日原始快照](./raw-data.json)`;
}

function topRepoActivity(snapshot: CollectedSnapshot): RepoFetch[] {
  return [...snapshot.fetched]
    .map((repo) => ({
      repo,
      score: repo.issues.length + repo.prs.length + repo.releases.length * 3,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((entry) => entry.repo);
}

function topTrending(snapshot: CollectedSnapshot): Array<TrendingRepo | SearchRepo | StarSurgeRepo> {
  const merged: Array<TrendingRepo | SearchRepo | StarSurgeRepo> = [
    ...snapshot.trendingData.trendingRepos,
    ...snapshot.trendingData.searchRepos,
    ...snapshot.trendingData.starSurgeRepos,
  ];
  const seen = new Set<string>();
  return merged
    .filter((item) => {
      const fullName = item.fullName;
      if (seen.has(fullName)) return false;
      seen.add(fullName);
      return true;
    })
    .slice(0, 10);
}

function topStories(snapshot: CollectedSnapshot): HnStory[] {
  return snapshot.hnData.stories.slice(0, 5);
}

function topModels(snapshot: CollectedSnapshot): HfModel[] {
  return snapshot.hfData.models.slice(0, 5);
}

function topProducts(snapshot: CollectedSnapshot): PhProduct[] {
  return snapshot.phData.products.slice(0, 5);
}

function topPapers(snapshot: CollectedSnapshot): ArxivPaper[] {
  return snapshot.arxivData.papers.slice(0, 5);
}

function topCommunity(snapshot: CollectedSnapshot): Array<DevtoArticle | LobstersStory> {
  const devto = snapshot.devtoData.articles.slice(0, 3);
  const lobsters = snapshot.lobstersData.stories.slice(0, 2);
  return [...devto, ...lobsters];
}

function topSocialSignals(snapshot: CollectedSnapshot): SocialSignal[] {
  return (snapshot.socialSignals?.posts ?? []).slice(0, 6);
}

function topWebItems(snapshot: CollectedSnapshot): WebPageItem[] {
  return snapshot.webResults
    .flatMap((result) => result.newItems)
    .sort((a, b) => Date.parse(b.lastmod || "1970-01-01") - Date.parse(a.lastmod || "1970-01-01"))
    .slice(0, 5);
}

function collectEvidence(snapshot: CollectedSnapshot): EvidenceLink[] {
  const links: EvidenceLink[] = [{ label: "今日原始快照", url: "./raw-data.json" }];

  for (const repo of topRepoActivity(snapshot).slice(0, 2)) {
    links.push({
      label: `${repo.cfg.name} 活跃仓库`,
      url: `https://github.com/${repo.cfg.repo}`,
    });
  }

  for (const item of topTrending(snapshot).slice(0, 2)) {
    links.push({ label: item.fullName, url: item.url });
  }

  for (const item of topStories(snapshot).slice(0, 1)) {
    links.push({ label: item.title, url: item.url });
  }

  for (const item of topSocialSignals(snapshot).slice(0, 1)) {
    links.push({ label: `${item.source}: ${item.text.slice(0, 50)}`, url: item.url });
  }

  for (const item of topModels(snapshot).slice(0, 1)) {
    links.push({ label: item.id, url: item.url });
  }

  return links;
}

function toTextBlob(snapshot: CollectedSnapshot): Array<{ text: string; link: EvidenceLink }> {
  const entries: Array<{ text: string; link: EvidenceLink }> = [];

  for (const repo of snapshot.fetched) {
    const repoLink = { label: repo.cfg.name, url: `https://github.com/${repo.cfg.repo}` };
    entries.push({ text: `${repo.cfg.name} ${repo.cfg.id}`, link: repoLink });
    for (const release of repo.releases.slice(0, 2)) {
      entries.push({
        text: `${repo.cfg.name} ${release.name || release.tag_name} ${release.body ?? ""}`,
        link: {
          label: `${repo.cfg.name} ${release.name || release.tag_name}`,
          url: `https://github.com/${repo.cfg.repo}/releases`,
        },
      });
    }
    for (const item of [...repo.issues.slice(0, 4), ...repo.prs.slice(0, 4)]) {
      entries.push({
        text: `${repo.cfg.name} ${item.title} ${item.body ?? ""}`,
        link: { label: `${repo.cfg.name} #${item.number}`, url: item.html_url },
      });
    }
  }

  for (const repo of topTrending(snapshot)) {
    entries.push({
      text: `${repo.fullName} ${repo.description ?? ""}`,
      link: { label: repo.fullName, url: repo.url },
    });
  }
  for (const story of topStories(snapshot)) {
    entries.push({ text: story.title, link: { label: story.title, url: story.url } });
  }
  for (const page of topWebItems(snapshot)) {
    entries.push({
      text: `${page.title} ${page.category} ${page.content}`,
      link: { label: page.title, url: page.url },
    });
  }
  for (const model of topModels(snapshot)) {
    entries.push({
      text: `${model.id} ${model.pipelineTag} ${model.tags.join(" ")}`,
      link: { label: model.id, url: model.url },
    });
  }
  for (const product of topProducts(snapshot)) {
    entries.push({
      text: `${product.name} ${product.tagline} ${product.topics.join(" ")}`,
      link: { label: product.name, url: product.url },
    });
  }
  for (const paper of topPapers(snapshot)) {
    entries.push({
      text: `${paper.title} ${paper.summary}`,
      link: { label: paper.title, url: paper.url },
    });
  }
  for (const article of topCommunity(snapshot)) {
    if ("description" in article) {
      entries.push({
        text: `${article.title} ${article.description} ${article.tags.join(" ")}`,
        link: { label: article.title, url: article.url },
      });
    } else {
      entries.push({
        text: `${article.title} ${article.tags.join(" ")}`,
        link: { label: article.title, url: article.url },
      });
    }
  }
  for (const post of topSocialSignals(snapshot)) {
    entries.push({
      text: `${post.source} ${post.community ?? ""} ${post.text}`,
      link: { label: `${post.source}: ${post.text.slice(0, 50)}`, url: post.url },
    });
  }

  return entries;
}

function detectThemes(snapshot: CollectedSnapshot): ThemeMatch[] {
  const texts = toTextBlob(snapshot);
  const themes: Array<ThemeMatch & { patterns: RegExp[] }> = Object.values(THEME_LIBRARY).map((theme) => ({
    ...theme,
    scores: 0,
    evidence: [],
  }));

  for (const entry of texts) {
    for (const theme of themes) {
      if (theme.patterns.some((pattern) => pattern.test(entry.text))) {
        theme.scores += 1;
        if (!theme.evidence.some((item) => item.url === entry.link.url)) {
          theme.evidence.push(entry.link);
        }
      }
    }
  }

  return themes.sort((a, b) => b.scores - a.scores).map(({ patterns: _patterns, ...theme }) => theme);
}

function buildHeadline(snapshot: CollectedSnapshot, themes: ThemeMatch[]): string {
  const social = topSocialSignals(snapshot)[0];
  if (social && social.score >= 20) {
    return `今天社交讨论的焦点是：${social.text.slice(0, 54)}。`;
  }

  const topTheme = themes.find((theme) => theme.scores > 0);
  if (topTheme) return topTheme.summary;

  if (topStories(snapshot).length) {
    return "今天更像验证面，不是新品爆发面，先看社区到底在担心什么。";
  }

  return "今天的有效信号不算密集，适合保守记录样本，而不是硬下大结论。";
}

function buildRadarSocial(snapshot: CollectedSnapshot): string {
  const posts = topSocialSignals(snapshot).slice(0, 4);
  if (!posts.length) {
    const social = snapshot.socialSignals;
    const reason = !social
      ? "今日快照尚未包含社交媒体采集结果。"
      : !social.blueskyFetchSuccess && !social.redditFetchSuccess
        ? "Bluesky 和 Reddit 今日均未成功获取，暂时不能判断社交热度。"
        : "Bluesky 和 Reddit 没有返回足够强的高互动样本，今天先不脑补社交热度。";
    return (
      `### 今天没有拿到足够强的社交媒体信号\n` +
      bulletLine("判断", reason) +
      "\n" +
      bulletLine("来源", `[今日原始快照](./raw-data.json)`)
    );
  }

  return posts
    .map((post) => {
      const source = post.community ?? (post.source === "bluesky" ? "Bluesky" : "Reddit");
      const title = post.text.length > 70 ? `${post.text.slice(0, 70)}…` : post.text;
      return (
        `### ${title}\n` +
        bulletLine("判断", `${source} 上出现高互动讨论，互动分 ${post.score}，回复 ${post.replies}。`) +
        "\n" +
        bulletLine("为什么值得看", "社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。") +
        "\n" +
        bulletLine("来源", `[${source}](${post.url})`)
      );
    })
    .join("\n\n");
}

function buildCoverageNotice(snapshot: CollectedSnapshot): string {
  const coverage = buildRadarCoverageContext(snapshot.webResults, snapshot.phData, snapshot.arxivData);
  return coverage.replace(/^- /gm, "").split("\n").filter(Boolean).join("；");
}

function bulletLine(label: string, content: string): string {
  return `- ${label}：${content}`;
}

function buildRadarMustRead(snapshot: CollectedSnapshot, themes: ThemeMatch[]): string {
  const sections: string[] = [];
  const repo = topRepoActivity(snapshot)[0];
  if (repo) {
    const count = repo.issues.length + repo.prs.length + repo.releases.length;
    sections.push(
      `### ${repo.cfg.name} 生态今天更新密度最高\n` +
        bulletLine("结论", `${repo.cfg.name} 在 24 小时内累计出现 ${count} 个 issue / PR / release 样本。`) +
        "\n" +
        bulletLine(
          "为什么重要",
          "仓库更新密度高，通常代表工具链正在快速试错，值得先看真实问题和新增能力。 ",
        ) +
        "\n" +
        bulletLine("来源", `[${repo.cfg.name}](https://github.com/${repo.cfg.repo})`) +
        "\n" +
        bulletLine("建议", "看原文"),
    );
  }

  const trend = topTrending(snapshot)[0];
  if (trend) {
    sections.push(
      `### GitHub 热门样本里出现 ${trend.fullName}\n` +
        bulletLine("结论", `${trend.fullName} 进入当天高热样本，说明相关方向正在被开发者集中试用。`) +
        "\n" +
        bulletLine("为什么重要", "开源热度不是质量证明，但很适合拿来判断今天大家到底把注意力投向哪里。 ") +
        "\n" +
        bulletLine("来源", `[${trend.fullName}](${trend.url})`) +
        "\n" +
        bulletLine("建议", "扫一眼"),
    );
  }

  const webItem = topWebItems(snapshot)[0];
  if (webItem) {
    sections.push(
      `### 官网源今天新增了 ${webItem.title}\n` +
        bulletLine("结论", `${webItem.site} 官网今天抓到新页面 ${webItem.title}。`) +
        "\n" +
        bulletLine(
          "为什么重要",
          "官网源的新增通常比社区转述更接近一手表述，适合用来确认公司到底在推什么。 ",
        ) +
        "\n" +
        bulletLine("来源", `[${webItem.title}](${webItem.url})`) +
        "\n" +
        bulletLine("建议", "看原文"),
    );
  }

  const story = topStories(snapshot)[0];
  if (story) {
    sections.push(
      `### HN 今天在讨论 ${story.title}\n` +
        bulletLine("结论", `${story.title} 进入今天的高讨论样本，社区更关注真实采用边界而不是单条宣传。`) +
        "\n" +
        bulletLine("为什么重要", "HN 的高分讨论适合拿来观察开发者到底在担心什么、争什么。 ") +
        "\n" +
        bulletLine("来源", `[${story.title}](${story.url})`) +
        "\n" +
        bulletLine("建议", "看原文"),
    );
  }

  const model = topModels(snapshot)[0];
  if (model) {
    sections.push(
      `### Hugging Face 热榜里有 ${model.id}\n` +
        bulletLine("结论", `${model.id} 进入今日模型热榜，说明社区对这条模型路线仍有明确兴趣。`) +
        "\n" +
        bulletLine("为什么重要", "模型热榜更适合判断可部署能力和开发者实验面，而不是只看头部闭源叙事。 ") +
        "\n" +
        bulletLine("来源", `[${model.id}](${model.url})`) +
        "\n" +
        bulletLine("建议", "扫一眼"),
    );
  }

  if (!sections.length) {
    const theme = themes[0];
    sections.push(
      `### 今天先记录信号，不硬下结论\n` +
        bulletLine("结论", "今天可用样本有限，更适合把高频主题先记下来。 ") +
        "\n" +
        bulletLine("为什么重要", "样本不完整时，强行做大判断比暂缓更危险。 ") +
        "\n" +
        bulletLine("来源", theme ? formatSourceLine(theme.evidence) : `[今日原始快照](./raw-data.json)`) +
        "\n" +
        bulletLine("建议", "等复盘"),
    );
  }

  return sections.slice(0, 5).join("\n\n");
}

function buildRadarWarming(themes: ThemeMatch[]): string {
  const lines = themes
    .filter((theme) => theme.scores > 0)
    .slice(0, 4)
    .map(
      (theme) =>
        `### ${theme.title}\n` +
        bulletLine("结论", theme.warming) +
        "\n" +
        bulletLine("来源", formatSourceLine(theme.evidence)),
    );
  return lines.length
    ? lines.join("\n\n")
    : `### 今天更适合看回原始样本\n${bulletLine("结论", "可归纳主题不足，先保守记录，不把零散样本夸大成趋势。")}`;
}

function buildRadarModels(snapshot: CollectedSnapshot): string {
  const items: string[] = [];

  for (const model of topModels(snapshot).slice(0, 3)) {
    items.push(
      `### ${model.id}\n` +
        bulletLine("结论", `${model.id} 进入模型热榜，pipeline=${model.pipelineTag || "未标注"}。`) +
        "\n" +
        bulletLine("为什么重要", "模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 ") +
        "\n" +
        bulletLine("来源", `[${model.id}](${model.url})`) +
        "\n" +
        bulletLine("建议", "扫一眼"),
    );
  }

  for (const product of topProducts(snapshot).slice(0, Math.max(0, 3 - items.length))) {
    items.push(
      `### ${product.name}\n` +
        bulletLine("结论", `${product.name} 进入 Product Hunt AI 样本，tagline 是“${product.tagline}”。`) +
        "\n" +
        bulletLine("为什么重要", "产品侧样本更适合拿来判断包装方式和目标用户，不一定代表长期价值。 ") +
        "\n" +
        bulletLine("来源", `[${product.name}](${product.url})`) +
        "\n" +
        bulletLine("建议", "扫一眼"),
    );
  }

  if (!items.length) {
    return (
      `### 今天没有足够强的新模型 / 新产品样本\n` +
      bulletLine("结论", "HF 或 Product Hunt 今天没有给出足够稳定的高信号样本。 ") +
      "\n" +
      bulletLine("为什么重要", "没样本时就不要硬凑新品清单。 ") +
      "\n" +
      bulletLine("来源", `[今日原始快照](./raw-data.json)`) +
      "\n" +
      bulletLine("建议", "等复盘")
    );
  }

  return items.join("\n\n");
}

function paperHint(paper: ArxivPaper): string {
  const text = `${paper.title} ${paper.summary}`.toLowerCase();
  if (/(agent|tool|workflow)/.test(text)) return "这更偏 agent 执行与工作流问题。";
  if (/(reward|rl|policy|alignment|benchmark)/.test(text)) return "这更偏训练、评测或可信度问题。";
  if (/(vision|multimodal|image|video)/.test(text)) return "这更偏多模态能力方向。";
  return "这值得先记住题目，再等更完整样本复盘。";
}

function buildRadarPapers(snapshot: CollectedSnapshot): string {
  const papers = topPapers(snapshot);
  if (!papers.length) {
    const status =
      snapshot.arxivData.fetchStatus === "empty"
        ? "ArXiv 最近 48 小时窗口内没有命中样本。"
        : "ArXiv 今天没有成功拿到可用样本。";
    return (
      `### 今天先不要硬写论文判断\n` +
      bulletLine("结论", status) +
      "\n" +
      bulletLine("为什么重要", "论文样本不完整时，最容易把噪音写成趋势。 ") +
      "\n" +
      bulletLine("来源", `[今日原始快照](./raw-data.json)`) +
      "\n" +
      bulletLine("建议", "等复盘")
    );
  }

  return papers
    .slice(0, 3)
    .map(
      (paper) =>
        `### ${paper.title}\n` +
        bulletLine("结论", paperHint(paper)) +
        "\n" +
        bulletLine("为什么重要", "先记住题目和方向，再决定要不要追完整原文。 ") +
        "\n" +
        bulletLine("来源", `[${paper.title}](${paper.url})`) +
        "\n" +
        bulletLine("建议", "扫一眼"),
    )
    .join("\n\n");
}

function buildRadarPause(snapshot: CollectedSnapshot, themes: ThemeMatch[]): string {
  const lines: string[] = [];

  if (snapshot.phData.fetchStatus === "disabled" || snapshot.phData.fetchStatus === "missing-token") {
    lines.push(
      `### 今天没有 Product Hunt 样本\n` +
        bulletLine("判断", "今天先不要脑补新品发布面，Product Hunt 源当前未启用。 ") +
        "\n" +
        bulletLine("来源", `[今日原始快照](./raw-data.json)`),
    );
  }

  if (snapshot.arxivData.fetchStatus === "empty") {
    lines.push(
      `### 今天先别硬下研究趋势判断\n` +
        bulletLine("判断", "ArXiv 最近 48 小时窗口内没有命中样本，更适合保守处理。 ") +
        "\n" +
        bulletLine("来源", `[今日原始快照](./raw-data.json)`),
    );
  }

  if (!snapshot.trendingData.trendingFetchSuccess) {
    lines.push(
      `### GitHub Trending 榜单今天不可用\n` +
        bulletLine("判断", "今天不要把缺失榜单误读成“没有趋势”。 ") +
        "\n" +
        bulletLine("来源", `[今日原始快照](./raw-data.json)`),
    );
  }

  const cautionTheme = themes.find((theme) => theme.scores > 0);
  if (cautionTheme) {
    lines.push(
      `### 纯热度样本先别当成产品结论\n` +
        bulletLine("判断", cautionTheme.caution) +
        "\n" +
        bulletLine("来源", formatSourceLine(cautionTheme.evidence)),
    );
  }

  return lines.slice(0, 4).join("\n\n");
}

function buildRadarSources(snapshot: CollectedSnapshot): string {
  const lines = [`- [今日原始快照 raw-data.json](./raw-data.json) — 看当天完整样本和源数据状态。`];

  for (const page of topWebItems(snapshot).slice(0, 2)) {
    lines.push(`- [${page.title}](${page.url}) — 今天官网源里最值得回看的新增页面。`);
  }
  for (const repo of topRepoActivity(snapshot).slice(0, 2)) {
    lines.push(
      `- [${repo.cfg.name}](https://github.com/${repo.cfg.repo}) — 看今天 issue / PR / release 最密集的仓库。`,
    );
  }
  for (const story of topStories(snapshot).slice(0, 1)) {
    lines.push(`- [${story.title}](${story.url}) — 看国外开发者今天在争什么。`);
  }
  for (const post of topSocialSignals(snapshot).slice(0, 2)) {
    lines.push(`- [${post.community ?? post.source}](${post.url}) — 看社交平台上的真实反馈和争议。`);
  }

  return lines.slice(0, 6).join("\n");
}

export function buildFallbackRadarReport(snapshot: CollectedSnapshot): string {
  const themes = detectThemes(snapshot);
  const coverageNotice = buildCoverageNotice(snapshot);
  const lead = buildHeadline(snapshot, themes);

  return (
    `# 少看点 AI 雷达 ${snapshot.dateStr}\n\n` +
    `> ${lead}\n` +
    (coverageNotice ? `>\n> 覆盖提醒：${coverageNotice}\n` : "") +
    `\n## 今天必看\n\n${buildRadarMustRead(snapshot, themes)}\n\n` +
    `## 社交媒体在聊什么\n\n${buildRadarSocial(snapshot)}\n\n` +
    `## 正在升温\n\n${buildRadarWarming(themes)}\n\n` +
    `## 新模型 / 新产品\n\n${buildRadarModels(snapshot)}\n\n` +
    `## 论文里可能有用的东西\n\n${buildRadarPapers(snapshot)}\n\n` +
    `## 可以暂缓\n\n${buildRadarPause(snapshot, themes)}\n\n` +
    `## 原始入口\n\n${buildRadarSources(snapshot)}\n\n---\n\n` +
    `> ${FALLBACK_MARKER}，用于保证站点每日都有可读更新；后续可以被更高质量的人工 / Codex 版本覆盖。生成时间: ${snapshot.utcStr} UTC` +
    fallbackFooter()
  );
}

function pickDirections(snapshot: CollectedSnapshot): ThemeMatch[] {
  const ranked = detectThemes(snapshot).filter((theme) => theme.scores > 0);
  const chosen = ranked.slice(0, 3);
  if (chosen.length >= 3) return chosen;

  const fallbackOrder = ["code_context", "runtime_guardrails", "plugin_workflows"] as const;
  for (const key of fallbackOrder) {
    if (!chosen.some((theme) => theme.key === key)) {
      const template = THEME_LIBRARY[key];
      const existing = ranked.find((item) => item.key === key);
      const theme: ThemeMatch = existing
        ? existing
        : {
            ...template,
            scores: 0,
            evidence: collectEvidence(snapshot),
          };
      chosen.push(theme);
    }
    if (chosen.length === 3) break;
  }
  return chosen;
}

function buildOpportunitySummary(directions: ThemeMatch[]): string {
  const titles = directions.map((direction) => direction.title).join("、");
  return `今天更值得下注的，是 ${titles} 这几类能在真实流程里立刻验证的机会。`;
}

function buildOpportunityIntro(directions: ThemeMatch[]): string {
  const first = directions[0] ?? pickDirectionsFallback();
  const second = directions[1];
  return [
    `今天最值得做的机会，不在再做一个通用聊天入口，而在把 agent 接进真实工作流的薄层基础设施。`,
    `${first.title} 是第一优先，因为 ${first.summary}`,
    second ? `${second.title} 也值得看，因为 ${second.summary}` : "",
    `这些方向的共同点是：用户清晰、痛点具体，而且能在 2~6 周内做出第一版去试。`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildDirectionSection(direction: ThemeMatch): string {
  return (
    `### ${direction.title}\n` +
    bulletLine("给谁做", direction.audience) +
    "\n" +
    bulletLine("痛点", direction.pain) +
    "\n" +
    bulletLine("为什么是现在", direction.whyNow) +
    "\n" +
    bulletLine("最小可行解", direction.mvp) +
    "\n" +
    bulletLine("付费可能", direction.monetization) +
    "\n" +
    bulletLine("证据", formatSourceLine(direction.evidence)) +
    "\n" +
    bulletLine("下一步", direction.nextStep)
  );
}

function buildSecondTierDirections(snapshot: CollectedSnapshot, chosen: ThemeMatch[]): string {
  const extras = detectThemes(snapshot)
    .filter((theme) => !chosen.some((item) => item.key === theme.key))
    .slice(0, 2);

  const lines = extras.map(
    (theme) =>
      `### ${theme.title}\n` +
      bulletLine("现在看到了什么信号", theme.warming) +
      "\n" +
      bulletLine("为什么先不重注", theme.caution) +
      "\n" +
      bulletLine("后续要继续观察什么", theme.nextStep),
  );

  if (snapshot.hfData.fetchSuccess && topModels(snapshot).length) {
    const model = topModels(snapshot)[0];
    if (model) {
      lines.push(
        `### 模型侧机会先保持观察\n` +
          bulletLine("现在看到了什么信号", `${model.id} 进入模型热榜，说明模型面仍有活跃样本。`) +
          "\n" +
          bulletLine("为什么先不重注", "只看模型热度不够支撑产品方向，除非已经找到明确使用场景。 ") +
          "\n" +
          bulletLine("后续要继续观察什么", "用户到底是更在意部署成本、隐私，还是某个具体能力差异。 "),
      );
    }
  }

  return lines.slice(0, 3).join("\n\n");
}

function buildOpportunityPause(snapshot: CollectedSnapshot, chosen: ThemeMatch[]): string {
  const lines = [
    `### 通用“再做一个 AI 助手”\n${bulletLine("原因", "今天的信号更支持做上下文、护栏、复用层，而不是再做一个聊天壳。")}`,
    `### 纯资讯聚合或榜单站\n${bulletLine("原因", "用户更缺的是可执行判断，不是再多一条信息流。")}`,
  ];

  if (!snapshot.phData.fetchSuccess) {
    lines.push(
      `### 纯靠新品发布包装的方向\n${bulletLine("原因", "今天 Product Hunt 样本不足，没必要用缺失数据硬凑产品热度。")}`,
    );
  }

  const top = chosen[0];
  if (top) {
    lines.push(`### 先别把 ${top.title} 做成大平台\n${bulletLine("原因", top.caution)}`);
  }

  return lines.slice(0, 4).join("\n\n");
}

function buildOpportunityExecution(chosen: ThemeMatch[]): string {
  const first = chosen[0] ?? pickDirectionsFallback();
  const second = chosen[1] ?? first;
  return [
    `1. 先验证 ${first.title} 对目标用户是不是当前最痛的阻塞点，而不是先搭完整平台。`,
    `2. 先找已经在日常流程里用 agent 的团队试 ${second.title} 或 ${first.title}，不要先找纯围观用户。`,
    `3. 如果 3 个用户里至少 2 个愿意拿真实仓库或真实流程试用，就继续；如果只有“听起来不错”，就收窄切口。`,
  ].join("\n");
}

function pickDirectionsFallback(): ThemeMatch {
  const template = THEME_LIBRARY["code_context"];
  return {
    key: template.key,
    title: template.title,
    summary: template.summary,
    warming: template.warming,
    caution: template.caution,
    audience: template.audience,
    pain: template.pain,
    whyNow: template.whyNow,
    mvp: template.mvp,
    monetization: template.monetization,
    nextStep: template.nextStep,
    scores: 0,
    evidence: [{ label: "今日原始快照", url: "./raw-data.json" }],
  };
}

function buildOpportunitySources(snapshot: CollectedSnapshot): string {
  const lines = [
    `- [少看点 AI 雷达](./#${snapshot.dateStr}/ai-radar) — 先看当天的总判断。`,
    `- [今日原始快照 raw-data.json](./raw-data.json) — 看完整原始样本。`,
  ];

  for (const link of collectEvidence(snapshot).slice(1, 5)) {
    lines.push(`- [${link.label}](${link.url}) — 这是今天判断机会方向的直接证据。`);
  }

  return lines.slice(0, 6).join("\n");
}

export function buildFallbackOpportunityReport(snapshot: CollectedSnapshot): string {
  const chosen = pickDirections(snapshot);
  return (
    `# AI 机会雷达 ${snapshot.dateStr}\n\n` +
    `> ${buildOpportunitySummary(chosen)}\n\n` +
    `## 先看结论\n\n${buildOpportunityIntro(chosen)}\n\n` +
    `## 值得做的 3 个方向\n\n${chosen.map(buildDirectionSection).join("\n\n")}\n\n` +
    `## 次优但可观察\n\n${buildSecondTierDirections(snapshot, chosen)}\n\n` +
    `## 今天先别做\n\n${buildOpportunityPause(snapshot, chosen)}\n\n` +
    `## 开工顺序\n\n${buildOpportunityExecution(chosen)}\n\n` +
    `## 原始入口\n\n${buildOpportunitySources(snapshot)}\n\n---\n\n` +
    `> ${FALLBACK_MARKER}，用于保证站点每天都有“能继续做什么”的可读版本；后续可以被更高质量的人工 / Codex 版本覆盖。生成时间: ${snapshot.utcStr} UTC` +
    fallbackFooter()
  );
}

function writeFallbackFile(
  content: string,
  dateStr: string,
  filename: string,
  options: SaveFallbackOptions = {},
): string | null {
  const filepath = path.join("digests", dateStr, filename);
  if (fs.existsSync(filepath) && !options.force) {
    const existing = fs.readFileSync(filepath, "utf-8");
    if (!isFallbackReport(existing)) return null;
  }
  return saveDigestFile(content, dateStr, filename);
}

export function saveFallbackDailyReports(
  snapshot: CollectedSnapshot,
  options: SaveFallbackOptions = {},
): { radarPath: string | null; opportunityPath: string | null } {
  const radarPath = writeFallbackFile(
    buildFallbackRadarReport(snapshot),
    snapshot.dateStr,
    "ai-radar.md",
    options,
  );
  const opportunityPath = writeFallbackFile(
    buildFallbackOpportunityReport(snapshot),
    snapshot.dateStr,
    "ai-opportunity.md",
    options,
  );
  return { radarPath, opportunityPath };
}
