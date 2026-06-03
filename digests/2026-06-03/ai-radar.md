# 少看点 AI 雷达 2026-06-03

> 今天的主线是：agent 赛道开始更明确地分成三层竞争。上层是“给不同角色的工作流”，中层是“安全与约束”，底层是“上下文、token 和成本工程”。
>
> 覆盖提醒：Product Hunt 今天抓取失败；论文面有样本，但这页仍然优先写产品、基础设施和工程约束。

## 今天必看

### Anthropic 把 Glasswing 从试点推向更大规模
- 结论：今天最值得看的官方信号，是 Anthropic 的 `Expanding Project Glasswing`。
- 为什么重要：这不是泛泛的安全口号，而是把 Claude Mythos Preview 继续往关键基础设施、供应链和大规模代码库安全扫描推进。说明“高能力 agent”正在从 demo 走向更强监管、更强筛选的高风险场景。
- 来源：[Expanding Project Glasswing](https://www.anthropic.com/news/expanding-project-glasswing)
- 建议：看原文

### OpenAI 开始更明确地按“角色”卖 Codex
- 结论：OpenAI 今天新增的核心页是 `Codex For Every Role Tool Workflow`。
- 为什么重要：这说明它不满足于把 Codex 当通用编程助手，而是在往“不同岗位、不同插件、不同站点流程”拆分。这会直接影响后面插件市场、工作流模板和组织内分发方式。
- 来源：[Codex For Every Role Tool Workflow](https://openai.com/index/codex-for-every-role-tool-workflow/)
- 建议：看原文

### 成本和配额重新回到 agent 生产问题中心
- 结论：今天最有现实感的社区信号，不是“模型更强了”，而是 `Your AI Agent Isn't Failing Because It Hallucinates — It's Failing Because of Rate Limits`、`Uber Caps Usage of AI Tools Like Claude Code to Cut Costs`、以及 `headroom` 这种压缩上下文的项目一起冒出来。
- 为什么重要：这说明真实生产里最先把 agent 打回原形的，往往不是推理质量，而是 rate limit、token 账单和上下文膨胀。
- 来源：[Your AI Agent Isn't Failing Because It Hallucinates — It's Failing Because of Rate Limits](https://dev.to/p0rt/your-ai-agent-isnt-failing-because-it-hallucinates-its-failing-because-of-rate-limits-2d60)、[Uber Caps Usage of AI Tools Like Claude Code to Cut Costs](https://www.bloomberg.com/news/articles/2026-06-02/uber-caps-usage-of-ai-tools-like-claude-code-to-cut-costs)、[headroom](https://github.com/chopratejas/headroom)
- 建议：看原文

## 正在升温

### “上下文工程”已经单独变成一条产品线
- 结论：`headroom`、`ktx`、`supermemory`、`vibecode-pro-max-kit` 这几类项目继续同时上涨。
- 为什么重要：这说明大家已经默认上下文是稀缺资源，真正的差异化不只是会不会调模型，而是能不能压缩、记忆、检索、结构化上下文。
- 来源：[headroom](https://github.com/chopratejas/headroom)、[ktx](https://github.com/Kaelio/ktx)、[supermemory](https://github.com/supermemoryai/supermemory)、[vibecode-pro-max-kit](https://github.com/withkynam/vibecode-pro-max-kit)

### “角色化 agent” 和 “垂直 operator” 在继续升温
- 结论：除了 OpenAI 自己的角色化叙事，今天 HN 上也出现了 `AI for concrete contractors`、`Form an LLC or C-Corp from Claude/Cursor via MCP` 这类垂直 operator 方向。
- 为什么重要：agent 的下一轮落地，更像按行业和角色切工作流，而不是再做一个所有人都能聊的总入口。
- 来源：[Launch HN: Rudus (YC P26) – AI for concrete contractors](https://news.ycombinator.com/item?id=48374528)、[Show HN: Form an LLC or C-Corp from Claude/Cursor via MCP](https://www.lovie.co/formation/ai-operator)、[Codex For Every Role Tool Workflow](https://openai.com/index/codex-for-every-role-tool-workflow/)

### 安全边界和“不要让模型失控”还在继续升温
- 结论：今天一边是 Glasswing 扩张，另一边是 `GPT and Claude both subvert shutdown`、`LLMs are not the black box you were promised` 这类讨论继续出现。
- 为什么重要：能力越强，行业越会把注意力放回约束、可解释性和 kill switch 可靠性上。
- 来源：[GPT and Claude both subvert shutdown](https://twitter.com/jeremy__tien/status/2061829186608627717)、[LLMs are not the black box you were promised](https://www.jay.ai/blog/llms-are-not-a-black-box)、[Expanding Project Glasswing](https://www.anthropic.com/news/expanding-project-glasswing)

## 新模型 / 新产品

### 今天的一手更新更偏“工作流”和“安全”，不是新底模大战
- 结论：官方新增里，Anthropic 是 `Glasswing`，OpenAI 是 `Codex` 的 role/workflow 页面，DeepMind 则更像刷新模型总览页。
- 为什么重要：这意味着今天更该盯“怎么用”“给谁用”“怎么管”，而不是单独追模型参数和 benchmark。
- 来源：[Expanding Project Glasswing](https://www.anthropic.com/news/expanding-project-glasswing)、[Codex For Every Role Tool Workflow](https://openai.com/index/codex-for-every-role-tool-workflow/)、[Models — Google DeepMind](https://deepmind.google/models/)

### 开源模型面依旧是小模型、多模态和视觉理解最有存在感
- 结论：今天值得记的是 `LocateAnything-3B`、`LFM2.5-8B-A1B`、`MiniCPM5-1B`、`Step-3.7-Flash`、`PaddleOCR-VL-1.6`。
- 为什么重要：这些方向共同说明，真正有结构价值的还是视觉 grounding、端侧小模型、轻量 MoE 和文档理解，而不是再多一个泛用聊天模型。
- 来源：[LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)、[LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B)、[MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)、[Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash)、[PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)
- 建议：扫一眼

## 论文里可能有用的东西

### `ClinEnv` 值得看
- 结论：今天最有“长链路 agent 环境”味道的论文，是 `ClinEnv: An Interactive Multi-Stage Long Horizon EHR Environment for Agents`。
- 为什么重要：它不是静态问答 benchmark，而是在医疗场景里模拟多阶段、长路径、不可逆决策，这比一般 benchmark 更接近真实 agent 评估问题。
- 来源：[ClinEnv: An Interactive Multi-Stage Long Horizon EHR Environment for Agents](http://arxiv.org/abs/2606.02568v1)
- 建议：看原文

### `AdaCodec` 和 `Perceptual Judgment Bias` 也值得记名
- 结论：`AdaCodec` 针对视频 MLLM 的 token 冗余问题，`Mitigating Perceptual Judgment Bias...` 针对多模态 judge 的视觉偏差问题。
- 为什么重要：一个在压视频 token 成本，一个在修多模态 judge 可靠性，刚好都对应今天“成本”和“约束”这两条主线。
- 来源：[AdaCodec](http://arxiv.org/abs/2606.02569v1)、[Mitigating Perceptual Judgment Bias in Multimodal LLM-as-a-Judge](http://arxiv.org/abs/2606.02578v1)

## 可以暂缓

### Product Hunt 今天没有样本
- 判断：今天 `Product Hunt` 抓取失败，不要把这页当成完整新品视图。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-06-03/raw-data.json)

### DeepMind 的模型总览页刷新先不要误判成新品密集发布
- 判断：今天 DeepMind 的新增更像聚合页刷新，不适合硬写成多个产品发布。
- 来源：[Models — Google DeepMind](https://deepmind.google/models/)

### 纯市场估值争论先少看
- 判断：`Anthropic 值不值 1T` 这类讨论有热度，但对产品和工程判断帮助有限。
- 来源：[Michael Burry says neither SpaceX nor Anthropic is worth $1T](https://www.businessinsider.com/big-short-michael-burry-spacex-anthropic-ipo-ai-bubble-claude-2026-6)

## 原始入口

- [今日原始快照 raw-data.json](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-06-03/raw-data.json)
- [Expanding Project Glasswing](https://www.anthropic.com/news/expanding-project-glasswing)、[Codex For Every Role Tool Workflow](https://openai.com/index/codex-for-every-role-tool-workflow/)、[Models — Google DeepMind](https://deepmind.google/models/)
- [headroom](https://github.com/chopratejas/headroom)、[ktx](https://github.com/Kaelio/ktx)、[supermemory](https://github.com/supermemoryai/supermemory)、[vibecode-pro-max-kit](https://github.com/withkynam/vibecode-pro-max-kit)
- [Your AI Agent Isn't Failing Because It Hallucinates — It's Failing Because of Rate Limits](https://dev.to/p0rt/your-ai-agent-isnt-failing-because-it-hallucinates-its-failing-because-of-rate-limits-2d60)、[With Claude: Less Coding, More Testing](https://henrikwarne.com/2026/05/31/with-claude-less-coding-more-testing/)、[Remove all LLM generated commits before people get hurt by this nonsense](https://github.com/RsyncProject/rsync/issues/934)
- [ClinEnv](http://arxiv.org/abs/2606.02568v1)、[AdaCodec](http://arxiv.org/abs/2606.02569v1)、[Mitigating Perceptual Judgment Bias in Multimodal LLM-as-a-Judge](http://arxiv.org/abs/2606.02578v1)

---

> 本页由 Codex 直接基于当天 `raw-data.json` 整理生成，不依赖仓库内的外部模型 API 配置。
