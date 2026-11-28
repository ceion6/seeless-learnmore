# 少看点 AI 雷达 2026-11-28

> 今天社交讨论的焦点是：This is also why LLMs give shit descriptions when tryi。
>
> 覆盖提醒：官网源：今日新增 1 条官网内容。；Product Hunt：该源今天未启用，所以没有 Product Hunt 数据；这不是抓取失败。；ArXiv：抓取请求成功，但按最近 48 小时窗口过滤后没有命中样本；这不是抓取失败。

## 今天必看

### OpenClaw 生态今天更新密度最高
- 结论：OpenClaw 在 24 小时内累计出现 591 个 issue / PR / release 样本。
- 为什么重要：仓库更新密度高，通常代表工具链正在快速试错，值得先看真实问题和新增能力。 
- 来源：[OpenClaw](https://github.com/openclaw/openclaw)
- 建议：看原文

### GitHub 热门样本里出现 elementalsouls/Claude-BugHunter
- 结论：elementalsouls/Claude-BugHunter 进入当天高热样本，说明相关方向正在被开发者集中试用。
- 为什么重要：开源热度不是质量证明，但很适合拿来判断今天大家到底把注意力投向哪里。 
- 来源：[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)
- 建议：扫一眼

### 官网源今天新增了 Gemini 4 Hydrogen - Model Card — Google DeepMind
- 结论：deepmind 官网今天抓到新页面 Gemini 4 Hydrogen - Model Card — Google DeepMind。
- 为什么重要：官网源的新增通常比社区转述更接近一手表述，适合用来确认公司到底在推什么。 
- 来源：[Gemini 4 Hydrogen - Model Card — Google DeepMind](https://deepmind.google/models/model-cards/gemini-4-hydrogen/)
- 建议：看原文

### HN 今天在讨论 Woman evicted after landlord's AI assistant told her she could delay rent
- 结论：Woman evicted after landlord's AI assistant told her she could delay rent 进入今天的高讨论样本，社区更关注真实采用边界而不是单条宣传。
- 为什么重要：HN 的高分讨论适合拿来观察开发者到底在担心什么、争什么。 
- 来源：[Woman evicted after landlord's AI assistant told her she could delay rent](https://drmahfouz.substack.com/p/woman-evicted-after-landlords-ai)
- 建议：看原文

### Hugging Face 热榜里有 thinkingmachines/Inkling-2-Mini
- 结论：thinkingmachines/Inkling-2-Mini 进入今日模型热榜，说明社区对这条模型路线仍有明确兴趣。
- 为什么重要：模型热榜更适合判断可部署能力和开发者实验面，而不是只看头部闭源叙事。 
- 来源：[thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)
- 建议：扫一眼

## 社交媒体在聊什么

### This is also why LLMs give shit descriptions when trying to describe i…
- 判断：Mastodon 上出现高互动讨论，互动分 58，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://caneandable.social/@WeirdWriter/117692408501906491)

### They’re not just destroying the planet, many billionaires have proven …
- 判断：Mastodon 上出现高互动讨论，互动分 14，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://newsie.social/@ProgressivePower/117692423137829925)

### 艦長がもし亜人ではなかったら、ITmediaについてどう思ったでしょうか [ITmedia Mobile] 11型「iPad Air（M4）…
- 判断：Mastodon 上出现高互动讨论，互动分 8，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://mastodon.crazynewworld.net/@hans/117692282329527337)

### じゃんぱら、冗談でしょう？ iPhone 18 Proの未使用品が199,800円など！じゃんぱらのブラックフライデーセール https:/…
- 判断：Mastodon 上出现高互动讨论，互动分 8，回复 0。
- 为什么值得看：社交平台更早暴露用户情绪、真实试用反馈和争议点，但不能单独当作事实结论。
- 来源：[Mastodon](https://mastodon.crazynewworld.net/@hans/117691576341800092)

## 正在升温

### Agent 会话沉淀与团队记忆层
- 结论：memory、wiki、session archive、version snapshot 这条线正在慢慢成形。
- 来源：[Claude Code #74662](https://github.com/anthropics/claude-code/issues/74662)、[Claude Code #69044](https://github.com/anthropics/claude-code/issues/69044)、[Claude Code #112811](https://github.com/anthropics/claude-code/issues/112811)、[Claude Code #104723](https://github.com/anthropics/claude-code/issues/104723)、[OpenAI Codex #63577](https://github.com/openai/codex/issues/63577)

### Agent 执行护栏与回滚审计层
- 结论：runtime、sandbox、hook、benchmark 可信度这些问题正在反复出现。
- 来源：[Claude Code #69044](https://github.com/anthropics/claude-code/issues/69044)、[OpenAI Codex #17333](https://github.com/openai/codex/issues/17333)、[OpenAI Codex #63094](https://github.com/openai/codex/issues/63094)、[OpenAI Codex #64425](https://github.com/openai/codex/pull/64425)、[OpenAI Codex #64422](https://github.com/openai/codex/pull/64422)

### 浏览器/终端工作流模板包
- 结论：DevTools、browser、CLI 和 task automation 的结合信号在变强。
- 来源：[Claude Code #74662](https://github.com/anthropics/claude-code/issues/74662)、[Claude Code #112811](https://github.com/anthropics/claude-code/issues/112811)、[OpenAI Codex #63577](https://github.com/openai/codex/issues/63577)、[Gemini CLI](https://github.com/google-gemini/gemini-cli)、[Gemini CLI #30505](https://github.com/google-gemini/gemini-cli/issues/30505)

### 团队级技能包与插件目录
- 结论：skills、plugins、MCP、hooks 和 workflow 模板正在形成独立分发层。
- 来源：[Claude Code #69044](https://github.com/anthropics/claude-code/issues/69044)、[Claude Code #53529](https://github.com/anthropics/claude-code/pull/53529)、[OpenAI Codex #17333](https://github.com/openai/codex/issues/17333)、[OpenAI Codex #64425](https://github.com/openai/codex/pull/64425)、[Gemini CLI #30505](https://github.com/google-gemini/gemini-cli/issues/30505)

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

### SulphurAI/Sulphur-3
- 结论：SulphurAI/Sulphur-3 进入模型热榜，pipeline=未标注。
- 为什么重要：模型热榜可以帮助判断今天社区愿意先试哪些可部署能力。 
- 来源：[SulphurAI/Sulphur-3](https://huggingface.co/SulphurAI/Sulphur-3)
- 建议：扫一眼

## 论文里可能有用的东西

### 今天先不要硬写论文判断
- 结论：ArXiv 最近 48 小时窗口内没有命中样本。
- 为什么重要：论文样本不完整时，最容易把噪音写成趋势。 
- 来源：[今日原始快照](./raw-data.json)
- 建议：等复盘

## 可以暂缓

### 今天没有 Product Hunt 样本
- 判断：今天先不要脑补新品发布面，Product Hunt 源当前未启用。 
- 来源：[今日原始快照](./raw-data.json)

### 今天先别硬下研究趋势判断
- 判断：ArXiv 最近 48 小时窗口内没有命中样本，更适合保守处理。 
- 来源：[今日原始快照](./raw-data.json)

### 纯热度样本先别当成产品结论
- 判断：如果用户从不回看 agent 会话，就不要把它误判成知识平台需求。
- 来源：[Claude Code #74662](https://github.com/anthropics/claude-code/issues/74662)、[Claude Code #69044](https://github.com/anthropics/claude-code/issues/69044)、[Claude Code #112811](https://github.com/anthropics/claude-code/issues/112811)、[Claude Code #104723](https://github.com/anthropics/claude-code/issues/104723)、[OpenAI Codex #63577](https://github.com/openai/codex/issues/63577)

## 原始入口

- [今日原始快照 raw-data.json](./raw-data.json) — 看当天完整样本和源数据状态。
- [Gemini 4 Hydrogen - Model Card — Google DeepMind](https://deepmind.google/models/model-cards/gemini-4-hydrogen/) — 今天官网源里最值得回看的新增页面。
- [OpenClaw](https://github.com/openclaw/openclaw) — 看今天 issue / PR / release 最密集的仓库。
- [OpenAI Codex](https://github.com/openai/codex) — 看今天 issue / PR / release 最密集的仓库。
- [Woman evicted after landlord's AI assistant told her she could delay rent](https://drmahfouz.substack.com/p/woman-evicted-after-landlords-ai) — 看国外开发者今天在争什么。
- [Mastodon](https://caneandable.social/@WeirdWriter/117692408501906491) — 看社交平台上的真实反馈和争议。

---

> 本页由每日保底脚本生成，用于保证站点每日都有可读更新；后续可以被更高质量的人工 / Codex 版本覆盖。生成时间: 2026-11-28 06:49 UTC