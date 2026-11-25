# 少看点 AI 雷达 2026-11-25

> 今天社交讨论的焦点是：To accompany the video from my recent talk at @aiDotEn。
>
> 覆盖提醒：官网源：今日新增 12 条官网内容。；Product Hunt：该源今天未启用，所以没有 Product Hunt 数据；这不是抓取失败。；ArXiv：已抓取到 50 篇论文。

## 今天必看

### OpenClaw 生态今天更新密度最高
- 结论：OpenClaw 在 24 小时内累计出现 633 个 issue / PR / release 样本。
- 为什么重要：仓库更新密度高，通常代表工具链正在快速试错，值得先看真实问题和新增能力。 
- 来源：[OpenClaw](https://github.com/openclaw/openclaw)
- 建议：看原文

### GitHub 热门样本里出现 elementalsouls/Claude-BugHunter
- 结论：elementalsouls/Claude-BugHunter 进入当天高热样本，说明相关方向正在被开发者集中试用。
- 为什么重要：开源热度不是质量证明，但很适合拿来判断今天大家到底把注意力投向哪里。 
- 来源：[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)
- 建议：扫一眼

### 官网源今天新增了 Gpt 6 Models Demonstrate Intrinsic Protein Design Capabilities
- 结论：openai 官网今天抓到新页面 Gpt 6 Models Demonstrate Intrinsic Protein Design Capabilities。
- 为什么重要：官网源的新增通常比社区转述更接近一手表述，适合用来确认公司到底在推什么。 
- 来源：[Gpt 6 Models Demonstrate Intrinsic Protein Design Capabilities](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities/)
- 建议：看原文

### HN 今天在讨论 Matrix Multiplication is Θ(n^2.25) [pdf]
- 结论：Matrix Multiplication is Θ(n^2.25) [pdf] 进入今天的高讨论样本，社区更关注真实采用边界而不是单条宣传。
- 为什么重要：HN 的高分讨论适合拿来观察开发者到底在担心什么、争什么。 
- 来源：[Matrix Multiplication is Θ(n^2.25) [pdf]](https://github.com/openai/math/blob/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026/paper.pdf)
- 建议：看原文

### Hugging Face 热榜里有 thinkingmachines/Inkling-2-Mini
- 结论：thinkingmachines/Inkling-2-Mini 进入今日模型热榜，说明社区对这条模型路线仍有明确兴趣。
- 为什么重要：模型热榜更适合判断可部署能力和开发者实验面，而不是只看头部闭源叙事。 
- 来源：[thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)
- 建议：扫一眼

## 社交媒体在聊什么

### To accompany the video from my recent talk at @aiDotEngineer, here's a…
- 判断：Bluesky 上出现高互动讨论，互动分 71，回复 5。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Bluesky](https://bsky.app/profile/simonwillison.net/post/3n33rvdsius2a)

### シタン先生にMastercardについて聞いたら、静かに微笑むばかりで教えてくれませんでした Mastercard、Apple Pay利用で…
- 判断：Mastodon 上出现高互动讨论，互动分 8，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://mastodon.crazynewworld.net/@hans/117675767770383040)

### ランスはMark Gurmanをどう思うかな…… Walmart App Drops Apple Pay Support After Jus…
- 判断：Mastodon 上出现高互动讨论，互动分 8，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://mastodon.crazynewworld.net/@hans/117675767286734244)

### Oh my Bob. I thought I had red string boards. This...this is a red str…
- 判断：Mastodon 上出现高互动讨论，互动分 7，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://mefi.social/@MissConstrue/117675621401407199)

## 正在升温

### Agent 执行护栏与回滚审计层
- 结论：runtime、sandbox、hook、benchmark 可信度这些问题正在反复出现。
- 来源：[Claude Code v2.1.332](https://github.com/anthropics/claude-code/releases)、[Claude Code #60082](https://github.com/anthropics/claude-code/issues/60082)、[OpenAI Codex #63849](https://github.com/openai/codex/issues/63849)、[OpenAI Codex #63845](https://github.com/openai/codex/pull/63845)、[OpenAI Codex #63843](https://github.com/openai/codex/pull/63843)

### Agent 会话沉淀与团队记忆层
- 结论：memory、wiki、session archive、version snapshot 这条线正在慢慢成形。
- 来源：[Claude Code v2.1.332](https://github.com/anthropics/claude-code/releases)、[Claude Code #26302](https://github.com/anthropics/claude-code/issues/26302)、[Claude Code #60082](https://github.com/anthropics/claude-code/issues/60082)、[OpenAI Codex #63849](https://github.com/openai/codex/issues/63849)、[OpenAI Codex #63848](https://github.com/openai/codex/issues/63848)

### 浏览器/终端工作流模板包
- 结论：DevTools、browser、CLI 和 task automation 的结合信号在变强。
- 来源：[Claude Code v2.1.332](https://github.com/anthropics/claude-code/releases)、[Claude Code #26302](https://github.com/anthropics/claude-code/issues/26302)、[OpenAI Codex #63849](https://github.com/openai/codex/issues/63849)、[OpenAI Codex #63828](https://github.com/openai/codex/issues/63828)、[OpenAI Codex #63845](https://github.com/openai/codex/pull/63845)

### 团队级技能包与插件目录
- 结论：skills、plugins、MCP、hooks 和 workflow 模板正在形成独立分发层。
- 来源：[Claude Code v2.1.332](https://github.com/anthropics/claude-code/releases)、[Claude Code #26302](https://github.com/anthropics/claude-code/issues/26302)、[OpenAI Codex #63828](https://github.com/openai/codex/issues/63828)、[Gemini CLI #23166](https://github.com/google-gemini/gemini-cli/issues/23166)、[Gemini CLI #30268](https://github.com/google-gemini/gemini-cli/pull/30268)

## 新模型 / 新产品

### thinkingmachines/Inkling-2-Mini
- 结论：thinkingmachines/Inkling-2-Mini 进入模型热榜，pipeline=image-text-to-text。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)
- 建议：扫一眼

### unsloth/Inkling-2-Mini-GGUF
- 结论：unsloth/Inkling-2-Mini-GGUF 进入模型热榜，pipeline=image-text-to-text。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[unsloth/Inkling-2-Mini-GGUF](https://huggingface.co/unsloth/Inkling-2-Mini-GGUF)
- 建议：扫一眼

### inworld/voice-isolator
- 结论：inworld/voice-isolator 进入模型热榜，pipeline=audio-to-audio。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[inworld/voice-isolator](https://huggingface.co/inworld/voice-isolator)
- 建议：扫一眼

## 论文里可能有用的东西

### OmniAct: One Policy, One Million Embodiments
- 结论：这更偏训练、评测或可信度问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[OmniAct: One Policy, One Million Embodiments](http://arxiv.org/abs/2611.33158v1)
- 建议：扫一眼

### DiaCap: Jointly Learning Who Speaks When for Audiovisual Dialogue Captioning
- 结论：这更偏训练、评测或可信度问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[DiaCap: Jointly Learning Who Speaks When for Audiovisual Dialogue Captioning](http://arxiv.org/abs/2611.33153v1)
- 建议：扫一眼

### BioLoom: Scaling Biomedical Vision-Language Models by Learning from the Structure of Scientific Articles
- 结论：这更偏训练、评测或可信度问题。
- 为什么重要：先记住题目和方向，再决定要不要追完整原文。 
- 来源：[BioLoom: Scaling Biomedical Vision-Language Models by Learning from the Structure of Scientific Articles](http://arxiv.org/abs/2611.33151v1)
- 建议：扫一眼

## 可以暂缓

### 今天没有 Product Hunt 样本
- 判断：今天先不要脑补新品发布面，Product Hunt 源当前未启用。 
- 来源：[今日原始快照](./raw-data.json)

### 纯热度样本先别当成产品结论
- 判断：不要一上来做完整平台，先验证团队最怕的是权限、泄露、卡死还是难追责。
- 来源：[Claude Code v2.1.332](https://github.com/anthropics/claude-code/releases)、[Claude Code #60082](https://github.com/anthropics/claude-code/issues/60082)、[OpenAI Codex #63849](https://github.com/openai/codex/issues/63849)、[OpenAI Codex #63845](https://github.com/openai/codex/pull/63845)、[OpenAI Codex #63843](https://github.com/openai/codex/pull/63843)

## 原始入口

- [今日原始快照 raw-data.json](./raw-data.json) — 看当天完整样本和源数据状态。
- [Gpt 6 Models Demonstrate Intrinsic Protein Design Capabilities](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities/) — 今天官网源里最值得回看的新增页面。
- [Alignment](https://www.anthropic.com/research/team/alignment) — 今天官网源里最值得回看的新增页面。
- [OpenClaw](https://github.com/openclaw/openclaw) — 看今天 issue / PR / release 最密集的仓库。
- [OpenAI Codex](https://github.com/openai/codex) — 看今天 issue / PR / release 最密集的仓库。
- [Matrix Multiplication is Θ(n^2.25) [pdf]](https://github.com/openai/math/blob/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026/paper.pdf) — 看国外开发者今天在争什么。

---

> 本页由每日保底脚本生成，用于保证站点每日都有可读更新；后续可以被更高质量的人工 / Codex 版本覆盖。生成时间: 2026-11-25 07:31 UTC