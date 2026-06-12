import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { CollectedSnapshot } from "../collect.ts";
import {
  buildFallbackOpportunityReport,
  buildFallbackRadarReport,
  saveFallbackDailyReports,
} from "../daily-fallback.ts";

function makeSnapshot(): CollectedSnapshot {
  return {
    collectedAt: "2026-06-03T00:00:00.000Z",
    dateStr: "2026-06-03",
    utcStr: "2026-06-03 00:00:00",
    fetched: [
      {
        cfg: { id: "codex", repo: "openai/codex", name: "Codex" },
        issues: [
          {
            number: 1,
            title: "sandbox permission issue",
            state: "open",
            user: { login: "alice" },
            labels: [],
            created_at: "2026-06-03T00:00:00Z",
            updated_at: "2026-06-03T00:00:00Z",
            comments: 12,
            html_url: "https://github.com/openai/codex/issues/1",
            body: "runtime hook audit rollback",
          },
        ],
        prs: [
          {
            number: 2,
            title: "add plugin workflow support",
            state: "open",
            user: { login: "bob" },
            labels: [],
            created_at: "2026-06-03T00:00:00Z",
            updated_at: "2026-06-03T00:00:00Z",
            comments: 4,
            html_url: "https://github.com/openai/codex/pull/2",
            body: "mcp plugin skill workflow",
          },
        ],
        releases: [
          {
            tag_name: "v1.2.3",
            name: "v1.2.3",
            body: "browser devtools improvements",
            published_at: "2026-06-03T00:00:00Z",
          },
        ],
      },
    ],
    skillsData: { prs: [], issues: [] },
    webResults: [
      {
        site: "openai",
        siteName: "OpenAI",
        isFirstRun: false,
        totalDiscovered: 10,
        newItems: [
          {
            url: "https://openai.com/index/test",
            title: "Codex browser workflow update",
            lastmod: "2026-06-03T00:00:00Z",
            content: "browser automation workflow update",
            site: "openai",
            category: "index",
          },
        ],
      },
    ],
    trendingData: {
      trendingRepos: [
        {
          fullName: "org/codegraph",
          description: "code graph for repo understanding",
          language: "TypeScript",
          todayStars: 300,
          totalStars: 10000,
          forks: 200,
          url: "https://github.com/org/codegraph",
        },
      ],
      searchRepos: [
        {
          fullName: "org/plugin-workflow",
          description: "plugin workflow automation",
          language: "TypeScript",
          stargazersCount: 5000,
          pushedAt: "2026-06-03T00:00:00Z",
          url: "https://github.com/org/plugin-workflow",
          searchQuery: "ai-agent",
        },
      ],
      starSurgeRepos: [],
      trendingFetchSuccess: true,
    },
    hnData: {
      fetchSuccess: true,
      stories: [
        {
          id: "1",
          title: "Constraint decay in coding agents",
          url: "https://example.com/constraint-decay",
          hnUrl: "https://news.ycombinator.com/item?id=1",
          points: 120,
          comments: 40,
          author: "alice",
          createdAt: "2026-06-03T00:00:00Z",
        },
      ],
    },
    phData: {
      products: [],
      fetchSuccess: false,
      fetchStatus: "disabled",
    },
    arxivData: {
      papers: [
        {
          id: "1",
          title: "Agent reward verification",
          summary: "reward benchmark for agent verification",
          authors: ["alice"],
          published: "2026-06-02T00:00:00Z",
          updated: "2026-06-02T00:00:00Z",
          categories: ["cs.AI"],
          url: "https://arxiv.org/abs/1",
          pdfUrl: "https://arxiv.org/pdf/1",
        },
      ],
      fetchSuccess: true,
      fetchStatus: "ok",
    },
    hfData: {
      models: [
        {
          id: "org/model",
          author: "org",
          likes: 100,
          downloads: 50,
          tags: ["multimodal", "agent"],
          pipelineTag: "text-generation",
          lastModified: "2026-06-03T00:00:00Z",
          url: "https://huggingface.co/org/model",
        },
      ],
      fetchSuccess: true,
    },
    devtoData: {
      fetchSuccess: true,
      articles: [
        {
          id: 1,
          title: "Skill workflow for agents",
          description: "plugin workflow memory",
          url: "https://dev.to/test",
          publishedAt: "2026-06-03T00:00:00Z",
          positiveReactionsCount: 10,
          commentsCount: 2,
          readingTimeMinutes: 5,
          tags: ["ai", "workflow"],
          user: "alice",
        },
      ],
    },
    lobstersData: {
      fetchSuccess: true,
      stories: [
        {
          title: "Browser automation with devtools",
          url: "https://lobste.rs/s/1",
          commentsUrl: "https://lobste.rs/s/1/comments",
          score: 20,
          commentCount: 5,
          author: "bob",
          publishedAt: "2026-06-03T00:00:00Z",
          tags: ["ai"],
        },
      ],
    },
    socialSignals: {
      blueskyFetchSuccess: true,
      redditFetchSuccess: true,
      posts: [
        {
          source: "bluesky",
          id: "at://did:plc:test/app.bsky.feed.post/1",
          text: "Developers are debating whether agent benchmarks reflect real work",
          url: "https://bsky.app/profile/test/post/1",
          author: "test",
          createdAt: "2026-06-03T00:00:00Z",
          score: 80,
          replies: 20,
        },
      ],
    },
  };
}

describe("daily fallback reports", () => {
  it("builds a readable fallback radar page", () => {
    const result = buildFallbackRadarReport(makeSnapshot());
    expect(result).toContain("# 少看点 AI 雷达 2026-06-03");
    expect(result).toContain("## 今天必看");
    expect(result).toContain("## 正在升温");
    expect(result).toContain("## 社交媒体在聊什么");
    expect(result).toContain("agent benchmarks reflect real work");
    expect(result).toContain("## 原始入口");
    expect(result).toContain("本页由每日保底脚本生成");
  });

  it("builds a readable fallback opportunity page", () => {
    const result = buildFallbackOpportunityReport(makeSnapshot());
    expect(result).toContain("# AI 机会雷达 2026-06-03");
    expect(result).toContain("## 值得做的 3 个方向");
    expect(result).toContain("给谁做");
    expect(result).toContain("## 开工顺序");
    expect(result).toContain("本页由每日保底脚本生成");
  });

  it("does not overwrite a non-fallback report", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "daily-fallback-"));
    const prev = process.cwd();

    try {
      process.chdir(tmp);
      fs.mkdirSync(path.join("digests", "2026-06-03"), { recursive: true });
      fs.writeFileSync(path.join("digests", "2026-06-03", "ai-radar.md"), "# hand written report\n");

      const result = saveFallbackDailyReports(makeSnapshot());
      expect(result.radarPath).toBeNull();
      expect(result.opportunityPath).toBe(path.join("digests", "2026-06-03", "ai-opportunity.md"));
      expect(fs.readFileSync(path.join("digests", "2026-06-03", "ai-radar.md"), "utf-8")).toBe(
        "# hand written report\n",
      );
    } finally {
      process.chdir(prev);
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
