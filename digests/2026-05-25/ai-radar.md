# 少看点 AI 雷达 2026-05-25

> 今天的主线是：coding agent 的注意力还在往“插件目录、技能包、知识图谱、托管平台”聚集，但社区同时在更大声地提醒一件事: agent 很脆弱，别把它误当成架构师。
>
> 覆盖提醒：今天官网源没有新增；ArXiv 和 Product Hunt 依然抓取失败，所以今天更像是生态信号面，而不是新品发布面。

## 今天必看

### 插件目录、知识图谱、技能包，已经从周边配件变成主战场
- 结论：`Understand-Anything`、`codegraph`、`claude-plugins-official`、`knowledge-work-plugins`、`andrej-karpathy-skills` 今天继续一起涨。
- 为什么重要：这说明 coding agent 的差异点正在从“模型本体”外移到“能接什么插件、怎么理解代码库、能复用什么技能”。
- 来源：[Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[CodeGraph](https://github.com/colbymchenry/codegraph)、[Claude Plugins Official](https://github.com/anthropics/claude-plugins-official)、[Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins)、[andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)
- 建议：看原文

### 社区在公开提醒：不要把 Claude / agent 当架构师
- 结论：HN 今天最强的讨论不是“哪个模型又变强”，而是“Claude is not your architect”和“LLM agent 在后端代码生成里很脆弱”。
- 为什么重要：这比单个 bug 更关键。大家开始把 agent 从“神奇搭档”重新拉回到“需要强约束的工具”。
- 来源：[Claude is not your architect. Stop letting it pretend](https://www.hollandtech.net/claude-is-not-your-architect/)、[Constraint Decay: The Fragility of LLM Agents in Back End Code Generation](https://arxiv.org/abs/2605.06445)
- 建议：看原文

### 托管 agent 平台开始成形
- 结论：`multica`、`pi` 这类项目继续抬头，方向都是“把 coding agent 变成可分配、可跟踪、可复用的团队成员”。
- 为什么重要：这说明下一步不是再做一个聊天入口，而是把 agent 塞进团队工作流。
- 来源：[multica](https://github.com/multica-ai/multica)、[pi](https://github.com/earendil-works/pi)
- 建议：扫一眼

### 运行时和权限问题仍然压着整条赛道
- 结论：今天看到的问题集中在会话挂死、技能 / agent 列表异常、插件目录能力、认证与 hook 权限边界。
- 为什么重要：这说明生产可用性的上限，仍然由工程细节决定，而不是由模型 demo 决定。
- 来源：[Codex close_agent can hang](https://github.com/openai/codex/issues/24389)、[Codex skills/app listing issue](https://github.com/openai/codex/issues/24361)、[Claude active_skill hook field request](https://github.com/anthropics/claude-code/issues/62108)、[OpenClaw hook ingress token bug](https://github.com/openclaw/openclaw/issues/84337)
- 建议：看原文

## 正在升温

### 更省 token、更省上下文，正在成为独立卖点
- 结论：`OpenSquilla`、`TokenSpeed`、`codegraph` 这类项目都在直接卖“更高智能密度”“更少工具调用”“更快推理”。
- 为什么重要：这说明模型能力逐渐商品化后，成本效率会变成新的竞争点。
- 来源：[OpenSquilla](https://github.com/opensquilla/opensquilla)、[TokenSpeed](https://github.com/lightseekorg/tokenspeed)、[CodeGraph](https://github.com/colbymchenry/codegraph)

### 本地和私有知识层还是硬需求
- 结论：搜索面板里仍然是 `AnythingLLM`、`Milvus`、`Qdrant`、`Weaviate` 这类项目稳居高位。
- 为什么重要：企业和个人用户都还在找“如何把上下文留在自己手里”的方案。
- 来源：[AnythingLLM](https://github.com/Mintplex-Labs/anything-llm)、[Milvus](https://github.com/milvus-io/milvus)、[Qdrant](https://github.com/qdrant/qdrant)、[Weaviate](https://github.com/weaviate/weaviate)

### 会话沉淀和自动化 teammate 化继续发酵
- 结论：Dev.to 今天讨论度更高的不是新模型，而是 skill file、Claude Code hooks、本地 Hermes agent 管线。
- 为什么重要：大家在试图把 agent 从“即时问答”变成“有流程、有记忆、有触发器的队友”。
- 来源：[Everyone's Talking About Gemini 3.5 Flash. The Real Story at Google I/O 2026 Was a Skill File.](https://dev.to/sreejit_/everyones-talking-about-gemini-35-flash-the-real-story-at-google-io-2026-was-a-skill-file-4f3c)、[Claude Code Hooks 101](https://dev.to/shrsv/claude-code-hooks-101-turning-your-ai-coding-assistant-into-an-automated-teammate-4lee)、[Automating My Content and Dev Pipeline with Local Hermes Agents & Qwen 35B](https://dev.to/pinaksh_patel_7c884a18b06/automating-my-content-and-dev-pipeline-with-local-hermes-agents-qwen-35b-bc0)

## 新模型 / 新产品

### Hugging Face 还是多模态和中文模型最有存在感
- 结论：今天值得盯的还是 `Lance`、`Hy-MT2`、`MiniCPM-V-4.6`、`Sulphur-2-base` 这一批。
- 为什么重要：真正有持续热度的，依然是可部署的多模态和中文能力，不只是闭源 API 的新口号。
- 来源：[Lance](https://huggingface.co/bytedance-research/Lance)、[Hy-MT2-1.8B](https://huggingface.co/tencent/Hy-MT2-1.8B)、[MiniCPM-V-4.6](https://huggingface.co/openbmb/MiniCPM-V-4.6)、[Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)
- 建议：扫一眼

### 开源 agent 工具仍在高频发版
- 结论：`OpenClaw 2026.5.24-beta.2`、`Qwen Code nightly`、`CodeWhale v0.8.44`、`Copilot CLI 1.0.54` 都在继续快速出版本。
- 为什么重要：这说明赛道还在抢交互形态和运行时控制权，版本节奏不会很快降下来。
- 来源：[OpenClaw 2026.5.24-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.5.24-beta.2)、[Qwen Code nightly](https://github.com/QwenLM/qwen-code/releases/tag/v0.16.1-nightly.20260525.84f408017)、[CodeWhale v0.8.44](https://github.com/Hmbown/CodeWhale/releases/tag/v0.8.44)、[Copilot CLI 1.0.54](https://github.com/github/copilot-cli/releases/tag/1.0.54)
- 建议：扫一眼

## 论文里可能有用的东西

### 今天论文面只保留一个判断
- 结论：虽然 ArXiv 抓取失败，但 HN 上真正被讨论起来的，是“LLM agent 在后端代码生成里会发生 constraint decay”。
- 为什么重要：这和今天社区对 agent 脆弱性的讨论是同一条主线，至少值得记住问题名字。
- 来源：[Constraint Decay: The Fragility of LLM Agents in Back End Code Generation](https://arxiv.org/abs/2605.06445)
- 建议：等后续正式补抓

### 不要把今天写成完整论文日报
- 结论：ArXiv 今天缺样本，不适合继续往下展开成“研究趋势全景”。
- 为什么重要：样本不完整时，最容易把噪音写成判断。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-25/raw-data.json)

## 可以暂缓

### 今天没有新增的官网源
- 判断：Anthropic、OpenAI、DeepMind、Qwen、DeepSeek 今天都没有新增页面，不需要硬凑“官方动态”。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-25/raw-data.json)

### 纯宏观 AI 资本和领导力叙事
- 判断：比如 AI 领导权、IPO、Karpathy 去向这类话题值得知道，但对你这个 daily radar 的可操作价值不高。
- 来源：[2028: Two scenarios for global AI leadership](https://www.anthropic.com/research/2028-ai-leadership)、[OpenAI co-founder Andrej Karpathy joins Anthropic](https://www.axios.com/2026/05/19/anthropic-openai-karpathy-andrej-claude)、[SpaceX, OpenAI and Anthropic IPOs set to test limits of AI boom](https://www.ft.com/content/ae9bb47d-bd1d-473c-b4c5-abae0420cc12)

### 今天缺失的数据源先不要补脑
- 判断：Product Hunt 和 ArXiv 继续没抓到，就先接受这件事，不要用别的源假装替代。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-25/raw-data.json)

## 原始入口

- [今日原始快照 raw-data.json](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-25/raw-data.json)
- [Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[CodeGraph](https://github.com/colbymchenry/codegraph)、[Claude Plugins Official](https://github.com/anthropics/claude-plugins-official)、[Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins)
- [Claude is not your architect](https://www.hollandtech.net/claude-is-not-your-architect/)、[Constraint Decay](https://arxiv.org/abs/2605.06445)
- [multica](https://github.com/multica-ai/multica)、[pi](https://github.com/earendil-works/pi)、[OpenSquilla](https://github.com/opensquilla/opensquilla)
- [Lance](https://huggingface.co/bytedance-research/Lance)、[Hy-MT2-1.8B](https://huggingface.co/tencent/Hy-MT2-1.8B)、[MiniCPM-V-4.6](https://huggingface.co/openbmb/MiniCPM-V-4.6)、[Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)
- [OpenClaw 2026.5.24-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.5.24-beta.2)、[Qwen Code nightly](https://github.com/QwenLM/qwen-code/releases/tag/v0.16.1-nightly.20260525.84f408017)、[CodeWhale v0.8.44](https://github.com/Hmbown/CodeWhale/releases/tag/v0.8.44)、[Copilot CLI 1.0.54](https://github.com/github/copilot-cli/releases/tag/1.0.54)

---

> 本页由 Codex 直接基于当天 `raw-data.json` 整理生成，不依赖仓库内的外部模型 API 配置。
