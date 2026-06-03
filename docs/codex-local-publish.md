# Codex Local Publish Mode

This is the recommended daily publishing mode for this repository.

It does not call any external LLM API from the repo runtime.

## Flow

1. GitHub Actions collects the daily raw snapshot first.
2. GitHub Actions writes same-day fallback `ai-radar.md` and `ai-opportunity.md` so the site never goes blank.
3. Local Codex automation can wake up later.
4. Codex reads `digests/YYYY-MM-DD/raw-data.json`.
5. Codex upgrades the same-day Chinese radar pages directly.
6. Codex updates `manifest.json` and `feed.xml`.
7. Codex commits and pushes to `main`.

## Inputs

- `digests/YYYY-MM-DD/raw-data.json`
- Optional context from the previous day:
  - `digests/<previous-date>/ai-radar.md`
  - `digests/<previous-date>/ai-opportunity.md`
- Optional context from same-day source reports, if they already exist

## Minimum output

The minimum publishable output is:

- `digests/YYYY-MM-DD/ai-radar.md`
- `digests/YYYY-MM-DD/ai-opportunity.md`
- updated `manifest.json`
- updated `feed.xml`

If only the fallback pages exist for a date, the web UI still works; Codex can later overwrite them with a higher-quality version.

## Radar structure

Use this exact section structure:

1. `# 少看点 AI 雷达 YYYY-MM-DD`
2. `> 今天的主线是：...`
3. `## 今天必看`
4. `## 正在升温`
5. `## 新模型 / 新产品`
6. `## 论文里可能有用的东西`
7. `## 可以暂缓`
8. `## 原始入口`

## Opportunity radar structure

Also generate a same-day opportunity page with this exact section structure:

1. `# AI 机会雷达 YYYY-MM-DD`
2. `> 用一句话概括今天最值得下注的机会面`
3. `## 先看结论`
4. `## 值得做的 3 个方向`
5. `## 次优但可观察`
6. `## 今天先别做`
7. `## 开工顺序`
8. `## 原始入口`

Each recommended direction should answer:

- `给谁做`
- `痛点`
- `为什么是现在`
- `最小可行解`
- `付费可能`
- `证据`
- `下一步`

Each item should stay short and decision-oriented:

- `结论`
- `为什么重要`
- `来源`
- optional `建议`

## Writing rules

- Write in Chinese.
- Prefer high-signal judgment over broad coverage.
- Do not restate every raw item.
- Focus on what changed, what matters, and what can be skipped.
- Prefer concrete product, research, infrastructure, and ecosystem signals.
- Treat GitHub star spikes as discovery signals, not proof of technical quality.
- When a source is noisy, compress it into one judgment instead of listing everything.
- For `ai-opportunity.md`, do not write generic startup advice; every direction must be concrete enough to validate in 2-6 weeks.

## Source links

Inside `ai-radar.md`, link back to same-day source pages with hash routes:

- `./#YYYY-MM-DD/ai-trending`
- `./#YYYY-MM-DD/ai-web`
- `./#YYYY-MM-DD/ai-hn`
- `./#YYYY-MM-DD/ai-ph`
- `./#YYYY-MM-DD/ai-arxiv`
- `./#YYYY-MM-DD/ai-hf`
- `./#YYYY-MM-DD/ai-community`
- `./#YYYY-MM-DD/ai-cli`
- `./#YYYY-MM-DD/ai-agents`

If same-day source pages do not exist yet, link to the external source URLs or the day's `raw-data.json` instead of leaving dead in-site links.

## Publish steps

After writing the daily radar pages:

1. run `pnpm manifest`
2. `git add digests/ manifest.json feed.xml`
3. commit with `digest: YYYY-MM-DD codex local radar`
4. push to `origin main`

## Guardrails

- If `raw-data.json` is missing, do not invent a report.
- If there is no meaningful new signal, still write a short radar page with a conservative summary.
- If `webResults` contains many pages from a source with `isFirstRun: true`, treat that as first-time backfill, not as proof that all those pages were published today.
- Do not overwrite a same-day human-written or Codex-written page with a fallback page.
- Do not overwrite unrelated files.
- Do not commit local code changes unrelated to the daily digest.
