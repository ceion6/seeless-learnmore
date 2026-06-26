# AI 机会雷达 2026-06-26

> 今天最值得下注的机会面，是帮团队把知识、设计、文档和网页入口整理成 agent 能稳定消费、能被搜索发现、还能控制账单风险的工作层。

## 先看结论

昨天已经写过 agent 上线前验证、事实监控和成本保险丝。今天的新信号更偏“输入层”和“渠道层”。

第一优先是 agent-ready context pack：设计系统、知识库、PDF、SEO 数据、云工具包都在变成 agent 可消费的格式。

第二优先是 AI 搜索渠道运营：ChatGPT/AI 搜索影响传统搜索，同时 no-AI search 也出现反向需求。

第三优先是模型/账单变更监控：默认模型升级、quota 计算、付费产品广告化这些问题正在影响用户信任。

## 值得做的 3 个方向

### Agent-ready Context Pack
- 给谁做：已有大量文档、设计规范、PDF、产品资料、客服知识库的团队。
- 痛点：资料给人看还可以，但 agent 使用时经常缺结构、缺引用、缺版本、缺边界，导致生成结果不稳定。
- 为什么是现在：今天 GitHub 热门第一是 [design.md](https://github.com/google-labs-code/design.md)，HN 高讨论是 [OpenKnowledge](https://github.com/inkeep/open-knowledge)，[MinerU](https://github.com/opendatalab/MinerU) 也在把复杂文档转成 LLM-ready Markdown/JSON。
- 最小可行解：先做一个“资料包转换器”：输入设计系统、产品文档、PDF、FAQ、品牌词表，输出 agent 可读的 Markdown/JSON、引用索引、禁用描述、更新日期和测试问题。
- 付费可能：设计、客服、销售工程、研发知识库都能用，价值点是减少 agent 胡编和反复解释上下文。
- 证据：[design.md](https://github.com/google-labs-code/design.md)、[OpenKnowledge](https://github.com/inkeep/open-knowledge)、[MinerU](https://github.com/opendatalab/MinerU)、[AWS Agent Toolkit](https://github.com/aws/agent-toolkit-for-aws)
- 下一步：选一个真实项目，把 README、设计规范、FAQ、3 个 PDF 转成 agent-ready pack，用 20 个问题测试回答稳定性。

### AI Search / No-AI Search 渠道监测
- 给谁做：依赖搜索流量、品牌口碑、文档入口或内容分发的公司。
- 痛点：用户可能从 Google 转向 ChatGPT/Bing，也可能主动使用 no-AI search；团队不知道自己的内容在哪些入口被看见、被摘要、被忽略或被错误替代。
- 为什么是现在：社交信号明确提到 Google search traffic、ChatGPT traffic、Bing、DuckDuckGo no-AI search；GitHub 热门里也出现 [open-seo](https://github.com/every-app/open-seo)。
- 最小可行解：做一个轻量监测器：同一组关键词同时查传统搜索、AI 搜索、no-AI search，记录排名、摘要、引用来源、缺失页面和错误描述。
- 付费可能：SEO、内容团队、开发者文档、品牌和公关团队都有预算，尤其在搜索渠道转型期。
- 证据：[Mastodon search 讨论](https://mastodon.social/@knoppix95/116812081127947931)、[Open SEO](https://github.com/every-app/open-seo)、[OpenKnowledge](https://github.com/inkeep/open-knowledge)
- 下一步：先用 50 个关键词做周报，不做复杂平台；输出“传统搜索 vs AI 搜索 vs no-AI 搜索”的差异表。

### 模型/账单变更哨兵
- 给谁做：使用 Claude Code、Codex、Gemini CLI、Qwen Code 等 AI coding 工具的个人和小团队。
- 痛点：默认模型升级、quota 计算变化、rate limit、付费产品广告化、隐性重试会让用户在事后才发现成本异常。
- 为什么是现在：Claude Code issue 里有“默认模型静默升级导致 6 天 506 美元意外费用”，Codex 也有 quota 过度消耗；HN 还在讨论 OpenAI 付费产品里出现广告。
- 最小可行解：本地 watcher 读取工具配置、账单/usage 输出和模型选择变化，发现默认模型、价格档、quota 消耗速度异常时提醒并生成 diff。
- 付费可能：个人开发者会为省钱和防事故付费，团队版可以接入 Slack/Feishu 和预算审批。
- 证据：[Claude Code #71481](https://github.com/anthropics/claude-code/issues/71481)、[Codex #30002](https://github.com/openai/codex/issues/30002)、[Codex #30034](https://github.com/openai/codex/issues/30034)、[HN: OpenAI ads on paid programs](https://news.ycombinator.com/item?id=48673194)
- 下一步：先支持 3 个工具的本地配置 diff 和每日 usage 趋势，不要先接所有供应商账单 API。

## 次优但可观察

### 云厂商 agent toolkit 服务化
- 现在看到了什么信号：[AWS Agent Toolkit](https://github.com/aws/agent-toolkit-for-aws) 进入热门。
- 为什么先不重注：云厂商自己会做大量底层工具，独立产品要找跨云或治理层机会。
- 后续要继续观察什么：企业是否需要统一管理 AWS/GCP/Azure 的 MCP servers、skills、plugins。

### 页面级 GUI agent
- 现在看到了什么信号：[alibaba/page-agent](https://github.com/alibaba/page-agent) 进入样本。
- 为什么先不重注：网页自动化价值明确，但容易陷入具体站点兼容问题。
- 后续要继续观察什么：是否出现稳定的页面动作 schema 和回放/审计格式。

### 多模态 prompt guide 管理
- 现在看到了什么信号：DeepMind 对 Veo、Lyria、Nano Banana、Genie、Gemini Omni 提供 prompt guide。
- 为什么先不重注：提示指南本身很快商品化，机会更可能在企业模板、合规限制和评测。
- 后续要继续观察什么：创作团队是否会把 prompt guide 当内部资产管理。

## 今天先别做

### 再做一个 Obsidian/Notion 克隆
- 原因：今天的机会不是编辑器界面，而是 agent 能不能稳定消费知识。

### 泛泛的 AI 搜索问答站
- 原因：渠道监测和引用差异更具体，单做问答很容易被大模型平台吞掉。

### 纯粹的账单仪表盘
- 原因：用户痛点不是多看一张图，而是默认模型、价格档、quota 变化时能及时阻断。

### 继续追 OpenMontage
- 原因：它仍热，但今天没有比前两天更强的新证据。

## 开工顺序

1. 先做 Agent-ready Context Pack，因为输入资料质量会直接影响所有 agent 工作流，且可以用一个真实项目快速验证。
2. 用同一批资料同步测试 AI Search / No-AI Search 渠道监测，看哪些内容被 AI 摘要、哪些还只能靠传统搜索发现。
3. 模型/账单哨兵先做本地配置 diff 和 usage 异常提醒，作为个人工具验证，不急着企业化。
4. 如果 context pack 能让 agent 回答质量明显提升，再考虑把它扩成团队知识发布流程。

## 原始入口

- [少看点 AI 雷达](./#2026-06-26/ai-radar) — 先看当天总判断。
- [今日原始快照 raw-data.json](./raw-data.json) — 看完整原始样本。
- [design.md](https://github.com/google-labs-code/design.md) — agent-ready 设计上下文。
- [OpenKnowledge](https://github.com/inkeep/open-knowledge) — AI-first 知识库方向。
- [MinerU](https://github.com/opendatalab/MinerU) — 文档转 LLM-ready 资料。
- [Open SEO](https://github.com/every-app/open-seo) — 搜索渠道监测入口。
- [Claude Code #71481](https://github.com/anthropics/claude-code/issues/71481) — 模型/账单变更风险样本。
