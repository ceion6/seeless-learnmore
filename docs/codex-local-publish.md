# Codex Local Publish Mode

This is the recommended daily publishing mode for this repository.

It does not call any external LLM API from the repo runtime.

## Flow

1. GitHub Actions collects the daily raw snapshot first.
2. Local Codex automation wakes up later.
3. Codex reads `digests/YYYY-MM-DD/raw-data.json`.
4. Codex writes the daily Chinese radar page directly.
5. Codex updates `manifest.json` and `feed.xml`.
6. Codex commits and pushes to `main`.

## Inputs

- `digests/YYYY-MM-DD/raw-data.json`
- Optional context from the previous day:
  - `digests/<previous-date>/ai-radar.md`
- Optional context from same-day source reports, if they already exist

## Minimum output

The minimum publishable output is:

- `digests/YYYY-MM-DD/ai-radar.md`
- updated `manifest.json`
- updated `feed.xml`

If only `ai-radar.md` exists for a date, the web UI still works.

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

## Publish steps

After writing the daily radar:

1. run `pnpm manifest`
2. `git add digests/ manifest.json feed.xml`
3. commit with `digest: YYYY-MM-DD codex local radar`
4. push to `origin main`

## Guardrails

- If `raw-data.json` is missing, do not invent a report.
- If there is no meaningful new signal, still write a short radar page with a conservative summary.
- Do not overwrite unrelated files.
- Do not commit local code changes unrelated to the daily digest.
