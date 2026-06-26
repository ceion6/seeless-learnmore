# 少看点 AI 雷达 2026-06-26

> 今天的主线是：AI 正在把“知识、设计、网页、文档、搜索入口”改造成 agent 可消费的工作材料；与此同时，用户对广告化、身份验证、账单失控和 AI 搜索替代传统搜索的反感也在升温。

## 今天必看

### OpenAI 明确把 agent 叙事推向工作流程
- 结论：OpenAI 官网新增 [How Agents Are Transforming Work](https://openai.com/index/how-agents-are-transforming-work/)。
- 为什么重要：这类官方文章通常不是单个功能，而是在教育市场如何理解 agent：从聊天入口转向可接任务、可协作、可改造流程的工作系统。
- 来源：[OpenAI](https://openai.com/index/how-agents-are-transforming-work/)
- 建议：看它如何定义“工作被 agent 改造”，但不要把官方叙事直接当成落地成熟度。

### Google DeepMind 把模型页扩成了完整多模态目录
- 结论：DeepMind 今天抓到 20 个新增页面，从 Gemini 3.5、Flash、Embedding、Gemini Diffusion、Nano Banana、Gemini Audio、Gemini Omni 到 Veo/Lyria/Genie 的 prompt guide。
- 为什么重要：昨天是模型矩阵，今天更像“多模态产品目录 + 使用说明书”。模型公司正在把能力拆成可被开发者调用的模块，也把 prompt guide 变成产品的一部分。
- 来源：[DeepMind Models](https://deepmind.google/models/)、[Gemini Omni](https://deepmind.google/models/gemini-omni/)、[Veo prompt guide](https://deepmind.google/models/veo/prompt-guide/)、[Nano Banana prompt guide](https://deepmind.google/models/gemini-image/prompt-guide/)
- 建议：重点看提示指南和能力边界，它们会影响真实产品接入成本。

### Agent-ready 知识和设计资产开始变热
- 结论：HN 最高 AI 相关样本是 [OpenKnowledge](https://github.com/inkeep/open-knowledge)，GitHub 热门第一是 [google-labs-code/design.md](https://github.com/google-labs-code/design.md)，另有 [MinerU](https://github.com/opendatalab/MinerU) 把复杂文档转成 agentic workflows 可用的 Markdown/JSON。
- 为什么重要：这不是普通知识库热潮，而是资料格式在适配 agent：设计规范、文档、PDF、SEO 数据、知识库都要变成机器可读、可引用、可执行的上下文。
- 来源：[OpenKnowledge HN](https://news.ycombinator.com/item?id=48675435)、[design.md](https://github.com/google-labs-code/design.md)、[MinerU](https://github.com/opendatalab/MinerU)、[Open SEO](https://github.com/every-app/open-seo)
- 建议：如果要搭知识库，先问它能不能被 agent 稳定消费，而不是只看编辑器体验。

### AI 搜索替代传统搜索的压力更具象了
- 结论：社交信号提到 Google 搜索负责人面临压力、ChatGPT traffic 上升、Bing 超过 10 亿用户、DuckDuckGo 因 no-AI search 安装增加。
- 为什么重要：昨天的问题是“AI 会不会改写事实”，今天多了一层渠道变化：用户可能用 AI 搜索，也可能主动选择 no-AI 搜索。企业要同时适应 AI 分发和反 AI 需求。
- 来源：[Mastodon](https://mastodon.social/@knoppix95/116812081127947931)
- 建议：把 AI 搜索当新渠道，同时保留清晰、可引用、可爬取的人类网页。

## 社交媒体在聊什么

### “AI 是突破还是旧酒新瓶”
- 判断：最高互动社交帖在讨论 AI 到底是创新，还是旧研究的商业化包装。
- 为什么值得看：这是投资和采购层面的怀疑，不是单纯情绪；它会影响组织是否愿意为 AI 项目长期投入。
- 来源：[Mastodon](https://technologytrends60.wordpress.com/2026/06/25/old-wine-new-bottle-the-truth-about-ai-innovation-and-the-evolution-of-information-technology/)

### 搜索入口变化和 no-AI search
- 判断：社交里把 ChatGPT traffic、Bing 用户增长、Google search 轻微下滑和 DuckDuckGo no-AI search 放在一起讨论。
- 为什么值得看：用户不是单向迁移到 AI，有一部分人在主动寻找无 AI 的搜索体验。
- 来源：[Mastodon](https://mastodon.social/@knoppix95/116812081127947931)

### “为什么大家讨厌 AI”
- 判断：社交讨论把 fear、enshittification、datacenter hostility、tech broligarchy 放在一起。
- 为什么值得看：如果产品只强调效率，不处理信任、能源、广告化和平台劣化，会继续遇到阻力。
- 来源：[Mastodon](https://graphics.social/@metin/116811099658352672)

### Claude 身份验证引发隐私担忧
- 判断：社交里提到部分 Claude 用户可能需要提交政府 ID 和自拍来申诉账号。
- 为什么值得看：身份、年龄验证和滥用治理会继续与隐私发生冲突，尤其是面向个人用户和创作者的 AI 产品。
- 来源：[Mastodon](https://mastodon.social/@knoppix95/116812091469272188)

## 正在升温

### Agent-ready context formats
- 结论：design.md、OpenKnowledge、MinerU、Open SEO 都在把原本给人看的资产变成 agent 能消费的上下文。
- 来源：[design.md](https://github.com/google-labs-code/design.md)、[OpenKnowledge](https://github.com/inkeep/open-knowledge)、[MinerU](https://github.com/opendatalab/MinerU)、[Open SEO](https://github.com/every-app/open-seo)

### 模型/账单变更可观测性
- 结论：Claude Code 出现“默认模型静默升级导致 6 天 506 美元意外费用”，Codex 也有 5h quota 过度消耗问题。
- 来源：[Claude Code #71481](https://github.com/anthropics/claude-code/issues/71481)、[Codex #30002](https://github.com/openai/codex/issues/30002)、[Codex #30034](https://github.com/openai/codex/issues/30034)

### Agent 工具包从社区扩到云厂商
- 结论：[aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) 进入热门，说明云厂商也在把 MCP servers、skills、plugins 打包给 agent 使用。
- 来源：[AWS Agent Toolkit](https://github.com/aws/agent-toolkit-for-aws)

### 页面级 GUI agent 和数据采集
- 结论：[alibaba/page-agent](https://github.com/alibaba/page-agent)、[MediaCrawler](https://github.com/NanmiCoder/MediaCrawler) 同时出现，网页控制和内容采集仍然是 agent 落地的高频入口。
- 来源：[page-agent](https://github.com/alibaba/page-agent)、[MediaCrawler](https://github.com/NanmiCoder/MediaCrawler)

## 新模型 / 新产品

### Gemini Omni / Diffusion / Audio / Image prompt guides
- 结论：DeepMind 把模型、音频、图像和 prompt guide 集中更新。
- 为什么重要：这说明“如何正确使用模型”正在成为官方产品表面的一部分。
- 来源：[Gemini Omni](https://deepmind.google/models/gemini-omni/)、[Gemini Diffusion](https://deepmind.google/models/gemini-diffusion/)、[Gemini Audio](https://deepmind.google/models/gemini-audio/)

### Qwen AgentWorld 和 agentic GGUF 模型
- 结论：[Qwen-AgentWorld-35B-A3B](https://huggingface.co/Qwen/Qwen-AgentWorld-35B-A3B) 与多个 agentic/coder GGUF 模型继续在 Hugging Face 样本里出现。
- 为什么重要：agent 模型不只在闭源 API 里演进，可下载模型也在追 agentic 能力。

### Krea-2 和视觉生成模型
- 结论：[krea/Krea-2-Turbo](https://huggingface.co/krea/Krea-2-Turbo)、[krea/Krea-2-Raw](https://huggingface.co/krea/Krea-2-Raw) 进入热榜。
- 为什么重要：多模态模型产品化的另一面是创作工具继续快速迭代。

## 论文里可能有用的东西

### Forecasting With LLMs
- 结论：题目指向用 feature steering 改善 LLM forecast 泛化。
- 为什么重要：和今天的投资研究、商业预测、agent 工作流结合度较高。
- 来源：[arXiv](http://arxiv.org/abs/2606.27199v1)

### Automating Reward Shaping with VLM Guidance
- 结论：用视觉语言模型指导 reward shaping。
- 为什么重要：对具身智能和 GUI agent 的自动反馈设计有参考价值。
- 来源：[arXiv](http://arxiv.org/abs/2606.27180v1)

### Hierarchical Muon / DMuon
- 结论：优化器和训练效率仍然有新样本。
- 为什么重要：推理经济学之外，训练效率仍会影响模型迭代成本。
- 来源：[Hierarchical Muon](http://arxiv.org/abs/2606.27216v1)、[DMuon](http://arxiv.org/abs/2606.27153v1)

## 可以暂缓

### 不要继续重复昨天的“上线前验证门”
- 判断：今天仍有账单和权限问题，但新增更强的信号在 agent-ready 资料层、AI 搜索渠道变化、官方多模态目录。
- 来源：[昨天机会页](./#2026-06-25/ai-opportunity)

### Product Hunt 仍然没有样本
- 判断：Product Hunt 源未启用，不要硬写新品发布趋势。
- 来源：[今日原始快照](./raw-data.json)

### OpenMontage 仍热，但不是今天新增主线
- 判断：它继续在 GitHub 热门里，但昨天和前天已经覆盖过创作流水线。
- 来源：[OpenMontage](https://github.com/calesthio/OpenMontage)

## 原始入口

- [今日原始快照 raw-data.json](./raw-data.json) — 看当天完整样本和源数据状态。
- [AI 社交媒体信号](./#2026-06-26/ai-social) — 看用户情绪和早期反馈。
- [OpenAI: How Agents Are Transforming Work](https://openai.com/index/how-agents-are-transforming-work/) — 官方 agent 工作叙事。
- [DeepMind Models](https://deepmind.google/models/) — 今日多模态模型目录入口。
- [OpenKnowledge](https://github.com/inkeep/open-knowledge) — AI-first 知识库信号。
- [design.md](https://github.com/google-labs-code/design.md) — agent-ready 设计上下文信号。
- [AWS Agent Toolkit](https://github.com/aws/agent-toolkit-for-aws) — 云厂商 agent 工具包信号。
