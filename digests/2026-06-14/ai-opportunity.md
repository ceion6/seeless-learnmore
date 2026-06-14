# AI 机会雷达 2026-06-14

> 今天最值得下注的，是 AI 生产供应链里的三个薄弱环节：模型连续性、技能发布质量，以及高风险输出的证据完整性。

## 先看结论

前几天反复出现的“Agent 记忆层”和“执行护栏”仍然有效，但今天有更具体、更新的切口。

模型可能突然不可用，便宜模型的实际成本可能更高；Skills 正成为团队依赖，却缺少成熟的 CI；AI 输出开始进入证据和破坏性操作场景，却没有清晰来源边界。这三个问题都能用现有模型做出第一版，不需要等待更强模型。

## 值得做的 3 个方向

### AI 模型连续性与真实成本路由器
- 给谁做：已经在生产中调用多个闭源或开源模型的 AI 产品团队。
- 痛点：供应商限制、区域可用性、限额和隐藏的 token / 重试成本会突然改变；静态选择一个“便宜模型”并不可靠。
- 为什么是现在：Anthropic 访问限制事件、GLM 5.2 与 Kimi K2.7 Code 的新样本，以及开发者报告的 8.6 倍成本反差，把问题同时推到了可用性和成本层。
- 最小可行解：接入 2–3 个模型供应商，按真实任务记录成功率、总 token、延迟、重试和单位成功成本；异常时给出切换建议。
- 付费可能：它直接降低停服与成本失控风险，适合按调用量或团队套餐收费。
- 证据：[Anthropic 声明](https://www.anthropic.com/news/fable-mythos-access)、[aisuite](https://github.com/andrewyng/aisuite)、[LMCache](https://github.com/LMCache/LMCache)、[成本案例](https://dev.to/yogesh23012001/i-expected-the-cheaper-model-to-be-cheaper-it-cost-86x-more-5cph)
- 下一步：拿一个真实工作流在三种模型上回放 100 次，比较“单位成功结果成本”，而不是标价。

### Agent Skill CI 与发布门禁
- 给谁做：已经维护内部 Skills、MCP 工具、Agent 工作流或允许员工安装第三方技能的团队。
- 痛点：技能更新后是否退化、是否引入危险权限、是否在真实模型上可用，目前大多靠人工感觉。
- 为什么是现在：`agent-skills`、`superpowers` 和 `SkillSpector` 同日高热，社区也开始做 skill lint 与真实模型 MCP 测试。
- 最小可行解：为每个技能保存 10–30 个真实任务回放，在 PR 中检查成功率、成本、权限变化和危险模式。
- 付费可能：它贴近安全和发布流程，团队一旦接入就有持续使用价值。
- 证据：[agent-skills](https://github.com/addyosmani/agent-skills)、[SkillSpector](https://github.com/NVIDIA/SkillSpector)、[Skill lint 实测](https://dev.to/sayed_ali_alkamel/i-pointed-a-skill-linter-at-a-52k-star-repo-here-is-what-84100-looks-like-28cn)、[MCP 真实模型测试](https://dev.to/rupa_tiwari_dd308948d710f/why-testing-mcp-servers-with-real-ai-models-matters-2026-55e9)
- 下一步：选择团队最常用的一个技能，建立最小回放集，并故意加入一次危险权限变化测试门禁是否有效。

### 高风险 AI 输出的证据链
- 给谁做：让 AI 参与合规审查、调查、运维命令、财务或其他高风险决策的团队。
- 痛点：模型推断、原始证据和未验证建议混在一起；一旦内容被复制进正式流程，很难追溯它是否有来源。
- 为什么是现在：今天的警务证据争议、复古计算机破坏性错误建议和提示注入臆造案例都指向同一类事故。
- 最小可行解：强制每条关键结论绑定来源片段、工具结果和置信状态；无证据结论不能进入最终导出，破坏性操作必须二次确认。
- 付费可能：对高风险行业，它解决的是审计和事故责任问题，而不是一般效率问题。
- 证据：[BBC 报道](https://www.bbc.com/news/articles/cy8wppwdxl6o)、[Mastodon 实验](https://chaos.social/@root42/116744687682749112)、[Claude Code issue](https://github.com/anthropics/claude-code/issues/64048)
- 下一步：找一个已有 AI 草稿流程，统计最终文档中有多少关键判断无法回溯到原始证据。

## 次优但可观察

### API 新能力的轻量产品化
- 现在看到了什么信号：用户因为 ChatGPT 尚未接入 `gpt-realtime-2`，自己做了实时语音文档对话工具。
- 为什么先不重注：能力落差确实存在，但官方产品随时可能补齐，窗口短、壁垒弱。
- 后续观察：是否有垂直场景需要特殊文档、权限或工作流，而不仅是语音聊天。

### Coding Agent 会话分析
- 现在看到了什么信号：`agentsview` 进入 GitHub 热门样本。
- 为什么先不重注：分析面板容易做，关键是能否给出可执行的成本、提示词或流程优化建议。
- 后续观察：团队是否会依据分析结果实际改变 Agent 使用方式。

## 今天先别做

### 只做一个多模型 API 包装层
- 原因：统一接口已经不稀缺。必须把真实任务成功率、总成本和连续性决策做出来。

### 没有任务回放的 Skills 市场
- 原因：热门技能越来越多，但缺少质量与安全信号的市场只会放大噪音。

### 通用“事实核查助手”
- 原因：范围太宽。先进入一个高风险流程，把证据链和导出门禁做扎实。

## 开工顺序

1. 先做 Agent Skill CI：公开样本和测试对象充足，最快能验证团队是否愿意接入。
2. 同时用一个真实业务流程测三种模型的单位成功成本，验证连续性路由器是否比统一 API 更有价值。
3. 证据链方向先找一个高风险但流程清晰的垂直场景，不要从通用事实核查开始。

## 原始入口

- [少看点 AI 雷达](./#2026-06-14/ai-radar)
- [今日社交媒体信号](./#2026-06-14/ai-social)
- [Anthropic 暂停访问声明](https://www.anthropic.com/news/fable-mythos-access)
- [NVIDIA SkillSpector](https://github.com/NVIDIA/SkillSpector)
- [今日原始快照](./raw-data.json)

