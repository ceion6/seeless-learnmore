/**
 * Public social-media signals that do not require API keys.
 */

import fs from "node:fs";
import path from "node:path";
import type { Lang } from "./i18n.ts";

export interface SocialSignal {
  source: "bluesky" | "mastodon";
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
  mastodonFetchSuccess: boolean;
}

const BLUESKY_ACTORS = ["anthropic.com", "simonwillison.net"];
const MASTODON_TAG_URLS = [
  "https://mastodon.social/api/v1/timelines/tag/ai?limit=30",
  "https://mastodon.social/api/v1/timelines/tag/llm?limit=30",
  "https://fosstodon.org/api/v1/timelines/tag/ai?limit=30",
  "https://fosstodon.org/api/v1/timelines/tag/machinelearning?limit=30",
];
const MAX_POSTS = 30;
const RECENT_WINDOW_MS = 36 * 60 * 60 * 1000;
const NOISE_PATTERNS = [
  /\bbook launch\b/i,
  /\bwebinar\b/i,
  /\bonline course\b/i,
  /\bsubscribe\b/i,
  /\bdiscount\b/i,
  /\blimited offer\b/i,
  /\binvest in ai companies\b/i,
];
const RELEVANCE_PATTERN =
  /\b(ai|artificial intelligence|llm|language model|machine learning|agentic|agents?|openai|anthropic|claude|gemini|mistral|local model|neural|transformer|inference|rag)\b/i;

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
  feed?: Array<{ post: BlueskyPost }>;
}

interface MastodonStatus {
  id: string;
  url?: string;
  created_at: string;
  replies_count?: number;
  reblogs_count?: number;
  favourites_count?: number;
  content: string;
  account: { acct: string; display_name?: string };
}

function isRecent(createdAt: string): boolean {
  return Date.parse(createdAt) >= Date.now() - RECENT_WINDOW_MS;
}

function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);
}

function dedupeKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .slice(0, 160);
}

function isUsefulSignal(post: SocialSignal): boolean {
  return (
    post.score >= 7 &&
    RELEVANCE_PATTERN.test(post.text) &&
    !NOISE_PATTERNS.some((pattern) => pattern.test(post.text))
  );
}

async function fetchBlueskySignals(): Promise<{ posts: SocialSignal[]; success: boolean }> {
  const seen = new Map<string, SocialSignal>();
  let success = false;

  await Promise.all(
    BLUESKY_ACTORS.map(async (actor) => {
      try {
        const params = new URLSearchParams({ actor, limit: "20", filter: "posts_no_replies" });
        const resp = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?${params}`);
        if (!resp.ok) {
          console.error(`  [bluesky/${actor}] HTTP ${resp.status}`);
          return;
        }
        success = true;
        const data = (await resp.json()) as BlueskyResponse;
        for (const entry of data.feed ?? []) {
          const post = entry.post;
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
        console.error(`  [bluesky/${actor}] ${err}`);
      }
    }),
  );

  return { posts: [...seen.values()], success };
}

async function fetchMastodonSignals(): Promise<{ posts: SocialSignal[]; success: boolean }> {
  const seen = new Map<string, SocialSignal>();
  let success = false;

  await Promise.all(
    MASTODON_TAG_URLS.map(async (url) => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) {
          console.error(`  [mastodon] ${url}: HTTP ${resp.status}`);
          return;
        }
        success = true;
        const statuses = (await resp.json()) as MastodonStatus[];
        for (const status of statuses) {
          if (!status.url || !isRecent(status.created_at)) continue;
          const text = cleanText(status.content);
          if (!text) continue;
          seen.set(status.url, {
            source: "mastodon",
            id: status.id,
            text,
            url: status.url,
            author: status.account.display_name || status.account.acct,
            community: "Mastodon",
            createdAt: status.created_at,
            score:
              (status.favourites_count ?? 0) + (status.reblogs_count ?? 0) * 2 + (status.replies_count ?? 0),
            replies: status.replies_count ?? 0,
          });
        }
      } catch (err) {
        console.error(`  [mastodon] ${url}: ${err}`);
      }
    }),
  );

  return { posts: [...seen.values()], success };
}

export async function fetchSocialSignals(): Promise<SocialSignalsData> {
  const [bluesky, mastodon] = await Promise.all([fetchBlueskySignals(), fetchMastodonSignals()]);
  const seen = new Set<string>();
  const authorCounts = new Map<string, number>();
  const posts = [...bluesky.posts, ...mastodon.posts]
    .filter(isUsefulSignal)
    .sort((a, b) => b.score - a.score)
    .filter((post) => {
      const key = dedupeKey(post.text);
      const authorCount = authorCounts.get(post.author) ?? 0;
      if (!key || seen.has(key) || authorCount >= 2) return false;
      seen.add(key);
      authorCounts.set(post.author, authorCount + 1);
      return true;
    })
    .slice(0, MAX_POSTS);

  console.log(
    `  [social-signals] ${posts.length} posts (Bluesky: ${bluesky.posts.length}, Mastodon: ${mastodon.posts.length})`,
  );
  return {
    posts,
    blueskyFetchSuccess: bluesky.success,
    mastodonFetchSuccess: mastodon.success,
  };
}

function socialPostSection(post: SocialSignal, lang: Lang): string {
  const title = post.text.length > 90 ? `${post.text.slice(0, 90)}…` : post.text;
  const source = post.community ?? (post.source === "bluesky" ? "Bluesky" : "Mastodon");
  return lang === "en"
    ? `### ${title}\n- Source: ${source}\n- Engagement score: ${post.score}; replies: ${post.replies}\n- Author: ${post.author}\n- [Open discussion](${post.url})`
    : `### ${title}\n- 来源平台：${source}\n- 互动分：${post.score}；回复：${post.replies}\n- 作者：${post.author}\n- [查看讨论](${post.url})`;
}

export function saveSocialSignalsReport(
  data: SocialSignalsData,
  utcStr: string,
  dateStr: string,
  footer: string,
  lang: Lang = "zh",
): string {
  const fileName = lang === "en" ? "ai-social-en.md" : "ai-social.md";
  const title = lang === "en" ? "AI Social Signals" : "AI 社交媒体信号";
  const status =
    lang === "en"
      ? `Bluesky fetch: ${data.blueskyFetchSuccess ? "ok" : "unavailable"}; Mastodon fetch: ${data.mastodonFetchSuccess ? "ok" : "unavailable"}`
      : `Bluesky：${data.blueskyFetchSuccess ? "正常" : "不可用"}；Mastodon：${data.mastodonFetchSuccess ? "正常" : "不可用"}`;
  const body = data.posts.length
    ? data.posts
        .slice(0, 20)
        .map((post) => socialPostSection(post, lang))
        .join("\n\n")
    : lang === "en"
      ? "No sufficiently strong social-media signals were collected today."
      : "今天没有收集到足够强的社交媒体信号。";
  const content =
    `# ${title} ${dateStr}\n\n` +
    `> ${status} | ${data.posts.length} ${lang === "en" ? "posts" : "条讨论"} | ${utcStr} UTC\n\n` +
    `---\n\n` +
    `## ${lang === "en" ? "High-engagement discussions" : "今日高互动讨论"}\n\n${body}` +
    footer;
  const filepath = path.join("digests", dateStr, fileName);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  console.log(`  Saved ${filepath}`);
  return filepath;
}
