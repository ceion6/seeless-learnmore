# 少看点 AI 雷达 2026-07-18

> 今天社交讨论的焦点是：My notes on Kimi K3, plus some thoughts on what we can。
>
> 覆盖提醒：官网源：今日新增 1 条官网内容。；Product Hunt：该源今天未启用，所以没有 Product Hunt 数据；这不是抓取失败。；ArXiv：已抓取到 50 篇论文。

## 今天必看

### OpenClaw 生态今天更新密度最高
- 结论：OpenClaw 在 24 小时内累计出现 675 个 issue / PR / release 样本。
- 为什么重要：仓库更新密度高，通常代表工具链正在快速试错，值得先看真实问题和新增能力。 
- 来源：[OpenClaw](https://github.com/openclaw/openclaw)
- 建议：看原文

### GitHub 热门样本里出现 codecrafters-io/build-your-own-x
- 结论：codecrafters-io/build-your-own-x 进入当天高热样本，说明相关方向正在被开发者集中试用。
- 为什么重要：开源热度不是质量证明，但很适合拿来判断今天大家到底把注意力投向哪里。 
- 来源：[codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x)
- 建议：扫一眼

### 官网源今天新增了 A Scorecard For The Ai Age
- 结论：openai 官网今天抓到新页面 A Scorecard For The Ai Age。
- 为什么重要：官网源的新增通常比社区转述更接近一手表述，适合用来确认公司到底在推什么。 
- 来源：[A Scorecard For The Ai Age](https://openai.com/index/a-scorecard-for-the-ai-age/)
- 建议：看原文

### HN 今天在讨论 Apple targets dozens of OpenAI employees with legal letters
- 结论：Apple targets dozens of OpenAI employees with legal letters 进入今天的高讨论样本，社区更关注真实采用边界而不是单条宣传。
- 为什么重要：HN 的高分讨论适合拿来观察开发者到底在担心什么、争什么。 
- 来源：[Apple targets dozens of OpenAI employees with legal letters](https://www.ft.com/content/1b8c9d52-88a9-426b-ba47-f1811f859166)
- 建议：看原文

### Hugging Face 热榜里有 thinkingmachines/Inkling
- 结论：thinkingmachines/Inkling 进入今日模型热榜，说明社区对这条模型路线仍有明确兴趣。
- 为什么重要：模型热榜更适合判断可部署能力和开发者实验面，而不是只看头部闭源叙事。 
- 来源：[thinkingmachines/Inkling](https://huggingface.co/thinkingmachines/Inkling)
- 建议：扫一眼

## 社交媒体在聊什么

### My notes on Kimi K3, plus some thoughts on what we can still learn fro…
- 判断：Bluesky 上出现高互动讨论，互动分 155，回复 7。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Bluesky](https://bsky.app/profile/simonwillison.net/post/3mqs2y7gutk2a)

### People that evangelize AI so hard (and for free) really seem so lost. …
- 判断：Mastodon 上出现高互动讨论，互动分 105，回复 3。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://hachyderm.io/@csara/116937487781736313)

### Flock Says Its Cameras Worked ‘Correctly’ When Police Tracked and Ambu…
- 判断：Mastodon 上出现高互动讨论，互动分 11，回复 1。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://infosec.exchange/@networkpro/116938418088881254)

### *Turn Cloud and Local LLMs into a genuine engineering teammate.* This …
- 判断：Mastodon 上出现高互动讨论，互动分 9，回复 2。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://fosstodon.org/@vulkan/116936119957069451)

## 正在升温

### 浏览器/终端工作流模板包
- 结论：DevTools、browser、CLI 和 task automation 的结合信号在变强。
- 来源：[Claude Code v2.1.214](https://github.com/anthropics/claude-code/releases)、[Claude Code #78721](https://github.com/anthropics/claude-code/issues/78721)、[Claude Code #78720](https://github.com/anthropics/claude-code/issues/78720)、[Claude Code #78719](https://github.com/anthropics/claude-code/issues/78719)、[Claude Code #3412](https://github.com/anthropics/claude-code/issues/3412)

### Agent 执行护栏与回滚审计层
- 结论：runtime、sandbox、hook、benchmark 可信度这些问题正在反复出现。
- 来源：[Claude Code v2.1.214](https://github.com/anthropics/claude-code/releases)、[Claude Code #78532](https://github.com/anthropics/claude-code/pull/78532)、[OpenAI Codex #33938](https://github.com/openai/codex/pull/33938)、[OpenAI Codex #33932](https://github.com/openai/codex/pull/33932)、[Gemini CLI #23296](https://github.com/google-gemini/gemini-cli/issues/23296)

### Agent 会话沉淀与团队记忆层
- 结论：memory、wiki、session archive、version snapshot 这条线正在慢慢成形。
- 来源：[Claude Code v2.1.214](https://github.com/anthropics/claude-code/releases)、[Claude Code #78721](https://github.com/anthropics/claude-code/issues/78721)、[Claude Code #78720](https://github.com/anthropics/claude-code/issues/78720)、[Claude Code #78719](https://github.com/anthropics/claude-code/issues/78719)、[Claude Code #3412](https://github.com/anthropics/claude-code/issues/3412)

### 团队级技能包与插件目录
- 结论：skills、plugins、MCP、hooks 和 workflow 模板正在形成独立分发层。
- 来源：[Claude Code v2.1.214](https://github.com/anthropics/claude-code/releases)、[Claude Code #78720](https://github.com/anthropics/claude-code/issues/78720)、[Claude Code #78719](https://github.com/anthropics/claude-code/issues/78719)、[Claude Code #3412](https://github.com/anthropics/claude-code/issues/3412)、[Claude Code #78715](https://github.com/anthropics/claude-code/pull/78715)

## 新模型 / 新产品

### thinkingmachines/Inkling
- 结论：thinkingmachines/Inkling 进入模型热榜，pipeline=image-text-to-text。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[thinkingmachines/Inkling](https://huggingface.co/thinkingmachines/Inkling)
- 建议：扫一眼

### prism-ml/Ternary-Bonsai-27B-gguf
- 结论：prism-ml/Ternary-Bonsai-27B-gguf 进入模型热榜，pipeline=text-generation。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[prism-ml/Ternary-Bonsai-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-27B-gguf)
- 建议：扫一眼

### prism-ml/Bonsai-27B-gguf
- 结论：prism-ml/Bonsai-27B-gguf 进入模型热榜，pipeline=text-generation。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[prism-ml/Bonsai-27B-gguf](https://huggingface.co/prism-ml/Bonsai-27B-gguf)
- 建议：扫一眼

## 论文里可能有用的东西

### RoboTTT: Context Scaling for Robot Policies
- 结论：这更偏训练、评测或可信度问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[RoboTTT: Context Scaling for Robot Policies](http://arxiv.org/abs/2607.15275v1)
- 建议：扫一眼

### MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators
- 结论：这更偏训练、评测或可信度问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators](http://arxiv.org/abs/2607.15273v1)
- 建议：扫一眼

### SciDiagramEdit: Learning to Edit Scientific Diagrams from Paper Revisions
- 结论：这更偏 agent 执行与工作流问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[SciDiagramEdit: Learning to Edit Scientific Diagrams from Paper Revisions](http://arxiv.org/abs/2607.15272v1)
- 建议：扫一眼

## 可以暂缓

### 今天没有 Product Hunt 样本
- 判断：今天先不要脑补新品发布面，Product Hunt 源当前未启用。 
- 来源：[今日原始快照](./raw-data.json)

### 纯热度样本先别当成产品结论
- 判断：不要先挑战开放式复杂任务，优先选已有明确 SOP 的人工流程。
- 来源：[Claude Code v2.1.214](https://github.com/anthropics/claude-code/releases)、[Claude Code #78721](https://github.com/anthropics/claude-code/issues/78721)、[Claude Code #78720](https://github.com/anthropics/claude-code/issues/78720)、[Claude Code #78719](https://github.com/anthropics/claude-code/issues/78719)、[Claude Code #3412](https://github.com/anthropics/claude-code/issues/3412)

## 原始入口

- [今日原始快照 raw-data.json](./raw-data.json) — 看当天完整样本和源数据状态。
- [A Scorecard For The Ai Age](https://openai.com/index/a-scorecard-for-the-ai-age/) — 今天官网源里最值得回看的新增页面。
- [OpenClaw](https://github.com/openclaw/openclaw) — 看今天 issue / PR / release 最密集的仓库。
- [OpenAI Codex](https://github.com/openai/codex) — 看今天 issue / PR / release 最密集的仓库。
- [Apple targets dozens of OpenAI employees with legal letters](https://www.ft.com/content/1b8c9d52-88a9-426b-ba47-f1811f859166) — 看国外开发者今天在争什么。
- [bluesky](https://bsky.app/profile/simonwillison.net/post/3mqs2y7gutk2a) — 看社交平台上的真实反馈和争议。

---

> 本页由每日保底脚本生成，用于保证站点每日都有可读更新；后续可以被更高质量的人工 / Codex 版本覆盖。生成时间: 2026-07-18 02:39 UTC