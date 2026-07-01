# AI 机会雷达 2026-07-01

> 今天最值得下注的不是“再接一个更强模型”，而是围绕 agent 的成本、权限、审计、验收证据和垂直工作台做可验证的小工具。

## 先看结论

今天的机会面很清楚：Sonnet 5 让更多团队想继续加大 agent 使用，但 HN、Bluesky、GitHub issue 立刻把问题拉回了成本、权限、会话状态、工具可靠性和可审计结果。

优先级最高的是“agent 可信执行账本”，因为它直接解决团队不敢把 agent 放进真实流程的原因。其次是“科研/生命科学 AI 工作台的审计插件”，因为 Claude Science 和 OpenAI Genebench Pro 都指向高价值垂直场景。第三是“agent 生成结果的视频验收层”，因为 coding agent 做得越多，团队越需要自动化 demo 和回归证据。

## 值得做的 3 个方向

### Agent 可信执行账本
- 给谁做：已经在日常开发中使用 Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code、opencode 的工程团队。
- 痛点：agent 会切模型、跑工具、改文件、开子任务，但人很难快速知道它花了多少钱、拿了什么权限、在哪一步失控、是否能回滚。
- 为什么是现在：Sonnet 5 发布后，社区马上开始讨论 tokenizer 成本、Claude Code 价格、工具注册丢失、子 agent 限制、会话响应归属和 transcript 保留。
- 最小可行解：先做本地命令/文件/模型调用日志、权限变更记录、风险动作标记、最终 diff 摘要和回滚建议；不要一开始做完整平台。
- 付费可能：贴近 DevInfra 和合规，团队只要开始让 agent 改真实仓库，就有预算理由。
- 证据：[Claude Code tool issue](https://github.com/anthropics/claude-code/issues/72632)、[OpenAI Codex stale response issue](https://github.com/openai/codex/issues/30767)、[Copilot CLI v1.0.67](https://github.com/github/copilot-cli/releases/tag/v1.0.67)、[Simon Willison on Sonnet 5 cost](https://bsky.app/profile/simonwillison.net/post/3mpjwupjxyc2n)
- 下一步：找 5 个已经让 agent 跑命令的团队，问他们最近一次“不敢继续让它跑”的具体原因。

### 科研 / 生命科学 AI 工作台的审计插件
- 给谁做：生物、医学、材料、数据科学团队里已经在用 notebooks、文献库、脚本和 LLM 辅助分析的人。
- 痛点：AI 能帮忙读文献和跑分析，但结果如何产生、用了哪些数据、哪些代码、哪版模型，很难复现和审计。
- 为什么是现在：Claude Science 把科研环境、计算资源、图表、手稿和审计历史放在一起；OpenAI 官网也出现 Genebench Pro 入口，说明头部公司继续押注科研评测和生命科学场景。
- 最小可行解：先做“研究任务记录器”：把输入文献、数据文件、脚本、模型输出、图表版本和人工确认步骤打包成一份可追溯报告。
- 付费可能：科研团队愿意为可复现、可审计、少返工买单，尤其是企业研发和合规环境。
- 证据：[Claude Science](https://www.anthropic.com/news/claude-science-ai-workbench)、[OpenAI Genebench Pro](https://openai.com/index/introducing-genebench-pro/)、[Self-Evolving World Models for LLM Agent Planning](http://arxiv.org/abs/2606.30639v1)
- 下一步：别先做全套科研平台，先接一个真实 notebook 或文献综述流程，输出审计报告。

### Agent 结果视频验收层
- 给谁做：用 coding agent 改 Web 产品、内部后台、运营工具的小团队。
- 痛点：agent 说“已完成”不够，reviewer 还要手动打开页面、点流程、录屏、写验收说明。
- 为什么是现在：shot-scraper 增加 storyboard YAML 录制视频 demo；`browser-use/video-use` 在 GitHub trending 中出现；这说明“让 agent 展示它做成了什么”开始变成明确需求。
- 最小可行解：给 PR 或本地 diff 自动生成 30-90 秒操作视频、关键截图、失败步骤和可复跑脚本。
- 付费可能：如果能减少前端验收和异步沟通成本，小团队会按项目或席位付费。
- 证据：[shot-scraper video support](https://bsky.app/profile/simonwillison.net/post/3mpjhtsbbq223)、[browser-use/video-use](https://github.com/browser-use/video-use)、[Google agents-cli](https://github.com/google/agents-cli)
- 下一步：先支持一个常见栈，比如 Vite/Next.js + Playwright，把“改完页面后自动录验收视频”跑通。

## 次优但可观察

### Agent workflow / skill 配方包
- 现在看到了什么信号：`agency-agents`、`superpowers`、`loop-engineering`、Anthropic skills issue 都在说明大家需要可复用的 agent 工作方法。
- 为什么先不重注：内容包容易同质化，真正的付费点在团队内部治理、版本化、权限和评测。
- 后续要继续观察什么：团队是否愿意把自己的 agent SOP 存成长期资产，而不是只收藏模板。

### 本地语音输入 + agent 操作入口
- 现在看到了什么信号：`FluidVoice`、本地/开源 AI 讨论、Mac dictation 替代品都有热度。
- 为什么先不重注：语音入口本身壁垒不够，除非能接到具体工作流，例如会议后自动开 issue、生成 PR 任务、执行后台操作。
- 后续要继续观察什么：用户是为了隐私、本地延迟，还是为了少打字。

### AI 安全 / 渗透测试 agent
- 现在看到了什么信号：`usestrix/strix` 今天在 GitHub trending 里出现，Claude 官方也在强调 Frontier Red Team。
- 为什么先不重注：安全产品需要强信任和专业能力，只做“AI pentest 外壳”很容易变成玩具。
- 后续要继续观察什么：是否能在真实企业环境里产生可验证漏洞报告，而不是只跑 checklist。

### 模型路由和免费 API 网关
- 现在看到了什么信号：`OmniRoute`、Windows Copilot API 这类项目会吸引开发者，因为大家对成本敏感。
- 为什么先不重注：涉及账号、合规、稳定性和服务条款风险，公开产品化要谨慎。
- 后续要继续观察什么：合法的成本可视化、预算控制、fallback 策略，比“绕过付费”更值得做。

## 今天先别做

### 通用 AI 新闻聚合
- 原因：今天真正有价值的是判断和取舍，不是把 Sonnet 5、Gemini、OpenAI、GitHub 全部堆成列表。

### 只靠星标飞升选方向
- 原因：今天 star surge 混入很多同质 HTML 项目和异常高星仓库，必须人工降噪。

### API key 绕过 / 免费模型聚合
- 原因：短期吸引流量，长期容易踩账号、合规和稳定性问题。

### 只包装 Sonnet 5 的聊天壳
- 原因：模型入口会被平台自己吃掉；更可持续的是成本、审计、权限、验收和垂直流程。

### 没有原始数据的 Reddit / X 趋势判断
- 原因：今天 raw 里没有 Reddit；HN 里出现的 X/Twitter 链接只能说明 HN 在讨论，不能当作完整 X 社交数据。

## 开工顺序

1. 先做 10 个真实 agent 会话的失败复盘，标注“成本不可控、权限不清、工具失败、会话丢失、结果不可验收”各占多少。
2. 如果失败点集中在开发流程，就做 Agent 可信执行账本；如果集中在科研可复现，就做科研审计插件；如果集中在前端 review，就做视频验收层。
3. 第一版只服务一个明确工作流，不做平台：本地运行、输出一份报告、能被团队当天拿去 review。
4. 两周内验证付费意愿：让目标用户用自己的仓库、notebook 或 Web 页面跑一次，看他们是否愿意继续接入。

## 原始入口

- [少看点 AI 雷达](./#2026-07-01/ai-radar) — 先看当天总判断。
- [今日原始快照 raw-data.json](./raw-data.json) — 看完整原始样本和源状态。
- [今日社交信号](./#2026-07-01/ai-social) — 看 Bluesky / Mastodon 的原始讨论摘录。
- [Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5) — 今天模型与 agent 能力变化的主入口。
- [Claude Science](https://www.anthropic.com/news/claude-science-ai-workbench) — 科研工作台方向的主入口。
- [OpenAI Genebench Pro](https://openai.com/index/introducing-genebench-pro/) — 生命科学评测方向的待复核入口。
- [browser-use/video-use](https://github.com/browser-use/video-use) — agent 视频验收方向的开源信号。
- [Copilot CLI v1.0.67](https://github.com/github/copilot-cli/releases/tag/v1.0.67) — agent 权限和子任务边界的工具链信号。
