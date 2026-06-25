# 少看点 AI 雷达 2026-06-25

> 今天的主线是：AI 竞争正在从“谁的模型更会回答”转向“谁能稳定、便宜、可追责地运行在真实流程里”：推理芯片、Gemini 模型矩阵、agent 生产前验证、AI 搜索可信度同时冒出来。

## 今天必看

### OpenAI / Broadcom 推理芯片是今天最大的基础设施信号
- 结论：HN 最高讨论是 OpenAI 与 Broadcom 的 LLM 推理芯片，TechCrunch 版本有 495 分、311 条评论，OpenAI 官方页面也进入讨论。
- 为什么重要：模型能力竞争正在压到推理成本、供应链和专用硬件。之后企业采用 AI 不只看 API 能力，还会看吞吐、延迟、成本上限和供应稳定性。
- 来源：[TechCrunch](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/)、[OpenAI 官方页](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)、[HN 讨论](https://news.ycombinator.com/item?id=48663324)
- 建议：把它当成“推理经济学”信号，不要只当芯片新闻。

### Google DeepMind 今天集中更新 Gemini 模型矩阵
- 结论：官网源新增 7 个 Gemini/Gemini Audio/Gemini Embedding 页面，包括 Gemini 3.1 Pro、3.5 Flash、Deep Think、Embedding 2 和音频理解/生成。
- 为什么重要：这是模型产品线分层的明确信号：重推理、低延迟、嵌入、音频输入输出被拆成不同能力面。用户未来买的是一组路由选择，而不是一个万能模型。
- 来源：[Gemini Pro](https://deepmind.google/models/gemini/pro/)、[Gemini Flash](https://deepmind.google/models/gemini/flash/)、[Deep Think](https://deepmind.google/models/gemini/deep-think/)、[Gemini Audio](https://deepmind.google/models/gemini-audio/audio-understanding/)
- 建议：关注各能力面的成本/延迟/上下文边界，不要只看模型名。

### 社交媒体今天在担心“AI 改写历史”
- 结论：Mastodon 最高互动帖来自 Jon S. von Tetzchner，讨论 LLM 如何给出不完整版本的历史事实；同一批社交信号里还有“AI 是否替代 Google Search”。
- 为什么重要：昨天是身份和出处，今天进一步变成“用户看到的事实是不是被模型重写”。这会影响 AI 搜索、知识库、企业文档和品牌声誉。
- 来源：[Mastodon](https://social.vivaldi.net/@jon/116807060269485256)、[AI search 讨论](https://kierendaystudiosofficial.wordpress.com/2026/06/24/will-ai-replace-google-search/)
- 建议：把 AI 搜索当成需要审计的分发渠道，而不是单纯流量入口。

### Agent 真进生产前，验证链正在变成刚需
- 结论：Dev.to 同时出现 AI-SRE 自动验证、agent red teaming、MCP 工具批准后安全、生产访问前 playground；GitHub issue 里也有用户项目被 `git reset --hard`、权限提示绕过 sandbox、token/quota 异常燃烧。
- 为什么重要：这不是“再加一点护栏”的抽象需求，而是上线前必须证明：能不能复现、能不能限权、能不能控成本、出错能不能追责。
- 来源：[AI-SRE auto verification](https://dev.to/metalbear/auto-verifying-your-ai-sres-fixes-part-ii-holmesgpt-end-to-end-on-a-real-cluster-594p)、[agent red teaming](https://dev.to/morganwilliscloud/red-team-your-ai-agents-before-someone-else-does-o4i)、[MCP security](https://dev.to/focused_dot_io/mcp-security-starts-after-tool-approval-focused-labs-48b3)、[Codex #29933](https://github.com/openai/codex/issues/29933)
- 建议：今天更该看“上线检查清单”，不是继续追 agent demo。

## 社交媒体在聊什么

### AI 作为事实入口的可信度
- 判断：最高互动讨论集中在“AI 会不会重写历史 / 给出不完整版本的真相”。
- 为什么值得看：这是用户层面的信任问题，不能只靠模型 benchmark 回答。
- 来源：[Mastodon](https://social.vivaldi.net/@jon/116807060269485256)

### AI skills 还在被大众化解释
- 判断：社交里仍有“AI skills 比传统技术技能更重要”的传播内容。
- 为什么值得看：这说明 skill 不是工程圈内部词了，但也意味着市场会混入大量泛化内容，需要筛选真实工作流价值。
- 来源：[KDS Foundation](https://kierendaystudiosofficial.wordpress.com/2026/06/24/why-are-ai-skills-becoming-more-important-than-traditional-technical-skills/)

### AI 搜索替代 Google 的叙事继续扩散
- 判断：这类讨论更像用户行为变化信号，不等于产品已经成熟。
- 为什么值得看：如果 AI 变成事实入口，企业需要监控模型如何描述自己、竞争对手和历史事件。
- 来源：[AI search 讨论](https://kierendaystudiosofficial.wordpress.com/2026/06/24/will-ai-replace-google-search/)

### 对企业 AI 裁员/资本叙事的反感仍在
- 判断：社交里出现 Oracle AI layoffs 相关负面情绪。
- 为什么值得看：面向普通用户或员工的 AI 产品，沟通方式会影响接受度。
- 来源：[Mastodon](https://mstdn.social/@aSweetGentleman/116807582011630361)

## 正在升温

### 推理成本和模型路由
- 结论：自研推理芯片、Gemini 多型号矩阵、Hugging Face 上 GLM/GGUF/小模型热度一起说明：成本、延迟和任务路由正在变成主战场。
- 来源：[OpenAI/Broadcom](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)、[Gemini Flash](https://deepmind.google/models/gemini/flash/)、[GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)、[unsloth/GLM-5.2-GGUF](https://huggingface.co/unsloth/GLM-5.2-GGUF)

### Agent 生产访问前验证
- 结论：自动验证、red team、MCP 批准后安全、playground、权限提示和成本异常是同一组问题。
- 来源：[AI-SRE auto verification](https://dev.to/metalbear/auto-verifying-your-ai-sres-fixes-part-ii-holmesgpt-end-to-end-on-a-real-cluster-594p)、[MCP Security Starts After Tool Approval](https://dev.to/focused_dot_io/mcp-security-starts-after-tool-approval-focused-labs-48b3)、[Claude Code #70711](https://github.com/anthropics/claude-code/issues/70711)、[OpenAI Codex #29933](https://github.com/openai/codex/issues/29933)

### 并行 agent 工作台和容器化运行环境
- 结论：GitHub 热门里出现 [apple/container](https://github.com/apple/container)、[stablyai/orca](https://github.com/stablyai/orca)、[OpenMontage](https://github.com/calesthio/OpenMontage)，说明 agent 需要更强的隔离、并行和本机执行环境。
- 来源：[apple/container](https://github.com/apple/container)、[stablyai/orca](https://github.com/stablyai/orca)

### AI 搜索与事实审计
- 结论：社交讨论在担心 AI 改写历史，HN 又有 Anthropic / Mythos / NSA / Alibaba 相关争议；事实入口的可信度正在变成产品问题。
- 来源：[Mastodon](https://social.vivaldi.net/@jon/116807060269485256)、[HN: NSA lost access to Mythos](https://news.ycombinator.com/item?id=48658300)

## 新模型 / 新产品

### Gemini 3.1 / 3.5 / Audio / Embedding
- 结论：DeepMind 官网新增一组 Gemini 模型页，而不是单个模型页。
- 为什么重要：它把能力拆成 Pro、Flash、Flash-Lite、Deep Think、Embedding、Audio understanding、Audio speech generation。
- 来源：[DeepMind Gemini](https://deepmind.google/models/gemini/pro/)

### Qwen AgentWorld
- 结论：[Qwen/Qwen-AgentWorld-35B-A3B](https://huggingface.co/Qwen/Qwen-AgentWorld-35B-A3B) 进入 Hugging Face 样本。
- 为什么重要：agentic 模型方向仍在继续，但要结合真实任务评测看，不能只看名字。

### Unlimited-OCR 和 LocateAnything 继续升温
- 结论：[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)、[nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B) 继续在热榜里。
- 为什么重要：OCR、定位、ASR 这类“小工具模型”会直接影响 agent 能不能读屏、读文档、处理多模态输入。

## 论文里可能有用的东西

### OpenThoughts-Agent
- 结论：论文题目指向 agentic models 的 data recipes。
- 为什么重要：如果 agent 模型要稳定进生产，数据配方会比单次 prompt 更关键。
- 来源：[arXiv](http://arxiv.org/abs/2606.24855v1)

### Grading the Grader
- 结论：主题是评估 agentic data analysis system。
- 为什么重要：今天社区在谈自动验证和上线前评测，这篇正好落在“评测者本身怎么评”的问题上。
- 来源：[arXiv](http://arxiv.org/abs/2606.24839v1)

### World Models in Pieces
- 结论：结构化认证 general agents。
- 为什么重要：和“能不能信任 agent 的世界模型/执行判断”相关，值得后续看全文。
- 来源：[arXiv](http://arxiv.org/abs/2606.24842v1)

## 可以暂缓

### 昨天已经写过的创作流水线
- 判断：OpenMontage 仍然很热，但今天新增判断不多，先不要重复把它写成主机会。
- 来源：[昨天雷达](./#2026-06-24/ai-radar)

### 纯 Anthropic 政治/争议线
- 判断：HN 有 Mythos、NSA、Alibaba 等多条争议，但它们更适合作为风险背景，不宜抢掉今天的基础设施和验证链主线。
- 来源：[HN](./raw-data.json)

### 今天没有 Product Hunt 样本
- 判断：Product Hunt 源未启用，不要硬写新品发布趋势。
- 来源：[今日原始快照](./raw-data.json)

## 原始入口

- [今日原始快照 raw-data.json](./raw-data.json) — 看当天完整样本和源数据状态。
- [AI 社交媒体信号](./#2026-06-25/ai-social) — 看用户情绪和早期反馈。
- [OpenAI / Broadcom inference chip](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/) — 今天最重要的基础设施信号。
- [Gemini Pro](https://deepmind.google/models/gemini/pro/) — Gemini 模型矩阵入口。
- [MCP Security Starts After Tool Approval](https://dev.to/focused_dot_io/mcp-security-starts-after-tool-approval-focused-labs-48b3) — agent 生产安全切口。
- [OpenThoughts-Agent](http://arxiv.org/abs/2606.24855v1) — agentic models 数据配方。
