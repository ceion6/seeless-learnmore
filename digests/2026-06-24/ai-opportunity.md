# AI 机会雷达 2026-06-24

> 今天最值得下注的机会面，不是再做一个聊天入口，而是把 AI agent 变成可验证、可分发、可管控的生产流水线。

## 先看结论

今天的机会重心从“agent 能不能做事”转向“agent 做出来的东西能不能被交付、复用和信任”。

优先级最高的是 agentic creative studio：视频、图文、语音、网站克隆正在被做成端到端流水线，用户能直接感知产出。

第二条是 skills / plugins 供应链治理：技能包越来越像软件包，但触发率、质量、安全命名空间和企业分享机制还不成熟。

第三条是本地小模型工具化：端侧 ONNX、OCR、ASR、长上下文和小模型推理会成为 agent 工作流里的“工具零件”，比单独卖模型更容易落地。

## 值得做的 3 个方向

### Agentic Creative Studio 的流程质检层
- 给谁做：用 AI 生成视频、图文、网站、营销素材或课程内容的小团队和创作者。
- 痛点：demo 很酷，但真实交付需要脚本、素材、版本、版权、导出格式、修改记录和人工审核闭环。
- 为什么是现在：[OpenMontage](https://github.com/calesthio/OpenMontage) 一天新增 3592 stars，[palmier-pro](https://github.com/palmier-io/palmier-pro)、[voicebox](https://github.com/jamiepine/voicebox)、[html-video](https://github.com/nexu-io/html-video) 都在同一天进入样本。
- 最小可行解：不要先做完整创作平台；先做“AI 生成项目交付包检查器”，检查素材来源、脚本变更、渲染产物、版权风险、缺失文件和可复现命令。
- 付费可能：创作者和小团队愿意为“少返工、少踩版权坑、能交付给客户”付费，适合按项目或团队订阅。
- 证据：[OpenMontage](https://github.com/calesthio/OpenMontage)、[palmier-pro](https://github.com/palmier-io/palmier-pro)、[voicebox](https://github.com/jamiepine/voicebox)、[The 80/20 Rule of AI Code](https://dev.to/harsh2644/the-8020-rule-of-ai-code-why-the-last-20-takes-80-of-your-time-3pcg)
- 下一步：找 3 个已经用 AI 做视频/图文交付的人，让他们拿一个真实项目跑检查清单，记录最后 20% 返工在哪里。

### Skills / Plugins 供应链扫描器
- 给谁做：准备在团队内安装 Claude/Codex/Cursor/Gemini skill、plugin、MCP 或 agent harness 的工程团队。
- 痛点：技能包看起来像 prompt，但实际上可能包含脚本、工具权限、外部服务、文件读取和命名空间信任问题。
- 为什么是现在：今天样本同时出现官方插件目录、817 个安全技能包、CEO/设计/QA 工具栈、meta-skill harness；Anthropic skills 里也有社区命名空间信任边界和触发率问题。
- 最小可行解：先做静态扫描和人工审查报告：权限、脚本入口、外部请求、文件访问、触发描述、依赖、命名空间、是否混淆、是否能被测试触发。
- 付费可能：企业采用 agent 前会需要安装白名单和审计报告，比“技能市场”更早有预算。
- 证据：[Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)、[claude-plugins-official](https://github.com/anthropics/claude-plugins-official)、[Anthropic skills #492](https://github.com/anthropics/skills/issues/492)、[skills PR #83](https://github.com/anthropics/skills/pull/83)
- 下一步：选 20 个热门 skill/plugin 做第一版风险标签，不接入运行时，只输出审计报告。

### 本地小模型工具箱
- 给谁做：需要把 OCR、图像定位、语音识别、浏览器端推理接进 agent 流程的开发者。
- 痛点：很多工作流不需要最大模型，而是需要一个能离线运行、低延迟、可复现、不会泄露数据的小工具。
- 为什么是现在：Simon Willison 在社交平台展示浏览器内 ONNX 实验；Hugging Face 样本里出现 Unlimited-OCR、VibeThinker-3B、FastContext、Nemotron ASR；Lobsters 也有本地语音助手讨论。
- 最小可行解：做“agent tool recipes”：每个能力一个最小封装，包含模型选择、运行环境、输入输出 schema、延迟/内存基准和失败样例。
- 付费可能：开源 recipes 免费，团队版卖私有模型缓存、统一部署、设备兼容性和性能报告。
- 证据：[Simon Willison Bluesky](https://bsky.app/profile/simonwillison.net/post/3mow3ec7ycc2s)、[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)、[FastContext-1.0-4B-SFT](https://huggingface.co/microsoft/FastContext-1.0-4B-SFT)、[local voice assistant](https://blog.platypush.tech/article/Local-voice-assistant)
- 下一步：先做 3 个 recipe：OCR、图像定位、ASR；每个都要求本地运行、命令行可调用、能被 agent 以 JSON 结果消费。

## 次优但可观察

### AI 生成内容身份/出处标记
- 现在看到了什么信号：Claude Tag 和相关 HN 讨论把身份、出处、归因问题推到台前。
- 为什么先不重注：单独做标记标准很容易被平台吞掉；更适合作为创作交付包、企业审计或内容 CMS 的一部分。
- 后续要继续观察什么：平台是否开放可验证元数据，企业是否要求 AI 产物进入审计链。

### Agent trace debugger
- 现在看到了什么信号：HN 出现本地 agent trace debugger，Dev.to 在谈 eval-first、权限绕过、上下文压缩可视化。
- 为什么先不重注：调试器用户更窄，除非能接进真实失败场景。
- 后续要继续观察什么：开发者是否愿意上传/保留 agent traces，以及最常见失败是否能自动分类。

### 反爬虫与数据投毒工具
- 现在看到了什么信号：社交平台对 LLM crawler 的反感更明确。
- 为什么先不重注：法律、平台政策和技术对抗都不稳定，单点工具可能很快失效。
- 后续要继续观察什么：站长是否愿意为“AI crawler 防护 + 访问控制 + 日志解释”付费。

## 今天先别做

### 通用 agent 平台
- 原因：今天的机会都指向垂直流程和可验证产物，不支持再做一个泛泛的 agent 工作台。

### 只靠 stars 包装的技能市场
- 原因：技能包真正的问题是信任、触发率、权限和质量，不是列表页。

### 纯模型榜单或模型资讯站
- 原因：模型热榜有参考价值，但今天更强的落点是把小模型变成可调用工具，而不是继续做信息流。

### 单独追 Product Hunt 新品
- 原因：Product Hunt 源今天未启用，没有样本，不要硬凑发布趋势。

## 开工顺序

1. 先做一个 AI 生成项目交付包检查器，用真实视频/图文项目验证“最后 20% 返工”是否足够痛。
2. 同时用 20 个热门 skill/plugin 做供应链扫描样本，验证是否能产出用户愿意看的风险报告。
3. 如果创作检查器用户反馈更强，就继续做 creative studio 的质检和交付层；如果工程团队更愿意试，就转向 skill/plugin 审计。
4. 本地小模型工具箱先做 recipe，不急着做平台；每个 recipe 都必须能被 agent 直接调用并返回结构化结果。

## 原始入口

- [少看点 AI 雷达](./#2026-06-24/ai-radar) — 先看当天总判断。
- [今日原始快照 raw-data.json](./raw-data.json) — 看完整原始样本。
- [OpenMontage](https://github.com/calesthio/OpenMontage) — agentic creative studio 的强信号。
- [Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) — skill 供应链的典型样本。
- [Claude Tag](https://www.anthropic.com/news/introducing-claude-tag) — AI 产物身份/出处方向。
- [Simon Willison 的浏览器端 ONNX 实验](https://bsky.app/profile/simonwillison.net/post/3mow3ec7ycc2s) — 本地小模型工具化信号。
