# seeless-learnmore

English | [中文](./README.zh.md)

`seeless-learnmore` is a GitHub Actions powered AI radar. It collects AI ecosystem signals every day, writes source reports, and then produces one Chinese editor-style page that filters for what is actually worth reading.

The default output is not a generic dashboard feed. The main page is `ai-radar.md`, which is a second-pass selection over the day's GitHub, research, community, and official-source reports.

## What it does

- fetches AI signals from GitHub, Hacker News, ArXiv, Hugging Face, Product Hunt, Dev.to, Lobste.rs, and official company sites
- generates daily source reports in Chinese and English
- generates a Chinese `ai-radar` page for high-signal daily reading
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
- `ai-cli.md`: AI CLI ecosystem digest
- `ai-agents.md`: agent / OpenClaw ecosystem digest
- `ai-trending.md`: GitHub open-source trend report
- `ai-web.md`: official company update report
- `ai-hn.md`, `ai-ph.md`, `ai-arxiv.md`, `ai-hf.md`, `ai-community.md`

GitHub Pages renders these files as a static site. `manifest.json` drives navigation. `feed.xml` exposes RSS.

## Deploy

1. Push this repo to your GitHub repository.
2. Open the `Actions` tab and make sure workflows are enabled.
3. Open `Settings -> Pages`.
4. Set:
   `Source = Deploy from a branch`
5. Set:
   `Branch = main`
   `Folder = / (root)`
6. Add repository secrets in:
   `Settings -> Secrets and variables -> Actions`
7. Run `Daily Seeless Learnmore` once manually.

Your site URL will be:

`https://<your-github-name>.github.io/<your-repo-name>/`

## Required secrets

At minimum, configure one LLM provider and its API key.

| Secret | Required | Purpose |
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

`GITHUB_TOKEN` is provided automatically by GitHub Actions.

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

Use the same environment variables locally as you use in repository secrets.

## Schedule

- Daily:
  `00:00 UTC` / `08:00 China Standard Time`
- Weekly:
  `01:00 UTC` every Monday
- Monthly:
  `02:00 UTC` on the first day of each month

## Notes

- The first run is slower because sitemap-based official sources may fetch up to 25 recent pages per site.
- Product Hunt is skipped when `PRODUCTHUNT_TOKEN` is not set.
- Telegram and Feishu are skipped when their secrets are not set.
- This project is adapted from [duanyytop/agents-radar](https://github.com/duanyytop/agents-radar).
