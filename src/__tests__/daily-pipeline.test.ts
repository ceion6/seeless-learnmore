import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { CollectedSnapshot } from "../collect.ts";
import { loadCollectedSnapshot, saveCollectedSnapshot } from "../collect.ts";
import { saveFallbackDailyReports } from "../daily-fallback.ts";
import { generateManifestFiles } from "../generate-manifest.ts";

function makeSnapshot(): CollectedSnapshot {
  return {
    collectedAt: "2026-06-03T00:00:00.000Z",
    dateStr: "2026-06-03",
    utcStr: "2026-06-03 00:00",
    fetched: [],
    skillsData: { prs: [], issues: [] },
    webResults: [],
    trendingData: {
      trendingRepos: [],
      searchRepos: [],
      starSurgeRepos: [],
      trendingFetchSuccess: false,
    },
    hnData: { stories: [], fetchSuccess: false },
    phData: { products: [], fetchSuccess: false, fetchStatus: "disabled" },
    arxivData: { papers: [], fetchSuccess: false, fetchStatus: "error" },
    hfData: { models: [], fetchSuccess: false },
    devtoData: { articles: [], fetchSuccess: false },
    lobstersData: { stories: [], fetchSuccess: false },
  };
}

describe("daily pipeline smoke test", () => {
  it("turns a raw snapshot into fallback pages, manifest, and feed entries", async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "daily-pipeline-"));
    const prev = process.cwd();

    try {
      process.chdir(tmp);

      const snapshotPath = saveCollectedSnapshot(makeSnapshot());
      const snapshot = loadCollectedSnapshot(snapshotPath);
      const { radarPath, opportunityPath } = saveFallbackDailyReports(snapshot);
      const manifest = await generateManifestFiles({ siteUrl: "https://example.com/seeless" });

      expect(radarPath).toBe(path.join("digests", "2026-06-03", "ai-radar.md"));
      expect(opportunityPath).toBe(path.join("digests", "2026-06-03", "ai-opportunity.md"));
      expect(fs.existsSync(path.join("digests", "2026-06-03", "ai-radar.md"))).toBe(true);
      expect(fs.existsSync(path.join("digests", "2026-06-03", "ai-opportunity.md"))).toBe(true);

      expect(manifest.dates).toHaveLength(1);
      expect(manifest.dates[0]).toEqual({
        date: "2026-06-03",
        reports: ["ai-radar", "ai-opportunity"],
      });

      const feedXml = fs.readFileSync("feed.xml", "utf-8");
      expect(feedXml).toContain("https://example.com/seeless/#2026-06-03/ai-radar");
      expect(feedXml).toContain("https://example.com/seeless/#2026-06-03/ai-opportunity");
      expect(feedXml).toContain("<title>AI 机会雷达 2026-06-03</title>");
    } finally {
      process.chdir(prev);
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
