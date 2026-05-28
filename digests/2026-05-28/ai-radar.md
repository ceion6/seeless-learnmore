# 少看点 AI 雷达 2026-05-28

> 今天的主线是：AI agent 的讨论开始从“能不能做事”转向“在哪些垂直场景真能落地，以及哪些技能、记忆、检索配置能复用”。官网、社区和论文三条线，今天都在往这个方向收敛。
>
> 覆盖提醒：Product Hunt 今天抓取失败；官网面有旧文更新时间变动，这页只把明确新增或明确有新判断价值的条目算进去。

## 今天必看

### OpenAI 开始把 Codex 往高价值垂直代理推进
- 结论：今天最值得盯的官方信号，是 OpenAI 新增了 `Building Self Improving Tax Agents With Codex`。
- 为什么重要：这不是又一个通用 coding demo，而是把 agent 往税务这类高价值、强流程、强验证场景推进。说明竞争重点在从“会写代码”转向“能不能进业务链路”。
- 来源：[Building Self Improving Tax Agents With Codex](https://openai.com/index/building-self-improving-tax-agents-with-codex/)
- 建议：看原文

### Anthropic 给出了一个更有分量的 adoption 信号
- 结论：Anthropic 今天新增的研究不是新模型，而是 `Coding agents in the social sciences`。它给出的核心判断很直接：聊天式 AI 已经很普及，但真正把 coding agent 纳入工作流的人还远少得多。
- 为什么重要：这说明“agent adoption gap”已经可以被明确描述。接下来比的不是谁再做一个 demo，而是谁能把权限、验证、技能复用和工作流可靠性做扎实。
- 来源：[Coding agents in the social sciences](https://www.anthropic.com/research/coding-agents-social-sciences)
- 建议：看原文

### GitHub 热度继续指向技能层、知识层和 eval 层
- 结论：今天最强的一批仓库，仍然不是单一大而全应用，而是 `adhd`、`Understand-Anything`、`knowledge-work-plugins`、`ECC`、`Arkon`、`workshop` 这一类技能、知识图谱、运行面和评测层资产。
- 为什么重要：这说明 agent 的差异化越来越不在模型本体，而在“怎么复用技能、怎么组织上下文、怎么持续验证输出”。
- 来源：[adhd](https://github.com/UditAkhourii/adhd)、[Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)、[ECC](https://github.com/affaan-m/ECC)、[Arkon](https://github.com/nduckmink/arkon)、[workshop](https://github.com/raindrop-ai/workshop)
- 建议：看原文

## 正在升温

### “更高智能密度 / 更低 token 成本”已经是独立战场
- 结论：`OpenSquilla`、`TokenSpeed`、`MiniCPM5-1B` 这几条线都在强调效率、轻量化和单位成本产出。
- 为什么重要：如果 agent 真要进入业务流程，token 成本、推理效率和本地可部署性会比单次 benchmark 更重要。
- 来源：[OpenSquilla](https://github.com/opensquilla/opensquilla)、[TokenSpeed](https://github.com/lightseekorg/tokenspeed)、[MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)

### 平台壳层和记忆层还在快速生长
- 结论：`elephant-agent`、`Photo-agents`、`AZMX`、`hermes-agent-cn-desktop` 继续上涨，卖点都围绕记忆、自进化、桌面壳层和平台治理。
- 为什么重要：这说明大家默认单个 CLI 还不够，真正要补的是长期记忆、运行管理和多任务协作那一层。
- 来源：[elephant-agent](https://github.com/agentic-in/elephant-agent)、[Photo-agents](https://github.com/jmerelnyc/Photo-agents)、[AZMX](https://github.com/AzmxAI/azmx)、[Hermes Agent CN Desktop](https://github.com/Eynzof/hermes-agent-cn-desktop)

### 社区注意力开始从“模型谁更强”转向“是不是已经有 PMF”
- 结论：今天 HN 上最强信号不是某个新 benchmark，而是 Simon Willison 那篇 `I think Anthropic and OpenAI have found product-market fit`。
- 为什么重要：这和 OpenAI 的行业代理叙事、Anthropic 的 adoption 研究正好拼在一起。讨论中心已经从“会不会替代人”慢慢转成“哪些场景已经开始稳定付费使用”。
- 来源：[I think Anthropic and OpenAI have found product-market fit](https://simonwillison.net/2026/May/27/product-market-fit/)、[HN 讨论](https://news.ycombinator.com/item?id=48296794)

## 新模型 / 新产品

### 今天值得记住的是“场景化产品”和“多模态开源模型”
- 结论：官方面今天更值得看的是 OpenAI 的 tax agents 和 DeepMind 的 robotics accelerator，而开源模型面更值得扫的是 `Lance`、`MiniCPM5-1B`、`LongCat-Video-Avatar-1.5`。
- 为什么重要：一个指向垂直代理和 physical AI 生态，一个指向 any-to-any、多模态、端侧与长上下文，这两条线都比泛泛的“新模型来了”更有实际判断价值。
- 来源：[Building Self Improving Tax Agents With Codex](https://openai.com/index/building-self-improving-tax-agents-with-codex/)、[Google DeepMind Accelerator](https://deepmind.google/models/gemini-robotics/accelerator/)、[Lance](https://huggingface.co/bytedance-research/Lance)、[MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)、[LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5)
- 建议：扫一眼

### 不要把旧文更新时间误判成今天的新发布
- 结论：Anthropic 的 `Claude Code auto mode` 今天出现在快照里，但它本身是更早的文章，今天更像是页面更新时间被重新捕捉到了。
- 为什么重要：官网 sitemap 抖动本身不等于新品发布。这个过滤要做，不然雷达会失真。
- 来源：[How we built Claude Code auto mode: a safer way to skip permissions](https://www.anthropic.com/engineering/claude-code-auto-mode)、[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-28/raw-data.json)

## 论文里可能有用的东西

### `MUSE-Autoskill` 值得看
- 结论：今天最贴近当前 agent 工程现实的论文，是 `MUSE-Autoskill: Self-Evolving Agents via Skill Creation, Memory, Management, and Evaluation`。
- 为什么重要：它讨论的不是单次任务成功率，而是技能怎么创建、记忆、管理、评估和持续改进。这和今天 GitHub 热门仓库的方向基本一致。
- 来源：[MUSE-Autoskill](http://arxiv.org/abs/2605.27366v1)
- 建议：看原文

### Retrieval agent 的“参数配置”开始被当成单独问题
- 结论：`Natural Language Query to Configuration for Retrieval Agents` 值得记一个点：检索代理真正麻烦的地方，不只是选模型，而是怎么把检索器、文档数、跳数和综合策略配对。
- 为什么重要：这类问题一旦被标准化，RAG 和企业知识助手才更有可能从“靠经验调参”变成更稳定的系统工程。
- 来源：[Natural Language Query to Configuration for Retrieval Agents](http://arxiv.org/abs/2605.27361v1)

### 对齐和偏置问题今天也有一篇该记名
- 结论：`Alignment Tampering` 和 `Algorithmic Monocultures in Hiring` 都值得留档，但前者更贴近模型训练安全，后者更贴近 AI 落地的制度风险。
- 为什么重要：如果 agent 继续往招聘、税务、研究这些严肃场景推进，这类“不是功能 bug、但会造成系统性后果”的问题会越来越重要。
- 来源：[Alignment Tampering](http://arxiv.org/abs/2605.27355v1)、[Algorithmic Monocultures in Hiring](http://arxiv.org/abs/2605.27371v1)

## 可以暂缓

### Product Hunt 今天没有样本
- 判断：今天 `Product Hunt` 抓取失败，不要把这页当成完整新品视图。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-28/raw-data.json)

### “AI 工作会不会末日化”这类媒体争论先少看
- 判断：今天 HN 里围绕 jobs apocalypse 的媒体讨论有热度，但对产品和工程判断的直接帮助不大。
- 来源：[Axios 讨论](https://www.axios.com/2026/05/27/ai-hype-doom-openai-anthropic)、[Reuters 讨论](https://www.reuters.com/world/asia-pacific/openais-altman-says-ai-unlikely-lead-jobs-apocalypse-2026-05-26/)、[Fortune 讨论](https://fortune.com/2026/05/26/sam-altman-dario-amodei-walking-back-ai-jobs-apocalypse-prophecies-ipo/)

### 今天不必把所有“skill 仓库”都加入日常关注清单
- 判断：今天很多涨星仓库都围绕 skill / memory / harness，但其中不少更像实验性模式库。先把它们当发现信号，不要直接当成熟方案。
- 来源：[今日原始快照](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-28/raw-data.json)

## 原始入口

- [今日原始快照 raw-data.json](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-28/raw-data.json)
- [Building Self Improving Tax Agents With Codex](https://openai.com/index/building-self-improving-tax-agents-with-codex/)、[Coding agents in the social sciences](https://www.anthropic.com/research/coding-agents-social-sciences)、[Google DeepMind Accelerator](https://deepmind.google/models/gemini-robotics/accelerator/)
- [adhd](https://github.com/UditAkhourii/adhd)、[Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)、[ECC](https://github.com/affaan-m/ECC)、[Arkon](https://github.com/nduckmink/arkon)
- [I think Anthropic and OpenAI have found product-market fit](https://simonwillison.net/2026/May/27/product-market-fit/)、[HN 讨论](https://news.ycombinator.com/item?id=48296794)
- [MUSE-Autoskill](http://arxiv.org/abs/2605.27366v1)、[Natural Language Query to Configuration for Retrieval Agents](http://arxiv.org/abs/2605.27361v1)、[Alignment Tampering](http://arxiv.org/abs/2605.27355v1)
- [Lance](https://huggingface.co/bytedance-research/Lance)、[MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)、[LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5)

---

> 本页由 Codex 直接基于当天 `raw-data.json` 整理生成，不依赖仓库内的外部模型 API 配置。
