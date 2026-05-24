# seeless-learnmore

[English](./README.md) | 中文

`seeless-learnmore` 是一个用 GitHub Actions 自动运行的中文 AI 雷达。它每天抓取 AI 生态里的多路信号，先生成源报告，再做一轮中文二次筛选，最后产出一页真正适合日常阅读的“少看点 AI 雷达”。

默认目标不是做一个信息流面板，而是做一个更像编辑部的每日判断页。主产物是 `ai-radar.md`，它会从当天的 GitHub、研究、社区和官方动态里筛出真正值得看的内容。

## 它会做什么

- 抓取 GitHub、Hacker News、ArXiv、Hugging Face、Product Hunt、Dev.to、Lobste.rs 和 AI 公司官网动态
- 生成中英文源报告
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
2. 打开 `Actions` 标签页，确认工作流已启用。
3. 打开 `Settings -> Pages`。
4. 设置：
   `Source = Deploy from a branch`
5. 设置：
   `Branch = main`
   `Folder = / (root)`
6. 在 `Settings -> Secrets and variables -> Actions` 里添加密钥。
7. 在 Actions 页手动运行一次 `Daily Seeless Learnmore`。

站点地址会是：

`https://<你的 GitHub 用户名>.github.io/<你的仓库名>/`

## 必填和常用 Secrets

最少只要配一个 LLM provider 和对应的 key。

| Secret | 必填 | 用途 |
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

`GITHUB_TOKEN` 由 GitHub Actions 自动提供，不用手动加。

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

本地环境变量和 GitHub Secrets 用同一套命名。

## 运行频率

- 日报：
  `00:00 UTC` / `08:00 中国标准时间`
- 周报：
  每周一 `01:00 UTC`
- 月报：
  每月 1 日 `02:00 UTC`

## 说明

- 第一次运行会慢一些，因为官网 sitemap 抓取会为每个站点最多拉 25 篇近期页面。
- 没配 `PRODUCTHUNT_TOKEN` 时，Product Hunt 部分会自动跳过。
- 没配 Telegram / 飞书密钥时，通知步骤会自动跳过。
- 这个项目基于 [duanyytop/agents-radar](https://github.com/duanyytop/agents-radar) 改造。
