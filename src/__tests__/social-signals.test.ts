import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchSocialSignals, saveSocialSignalsReport } from "../social-signals.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchSocialSignals", () => {
  it("merges and ranks recent Bluesky and Mastodon posts", async () => {
    const createdAt = new Date().toISOString();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL) => {
        const value = String(url);
        if (value.includes("public.api.bsky.app")) {
          return new Response(
            JSON.stringify({
              feed: [
                {
                  post: {
                    uri: "at://did:plc:test/app.bsky.feed.post/abc",
                    author: { handle: "alice.bsky.social", displayName: "Alice" },
                    record: { text: "New AI agent evaluation results", createdAt },
                    indexedAt: createdAt,
                    replyCount: 4,
                    repostCount: 5,
                    likeCount: 30,
                    quoteCount: 2,
                  },
                },
              ],
            }),
          );
        }
        return new Response(
          JSON.stringify([
            {
              id: "mastodon-1",
              url: "https://mastodon.social/@bob/1",
              created_at: createdAt,
              replies_count: 30,
              reblogs_count: 10,
              favourites_count: 20,
              content: "<p>Local model release discussion with real user feedback</p>",
              account: { acct: "bob", display_name: "Bob" },
            },
          ]),
        );
      }),
    );

    const result = await fetchSocialSignals();

    expect(result.blueskyFetchSuccess).toBe(true);
    expect(result.mastodonFetchSuccess).toBe(true);
    expect(result.posts[0]?.source).toBe("mastodon");
    expect(result.posts.some((post) => post.source === "bluesky")).toBe(true);
  });

  it("writes a standalone social source report", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "social-signals-"));
    const previous = process.cwd();
    try {
      process.chdir(tmp);
      const filepath = saveSocialSignalsReport(
        {
          blueskyFetchSuccess: true,
          mastodonFetchSuccess: true,
          posts: [
            {
              source: "mastodon",
              id: "1",
              text: "Developers discuss a new local model",
              url: "https://mastodon.social/@test/1",
              author: "test",
              community: "Mastodon",
              createdAt: "2026-06-12T00:00:00Z",
              score: 20,
              replies: 4,
            },
          ],
        },
        "2026-06-12 00:00:00",
        "2026-06-12",
        "",
      );
      expect(filepath).toBe(path.join("digests", "2026-06-12", "ai-social.md"));
      expect(fs.readFileSync(filepath, "utf-8")).toContain("Developers discuss a new local model");
    } finally {
      process.chdir(previous);
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
