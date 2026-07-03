# 少看点 AI 雷达 2026-07-03

> 当团队开始长期使用 agent，最大的浪费是每次会话都从零开始。
>
> 覆盖提醒：官网源：今日新增 8 条官网内容。；Product Hunt：该源今天未启用，所以没有 Product Hunt 数据；这不是抓取失败。；ArXiv：已抓取到 50 篇论文。

## 今天必看

### OpenClaw 生态今天更新密度最高
- 结论：OpenClaw 在 24 小时内累计出现 555 个 issue / PR / release 样本。
- 为什么重要：仓库更新密度高，通常代表工具链正在快速试错，值得先看真实问题和新增能力。 
- 来源：[OpenClaw](https://github.com/openclaw/openclaw)
- 建议：看原文

### GitHub 热门样本里出现 usestrix/strix
- 结论：usestrix/strix 进入当天高热样本，说明相关方向正在被开发者集中试用。
- 为什么重要：开源热度不是质量证明，但很适合拿来判断今天大家到底把注意力投向哪里。 
- 来源：[usestrix/strix](https://github.com/usestrix/strix)
- 建议：扫一眼

### 官网源今天新增了 Introducing Claude Sonnet 5
- 结论：anthropic 官网今天抓到新页面 Introducing Claude Sonnet 5。
- 为什么重要：官网源的新增通常比社区转述更接近一手表述，适合用来确认公司到底在推什么。 
- 来源：[Introducing Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)
- 建议：看原文

### HN 今天在讨论 OpenAI ‘in early talks to give 5% stake to US government’
- 结论：OpenAI ‘in early talks to give 5% stake to US government’ 进入今天的高讨论样本，社区更关注真实采用边界而不是单条宣传。
- 为什么重要：HN 的高分讨论适合拿来观察开发者到底在担心什么、争什么。 
- 来源：[OpenAI ‘in early talks to give 5% stake to US government’](https://www.theguardian.com/technology/2026/jul/02/openai-stake-us-government-ai-sam-altman)
- 建议：看原文

### Hugging Face 热榜里有 empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF
- 结论：empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF 进入今日模型热榜，说明社区对这条模型路线仍有明确兴趣。
- 为什么重要：模型热榜更适合判断可部署能力和开发者实验面，而不是只看头部闭源叙事。 
- 来源：[empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF](https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF)
- 建议：扫一眼

## 社交媒体在聊什么

### "Beyond lucrative contracts, the admn is accused of building a partisa…
- 判断：Mastodon 上出现高互动讨论，互动分 11，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://newsie.social/@ZhiZhu/116853813336873344)

### A vendor for my day job had a 12 hour outage to start the week. The le…
- 判断：Mastodon 上出现高互动讨论，互动分 11，回复 1。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://infosec.exchange/@drsbaitso/116853535517946153)

### 1960s movies: "In 2026 we'll all be happy in flying cars!" 2026: AI fa…
- 判断：Mastodon 上出现高互动讨论，互动分 10，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://graphics.social/@metin/116851339758916589)

### Google, Microsoft, and other tech giants are expanding AI search as us…
- 判断：Mastodon 上出现高互动讨论，互动分 8，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://mastodon.social/@knoppix95/116852606741088510)

## 正在升温

### Agent 会话沉淀与团队记忆层
- 结论：memory、wiki、session archive、version snapshot 这条线正在慢慢成形。
- 来源：[Claude Code v2.1.199](https://github.com/anthropics/claude-code/releases)、[Claude Code #73125](https://github.com/anthropics/claude-code/issues/73125)、[Claude Code #73705](https://github.com/anthropics/claude-code/issues/73705)、[Claude Code #73704](https://github.com/anthropics/claude-code/issues/73704)、[Claude Code #73703](https://github.com/anthropics/claude-code/issues/73703)

### Agent 执行护栏与回滚审计层
- 结论：runtime、sandbox、hook、benchmark 可信度这些问题正在反复出现。
- 来源：[Claude Code v2.1.199](https://github.com/anthropics/claude-code/releases)、[Claude Code #73476](https://github.com/anthropics/claude-code/pull/73476)、[Claude Code #72866](https://github.com/anthropics/claude-code/pull/72866)、[OpenAI Codex #29418](https://github.com/openai/codex/issues/29418)、[OpenAI Codex #30946](https://github.com/openai/codex/issues/30946)

### 浏览器/终端工作流模板包
- 结论：DevTools、browser、CLI 和 task automation 的结合信号在变强。
- 来源：[Claude Code v2.1.199](https://github.com/anthropics/claude-code/releases)、[Claude Code #73125](https://github.com/anthropics/claude-code/issues/73125)、[Claude Code #73705](https://github.com/anthropics/claude-code/issues/73705)、[Claude Code #73704](https://github.com/anthropics/claude-code/issues/73704)、[Claude Code #73703](https://github.com/anthropics/claude-code/issues/73703)

### 团队级技能包与插件目录
- 结论：skills、plugins、MCP、hooks 和 workflow 模板正在形成独立分发层。
- 来源：[Claude Code v2.1.199](https://github.com/anthropics/claude-code/releases)、[OpenAI Codex #30968](https://github.com/openai/codex/issues/30968)、[OpenAI Codex #30946](https://github.com/openai/codex/issues/30946)、[OpenAI Codex #30967](https://github.com/openai/codex/issues/30967)、[Gemini CLI #26525](https://github.com/google-gemini/gemini-cli/issues/26525)

## 新模型 / 新产品

### empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF
- 结论：empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF 进入模型热榜，pipeline=image-text-to-text。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF](https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF)
- 建议：扫一眼

### baidu/Unlimited-OCR
- 结论：baidu/Unlimited-OCR 进入模型热榜，pipeline=image-text-to-text。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)
- 建议：扫一眼

### zai-org/GLM-5.2
- 结论：zai-org/GLM-5.2 进入模型热榜，pipeline=text-generation。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)
- 建议：扫一眼

## 论文里可能有用的东西

### Distributed Attacks in Persistent-State AI Control
- 结论：这更偏 agent 执行与工作流问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[Distributed Attacks in Persistent-State AI Control](http://arxiv.org/abs/2607.02514v1)
- 建议：扫一眼

### LACUNA: A Testbed for Evaluating Localization Precision for LLM Unlearning
- 结论：这更偏训练、评测或可信度问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[LACUNA: A Testbed for Evaluating Localization Precision for LLM Unlearning](http://arxiv.org/abs/2607.02513v1)
- 建议：扫一眼

### Program-as-Weights: A Programming Paradigm for Fuzzy Functions
- 结论：这更偏 agent 执行与工作流问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[Program-as-Weights: A Programming Paradigm for Fuzzy Functions](http://arxiv.org/abs/2607.02512v1)
- 建议：扫一眼

## 可以暂缓

### 今天没有 Product Hunt 样本
- 判断：今天先不要脑补新品发布面，Product Hunt 源当前未启用。 
- 来源：[今日原始快照](./raw-data.json)

### 纯热度样本先别当成产品结论
- 判断：如果用户从不回看 agent 会话，就不要把它误判成知识平台需求。
- 来源：[Claude Code v2.1.199](https://github.com/anthropics/claude-code/releases)、[Claude Code #73125](https://github.com/anthropics/claude-code/issues/73125)、[Claude Code #73705](https://github.com/anthropics/claude-code/issues/73705)、[Claude Code #73704](https://github.com/anthropics/claude-code/issues/73704)、[Claude Code #73703](https://github.com/anthropics/claude-code/issues/73703)

## 原始入口

- [今日原始快照 raw-data.json](./raw-data.json) — 看当天完整样本和源数据状态。
- [Introducing Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5) — 今天官网源里最值得回看的新增页面。
- [More details on Fable 5’s cyber safeguards and our jailbreak framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework) — 今天官网源里最值得回看的新增页面。
- [OpenClaw](https://github.com/openclaw/openclaw) — 看今天 issue / PR / release 最密集的仓库。
- [NanoBot](https://github.com/HKUDS/nanobot) — 看今天 issue / PR / release 最密集的仓库。
- [OpenAI ‘in early talks to give 5% stake to US government’](https://www.theguardian.com/technology/2026/jul/02/openai-stake-us-government-ai-sam-altman) — 看国外开发者今天在争什么。

---

> 本页由每日保底脚本生成，用于保证站点每日都有可读更新；后续可以被更高质量的人工 / Codex 版本覆盖。生成时间: 2026-07-03 03:28 UTC