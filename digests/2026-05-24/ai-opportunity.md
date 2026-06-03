# AI 机会雷达 2026-05-24

> 今天最值得做的，不是新模型壳，而是 agent 的“上下文底座、技能分发、知识沉淀”三件工程脏活。

## 先看结论

从今天的信号看，coding agent 赛道已经开始分层。  
模型能力还在进步，但用户真正愿意持续用的价值，越来越落在“怎么理解代码库”“怎么复用团队经验”“怎么把会话沉淀成长期资产”上。  
这类机会比做一个更花哨的聊天入口更实际，也更容易让一小团队在 2~6 周内做出可验证版本。  
如果只能选一个方向，我会优先做“代码库上下文与浏览器/插件能力的准备层”；第二选择是“团队 skill registry”。

## 值得做的 3 个方向

### 代码库上下文 + 工具能力的准备层
- 给谁做：中小工程团队、外包团队、独立开发者工作室。
- 痛点：agent 不是不能写，而是不够懂仓库；浏览器、插件、知识图谱这些外部能力又散落在不同工具里。
- 为什么是现在：`Understand-Anything`、`codegraph`、`chrome-devtools-mcp`、`claude-plugins-official` 同时升温，说明用户已经开始补 agent 的外部能力层。
- 最小可行解：做一个“任务前准备器”，把代码库结构、关键文件、浏览器调试入口、可用 plugin 一次性整理给 agent。
- 付费可能：节省的不是一次聊天，而是整条任务链的试错成本，适合按团队或项目收费。
- 证据：[少看点 AI 雷达](./#2026-05-24/ai-radar)、[Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- 下一步：先验证团队会不会愿意在“开始让 agent 干活前”多点一次准备按钮，换取更低返工。

### 团队内部的 Skill Registry
- 给谁做：已经有人在团队里写 prompt、skill、hook，但大家各自为战的工程团队。
- 痛点：团队最佳实践存在，但分散在个人目录、文档、聊天记录里，没法分发、升级和淘汰。
- 为什么是现在：`andrej-karpathy-skills`、`.NET skills`、`Anthropic Cybersecurity Skills` 一起升温，说明“把做法封装成 skill”已经不只是内容帖。
- 最小可行解：先做一个内部 skill registry，支持上传、搜索、版本说明、适用场景和简单审核。
- 付费可能：如果它能缩短新人上手和复用时间，团队会把它当知识管理基础设施，而不是一次性工具。
- 证据：[少看点 AI 雷达](./#2026-05-24/ai-radar)、[andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)、[dotnet/skills](https://github.com/dotnet/skills)
- 下一步：先去找 3 个已经写过内部 prompt / skill 文档的团队，看他们现在最烦的是“找不到”，还是“没人维护”。

### Agent 会话转团队 Wiki 的沉淀层
- 给谁做：频繁用 agent 做探索、排障、代码阅读的团队。
- 痛点：会话很有价值，但一关窗口就散了，后面重复问、重复试、重复踩坑。
- 为什么是现在：今天 HN 上已经出现把 Claude Code 会话转成 wiki、做 dashboard、做扫描校验的项目，说明大家开始追求“会话之后留下什么”。
- 最小可行解：先做会话提炼和归档，把结论、关键命令、文件引用、决策点自动整理成团队笔记。
- 付费可能：只要它能减少重复排查和重复 onboarding，就有明确的时间价值。
- 证据：[少看点 AI 雷达](./#2026-05-24/ai-radar)、[CC-Wiki](https://github.com/tejpalv/cc-wiki)、[Claude Code MIT Dashboard](https://github.com/BEKO2210/My_Dash)
- 下一步：先别做完整知识平台，先验证团队是否真的会回看 agent 会话，而不是只把它当一次性工具。

## 次优但可观察

### Token 成本控制面板
- 现在看到了什么信号：`OpenSquilla`、`TokenSpeed`、`codegraph` 都在强调更省 token、更少上下文浪费。
- 为什么先不重注：单独卖“省 token”很容易被平台或主产品吸收成一个 feature。
- 后续要继续观察什么：团队是否开始给 agent 使用设预算、做配额和成本归因。

### 私有部署的 Agent 知识层
- 现在看到了什么信号：`AnythingLLM`、`Milvus`、`Qdrant`、`Weaviate` 依然稳定高位。
- 为什么先不重注：需求稳定，但市场已经不空白，需要非常明确的行业切口或 workflow 才容易切进去。
- 后续要继续观察什么：目标用户是更在意合规，还是更在意跨仓库检索和团队协作。

## 今天先别做

### 纯“换个模型入口”的 agent 壳
- 原因：今天的增长点不在入口，而在上下文准备和团队复用。

### 只靠营销口号的“全自动软件工程师”
- 原因：今天最强的负面信号就是运行时稳定性问题，高自动化但无护栏只会放大不信任。

### 只做 AI 资讯聚合
- 原因：用户现在缺的不是再多一条资讯流，而是基于信号得到可以执行的判断。

## 开工顺序

1. 先验证团队是否真的有“会重复做的 agent 工作流”，没有复用需求就不要先做 registry。
2. 先找已经在日常开发里用 agent 的团队试用，不要先找对 agent 还停留在围观阶段的人。
3. 如果用户愿意拿真实仓库、真实会话、真实技能包给你试，就继续；如果只能得到“听起来不错”，就说明问题还不够痛。

## 原始入口

- [少看点 AI 雷达](./#2026-05-24/ai-radar) — 先看今天的主判断。
- [今日原始快照 raw-data.json](https://github.com/ceion6/seeless-learnmore/blob/main/digests/2026-05-24/raw-data.json) — 看当天完整原始样本。
- [Understand-Anything](https://github.com/Lum1104/Understand-Anything)、[CodeGraph](https://github.com/colbymchenry/codegraph)、[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) — 看上下文与工具能力层的证据。
- [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)、[dotnet/skills](https://github.com/dotnet/skills) — 看 skill 分发层为什么开始成形。
- [CC-Wiki](https://github.com/tejpalv/cc-wiki)、[Claude Code MIT Dashboard](https://github.com/BEKO2210/My_Dash) — 看会话沉淀为什么值得单独做。

---

> 本页由当天中文报告二次整理生成，目标是把“今天发生了什么”继续推进成“今天能做什么”。  
