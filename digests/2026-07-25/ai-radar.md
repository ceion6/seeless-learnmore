# 少看点 AI 雷达 2026-07-25

> 当团队开始长期使用 agent，最大的浪费是每次会话都从零开始。
>
> 覆盖提醒：官网源：今日新增 3 条官网内容。；Product Hunt：该源今天未启用，所以没有 Product Hunt 数据；这不是抓取失败。；ArXiv：已抓取到 50 篇论文。

## 今天必看

### OpenClaw 生态今天更新密度最高
- 结论：OpenClaw 在 24 小时内累计出现 633 个 issue / PR / release 样本。
- 为什么重要：仓库更新密度高，通常代表工具链正在快速试错，值得先看真实问题和新增能力。 
- 来源：[OpenClaw](https://github.com/openclaw/openclaw)
- 建议：看原文

### GitHub 热门样本里出现 block/buzz
- 结论：block/buzz 进入当天高热样本，说明相关方向正在被开发者集中试用。
- 为什么重要：开源热度不是质量证明，但很适合拿来判断今天大家到底把注意力投向哪里。 
- 来源：[block/buzz](https://github.com/block/buzz)
- 建议：扫一眼

### 官网源今天新增了 Introducing Claude Opus 5
- 结论：anthropic 官网今天抓到新页面 Introducing Claude Opus 5。
- 为什么重要：官网源的新增通常比社区转述更接近一手表述，适合用来确认公司到底在推什么。 
- 来源：[Introducing Claude Opus 5](https://www.anthropic.com/news/claude-opus-5)
- 建议：看原文

### HN 今天在讨论 Claude Opus 5
- 结论：Claude Opus 5 进入今天的高讨论样本，社区更关注真实采用边界而不是单条宣传。
- 为什么重要：HN 的高分讨论适合拿来观察开发者到底在担心什么、争什么。 
- 来源：[Claude Opus 5](https://www.anthropic.com/news/claude-opus-5)
- 建议：看原文

### Hugging Face 热榜里有 baidu/Unlimited-OCR
- 结论：baidu/Unlimited-OCR 进入今日模型热榜，说明社区对这条模型路线仍有明确兴趣。
- 为什么重要：模型热榜更适合判断可部署能力和开发者实验面，而不是只看头部闭源叙事。 
- 来源：[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)
- 建议：扫一眼

## 社交媒体在聊什么

### Debian is introducing a resolution on LLM and AI usage in Debian: yea …
- 判断：Mastodon 上出现高互动讨论，互动分 15，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://hachyderm.io/@abmurrow/116977308101982890)

### Good lord. You know how I occasionally go "what's going to happen when…
- 判断：Mastodon 上出现高互动讨论，互动分 12，回复 3。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://mastodon.social/@adr/116977224202355836)

### Look! It’s a bird… It’s Superman… No, it’s a hallucinating plane! DARP…
- 判断：Mastodon 上出现高互动讨论，互动分 8，回复 2。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://graphics.social/@metin/116973976465630814)

## 正在升温

### Agent 会话沉淀与团队记忆层
- 结论：memory、wiki、session archive、version snapshot 这条线正在慢慢成形。
- 来源：[Claude Code v2.1.219](https://github.com/anthropics/claude-code/releases)、[Claude Code #81044](https://github.com/anthropics/claude-code/issues/81044)、[Claude Code #81039](https://github.com/anthropics/claude-code/issues/81039)、[Claude Code #74894](https://github.com/anthropics/claude-code/issues/74894)、[Claude Code #77208](https://github.com/anthropics/claude-code/issues/77208)

### Agent 执行护栏与回滚审计层
- 结论：runtime、sandbox、hook、benchmark 可信度这些问题正在反复出现。
- 来源：[Claude Code v2.1.219](https://github.com/anthropics/claude-code/releases)、[Claude Code #77208](https://github.com/anthropics/claude-code/issues/77208)、[Claude Code #80883](https://github.com/anthropics/claude-code/pull/80883)、[OpenAI Codex #35271](https://github.com/openai/codex/pull/35271)、[OpenAI Codex #29752](https://github.com/openai/codex/pull/29752)

### 浏览器/终端工作流模板包
- 结论：DevTools、browser、CLI 和 task automation 的结合信号在变强。
- 来源：[Claude Code v2.1.219](https://github.com/anthropics/claude-code/releases)、[Claude Code #81039](https://github.com/anthropics/claude-code/issues/81039)、[Claude Code #74894](https://github.com/anthropics/claude-code/issues/74894)、[Claude Code #77208](https://github.com/anthropics/claude-code/issues/77208)、[OpenAI Codex #35284](https://github.com/openai/codex/issues/35284)

### 团队级技能包与插件目录
- 结论：skills、plugins、MCP、hooks 和 workflow 模板正在形成独立分发层。
- 来源：[Claude Code v2.1.219](https://github.com/anthropics/claude-code/releases)、[Claude Code #77208](https://github.com/anthropics/claude-code/issues/77208)、[Claude Code #80883](https://github.com/anthropics/claude-code/pull/80883)、[OpenAI Codex #35285](https://github.com/openai/codex/issues/35285)、[OpenAI Codex #35280](https://github.com/openai/codex/pull/35280)

## 新模型 / 新产品

### baidu/Unlimited-OCR
- 结论：baidu/Unlimited-OCR 进入模型热榜，pipeline=image-text-to-text。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)
- 建议：扫一眼

### poolside/Laguna-S-2.1
- 结论：poolside/Laguna-S-2.1 进入模型热榜，pipeline=text-generation。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[poolside/Laguna-S-2.1](https://huggingface.co/poolside/Laguna-S-2.1)
- 建议：扫一眼

### thinkingmachines/Inkling
- 结论：thinkingmachines/Inkling 进入模型热榜，pipeline=image-text-to-text。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[thinkingmachines/Inkling](https://huggingface.co/thinkingmachines/Inkling)
- 建议：扫一眼

## 论文里可能有用的东西

### 3D-Aware VLMs with Implicit and Explicit Geometries
- 结论：这更偏多模态能力方向。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[3D-Aware VLMs with Implicit and Explicit Geometries](http://arxiv.org/abs/2607.21595v1)
- 建议：扫一眼

### Expanding Flow Maps
- 结论：这值得先记住题目，再等更完整样本复盘。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[Expanding Flow Maps](http://arxiv.org/abs/2607.21585v1)
- 建议：扫一眼

### GraphVid: Interactive Graph-Controllable Video Generation
- 结论：这更偏训练、评测或可信度问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[GraphVid: Interactive Graph-Controllable Video Generation](http://arxiv.org/abs/2607.21580v1)
- 建议：扫一眼

## 可以暂缓

### 今天没有 Product Hunt 样本
- 判断：今天先不要脑补新品发布面，Product Hunt 源当前未启用。 
- 来源：[今日原始快照](./raw-data.json)

### 纯热度样本先别当成产品结论
- 判断：如果用户从不回看 agent 会话，就不要把它误判成知识平台需求。
- 来源：[Claude Code v2.1.219](https://github.com/anthropics/claude-code/releases)、[Claude Code #81044](https://github.com/anthropics/claude-code/issues/81044)、[Claude Code #81039](https://github.com/anthropics/claude-code/issues/81039)、[Claude Code #74894](https://github.com/anthropics/claude-code/issues/74894)、[Claude Code #77208](https://github.com/anthropics/claude-code/issues/77208)

## 原始入口

- [今日原始快照 raw-data.json](./raw-data.json) — 看当天完整样本和源数据状态。
- [Introducing Claude Opus 5](https://www.anthropic.com/news/claude-opus-5) — 今天官网源里最值得回看的新增页面。
- [Supporting ambitious external research through the Anthropic Economic Futures Research Fund](https://www.anthropic.com/news/economic-futures-research-fund-agenda) — 今天官网源里最值得回看的新增页面。
- [OpenClaw](https://github.com/openclaw/openclaw) — 看今天 issue / PR / release 最密集的仓库。
- [OpenAI Codex](https://github.com/openai/codex) — 看今天 issue / PR / release 最密集的仓库。
- [Claude Opus 5](https://www.anthropic.com/news/claude-opus-5) — 看国外开发者今天在争什么。

---

> 本页由每日保底脚本生成，用于保证站点每日都有可读更新；后续可以被更高质量的人工 / Codex 版本覆盖。生成时间: 2026-07-25 02:48 UTC