(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,79179,e=>{"use strict";e.s(["LAYERS",0,[{id:"architecture",label:"Architecture",color:"#3B82F6",versions:["s01"]},{id:"data",label:"Data Layer",color:"#10B981",versions:["s02"]},{id:"core",label:"Core Loop",color:"#8B5CF6",versions:["s03"]},{id:"execution",label:"Execution",color:"#F59E0B",versions:["s04","s07"]},{id:"design",label:"Design Patterns",color:"#EF4444",versions:["s05"]},{id:"model",label:"Model Layer",color:"#EC4899",versions:["s06"]},{id:"planning",label:"Planning",color:"#14B8A6",versions:["s08"]},{id:"config",label:"Configuration",color:"#6366F1",versions:["s09"]},{id:"extensibility",label:"Extensibility",color:"#F97316",versions:["s10"]}],"LAYER_BAR_COLORS",0,{architecture:"bg-blue-500",data:"bg-emerald-500",core:"bg-purple-500",execution:"bg-amber-500",design:"bg-red-500",model:"bg-pink-500",planning:"bg-teal-500",config:"bg-indigo-500",extensibility:"bg-orange-500"},"LAYER_BORDER_COLORS",0,{architecture:"border-blue-500/30 hover:border-blue-500/60",data:"border-emerald-500/30 hover:border-emerald-500/60",core:"border-purple-500/30 hover:border-purple-500/60",execution:"border-amber-500/30 hover:border-amber-500/60",design:"border-red-500/30 hover:border-red-500/60",model:"border-pink-500/30 hover:border-pink-500/60",planning:"border-teal-500/30 hover:border-teal-500/60",config:"border-indigo-500/30 hover:border-indigo-500/60",extensibility:"border-orange-500/30 hover:border-orange-500/60"},"LAYER_DOT_COLORS",0,{architecture:"bg-blue-500",data:"bg-emerald-500",core:"bg-purple-500",execution:"bg-amber-500",design:"bg-red-500",model:"bg-pink-500",planning:"bg-teal-500",config:"bg-indigo-500",extensibility:"bg-orange-500"},"VERSION_META",0,{s01:{id:"s01",title:"The Plugin Foundation",subtitle:"Everything Is a Plugin",loc:75,tools:["cordis"],newTools:["cordis"],coreAddition:"Cordis plugin context",keyInsight:"DeepSeek Harness has no privileged core — every part, including the model adapter and agent loop, is a replaceable plugin.",layer:"architecture",prevVersion:null},s02:{id:"s02",title:"Session Log",subtitle:"Append-Only Facts",loc:90,tools:["session"],newTools:["session"],coreAddition:"Durable event log",keyInsight:"The session log is the source of truth — everything the model sees must be reconstructable from it.",layer:"data",prevVersion:"s01"},s03:{id:"s03",title:"Agent Loop",subtitle:"Turns and Steps",loc:110,tools:["agent-loop"],newTools:["agent-loop"],coreAddition:"Turn/step lifecycle",keyInsight:"A step is one model request plus tools; a turn groups steps into a coherent unit of work.",layer:"core",prevVersion:"s02"},s04:{id:"s04",title:"Tool System",subtitle:"Scoped Registry + Pipeline",loc:85,tools:["tools"],newTools:["tools"],coreAddition:"Tool registry with guards",keyInsight:"Tools are registered with scopes and executed through a pre/post pipeline for validation and telemetry.",layer:"execution",prevVersion:"s03"},s05:{id:"s05",title:"Capability Seams",subtitle:"Definition → Provider → Consumer",loc:95,tools:["seam"],newTools:["seam"],coreAddition:"Three-role capability pattern",keyInsight:"A capability seam comprises Service Definition, Service Provider, and Consumer — swapping one provider changes the whole product.",layer:"design",prevVersion:"s04"},s06:{id:"s06",title:"LLM Integration",subtitle:"Adapters and Streaming",loc:80,tools:["llm"],newTools:["llm"],coreAddition:"LLM adapter seam",keyInsight:"The LLM layer provides message vocabulary and streaming — providers register adapters that handle the actual API calls.",layer:"model",prevVersion:"s05"},s07:{id:"s07",title:"Shell & Subprocess",subtitle:"Execution Providers",loc:100,tools:["shell","subprocess"],newTools:["shell","subprocess"],coreAddition:"Shell capability seam",keyInsight:"Shell execution is a capability — local, remote, or sandboxed providers all share one interface.",layer:"execution",prevVersion:"s06"},s08:{id:"s08",title:"Subagent System",subtitle:"Delegation and Child Agents",loc:120,tools:["subagent"],newTools:["subagent"],coreAddition:"Subagent capability seam",keyInsight:"Subagents give each subtask a clean context while preserving the main thread through delegation.",layer:"planning",prevVersion:"s07"},s09:{id:"s09",title:"Profile & Bundles",subtitle:"Composition Layers",loc:70,tools:["profile","bundle"],newTools:["profile","bundle"],coreAddition:"Profile composition system",keyInsight:"A profile stacks bundles in order — each layer can patch the config below it.",layer:"config",prevVersion:"s08"},s10:{id:"s10",title:"Event System",subtitle:"Waterfall Semantics",loc:85,tools:["events"],newTools:["events"],coreAddition:"Typed event map",keyInsight:"Events are extension points — waterfall listeners must call next() to delegate, otherwise they short-circuit the chain.",layer:"extensibility",prevVersion:"s09"}},"VERSION_ORDER",0,["s01","s02","s03","s04","s05","s06","s07","s08","s09","s10"]])},44429,32674,e=>{"use strict";var t=e.i(10691);function i(...e){return e.filter(Boolean).join(" ")}e.s(["cn",()=>i],32674);let r={tools:"bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",planning:"bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",extensibility:"bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",concurrency:"bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",platform:"bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"};function o({layer:e,children:o,className:n}){return(0,t.jsx)("span",{className:i("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",r[e]||"",n),children:o})}e.s(["LayerBadge",()=>o],44429)},32953,e=>{"use strict";var t=e.i(10691),i=e.i(23999),r=e.i(90696),o=e.i(63782),n=e.i(79179),s=e.i(44429);function a(){return(0,t.jsx)("footer",{className:"border-t border-[var(--color-border)] py-8 text-center text-sm text-[var(--color-text-secondary)]",children:(0,t.jsx)("p",{children:"Learn OpenCode — Built with Next.js"})})}let l={s01:{description:"DeepSeek Harness is built on Cordis, an everything-is-a-plugin framework. There is no privileged core — every part, including the model adapter, tool registry, session log, and agent loop itself, is a replaceable plugin. This architecture makes the harness infinitely extensible.",zhDescription:"DeepSeek Harness 构建在 Cordis 之上，这是一个一切皆插件的框架。没有特权核心——包括模型适配器、工具注册表、会话日志和 agent 循环本身在内的每个部分都是可替换的插件。这种架构使 harness 具有无限的可扩展性。",codeSample:`// Cordis plugin registration
ctx.plugin(MyPlugin, {
  config: {
    // Plugin configuration
  }
})

// Plugin contributes services
ctx.effect('my-plugin', () => {
  ctx.on('tool/register', (event) => {
    // Register tools
  })
  return () => {
    // Cleanup on unload
  }
})`,codeLanguage:"typescript",learnSections:[{title:"The Problem: How Do You Build an Extensible Agent?",content:"Traditional agent frameworks have a monolithic core that's hard to modify. DeepSeek Harness solves this with Cordis, where every component is a plugin. This means you can swap out the model adapter, add new tools, or change the execution environment without touching the core loop.",zhTitle:"问题：如何构建可扩展的 agent？",zhContent:"传统 agent 框架有一个难以修改的单体核心。DeepSeek Harness 用 Cordis 解决了这个问题，其中每个组件都是插件。这意味着你可以替换模型适配器、添加新工具或更改执行环境，而无需接触核心循环。"},{title:"Why Plugin Architecture Wins",content:"The plugin architecture carries significant advantages: each component can be developed, tested, and deployed independently; new capabilities can be added without modifying existing code; and the entire system can be customized through configuration rather than code changes.",zhTitle:"为什么插件架构胜出",zhContent:"插件架构具有显著优势：每个组件可以独立开发、测试和部署；可以在不修改现有代码的情况下添加新能力；整个系统可以通过配置而非代码更改进行定制。"},{title:"Real Implementation: Cordis Context",content:"In DeepSeek Harness, the Cordis context (ctx) is the central registry. Plugins register services, events, and effects through ctx. The ctx.effect() method ensures proper cleanup when plugins unload. This reversible effect pattern prevents memory leaks and ensures clean component lifecycle management.",zhTitle:"真实实现：Cordis 上下文",zhContent:"在 DeepSeek Harness 中，Cordis 上下文 (ctx) 是中央注册表。插件通过 ctx 注册服务、事件和效果。ctx.effect() 方法确保插件卸载时的正确清理。这种可逆效果模式防止内存泄漏并确保干净的组件生命周期管理。"}],designHighlights:[{en:"Every contribution goes through ctx.effect() or ctx.on(), and a registry's register() returns the disposer. This ensures all registrations are reversible.",zh:"每个贡献都通过 ctx.effect() 或 ctx.on() 进行，注册表的 register() 返回 disposer。这确保所有注册都是可逆的。"},{en:"Plugins are loaded in order from bundles, and each layer can patch the config below it. This enables incremental customization without fork.",zh:"插件按 bundle 顺序加载，每层都可以修补下面的配置。这实现了增量定制而无需 fork。"}],flowchartSvg:`<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs>
    <marker id="arrow-s01" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <rect x="190" y="10" width="120" height="40" rx="20" fill="#1e40af" opacity="0.9"/>
  <text x="250" y="35" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Boot</text>
  <line x1="250" y1="50" x2="250" y2="75" stroke="#666" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <rect x="160" y="75" width="180" height="45" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="250" y="102" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Load Bundles</text>
  <line x1="250" y1="120" x2="250" y2="145" stroke="#666" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <rect x="160" y="145" width="180" height="45" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="250" y="172" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Mount Plugins</text>
  <line x1="250" y1="190" x2="250" y2="215" stroke="#666" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <rect x="160" y="215" width="180" height="45" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="250" y="242" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Register Services</text>
  <line x1="250" y1="260" x2="250" y2="285" stroke="#666" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <rect x="160" y="285" width="180" height="45" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="250" y="312" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Ready</text>
</svg>`,annotatedCode:{overview:{en:"Cordis plugin lifecycle",zh:"Cordis 插件生命周期"},annotations:[{lineStart:1,lineEnd:5,text:"Plugin registration with config",zhText:"带配置的插件注册"},{lineStart:7,lineEnd:12,text:"Effect registration with cleanup",zhText:"带清理的效果注册"}],flowSummary:{en:"Boot → Load → Mount → Register → Ready",zh:"启动 → 加载 → 挂载 → 注册 → 就绪"}},claudeCodeComparison:{en:"DeepSeek Harness uses Cordis plugins; Claude Code uses monolithic core with CLI flags.",zh:"DeepSeek Harness 使用 Cordis 插件；Claude Code 使用带 CLI 标志的单体核心。"}},s02:{description:"The session log is the source of truth for the agent. It's an append-only event log that stores every fact the model sees. This design ensures that all model-visible information can be reconstructed from the log.",zhDescription:"会话日志是 agent 的单一事实来源。它是一个追加写入的事件日志，存储模型看到的每个事实。这种设计确保所有模型可见的信息都可以从日志中重建。",codeSample:`// Session event types
type SessionEvent =
  | UserMessage
  | AssistantMessage
  | ToolCall
  | ToolResult
  | TurnStart
  | TurnEnd

// Append to session log
ctx.sessions.append(sessionId, {
  type: 'user/message',
  content: message,
  timestamp: Date.now()
})`,codeLanguage:"typescript",learnSections:[{title:"Why Append-Only?",content:"An append-only log ensures data integrity. Events are never modified or deleted, only appended. This makes the log reliable for debugging, auditing, and reconstructing model context.",zhTitle:"为什么是追加写入？",zhContent:"追加写入的日志确保数据完整性。事件永远不会被修改或删除，只能被追加。这使日志在调试、审计和重建模型上下文时可靠。"},{title:"Projection Seam",content:"The session projection system allows different consumers to read the session state in different ways. Each projection folds committed events incrementally, providing efficient access to specific views of the session data.",zhTitle:"投影接缝",zhContent:"会话投影系统允许不同的消费者以不同的方式读取会话状态。每个投影增量折叠已提交的事件，提供对会话数据特定视图的高效访问。"}],designHighlights:[{en:"Model-visible means logged: anything that reaches a model request must be reconstructable from the session log.",zh:"模型可见即已记录：到达模型请求的任何内容都必须能从会话日志中重建。"},{en:"Session consumers know only the current logical format, with adjacent migration for historical data.",zh:"会话消费者只知道当前逻辑格式，历史数据通过相邻迁移处理。"}],flowchartSvg:`<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s02" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="50" y="50" width="120" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="110" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">User Message</text>
  <line x1="170" y1="70" x2="230" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s02)"/>
  <rect x="230" y="50" width="120" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="290" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Session Log</text>
  <line x1="350" y1="70" x2="410" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s02)"/>
  <rect x="410" y="50" width="80" height="40" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="450" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Model</text>
  <rect x="50" y="150" width="120" height="40" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="110" y="175" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Tool Call</text>
  <line x1="170" y1="170" x2="230" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrow-s02)"/>
  <rect x="230" y="150" width="120" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="290" y="175" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Session Log</text>
  <line x1="350" y1="170" x2="410" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrow-s02)"/>
  <rect x="410" y="150" width="80" height="40" rx="6" fill="#ef4444" opacity="0.9"/>
  <text x="450" y="175" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Execute</text>
</svg>`,annotatedCode:{overview:{en:"Session event append",zh:"会话事件追加"},annotations:[{lineStart:1,lineEnd:8,text:"Session event type definitions",zhText:"会话事件类型定义"},{lineStart:10,lineEnd:16,text:"Append user message to log",zhText:"追加用户消息到日志"}],flowSummary:{en:"Event → Append → Log → Reconstruct",zh:"事件 → 追加 → 日志 → 重建"}},claudeCodeComparison:{en:"Both use append-only logs, but DeepSeek Harness exposes the log as a formal seam.",zh:"两者都使用追加写入的日志，但 DeepSeek Harness 将日志暴露为正式接缝。"}},s03:{description:"The agent loop manages turns and steps. A step is one model request plus the tools it calls. A turn groups zero or more steps into a coherent unit of work. This lifecycle management ensures proper ordering and cleanup.",zhDescription:"Agent 循环管理轮次和步骤。步骤是一次模型请求加工具调用。轮次将零个或多个步骤分组为连贯的工作单元。这种生命周期管理确保正确的顺序和清理。",codeSample:`// Turn lifecycle
async function runTurn(agent: Agent) {
  ctx.emit('turn/start', { agentId: agent.id })
  
  while (true) {
    const input = await claimNextStepInput(agent)
    if (!input) break
    
    ctx.emit('step/start', { agentId: agent.id })
    const response = await callLLM(agent, input)
    const tools = await executeTools(response.toolCalls)
    ctx.emit('step/end', { agentId: agent.id })
    
    if (!response.shouldContinue) break
  }
  
  ctx.emit('turn/end', { agentId: agent.id })
}`,codeLanguage:"typescript",learnSections:[{title:"Turns vs Steps",content:"Understanding the distinction is crucial: a step is atomic (one LLM call + tools), while a turn is semantic (a complete unit of work). A turn might contain multiple steps if the model needs to call tools iteratively.",zhTitle:"轮次 vs 步骤",zhContent:"理解区别至关重要：步骤是原子的（一次 LLM 调用 + 工具），而轮次是语义的（完整的工作单元）。如果模型需要迭代调用工具，一个轮次可能包含多个步骤。"},{title:"Event-Driven Lifecycle",content:"The loop emits events at each lifecycle point. This allows plugins to hook into turn/start, step/end, and other points without modifying the loop itself.",zhTitle:"事件驱动的生命周期",zhContent:"循环在每个生命周期点发出事件。这允许插件在 turn/start、step/end 和其他点挂钩，而无需修改循环本身。"}],designHighlights:[{en:"A rejected or empty first claim still closes a durable turn that spent no step, so the log records the attempt.",zh:"被拒绝或空的首次声明仍会关闭一个未执行步骤的持久轮次，因此日志会记录这次尝试。"},{en:"The loop handles multiple exit paths: tool_use continuation, step limits, context overflow, and interruption signals.",zh:"循环处理多个退出路径：tool_use 延续、步骤限制、上下文溢出和中断信号。"}],flowchartSvg:`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s03" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="240" y="10" width="120" height="40" rx="20" fill="#1e40af" opacity="0.9"/>
  <text x="300" y="35" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Turn Start</text>
  <line x1="300" y1="50" x2="300" y2="75" stroke="#666" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <rect x="240" y="75" width="120" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="300" y="100" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Claim Input</text>
  <line x1="300" y1="115" x2="300" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <polygon points="300,140 400,180 300,220 200,180" fill="#f59e0b" opacity="0.9"/>
  <text x="300" y="185" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Has Input?</text>
  <line x1="300" y1="220" x2="300" y2="245" stroke="#666" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <rect x="240" y="245" width="120" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="300" y="270" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Step Start</text>
  <line x1="300" y1="285" x2="300" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <rect x="240" y="310" width="120" height="40" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="300" y="335" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Call LLM</text>
  <line x1="300" y1="350" x2="300" y2="375" stroke="#666" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <rect x="240" y="375" width="120" height="40" rx="20" fill="#ef4444" opacity="0.9"/>
  <text x="300" y="400" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Turn End</text>
</svg>`,flowchartHtml:"s03-workflow.html",annotatedCode:{overview:{en:"Turn/step lifecycle",zh:"轮次/步骤生命周期"},annotations:[{lineStart:1,lineEnd:3,text:"Turn start event",zhText:"轮次开始事件"},{lineStart:5,lineEnd:8,text:"Input claim loop",zhText:"输入声明循环"},{lineStart:10,lineEnd:14,text:"Step execution",zhText:"步骤执行"}],flowSummary:{en:"Turn → Claim → Step → LLM → Tools → Repeat",zh:"轮次 → 声明 → 步骤 → LLM → 工具 → 重复"}},claudeCodeComparison:{en:"DeepSeek Harness has formal turn/step lifecycle; Claude Code has simpler while loop.",zh:"DeepSeek Harness 有正式的轮次/步骤生命周期；Claude Code 有更简单的 while 循环。"}},s04:{description:"The tool system provides a scoped registry with pre/post execution pipeline. Tools are registered with guards that validate inputs and outputs, and the pipeline handles telemetry and error recovery.",zhDescription:"工具系统提供带预执行/后执行管道的作用域注册表。工具通过守卫注册，守卫验证输入和输出，管道处理遥测和错误恢复。",codeSample:`// Tool registration
ctx.tools.register({
  name: 'bash',
  description: 'Execute bash commands',
  schema: z.object({
    command: z.string(),
    workdir: z.string().optional()
  }),
  execute: async (params, context) => {
    // Pre-execution guards
    await context.guards.preExecute(params)
    
    // Execute
    const result = await runBash(params.command)
    
    // Post-execution
    await context.guards.postExecute(result)
    return result
  }
})`,codeLanguage:"typescript",learnSections:[{title:"Scoped Registration",content:"Tools can be scoped to specific agents or sessions. This allows different agents to have different tool sets, enabling specialization without global pollution.",zhTitle:"作用域注册",zhContent:"工具可以限定在特定的 agent 或会话范围内。这允许不同的 agent 拥有不同的工具集，实现专业化而无需全局污染。"},{title:"Guard Pipeline",content:"The pre/post execution pipeline provides validation, telemetry, and error recovery. Guards can reject dangerous operations, log execution metrics, or transform results.",zhTitle:"守卫管道",zhContent:"预执行/后执行管道提供验证、遥测和错误恢复。守卫可以拒绝危险操作、记录执行指标或转换结果。"}],designHighlights:[{en:"Tools are registered with schemas that enable automatic validation and UI generation.",zh:"工具通过模式注册，支持自动验证和 UI 生成。"},{en:"The pipeline pattern allows cross-cutting concerns like logging and rate limiting without polluting tool code.",zh:"管道模式允许日志记录和速率限制等横切关注点，而不会污染工具代码。"}],flowchartSvg:`<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s04" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="50" y="50" width="100" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="100" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Tool Call</text>
  <line x1="150" y1="70" x2="200" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s04)"/>
  <rect x="200" y="50" width="100" height="40" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="250" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Pre Guard</text>
  <line x1="300" y1="70" x2="350" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s04)"/>
  <rect x="350" y="50" width="100" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="400" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Execute</text>
  <line x1="400" y1="90" x2="400" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrow-s04)"/>
  <rect x="350" y="140" width="100" height="40" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="400" y="165" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Post Guard</text>
  <line x1="350" y1="160" x2="300" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrow-s04)"/>
  <rect x="200" y="140" width="100" height="40" rx="6" fill="#ef4444" opacity="0.9"/>
  <text x="250" y="165" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Result</text>
</svg>`,annotatedCode:{overview:{en:"Tool registration and execution",zh:"工具注册和执行"},annotations:[{lineStart:1,lineEnd:12,text:"Tool registration with schema",zhText:"带模式的工具注册"},{lineStart:14,lineEnd:20,text:"Execution with guards",zhText:"带守卫的执行"}],flowSummary:{en:"Call → Pre Guard → Execute → Post Guard → Result",zh:"调用 → 预守卫 → 执行 → 后守卫 → 结果"}},claudeCodeComparison:{en:"DeepSeek Harness has formal guard pipeline; Claude Code has simpler tool execution.",zh:"DeepSeek Harness 有正式的守卫管道；Claude Code 有更简单的工具执行。"}},s05:{description:"Capability seams follow the three-role pattern: Service Definition declares the interface, Service Provider implements it, and Consumer uses it. Swapping one provider changes the whole product.",zhDescription:"能力接缝遵循三角色模式：服务定义声明接口，服务提供者实现它，消费者使用它。替换一个提供者就能改变整个产品。",codeSample:`// Service Definition
interface ShellService {
  execute(command: string): Promise<Result>
}

// Service Provider
class LocalShell implements ShellService {
  async execute(command: string) {
    return await exec(command)
  }
}

// Consumer
ctx.shell.execute('ls -la')`,codeLanguage:"typescript",learnSections:[{title:"Why Three Roles?",content:"Separating definition, implementation, and consumption allows each to evolve independently. You can change the provider without affecting consumers, or add new consumers without modifying the provider.",zhTitle:"为什么是三个角色？",zhContent:"分离定义、实现和消费允许各自独立演进。你可以在不影响消费者的情况下更改提供者，或者在不修改提供者的情况下添加新的消费者。"},{title:"Provider Swapping",content:"The power of seams is provider swapping. Point the shell provider at a remote sandbox, and Bash, PTY, and LSP all move with it. No code changes required.",zhTitle:"提供者替换",zhContent:"接缝的力量在于提供者替换。将 shell 提供者指向远程沙箱，Bash、PTY 和 LSP 都会随之移动。无需代码更改。"}],designHighlights:[{en:"A package may combine roles, but one role alone is not a seam. Adding a capability means designing all three.",zh:"一个包可以组合角色，但单独一个角色不是接缝。添加能力意味着设计所有三个角色。"},{en:"Filesystem and subprocess providers share one execution world, so pointing them at a remote sandbox moves Bash, PTY, and LSP with them.",zh:"文件系统和子进程提供者共享一个执行世界，因此将它们指向远程沙箱会使 Bash、PTY 和 LSP 随之移动。"}],flowchartSvg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s05" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="50" y="50" width="120" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="110" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Definition</text>
  <line x1="170" y1="70" x2="230" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s05)"/>
  <rect x="230" y="50" width="120" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="290" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Provider</text>
  <line x1="350" y1="70" x2="410" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s05)"/>
  <rect x="410" y="50" width="80" height="40" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="450" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Consumer</text>
  <rect x="230" y="120" width="120" height="40" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="290" y="145" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Swap Provider</text>
</svg>`,annotatedCode:{overview:{en:"Capability seam pattern",zh:"能力接缝模式"},annotations:[{lineStart:1,lineEnd:4,text:"Service Definition interface",zhText:"服务定义接口"},{lineStart:7,lineEnd:12,text:"Service Provider implementation",zhText:"服务提供者实现"},{lineStart:15,lineEnd:17,text:"Consumer usage",zhText:"消费者使用"}],flowSummary:{en:"Define → Implement → Consume → Swap",zh:"定义 → 实现 → 消费 → 替换"}},claudeCodeComparison:{en:"DeepSeek Harness has formal capability seams; Claude Code has implicit providers.",zh:"DeepSeek Harness 有正式的能力接缝；Claude Code 有隐式提供者。"}},s06:{description:"The LLM layer provides message vocabulary and streaming. Providers register adapters that handle the actual API calls, while the core loop works with a unified message format.",zhDescription:"LLM 层提供消息词汇和流式处理。提供者注册适配器处理实际的 API 调用，而核心循环使用统一的消息格式。",codeSample:`// LLM adapter registration
ctx.llm.register({
  name: 'deepseek',
  complete: async (messages, options) => {
    const response = await deepseek.chat({
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      model: options.model,
      stream: true
    })
    return response
  }
})`,codeLanguage:"typescript",learnSections:[{title:"Adapter Pattern",content:"The LLM adapter pattern separates the model interface from the implementation. The core loop doesn't know which provider it's using — it just calls the registered adapter.",zhTitle:"适配器模式",zhContent:"LLM 适配器模式将模型接口与实现分离。核心循环不知道它使用的是哪个提供者——它只是调用注册的适配器。"},{title:"Streaming Support",content:"Streaming is built into the adapter pattern. Each provider implements streaming in its own way, but the core loop consumes a unified stream format.",zhTitle:"流式支持",zhContent:"流式处理内置于适配器模式中。每个提供者以自己的方式实现流式处理，但核心循环使用统一的流格式。"}],designHighlights:[{en:"The LLM layer provides message vocabulary — the same core loop works with any OpenAI-compatible API.",zh:"LLM 层提供消息词汇——同一个核心循环适用于任何兼容 OpenAI 的 API。"},{en:"Streaming is provider-specific but consumed uniformly, allowing optimized implementations per provider.",zh:"流式处理是提供者特定的但统一消费，允许每个提供者的优化实现。"}],flowchartSvg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s06" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="50" y="50" width="100" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="100" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Core Loop</text>
  <line x1="150" y1="70" x2="200" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s06)"/>
  <rect x="200" y="50" width="100" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="250" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">LLM Layer</text>
  <line x1="300" y1="70" x2="350" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s06)"/>
  <rect x="350" y="50" width="100" height="40" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="400" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Adapter</text>
  <line x1="400" y1="90" x2="400" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrow-s06)"/>
  <rect x="350" y="140" width="100" height="40" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="400" y="165" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">API Call</text>
</svg>`,annotatedCode:{overview:{en:"LLM adapter registration",zh:"LLM 适配器注册"},annotations:[{lineStart:1,lineEnd:12,text:"Adapter implementation",zhText:"适配器实现"}],flowSummary:{en:"Request → Layer → Adapter → API → Response",zh:"请求 → 层 → 适配器 → API → 响应"}},claudeCodeComparison:{en:"Both use adapter patterns, but DeepSeek Harness formalizes the seam.",zh:"两者都使用适配器模式，但 DeepSeek Harness 正式化了接缝。"}},s07:{description:"Shell execution is a capability with local, remote, or sandboxed providers all sharing one interface. This allows the same tools to work in different environments.",zhDescription:"Shell 执行是一种能力，本地、远程或沙箱提供者共享同一接口。这允许相同的工具在不同环境中工作。",codeSample:`// Shell capability seam
interface ShellService {
  execute(command: string, options?: ExecOptions): Promise<Result>
}

// Local provider
class LocalShell implements ShellService {
  async execute(command, options) {
    return await spawn(command, options)
  }
}

// Remote provider
class RemoteShell implements ShellService {
  async execute(command, options) {
    return await ssh.execute(command, options)
  }
}`,codeLanguage:"typescript",learnSections:[{title:"Provider Abstraction",content:"The shell interface abstracts execution environment. The same 'bash' tool works whether executing locally, remotely, or in a sandbox — only the provider changes.",zhTitle:"提供者抽象",zhContent:"Shell 接口抽象执行环境。相同的 'bash' 工具无论在本地、远程还是沙箱中执行都有效——只有提供者改变。"},{title:"Sandbox Integration",content:"Sandbox providers can restrict filesystem access, network calls, and process spawning. The tool code doesn't change — security is enforced at the provider level.",zhTitle:"沙箱集成",zhContent:"沙箱提供者可以限制文件系统访问、网络调用和进程生成。工具代码不变——安全性在提供者层面强制执行。"}],designHighlights:[{en:"Filesystem and subprocess providers share one execution world, so pointing them at a remote sandbox moves everything.",zh:"文件系统和子进程提供者共享一个执行世界，因此将它们指向远程沙箱会移动一切。"},{en:"Security is enforced at the provider level, not in tool code, enabling consistent policy across all tools.",zh:"安全性在提供者层面强制执行，而不是在工具代码中，实现所有工具的一致策略。"}],flowchartSvg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s07" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="50" y="50" width="100" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="100" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Tool</text>
  <line x1="150" y1="70" x2="200" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s07)"/>
  <rect x="200" y="50" width="100" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="250" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Shell Seam</text>
  <line x1="300" y1="70" x2="350" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s07)"/>
  <rect x="350" y="20" width="100" height="30" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="400" y="40" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Local</text>
  <rect x="350" y="55" width="100" height="30" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="400" y="75" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Remote</text>
  <rect x="350" y="90" width="100" height="30" rx="6" fill="#ef4444" opacity="0.9"/>
  <text x="400" y="110" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Sandbox</text>
</svg>`,annotatedCode:{overview:{en:"Shell capability seam",zh:"Shell 能力接缝"},annotations:[{lineStart:1,lineEnd:4,text:"Shell interface definition",zhText:"Shell 接口定义"},{lineStart:7,lineEnd:12,text:"Local provider",zhText:"本地提供者"},{lineStart:15,lineEnd:20,text:"Remote provider",zhText:"远程提供者"}],flowSummary:{en:"Tool → Seam → Provider → Environment",zh:"工具 → 接缝 → 提供者 → 环境"}},claudeCodeComparison:{en:"DeepSeek Harness has pluggable shell providers; Claude Code has fixed local execution.",zh:"DeepSeek Harness 有可插拔的 shell 提供者；Claude Code 有固定的本地执行。"}},s08:{description:"The subagent system enables delegation through a capability seam. Child agents get clean context while preserving the main thread through delegation.",zhDescription:"子代理系统通过能力接缝实现委派。子代理获得干净的上下文，同时通过委派保留主线程。",codeSample:`// Subagent delegation
const childAgent = await ctx.agents.create({
  profile: 'headless',
  task: 'Analyze this codebase',
  parent: currentAgent.id
})

// Child agent runs independently
const result = await childAgent.run()

// Parent can continue while child runs
console.log('Child result:', result)`,codeLanguage:"typescript",learnSections:[{title:"Clean Context",content:"Each subagent gets a fresh context with only the tools it needs. This prevents context pollution and allows specialization.",zhTitle:"干净的上下文",zhContent:"每个子代理获得一个只包含所需工具的新鲜上下文。这防止上下文污染并允许专业化。"},{title:"Delegation Pattern",content:"The parent agent can continue working while the child runs. Results are delivered through the event system when the child completes.",zhTitle:"委派模式",zhContent:"父 agent 可以在子代理运行时继续工作。结果在子代理完成时通过事件系统交付。"}],designHighlights:[{en:"Subagent providers vary widely behind one interface, from fresh child agents to delegated turns in other products.",zh:"子代理提供者在一个接口后面变化很大，从全新的子代理到其他产品中的委派轮次。"},{en:"The parent-child relationship is tracked through the session log, enabling full audit trail.",zh:"父子关系通过会话日志跟踪，实现完整的审计跟踪。"}],flowchartSvg:`<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s08" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="200" y="30" width="120" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="260" y="55" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Parent Agent</text>
  <line x1="230" y1="70" x2="150" y2="120" stroke="#666" stroke-width="2" marker-end="url(#arrow-s08)"/>
  <line x1="290" y1="70" x2="370" y2="120" stroke="#666" stroke-width="2" marker-end="url(#arrow-s08)"/>
  <rect x="100" y="120" width="100" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="150" y="145" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Child Agent 1</text>
  <rect x="320" y="120" width="100" height="40" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="370" y="145" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Child Agent 2</text>
  <line x1="150" y1="160" x2="150" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrow-s08)"/>
  <line x1="370" y1="160" x2="370" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrow-s08)"/>
  <rect x="100" y="210" width="100" height="40" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="150" y="235" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Result 1</text>
  <rect x="320" y="210" width="100" height="40" rx="6" fill="#ef4444" opacity="0.9"/>
  <text x="370" y="235" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Result 2</text>
</svg>`,annotatedCode:{overview:{en:"Subagent delegation",zh:"子代理委派"},annotations:[{lineStart:1,lineEnd:6,text:"Create child agent",zhText:"创建子代理"},{lineStart:9,lineEnd:12,text:"Run and collect results",zhText:"运行并收集结果"}],flowSummary:{en:"Create → Delegate → Run → Collect",zh:"创建 → 委派 → 运行 → 收集"}},claudeCodeComparison:{en:"Both have subagents, but DeepSeek Harness formalizes the delegation seam.",zh:"两者都有子代理，但 DeepSeek Harness 正式化了委派接缝。"}},s09:{description:"Profiles stack bundles in order, and each layer can patch the config below it. This enables incremental customization without fork.",zhDescription:"配置按顺序堆叠 bundle，每层都可以修补下面的配置。这实现了增量定制而无需 fork。",codeSample:`# cordis.yml profile
bundles:
  - dsh-base        # Foundation layer
  - dsh-web-app     # Web UI layer

# User patch layer
patch:
  - id: dsh-shell
    config:
      provider: remote
      endpoint: ssh://server
  - id: dsh-llm
    config:
      provider: deepseek
      model: deepseek-chat`,codeLanguage:"yaml",learnSections:[{title:"Layer Composition",content:"Profiles apply bundles in order: each bundle adds its plugins, then patches can override specific configs. This creates a layered composition system.",zhTitle:"层组合",zhContent:"配置按顺序应用 bundle：每个 bundle 添加其插件，然后补丁可以覆盖特定配置。这创建了一个分层组合系统。"},{title:"Patch System",content:"Patches target rows by id and replace their whole config. This allows precise customization without touching the base bundles.",zhTitle:"补丁系统",zhContent:"补丁通过 id 目标行并替换其整个配置。这允许精确的定制而无需接触基础 bundle。"}],designHighlights:[{en:"Custom profiles default to live patch reload, while shipped profiles apply all layers once at startup.",zh:"自定义配置默认实时补丁重载，而内置配置在启动时应用所有层一次。"},{en:"To see the tree your machine boots, run: dsh --profile web --dump-config",zh:"要查看你的机器启动的树，运行：dsh --profile web --dump-config"}],flowchartSvg:`<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s09" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="180" y="20" width="140" height="35" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="250" y="42" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Profile</text>
  <line x1="250" y1="55" x2="250" y2="80" stroke="#666" stroke-width="2" marker-end="url(#arrow-s09)"/>
  <rect x="180" y="80" width="140" height="35" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="250" y="102" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Bundle Layer 1</text>
  <line x1="250" y1="115" x2="250" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrow-s09)"/>
  <rect x="180" y="140" width="140" height="35" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="250" y="162" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Bundle Layer 2</text>
  <line x1="250" y1="175" x2="250" y2="200" stroke="#666" stroke-width="2" marker-end="url(#arrow-s09)"/>
  <rect x="180" y="200" width="140" height="35" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="250" y="222" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">User Patches</text>
  <line x1="250" y1="235" x2="250" y2="260" stroke="#666" stroke-width="2" marker-end="url(#arrow-s09)"/>
  <rect x="180" y="260" width="140" height="35" rx="6" fill="#ef4444" opacity="0.9"/>
  <text x="250" y="282" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Running Tree</text>
</svg>`,annotatedCode:{overview:{en:"Profile composition",zh:"配置组合"},annotations:[{lineStart:1,lineEnd:4,text:"Bundle stack order",zhText:"Bundle 堆叠顺序"},{lineStart:7,lineEnd:14,text:"User patch overrides",zhText:"用户补丁覆盖"}],flowSummary:{en:"Profile → Bundles → Patches → Running Tree",zh:"配置 → Bundle → 补丁 → 运行树"}},claudeCodeComparison:{en:"DeepSeek Harness has formal profile/bundle composition; Claude Code has simpler config.",zh:"DeepSeek Harness 有正式的配置/bundle 组合；Claude Code 有更简单的配置。"}},s10:{description:"The event system provides typed extension points with waterfall semantics. Listeners must call next() to delegate, otherwise they short-circuit the chain.",zhDescription:"事件系统提供具有 waterfall 语义的类型化扩展点。监听器必须调用 next() 来委派，否则会短路链。",codeSample:`// Event registration with waterfall
ctx.on('tools/pre-execute', (event, next) => {
  console.log('Tool:', event.toolName)
  
  // Validate
  if (event.toolName === 'bash' && !event.params.command) {
    throw new Error('Command required')
  }
  
  // MUST call next() to continue chain
  await next()
  
  // Post-execution logic
  console.log('Result:', event.result)
})`,codeLanguage:"typescript",learnSections:[{title:"Waterfall Semantics",content:"Waterfall listeners form a chain. Each listener must call next() to pass control to the next listener. If you don't call next(), the chain short-circuits and subsequent listeners never run.",zhTitle:"Waterfall 语义",zhContent:"Waterfall 监听器形成一个链。每个监听器必须调用 next() 将控制权传递给下一个监听器。如果不调用 next()，链会短路，后续监听器永远不会运行。"},{title:"Event Domains",content:"Events are organized into domains: session events (durable), agent events (live), and capability events (policy). Choosing the right domain is the first decision in most changes.",zhTitle:"事件域",zhContent:"事件组织成域：会话事件（持久）、agent 事件（实时）和能力事件（策略）。选择正确的域是大多数更改的第一个决策。"}],designHighlights:[{en:"Waterfall listeners MUST call next() to delegate; returning without it short-circuits the chain.",zh:"Waterfall 监听器必须调用 next() 来委派；不调用它返回会短路链。"},{en:"Session events are durable facts appended to the log; agent events carry live agents for in-flight work.",zh:"会话事件是追加到日志的持久事实；agent 事件携带实时 agent 用于进行中的工作。"}],flowchartSvg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs><marker id="arrow-s10" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker></defs>
  <rect x="30" y="50" width="80" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="70" y="75" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Event</text>
  <line x1="110" y1="70" x2="150" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s10)"/>
  <rect x="150" y="50" width="80" height="40" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="190" y="75" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Listener 1</text>
  <line x1="230" y1="70" x2="270" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s10)"/>
  <rect x="270" y="50" width="80" height="40" rx="6" fill="#8b5cf6" opacity="0.9"/>
  <text x="310" y="75" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Listener 2</text>
  <line x1="350" y1="70" x2="390" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s10)"/>
  <rect x="390" y="50" width="80" height="40" rx="6" fill="#f59e0b" opacity="0.9"/>
  <text x="430" y="75" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Listener 3</text>
  <text x="250" y="150" text-anchor="middle" fill="#666" font-size="12" font-family="system-ui">Each must call next() to continue</text>
</svg>`,flowchartHtml:"s10-lifecycle.html",annotatedCode:{overview:{en:"Waterfall event listener",zh:"Waterfall 事件监听器"},annotations:[{lineStart:1,lineEnd:8,text:"Pre-execution validation",zhText:"预执行验证"},{lineStart:10,lineEnd:11,text:"MUST call next()",zhText:"必须调用 next()"},{lineStart:13,lineEnd:15,text:"Post-execution logic",zhText:"后执行逻辑"}],flowSummary:{en:"Event → Validate → next() → Continue",zh:"事件 → 验证 → next() → 继续"}},claudeCodeComparison:{en:"DeepSeek Harness has formal waterfall events; Claude Code has simpler hooks.",zh:"DeepSeek Harness 有正式的 waterfall 事件；Claude Code 有更简单的钩子。"}}};var d=e.i(32674);function c({content:e,annotations:i,locale:o,t:n}){let s=e.learnSections||[],[a,l]=(0,r.useState)(!1);return(0,t.jsxs)("div",{className:"flex flex-col gap-8",children:[a&&(0,t.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4",onClick:()=>l(!1),children:(0,t.jsxs)("div",{className:"relative max-h-[90vh] max-w-[95vw] overflow-auto rounded-xl bg-white p-6 dark:bg-zinc-950",children:[(0,t.jsx)("button",{onClick:()=>l(!1),className:"absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600",children:"✕"}),e.flowchartHtml?(0,t.jsx)("iframe",{src:`/learn_harness/diagrams/${e.flowchartHtml}`,className:"min-w-[800px] min-h-[600px] border-0",title:"Architecture Diagram"}):(0,t.jsx)("div",{className:"min-w-[500px]",dangerouslySetInnerHTML:{__html:e.flowchartSvg}})]})}),(0,t.jsx)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===o?e.zhDescription:e.description})}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"mb-3 flex items-center justify-between",children:[(0,t.jsx)("h3",{className:"text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===o?"架构流程图":"Architecture Flow"}),(0,t.jsx)("button",{onClick:()=>l(!0),className:"text-xs text-[var(--color-text-secondary)] underline underline-offset-2 hover:text-[var(--color-text)]",children:"zh"===o?"全屏查看":"Full Screen"})]}),e.flowchartHtml?(0,t.jsx)("iframe",{src:`/learn_harness/diagrams/${e.flowchartHtml}`,className:"w-full h-[400px] border-0 rounded-xl",title:"Architecture Diagram"}):(0,t.jsx)("div",{className:"overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-4 dark:bg-zinc-950 max-w-xl mx-auto",dangerouslySetInnerHTML:{__html:e.flowchartSvg}})]}),s.length>0&&(0,t.jsx)("div",{className:"flex flex-col gap-6",children:s.map((e,i)=>(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-2 text-base font-bold",children:"zh"===o?e.zhTitle:e.title}),(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===o?e.zhContent:e.content})]},i))}),e.designHighlights.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:n("design_decisions")}),(0,t.jsx)("div",{className:"flex flex-col gap-3",children:e.designHighlights.map((e,i)=>(0,t.jsx)("div",{className:"rounded-lg border-l-2 border-[var(--color-text)] bg-[var(--color-bg-secondary)] px-4 py-3",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===o?e.zh:e.en})},i))})]}),e.claudeCodeComparison&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===o?"对比 Claude Code":"Comparison: Claude Code"}),(0,t.jsx)("div",{className:"rounded-lg border border-[var(--color-border)] bg-gradient-to-r from-amber-50/50 to-transparent p-4 dark:from-amber-950/10",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===o?e.claudeCodeComparison.zh:e.claudeCodeComparison.en})})]}),i?.decisions&&i.decisions.length>0&&(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)("h3",{className:"text-base font-bold",children:"zh"===o?"深入设计决策":"Deep Dive: Design Decisions"}),i.decisions.map(e=>(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] p-4",children:[(0,t.jsx)("h4",{className:"font-semibold",children:"zh"===o?e.zh.title:e.title}),(0,t.jsx)("p",{className:"mt-2 text-sm text-[var(--color-text-secondary)]",children:"zh"===o?e.zh.description:e.description}),(0,t.jsxs)("div",{className:"mt-3 rounded-lg bg-[var(--color-bg-secondary)] p-3",children:[(0,t.jsx)("span",{className:"text-xs font-medium text-[var(--color-text-secondary)]",children:"zh"===o?"备选方案: ":"Alternatives: "}),(0,t.jsx)("span",{className:"text-xs text-[var(--color-text-secondary)]",children:"zh"===o?e.zh.alternatives:e.alternatives})]})]},e.id))]})]})}function h({annotations:e,locale:i}){return e.overview.en||e.flowSummary.en?(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===i?e.overview.zh:e.overview.en})}),e.annotations.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===i?"逐行解析":"Line-by-Line Analysis"}),(0,t.jsx)("div",{className:"flex flex-col gap-3",children:e.annotations.map((e,r)=>(0,t.jsxs)("div",{className:"rounded-lg border border-[var(--color-border)] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-[var(--color-bg-secondary)] px-3 py-1.5 text-xs font-mono text-[var(--color-text-secondary)]",children:"zh"===i?`行 ${e.lineStart}${e.lineEnd>e.lineStart?`-${e.lineEnd}`:""}`:`Line ${e.lineStart}${e.lineEnd>e.lineStart?`-${e.lineEnd}`:""}`}),(0,t.jsx)("div",{className:"px-3 py-2 text-sm text-[var(--color-text-secondary)]",children:"zh"===i?e.zhText:e.text})]},r))})]}),e.flowSummary.en&&(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:[(0,t.jsx)("h4",{className:"mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===i?"执行流程":"Execution Flow"}),(0,t.jsx)("p",{className:"text-sm font-mono text-[var(--color-text-secondary)]",children:"zh"===i?e.flowSummary.zh:e.flowSummary.en})]})]}):null}function x({versionId:e,annotations:x}){let f=(0,o.useTranslations)("version"),m=(0,o.useLocale)(),p=n.VERSION_META[e],u=l[e],[g,y]=(0,r.useState)("learn");if(!p||!u)return null;let w=n.VERSION_ORDER.indexOf(e),v=w>0?n.VERSION_ORDER[w-1]:null,b=w<n.VERSION_ORDER.length-1?n.VERSION_ORDER[w+1]:null;return(0,t.jsxs)("div",{className:"flex flex-col gap-8 pb-16",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-[var(--color-text-secondary)]",children:[(0,t.jsx)(i.default,{href:`/${m}`,className:"hover:text-[var(--color-text)]",children:"zh"===m?"首页":"Home"}),(0,t.jsx)("span",{children:"/"}),(0,t.jsx)("span",{children:e})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(s.LayerBadge,{layer:p.layer,children:e}),(0,t.jsxs)("span",{className:"text-xs tabular-nums text-[var(--color-text-secondary)]",children:[p.loc," ",f("loc")]})]}),(0,t.jsx)("h1",{className:"mt-3 text-3xl font-bold",children:p.title}),(0,t.jsxs)("p",{className:"mt-1 text-lg text-[var(--color-text-secondary)]",children:["“",p.subtitle,"”"]})]}),(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:[(0,t.jsxs)("span",{className:"text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:[f("key_insight"),":"]}),(0,t.jsx)("p",{className:"mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]",children:p.keyInsight})]}),(0,t.jsx)("div",{className:"border-b border-[var(--color-border)]",children:(0,t.jsx)("div",{className:"flex gap-6",children:["learn","code"].map(e=>(0,t.jsx)("button",{onClick:()=>y(e),className:(0,d.cn)("pb-2 text-sm font-medium transition-colors",g===e?"border-b-2 border-[var(--color-text)] text-[var(--color-text)]":"text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"),children:"learn"===e?"zh"===m?"学习与设计":"Learn & Design":f("tab_code")},e))})}),(0,t.jsxs)("div",{children:["learn"===g&&(0,t.jsx)(c,{content:u,annotations:x,locale:m,t:f}),"code"===g&&(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)(h,{annotations:u.annotatedCode,locale:m}),(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-zinc-950 overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5",children:[(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-red-500/70"}),(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-yellow-500/70"}),(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-green-500/70"}),(0,t.jsxs)("span",{className:"ml-3 text-xs text-zinc-500",children:["code.","python"===u.codeLanguage?"py":"typescript"===u.codeLanguage?"ts":"js"]})]}),(0,t.jsx)("pre",{className:"overflow-x-auto p-4 text-sm leading-relaxed",children:(0,t.jsx)("code",{className:"text-zinc-300 whitespace-pre font-mono",children:u.codeSample})})]})]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between border-t border-[var(--color-border)] pt-6",children:[v?(0,t.jsxs)(i.default,{href:`/${m}/${v}`,className:"flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",children:[(0,t.jsx)("span",{"aria-hidden":"true",children:"←"})," ",f("prev"),": ",n.VERSION_META[v].title]}):(0,t.jsx)("div",{}),b?(0,t.jsxs)(i.default,{href:`/${m}/${b}`,className:"flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",children:[f("next"),": ",n.VERSION_META[b].title," ",(0,t.jsx)("span",{"aria-hidden":"true",children:"→"})]}):(0,t.jsx)("div",{})]}),(0,t.jsx)(a,{})]})}e.s(["SessionDetail",()=>x],32953)}]);