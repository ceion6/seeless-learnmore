import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchSocialSignals } from "../social-signals.ts";

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
});
