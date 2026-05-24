# seeless-learnmore

中文 | [English](./README.en.md)

`seeless-learnmore` 是一个中文 AI 雷达。它每天抓取 AI 生态里的多路信号，先生成源报告，再做一轮中文二次筛选，最后产出一页真正适合日常阅读的“少看点 AI 雷达”。

默认目标不是做一个信息流面板，而是做一个更像编辑部的每日判断页。主产物是 `ai-radar.md`，它会从当天的 GitHub、研究、社区和官方动态里筛出真正值得看的内容。

默认推荐的运行方式是：

- GitHub Actions 先收集当天原始快照
- 本地 Codex 自动化直接读取 `raw-data.json`，用 Codex 本地能力整理并生成页面
- GitHub Pages 负责展示静态站点

## 它会做什么

- 抓取 GitHub、Hacker News、ArXiv、Hugging Face、Product Hunt、Dev.to、Lobste.rs 和 AI 公司官网动态
- 生成中文主页面 `ai-radar.md`
- 通过 GitHub Pages 发布静态站点
- 可选发送 Telegram / 飞书通知

## 数据源

- GitHub 仓库：
  追踪 AI CLI 和 agent 项目本身的 Issues、PR、Releases
- GitHub Trending
- GitHub 主题搜索
- GitHub 飞速涨星仓库：
  近 30 天新创建项目，按总 stars 和近似日均涨星速度筛选
- Hacker News
- Product Hunt
- ArXiv
- Hugging Face
- Dev.to
- Lobste.rs
- 官网 sitemap：
  Anthropic、OpenAI、Google DeepMind、Qwen、DeepSeek API Docs

## 最终产物

所有文件都写到 `digests/YYYY-MM-DD/`。

- `ai-radar.md`：中文主日报，适合直接看
- `ai-cli.md`：AI CLI 工具生态
- `ai-agents.md`：agent / OpenClaw 生态
- `ai-trending.md`：GitHub 开源趋势
- `ai-web.md`：官方公司动态
- `ai-hn.md`、`ai-ph.md`、`ai-arxiv.md`、`ai-hf.md`、`ai-community.md`

GitHub Pages 负责把这些 Markdown 渲染成站点。`manifest.json` 用来生成页面导航，`feed.xml` 用来提供 RSS。

## 怎么部署

1. 把这份代码推到你自己的 GitHub 仓库。
2. 打开 `Settings -> Pages`。
3. 设置：
   `Source = Deploy from a branch`
4. 设置：
   `Branch = main`
   `Folder = / (root)`
5. 在仓库的 `Settings -> Secrets and variables -> Actions` 里只配置你愿意放在 GitHub 上的抓取类值。

最少通常只需要：

```bash
PRODUCTHUNT_TOKEN=xxxxx
```

`GITHUB_TOKEN` 由 GitHub Actions 自动提供，不用你手动加。

6. 给你的电脑加一个每日 Codex 自动化任务，时间晚于 GitHub daily workflow。
7. 让本地 Codex 自动化调用本机 skill `seeless-local-radar-publish`，按 [docs/codex-local-publish.md](./docs/codex-local-publish.md) 直接生成 `ai-radar.md` 并推回 `main`。

站点地址会是：

`https://<你的 GitHub 用户名>.github.io/<你的仓库名>/`

## 推荐模式：不用 API Key

如果你走推荐模式，不需要在本地 `.env` 里配置模型 key。

推荐链路是：

- GitHub Actions 生成 `digests/YYYY-MM-DD/raw-data.json`
- 本地 Codex 自动化读取这个文件
- Codex 直接写 `digests/YYYY-MM-DD/ai-radar.md`
- 再更新 `manifest.json` / `feed.xml`
- 然后自动提交并推回仓库

具体规则见 [docs/codex-local-publish.md](./docs/codex-local-publish.md)。

本机 skill 名称建议固定为：`seeless-local-radar-publish`

## 可选模式：自己接 LLM Provider

如果你仍然想让仓库脚本自己调用外部模型，再去配置本地 `.env`。

| 变量 | 必填 | 用途 |
| --- | --- | --- |
| `LLM_PROVIDER` | 推荐 | `anthropic`、`openai`、`deepseek`、`github-copilot`、`openrouter` |
| `ANTHROPIC_API_KEY` | `anthropic` 时 | Anthropic API key |
| `ANTHROPIC_BASE_URL` | 可选 | Anthropic 兼容端点覆盖 |
| `ANTHROPIC_MODEL` | 可选 | Anthropic 主模型 |
| `OPENAI_API_KEY` | `openai` 时 | OpenAI 兼容 API key |
| `OPENAI_BASE_URL` | 可选 | OpenAI 兼容端点 |
| `OPENAI_MODEL` | 可选 | OpenAI 兼容主模型 |
| `OPENAI_MODEL_FALLBACKS` | 可选 | 用逗号分隔的候补模型 |
| `DEEPSEEK_API_KEY` | `deepseek` 时 | DeepSeek API key |
| `DEEPSEEK_MODEL` | 可选 | DeepSeek 主模型 |
| `DEEPSEEK_MODEL_FALLBACKS` | 可选 | 用逗号分隔的候补模型 |
| `OPENROUTER_API_KEY` | `openrouter` 时 | OpenRouter API key |
| `OPENROUTER_MODEL` | 可选 | OpenRouter 主模型 |
| `OPENROUTER_MODEL_FALLBACKS` | 可选 | 用逗号分隔的候补模型 |
| `GITHUB_COPILOT_MODEL` | 可选 | GitHub Copilot 主模型 |
| `GITHUB_COPILOT_MODEL_FALLBACKS` | 可选 | 用逗号分隔的候补模型 |
| `PRODUCTHUNT_TOKEN` | 可选 | 开启 Product Hunt 报告 |
| `TELEGRAM_BOT_TOKEN` | 可选 | 开启 Telegram 推送 |
| `TELEGRAM_CHAT_ID` | 可选 | Telegram 目标频道 / 群 / 用户 ID |
| `FEISHU_WEBHOOK_URLS` | 可选 | 多个飞书 webhook，逗号分隔 |
| `GITHUB_TOKEN` | 可选 | 提高 GitHub API 额度；本地已登录 `gh` 时可自动读取 |
| `DIGEST_REPO` | 可选 | 页脚和 GitHub Issue 目标仓库；本地脚本会自动推断 |

如果你只是想把模型 key 留在本地，不需要把这些值放进 GitHub 仓库。

## 阿里云百炼怎么配

阿里云百炼 / DashScope 最适合通过 OpenAI 兼容方式接入：

```bash
LLM_PROVIDER=openai
OPENAI_API_KEY=<dashscope-api-key>
OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
OPENAI_MODEL=qwen-plus
OPENAI_MODEL_FALLBACKS=qwen-turbo,qwen-max
```

现在当当前模型返回配额、权限或限流错误时，provider 会自动用下一个候补模型重试同一次请求。所以你不需要每次手工改模型，只要你事先把候补链配好。

如果你用的是海外地域账号，要把 `OPENAI_BASE_URL` 改成对应地域的 DashScope 兼容地址，而且地址和 key 必须属于同一个地域。

## 本地运行

```bash
pnpm install
pnpm start
```

如果你想继续走“仓库脚本自己调用外部模型”的方式，一键命令还是：

```bash
pnpm publish:local
```

这个脚本会：

- 先 `git pull --rebase`
- 优先读取 `digests/YYYY-MM-DD/raw-data.json`
- 跑日报
- 在周一额外跑周报
- 在每月 1 日额外跑月报
- 更新 `manifest.json` 和 `feed.xml`
- 自动提交并推回 `main`

为了避免把你正在改的代码顺手提交掉，脚本在检测到已跟踪文件有未提交改动时会直接退出。

如果你想强制要求“先有 GitHub 收集快照，再允许本地整理”，可以在脚本模式里用：

```bash
PUBLISH_REQUIRE_SNAPSHOT=1 pnpm publish:local
```

缺少当天快照时，它会直接退出，不会回退到本地现抓。

## GitHub Actions 分工

仓库里的 `Daily Seeless Learnmore` 现在恢复为定时任务，但它只做一件事：收集当天原始快照并提交 `raw-data.json`。

`Weekly Seeless Learnmore` 和 `Monthly Seeless Learnmore` 保持手动触发备用。

## 说明

- 第一次运行会慢一些，因为官网 sitemap 抓取会为每个站点最多拉 25 篇近期页面。
- 没配 `PRODUCTHUNT_TOKEN` 时，Product Hunt 部分会自动跳过。
- 没配 Telegram / 飞书密钥时，通知步骤会自动跳过。
- 这个项目基于 [duanyytop/agents-radar](https://github.com/duanyytop/agents-radar) 改造。
