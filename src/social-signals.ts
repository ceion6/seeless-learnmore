/**
 * Public social-media signals that do not require API keys.
 */

export interface SocialSignal {
  source: "bluesky" | "reddit";
  id: string;
  text: string;
  url: string;
  author: string;
  community?: string;
  createdAt: string;
  score: number;
  replies: number;
}

export interface SocialSignalsData {
  posts: SocialSignal[];
  blueskyFetchSuccess: boolean;
  redditFetchSuccess: boolean;
}

const BLUESKY_QUERIES = ["artificial intelligence", "LLM", "Claude AI", "OpenAI", "AI agents"];
const REDDIT_COMMUNITIES = ["LocalLLaMA", "MachineLearning", "ClaudeAI", "OpenAI"];
const MAX_POSTS = 30;
const RECENT_WINDOW_MS = 36 * 60 * 60 * 1000;

interface BlueskyPost {
  uri: string;
  author: { handle: string; displayName?: string };
  record: { text?: string; createdAt?: string };
  indexedAt: string;
  replyCount?: number;
  repostCount?: number;
  likeCount?: number;
  quoteCount?: number;
}

interface BlueskyResponse {
  posts?: BlueskyPost[];
}

interface RedditPost {
  id: string;
  title: string;
  selftext?: string;
  author: string;
  subreddit: string;
  permalink: string;
  created_utc: number;
  score?: number;
  num_comments?: number;
  stickied?: boolean;
  over_18?: boolean;
}

interface RedditResponse {
  data?: { children?: Array<{ data: RedditPost }> };
}

function isRecent(createdAt: string): boolean {
  return Date.parse(createdAt) >= Date.now() - RECENT_WINDOW_MS;
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, 600);
}

async function fetchBlueskySignals(): Promise<{ posts: SocialSignal[]; success: boolean }> {
  const seen = new Map<string, SocialSignal>();
  let success = false;

  await Promise.all(
    BLUESKY_QUERIES.map(async (query) => {
      try {
        const params = new URLSearchParams({ q: query, limit: "25", sort: "top" });
        const resp = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?${params}`, {
          headers: { "User-Agent": "seeless-learnmore/1.0" },
        });
        if (!resp.ok) {
          console.error(`  [bluesky] "${query}": HTTP ${resp.status}`);
          return;
        }
        success = true;
        const data = (await resp.json()) as BlueskyResponse;
        for (const post of data.posts ?? []) {
          const createdAt = post.record.createdAt ?? post.indexedAt;
          const text = cleanText(post.record.text ?? "");
          if (!text || !isRecent(createdAt)) continue;
          const postId = post.uri.split("/").at(-1);
          if (!postId) continue;
          seen.set(post.uri, {
            source: "bluesky",
            id: post.uri,
            text,
            url: `https://bsky.app/profile/${post.author.handle}/post/${postId}`,
            author: post.author.displayName || post.author.handle,
            createdAt,
            score:
              (post.likeCount ?? 0) +
              (post.repostCount ?? 0) * 2 +
              (post.quoteCount ?? 0) * 2 +
              (post.replyCount ?? 0),
            replies: post.replyCount ?? 0,
          });
        }
      } catch (err) {
        console.error(`  [bluesky] "${query}": ${err}`);
      }
    }),
  );

  return { posts: [...seen.values()], success };
}

async function fetchRedditSignals(): Promise<{ posts: SocialSignal[]; success: boolean }> {
  const seen = new Map<string, SocialSignal>();
  let success = false;

  await Promise.all(
    REDDIT_COMMUNITIES.map(async (community) => {
      try {
        const url = `https://www.reddit.com/r/${community}/top.json?t=day&limit=25&raw_json=1`;
        const resp = await fetch(url, {
          headers: { "User-Agent": "seeless-learnmore/1.0 (public daily radar)" },
        });
        if (!resp.ok) {
          console.error(`  [reddit/${community}] HTTP ${resp.status}`);
          return;
        }
        success = true;
        const data = (await resp.json()) as RedditResponse;
        for (const child of data.data?.children ?? []) {
          const post = child.data;
          const createdAt = new Date(post.created_utc * 1000).toISOString();
          if (post.stickied || post.over_18 || !isRecent(createdAt)) continue;
          const text = cleanText(`${post.title} ${post.selftext ?? ""}`);
          seen.set(post.id, {
            source: "reddit",
            id: post.id,
            text,
            url: `https://www.reddit.com${post.permalink}`,
            author: post.author,
            community: `r/${post.subreddit}`,
            createdAt,
            score: (post.score ?? 0) + (post.num_comments ?? 0) * 2,
            replies: post.num_comments ?? 0,
          });
        }
      } catch (err) {
        console.error(`  [reddit/${community}] ${err}`);
      }
    }),
  );

  return { posts: [...seen.values()], success };
}

export async function fetchSocialSignals(): Promise<SocialSignalsData> {
  const [bluesky, reddit] = await Promise.all([fetchBlueskySignals(), fetchRedditSignals()]);
  const posts = [...bluesky.posts, ...reddit.posts]
    .filter((post) => post.score >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_POSTS);

  console.log(
    `  [social-signals] ${posts.length} posts (Bluesky: ${bluesky.posts.length}, Reddit: ${reddit.posts.length})`,
  );
  return {
    posts,
    blueskyFetchSuccess: bluesky.success,
    redditFetchSuccess: reddit.success,
  };
}
