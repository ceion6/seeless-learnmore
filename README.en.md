# seeless-learnmore

English | [中文](./README.md)

`seeless-learnmore` is an AI radar focused on Chinese daily synthesis. It collects AI ecosystem signals every day, writes source reports, and then produces two Chinese editor-style pages: one for what is actually worth reading, and one for what could be built next.

The default output is not a generic dashboard feed. The main pages are `ai-radar.md` and `ai-opportunity.md`, both derived from the day's GitHub, research, community, and official-source reports.

The recommended operating mode is:

- GitHub Actions collect the raw daily snapshot first
- GitHub Actions also publish a readable fallback daily update
- a local Codex automation reads `raw-data.json` and uses Codex's local capability to write the page directly
- GitHub Pages serves the static site

## What it does

- fetches AI signals from GitHub, Hacker News, ArXiv, Hugging Face, Product Hunt, Dev.to, Lobste.rs, and official company sites
- generates a Chinese `ai-radar` page for high-signal daily reading
- generates a Chinese `ai-opportunity` page for "what to build" judgment
- publishes everything through GitHub Pages
- optionally sends Telegram and Feishu notifications

## Data sources

- GitHub repositories: tracked AI CLI and agent projects
- GitHub Trending
- GitHub topic search
- GitHub fast-rising repositories:
  newer repositories from the last 30 days ranked by stars and approximate stars/day
- Hacker News
- Product Hunt
- ArXiv
- Hugging Face
- Dev.to
- Lobste.rs
- Official web sources via sitemap:
  Anthropic, OpenAI, Google DeepMind, Qwen, DeepSeek API Docs

## Main output

Files are written to `digests/YYYY-MM-DD/`.

- `ai-radar.md`: the main Chinese daily radar
- `ai-opportunity.md`: the Chinese opportunity page
- `ai-cli.md`: AI CLI ecosystem digest
- `ai-agents.md`: agent / OpenClaw ecosystem digest
- `ai-trending.md`: GitHub open-source trend report
- `ai-web.md`: official company update report
- `ai-hn.md`, `ai-ph.md`, `ai-arxiv.md`, `ai-hf.md`, `ai-community.md`

GitHub Pages renders these files as a static site. `manifest.json` drives navigation. `feed.xml` exposes RSS.

## Deploy

1. Push this repo to your GitHub repository.
2. Open `Settings -> Pages`.
3. Set:
   `Source = Deploy from a branch`
4. Set:
   `Branch = main`
   `Folder = / (root)`
5. In `Settings -> Secrets and variables -> Actions`, add only the collection-side values you actually want on GitHub.

`GITHUB_TOKEN` is provided automatically by GitHub Actions.

If you use the recommended local Codex publishing mode, you can leave this with no extra secrets at all.

`PRODUCTHUNT_TOKEN` is fully optional; when absent, the Product Hunt source is treated as disabled rather than as an error.

6. Add a daily local Codex automation that runs after the GitHub daily collector.
7. Have that automation call the local skill `seeless-local-radar-publish`, follow [docs/codex-local-publish.md](./docs/codex-local-publish.md), and upgrade the same-day `ai-radar.md` / `ai-opportunity.md` pages on `main`.

Your site URL will be:

`https://<your-github-name>.github.io/<your-repo-name>/`

## Recommended mode: no API key

If you use the recommended mode, you do not need a local `.env` with model keys.

The recommended flow is:

- GitHub Actions creates `digests/YYYY-MM-DD/raw-data.json`
- GitHub Actions also creates same-day fallback `ai-radar.md` / `ai-opportunity.md`
- local Codex automation reads that file
- Codex upgrades `digests/YYYY-MM-DD/ai-radar.md` / `ai-opportunity.md`
- then updates `manifest.json` and `feed.xml`
- then commits and pushes back to the repo

See [docs/codex-local-publish.md](./docs/codex-local-publish.md) for the exact publishing rules.

Recommended local skill name: `seeless-local-radar-publish`

## Optional mode: bring your own LLM provider

If you still want the repository scripts themselves to call an external model, then configure a local `.env`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `LLM_PROVIDER` | recommended | `anthropic`, `openai`, `deepseek`, `github-copilot`, `openrouter` |
| `ANTHROPIC_API_KEY` | if `anthropic` | Anthropic API key |
| `ANTHROPIC_BASE_URL` | optional | Anthropic-compatible endpoint override |
| `ANTHROPIC_MODEL` | optional | Anthropic primary model |
| `OPENAI_API_KEY` | if `openai` | OpenAI-compatible API key |
| `OPENAI_BASE_URL` | optional | OpenAI-compatible endpoint |
| `OPENAI_MODEL` | optional | primary OpenAI-compatible model |
| `OPENAI_MODEL_FALLBACKS` | optional | comma-separated fallback models |
| `DEEPSEEK_API_KEY` | if `deepseek` | DeepSeek API key |
| `DEEPSEEK_MODEL` | optional | primary DeepSeek model |
| `DEEPSEEK_MODEL_FALLBACKS` | optional | comma-separated fallback models |
| `OPENROUTER_API_KEY` | if `openrouter` | OpenRouter API key |
| `OPENROUTER_MODEL` | optional | primary OpenRouter model |
| `OPENROUTER_MODEL_FALLBACKS` | optional | comma-separated fallback models |
| `GITHUB_COPILOT_MODEL` | optional | primary GitHub Copilot model |
| `GITHUB_COPILOT_MODEL_FALLBACKS` | optional | comma-separated fallback models |
| `PRODUCTHUNT_TOKEN` | optional | enables Product Hunt report |
| `TELEGRAM_BOT_TOKEN` | optional | enables Telegram notifications |
| `TELEGRAM_CHAT_ID` | optional | Telegram target chat/channel ID |
| `FEISHU_WEBHOOK_URLS` | optional | comma-separated Feishu webhooks |
| `GITHUB_TOKEN` | optional | raises GitHub API limits; auto-derived when `gh` is logged in locally |
| `DIGEST_REPO` | optional | footer and GitHub issue target; the local publish script auto-detects it |

If your goal is to keep model keys local, you do not need to store these in GitHub repository secrets.

## Alibaba Cloud Model Studio

Alibaba Cloud DashScope / Model Studio works best here through the OpenAI-compatible path:

```bash
LLM_PROVIDER=openai
OPENAI_API_KEY=<dashscope-api-key>
OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
OPENAI_MODEL=qwen-plus
OPENAI_MODEL_FALLBACKS=qwen-turbo,qwen-max
```

When the current OpenAI-compatible model returns quota, permission, or rate-limit errors, the provider automatically retries the same request on the next fallback model.

If you use a non-mainland region, change `OPENAI_BASE_URL` to the regional DashScope endpoint that matches your key.

## Local run

```bash
pnpm install
pnpm start
```

If you still want the repository scripts themselves to call an external model, the one-shot command is:

```bash
pnpm publish:local
```

This script will:

- pull the latest `main`
- prefer `digests/YYYY-MM-DD/raw-data.json` when today's GitHub collection snapshot exists
- run the daily digest
- run the weekly rollup on Mondays
- run the monthly rollup on the first day of the month
- update `manifest.json` and `feed.xml`
- commit and push new digest output back to `main`

To avoid sweeping in unrelated local edits, the script exits early when tracked files already have uncommitted changes.

If you want to require the snapshot and forbid live fallback in script mode, run:

```bash
PUBLISH_REQUIRE_SNAPSHOT=1 pnpm publish:local
```

## GitHub Actions split

`Daily Seeless Learnmore` now collects the raw daily snapshot and publishes fallback daily pages so the site never goes blank.

`Weekly Seeless Learnmore` and `Monthly Seeless Learnmore` remain manual fallback workflows.

## Notes

- The first run is slower because sitemap-based official sources may fetch up to 25 recent pages per site.
- Product Hunt is skipped when `PRODUCTHUNT_TOKEN` is not set.
- Telegram and Feishu are skipped when their secrets are not set.
- This project is adapted from [duanyytop/agents-radar](https://github.com/duanyytop/agents-radar).
