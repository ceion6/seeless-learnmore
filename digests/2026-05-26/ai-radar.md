# 少看点 AI 雷达 2026-05-26

> 今天的主线是：coding agent 的竞争继续往“插件、技能、知识图谱、托管平台”外移，但社区开始更集中地暴露一个现实：真正卡住落地的，还是计费、权限、挂死、上下文和交互边界。
>
> 覆盖提醒：今天官网面只有 Anthropic 新增 1 条；ArXiv 和 Product Hunt 依然抓取失败，所以这页以生态信号和工程风险为主。

## 今天必看

### 插件目录、技能包、知识图谱已经不是配角
- 结论：`Understand-Anything`、`codegraph`、`knowledge-work-plugins`、`Anthropic-Cybersecurity-Skills`、`andrej-karpathy-skills` 今天继续一起冲高。
- 为什么重要：这说明 coding agent 的下一轮差异化越来越不在模型本体，而在“怎么接外部能力、怎么压缩上下文、怎么复用技能”。
- 来源：[Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[CodeGraph](https://github.com/colbymchenry/codegraph)、[Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins)、[Anthropic Cybersecurity Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)、[andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)
- 建议：看原文

### 社区真正焦虑的不是“AI 会不会写”，而是“AI 会不会把你带沟里”
- 结论：今天 HN 和 issue 面最有价值的信号，都是 agent 的脆弱性和边界问题：错误计费、挂死、权限混淆、事件卡住、心跳阻塞。
- 为什么重要：这比“模型强了一点”更影响生产使用。只要这些问题没收敛，agent 很难稳进主流程。
- 来源：[Using AI to write better code more slowly](https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/)、[Claude billed API instead of Max](https://github.com/anthropics/claude-code/issues/62338)、[Codex safety boundary issue](https://github.com/openai/codex/issues/24501)、[OpenClaw heartbeat stuck bug](https://github.com/openclaw/openclaw/issues/83184)
- 建议：看原文

### Agent 平台化继续推进
- 结论：`multica`、`cmux`、`pi`、`AZMX` 这类项目都在补“终端、托管、通知、平台治理”这一层。
- 为什么重要：这说明大家默认单个 agent CLI 已经不够，真正需要的是一套可协作、可管理、可观察的运行面。
- 来源：[multica](https://github.com/multica-ai/multica)、[cmux](https://github.com/manaflow-ai/cmux)、[pi](https://github.com/earendil-works/pi)、[AZMX](https://github.com/AzmxAI/azmx)
- 建议：扫一眼

### Anthropic 今天唯一的新官网信号，不是发模型，是继续占领“AI 伦理话语”
- 结论：Anthropic 新增的是 Chris Olah 对教皇通谕的评论，不是产品页。
- 为什么重要：这说明至少在官方叙事上，Anthropic 还在持续把自己放进“技术 + 价值观”双线位置里。
- 来源：[Anthropic co-founder Chris Olah's remarks on Pope Leo XIV's encyclical](https://www.anthropic.com/news/chris-olah-pope-leo-encyclical)
- 建议：等复盘

## 正在升温

### 高智能密度、低 token 成本，已经是单独赛道
- 结论：`OpenSquilla`、`TokenSpeed`、`codegraph` 继续同时上榜，卖点都围绕“更高效率、更少上下文浪费”。
- 为什么重要：模型能力越来越接近后，效率和成本会比“多一个 benchmark 分数”更决定谁能跑进真实工作流。
- 来源：[OpenSquilla](https://github.com/opensquilla/opensquilla)、[TokenSpeed](https://github.com/lightseekorg/tokenspeed)、[CodeGraph](https://github.com/colbymchenry/codegraph)

### 终端和桌面壳层还在快速演化
- 结论：`cmux`、`hermes-agent-cn-desktop`、`Copilot CLI`、`CodeWhale` 都在继续调整交互壳层。
- 为什么重要：agent 最终是否可用，不只是模型能不能答对，还取决于终端、桌面、日志、任务面板能不能承受真实开发流。
- 来源：[cmux](https://github.com/manaflow-ai/cmux)、[Hermes Agent CN Desktop](https://github.com/Eynzof/hermes-agent-cn-desktop)、[Copilot CLI 1.0.55-0](https://github.com/github/copilot-cli/releases/tag/1.0.55-0), [CodeWhale issues](https://github.com/Hmbown/CodeWhale/issues)

### 企业知识层和 RAG 管理层还是稳需求
- 结论：`Arkon`、`AnythingLLM`、`Milvus`、`Qdrant` 这一类基础设施没有退潮。
- 为什么重要：不管 agent 壳层怎么变，知识接入、权限控制和检索效率仍然是最稳定的需求面。
- 来源：[Arkon](https://github.com/nduckmink/arkon)、[AnythingLLM](https://github.com/Mintplex-Labs/anything-llm)、[Milvus](https://github.com/milvus-io/milvus)、[Qdrant](https://github.com/qdrant/qdrant)

## 新模型 / 新产品

### Hugging Face 还是多模态和中文模型最有存在感
- 结论：今天仍然值得盯 `Hy-MT2`、`Lance`、`MiniCPM-V-4.6`、`LongCat-Video-Avatar-1.5`、`Sulphur-2-base`。
- 为什么重要：用户注意力还在可部署多模态、中文能力和视频能力上，而不是只追闭源 API。
- 来源：[Hy-MT2-1.8B](https://huggingface.co/tencent/Hy-MT2-1.8B)、[Lance](https://huggingface.co/bytedance-research/Lance)、[MiniCPM-V-4.6](https://huggingface.co/openbmb/MiniCPM-V-4.6)、[LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5)、[Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)
- 建议：扫一眼

### 开源 agent 工具依然维持日更节奏
- 结论：`Qwen Code nightly`、`Copilot CLI 1.0.55-0`、`CoPaw v1.1.9-beta.1` 还在高频出版本。
- 为什么重要：这说明交互模式和运行时治理都还没定型，工具层的形态还在快速摇摆。
- 来源：[Qwen Code nightly](https://github.com/QwenLM/qwen-code/releases/tag/v0.16.1-nightly.20260526.e8b79d772)、[Copilot CLI 1.0.55-0](https://github.com/github/copilot-cli/releases/tag/1.0.55-0)、[CoPaw v1.1.9-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.9-beta.1)
- 建议：扫一眼

## 论文里可能有用的东西

### 今天只有一个研究问题值得记名
- 结论：虽然 ArXiv 主抓取失败，但“constraint decay / 用 AI 写更慢但更好代码”这条讨论继续说明，agent 不是越自动越安全。
- 为什么重要：这和今天 issue 面暴露出来的边界问题其实是同一件事: 长链路任务里，约束和验证会不断衰减。
- 来源：[Using AI to write better code more slowly](https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/)、[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-26/raw-data.json)
- 建议：等正式补抓论文

### 不要把今天硬写成完整论文日报
- 结论：ArXiv 今天缺样本，继续保守处理。
- 为什么重要：数据面不完整时，宁可少说，不要把猜测写成趋势。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-26/raw-data.json)

## 可以暂缓

### 没有新增的官网源
- 判断：OpenAI、DeepMind、Qwen、DeepSeek 今天都没有新增，不需要硬凑“官方动态”。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-26/raw-data.json)

### 只会堆 stars、但没讲清真实工程价值的技能仓库
- 判断：今天很多热仓库都挂着 skill / plugin / memory 标签，先把它们当发现信号，不要直接当成熟生产方案。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-26/raw-data.json)

### 今天缺失的数据源先不要脑补
- 判断：Product Hunt 和 ArXiv 依旧没有抓到，就不要补脑成“完整趋势全景”。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-26/raw-data.json)

## 原始入口

- [今日原始快照 raw-data.json](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-26/raw-data.json)
- [Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[CodeGraph](https://github.com/colbymchenry/codegraph)、[Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins)、[Anthropic Cybersecurity Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)
- [Using AI to write better code more slowly](https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/)、[Claude billed API instead of Max](https://github.com/anthropics/claude-code/issues/62338)、[Codex safety boundary issue](https://github.com/openai/codex/issues/24501)
- [Anthropic Chris Olah remarks](https://www.anthropic.com/news/chris-olah-pope-leo-encyclical)、[multica](https://github.com/multica-ai/multica)、[cmux](https://github.com/manaflow-ai/cmux)、[OpenSquilla](https://github.com/opensquilla/opensquilla)
- [Hy-MT2-1.8B](https://huggingface.co/tencent/Hy-MT2-1.8B)、[Lance](https://huggingface.co/bytedance-research/Lance)、[MiniCPM-V-4.6](https://huggingface.co/openbmb/MiniCPM-V-4.6)、[LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5)
- [Qwen Code nightly](https://github.com/QwenLM/qwen-code/releases/tag/v0.16.1-nightly.20260526.e8b79d772)、[Copilot CLI 1.0.55-0](https://github.com/github/copilot-cli/releases/tag/1.0.55-0)、[CoPaw v1.1.9-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.9-beta.1)

---

> 本页由 Codex 直接基于当天 `raw-data.json` 整理生成，不依赖仓库内的外部模型 API 配置。
