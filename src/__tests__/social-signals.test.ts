import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchSocialSignals } from "../social-signals.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchSocialSignals", () => {
  it("merges and ranks recent Bluesky and Reddit posts", async () => {
    const createdAt = new Date().toISOString();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL) => {
        const value = String(url);
        if (value.includes("public.api.bsky.app")) {
          return new Response(
            JSON.stringify({
              posts: [
                {
                  uri: "at://did:plc:test/app.bsky.feed.post/abc",
                  author: { handle: "alice.bsky.social", displayName: "Alice" },
                  record: { text: "New AI agent evaluation results", createdAt },
                  indexedAt: createdAt,
                  replyCount: 4,
                  repostCount: 5,
                  likeCount: 30,
                  quoteCount: 2,
                },
              ],
            }),
          );
        }
        return new Response(
          JSON.stringify({
            data: {
              children: [
                {
                  data: {
                    id: "reddit-1",
                    title: "Local model release discussion",
                    selftext: "Real user feedback",
                    author: "bob",
                    subreddit: "LocalLLaMA",
                    permalink: "/r/LocalLLaMA/comments/reddit-1/test/",
                    created_utc: Date.now() / 1000,
                    score: 20,
                    num_comments: 30,
                  },
                },
              ],
            },
          }),
        );
      }),
    );

    const result = await fetchSocialSignals();

    expect(result.blueskyFetchSuccess).toBe(true);
    expect(result.redditFetchSuccess).toBe(true);
    expect(result.posts[0]?.source).toBe("reddit");
    expect(result.posts.some((post) => post.source === "bluesky")).toBe(true);
  });
});
