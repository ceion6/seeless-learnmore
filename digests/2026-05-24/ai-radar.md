# 少看点 AI 雷达 2026-05-24

> 今天的主线是：coding agent 生态继续扩张，但真正的竞争点已经从“会不会写”转到“上下文基础设施、插件目录和运行时稳定性”。
>
> 覆盖提醒：ArXiv 和 Product Hunt 今日抓取失败；DeepMind、Qwen、DeepSeek 官网这次是首次回填，先不按“今天刚发布”解读。

## 今天必看

### 代码知识图谱和插件目录正在变成 agent 基础设施
- 结论：`Understand-Anything`、`codegraph`、`claude-plugins-official`、`chrome-devtools-mcp` 同时升温，说明大家开始补的是 agent 的“外部能力层”和“上下文层”。
- 为什么重要：这意味着 coding agent 的下一轮差异化不只是模型，而是谁能更便宜地理解代码库、调用浏览器和复用插件。
- 来源：[Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[CodeGraph](https://github.com/colbymchenry/codegraph)、[Claude Plugins Official](https://github.com/anthropics/claude-plugins-official)、[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- 建议：看原文

### Agent 技能包正在从技巧帖变成分发形态
- 结论：`andrej-karpathy-skills`、`.NET skills`、`Anthropic Cybersecurity Skills` 这类仓库一起涨，说明“把好做法打包成技能”正在成为独立分发层。
- 为什么重要：以后很多团队未必先换模型，而是先换技能包、工作流模板和插件目录。
- 来源：[andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)、[dotnet/skills](https://github.com/dotnet/skills)、[Anthropic Cybersecurity Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)
- 建议：扫一眼

### 运行时稳定性仍然是 coding agent 的主战场
- 结论：今天看到的高频问题不是“不会写代码”，而是误报额度、上下文显示不准、截图抓错窗口、路由异常、沙盒权限失败。
- 为什么重要：这说明生产使用的真正瓶颈还在工程可靠性，而不是 demo 能力。
- 来源：[Claude Code false usage limit](https://github.com/anthropics/claude-code/issues/61703)、[Claude Code context window mismatch](https://github.com/anthropics/claude-code/issues/61734)、[Codex remote compact issue](https://github.com/openai/codex/issues/14860)、[Codex rate limit incident](https://status.openai.com/incidents/01KS88SRADTWQW27NYRAXMBAQN)、[Gemini CLI routing flaw](https://github.com/google-gemini/gemini-cli/issues/27411)、[OpenClaw sandbox bug](https://github.com/openclaw/openclaw/issues/43996)
- 建议：看原文

### 非美国系工具仍在高频迭代
- 结论：`OpenClaw 2026.5.22`、`Qwen Code v0.16.1`、`CodeWhale v0.8.41` 都在继续高频发版。
- 为什么重要：如果你要长期观察 agent 工具，不该只盯 Anthropic / OpenAI；中文和开源阵营的迭代速度同样快。
- 来源：[OpenClaw 2026.5.22](https://github.com/openclaw/openclaw/releases/tag/v2026.5.22)、[Qwen Code v0.16.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.16.1)、[CodeWhale v0.8.41](https://github.com/Hmbown/CodeWhale/releases/tag/v0.8.41)
- 建议：扫一眼

## 正在升温

### Token 成本和上下文成本开始被单独拿出来卖
- 结论：`OpenSquilla`、`TokenSpeed`、`codegraph` 都在直接卖“更省 token / 更快推理 / 更少工具调用”。
- 为什么重要：这说明大家已经默认模型能力够用了，接下来拼的是成本密度和工作流效率。
- 来源：[OpenSquilla](https://github.com/opensquilla/opensquilla)、[TokenSpeed](https://github.com/lightseekorg/tokenspeed)、[CodeGraph](https://github.com/colbymchenry/codegraph)

### 本地和私有部署继续抬头
- 结论：`AnythingLLM`、`Milvus`、`Qdrant`、`Weaviate` 这类项目仍然牢牢占住搜索面板。
- 为什么重要：企业和个人用户都越来越不愿意把全部上下文交给闭源在线工具，本地知识层还是刚需。
- 来源：[AnythingLLM](https://github.com/Mintplex-Labs/anything-llm)、[Milvus](https://github.com/milvus-io/milvus)、[Qdrant](https://github.com/qdrant/qdrant)、[Weaviate](https://github.com/weaviate/weaviate)

### “把会话变知识库”这条线开始显形
- 结论：HN 上已经出现把 Claude Code 会话转成 wiki、做 MIT Dashboard、做代码库扫描校验的项目。
- 为什么重要：agent 不是只生成代码，团队真正要的是把会话沉淀成可复用知识资产。
- 来源：[CC-Wiki](https://github.com/tejpalv/cc-wiki)、[Claude Code MIT Dashboard](https://github.com/BEKO2210/My_Dash)、[Anatomia](https://github.com/anatomia-dev/anatomia)

## 新模型 / 新产品

### Hugging Face 热度继续偏向多模态和开源部署
- 结论：今天值得盯的是 `Lance`、`MiniCPM-V-4.6`、`Sulphur-2-base`、`Hy-MT2` 这几类模型。
- 为什么重要：这说明社区注意力还在多模态、中文能力和可部署开源模型上，而不是只盯闭源 API。
- 来源：[Lance](https://huggingface.co/bytedance-research/Lance)、[MiniCPM-V-4.6](https://huggingface.co/openbmb/MiniCPM-V-4.6)、[Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)、[Hy-MT2-1.8B](https://huggingface.co/tencent/Hy-MT2-1.8B)
- 建议：扫一眼

### 官方叙事正在抢占“agentic coding”心智
- 结论：OpenAI 在官网上直接拿“Gartner 2026 Agentic Coding Leader”做品牌定位，Anthropic 继续推进 `Project Glasswing`。
- 为什么重要：这说明头部公司在拼的不只是模型能力，也在拼企业采购和行业话语权。
- 来源：[OpenAI business post](https://openai.com/business/learn/gartner-2026-agentic-coding-leader/)、[Anthropic Project Glasswing](https://www.anthropic.com/research/glasswing-initial-update)
- 建议：等复盘

## 论文里可能有用的东西

### 今天先不要对论文面下结论
- 结论：ArXiv 今日抓取失败，今天没有足够可靠的论文样本支撑判断。
- 为什么重要：如果样本不完整，还硬写“研究趋势”，基本等于噪音。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-24/raw-data.json)
- 建议：等下次抓取恢复

### 研究产品化值得看，但今天不是“新增快讯”
- 结论：DeepMind 的 `Gemini 3.1 Flash Image`、`AlphaEvolve`、`Co-Scientist` 这批页面这次更像首次回填，不适合硬当成今天的新研究。
- 为什么重要：这些方向值得跟，但现在更适合当背景面板，而不是当日热点。
- 来源：[Gemini 3.1 Flash Image](https://deepmind.google/models/model-cards/gemini-3-1-flash-image/)、[AlphaEvolve](https://deepmind.google/blog/alphaevolve-impact/)、[Co-Scientist](https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/)

## 可以暂缓

### 首次回填的官网旧页面
- 判断：DeepMind、Qwen、DeepSeek 这次抓到的大量页面是首次回填，不要因为数量多就当成今天全是新增。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-24/raw-data.json)

### 纯情绪化 AI 讨论
- 判断：HN 里关于 AI 写毕业演讲、AI 没有时钟、AI 是否毁掉初级岗位这类讨论值得知道情绪，但不值得逐条细读。
- 来源：[AI didn't kill your junior pipeline. You did](https://andrewmurphy.io/blog/ai-didnt-kill-your-junior-pipeline-you-did)、[Jeremy Scott gets cheer after ripping up AI-written commencement speech](https://www.businessinsider.com/jeremy-scott-fashion-graduation-speech-commencement-ai-student-backlash-2026-5)、[Claude doesn't know what time it is](https://blog.danielyj.com/blog/please-give-it-a-clock)

### 今天缺失的数据源先不要脑补
- 判断：Product Hunt 和 ArXiv 今天没有抓到，就先接受空白，不用拿别的源硬补成“完整日报”。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-24/raw-data.json)

## 原始入口

- [今日原始快照 raw-data.json](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-24/raw-data.json)
- [Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[CodeGraph](https://github.com/colbymchenry/codegraph)、[Claude Plugins Official](https://github.com/anthropics/claude-plugins-official)、[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [OpenClaw 2026.5.22](https://github.com/openclaw/openclaw/releases/tag/v2026.5.22)、[Qwen Code v0.16.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.16.1)、[CodeWhale v0.8.41](https://github.com/Hmbown/CodeWhale/releases/tag/v0.8.41)
- [OpenAI Gartner 2026 Agentic Coding Leader](https://openai.com/business/learn/gartner-2026-agentic-coding-leader/)、[Anthropic Project Glasswing](https://www.anthropic.com/research/glasswing-initial-update)
- [CC-Wiki](https://github.com/tejpalv/cc-wiki)、[Codex rate limit incident](https://status.openai.com/incidents/01KS88SRADTWQW27NYRAXMBAQN)、[Claude Code RCE discussion](https://vechron.com/2026/05/i-reproduced-a-claude-code-rce-the-bug-pattern-is-everywhere/)
- [Lance](https://huggingface.co/bytedance-research/Lance)、[MiniCPM-V-4.6](https://huggingface.co/openbmb/MiniCPM-V-4.6)、[Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)

---

> 本页由 Codex 直接基于当天 `raw-data.json` 整理生成，不依赖仓库内的外部模型 API 配置。
