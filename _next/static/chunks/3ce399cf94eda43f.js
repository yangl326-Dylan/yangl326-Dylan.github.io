(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32953,e=>{"use strict";var t=e.i(10691),i=e.i(23999),n=e.i(90696),r=e.i(63782),o=e.i(79179),s=e.i(44429);function a(){return(0,t.jsx)("footer",{className:"border-t border-[var(--color-border)] py-8 text-center text-sm text-[var(--color-text-secondary)]",children:(0,t.jsx)("p",{children:"Learn OpenCode — Built with Next.js"})})}let l={s01:{description:"DeepSeek Harness is built on Cordis, an everything-is-a-plugin framework. There is no privileged core — every part, including the model adapter, tool registry, session log, and agent loop itself, is a replaceable plugin. This architecture makes the harness infinitely extensible.",zhDescription:"DeepSeek Harness 构建在 Cordis 之上，这是一个一切皆插件的框架。没有特权核心——包括模型适配器、工具注册表、会话日志和 agent 循环本身在内的每个部分都是可替换的插件。这种架构使 harness 具有无限的可扩展性。",codeSample:`// Cordis plugin registration
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
})`,codeLanguage:"typescript",learnSections:[{title:"The Problem: How Do You Build an Extensible Agent?",content:"Traditional agent frameworks have a monolithic core that's hard to modify. DeepSeek Harness solves this with Cordis, where every component is a plugin. This means you can swap out the model adapter, add new tools, or change the execution environment without touching the core loop. The Cordis context (ctx) acts as a central registry where plugins register services, events, and effects.",zhTitle:"问题：如何构建可扩展的 agent？",zhContent:"传统 agent 框架有一个难以修改的单体核心。DeepSeek Harness 用 Cordis 解决了这个问题，其中每个组件都是插件。这意味着你可以替换模型适配器、添加新工具或更改执行环境，而无需接触核心循环。Cordis 上下文 (ctx) 作为中央注册表，插件在此注册服务、事件和效果。"},{title:"Why Plugin Architecture Wins",content:"The plugin architecture carries significant advantages: each component can be developed, tested, and deployed independently; new capabilities can be added without modifying existing code; and the entire system can be customized through configuration rather than code changes. The bundle system allows layering of plugin configurations.",zhTitle:"为什么插件架构胜出",zhContent:"插件架构具有显著优势：每个组件可以独立开发、测试和部署；可以在不修改现有代码的情况下添加新能力；整个系统可以通过配置而非代码更改进行定制。Bundle 系统允许插件配置的分层。"},{title:"Real Implementation: Cordis Context",content:"In DeepSeek Harness, the Cordis context (ctx) is the central registry. Plugins register services, events, and effects through ctx. The ctx.effect() method ensures proper cleanup when plugins unload. This reversible effect pattern prevents memory leaks and ensures clean component lifecycle management. Services are registered in a hierarchy, with child scopes inheriting from parents.",zhTitle:"真实实现：Cordis 上下文",zhContent:"在 DeepSeek Harness 中，Cordis 上下文 (ctx) 是中央注册表。插件通过 ctx 注册服务、事件和效果。ctx.effect() 方法确保插件卸载时的正确清理。这种可逆效果模式防止内存泄漏并确保干净的组件生命周期管理。服务在层级结构中注册，子作用域从父作用域继承。"}],designHighlights:[{en:"Every contribution goes through ctx.effect() or ctx.on(), and a registry's register() returns the disposer. This ensures all registrations are reversible.",zh:"每个贡献都通过 ctx.effect() 或 ctx.on() 进行，注册表的 register() 返回 disposer。这确保所有注册都是可逆的。"},{en:"Plugins are loaded in order from bundles, and each layer can patch the config below it. This enables incremental customization without fork.",zh:"插件按 bundle 顺序加载，每层都可以修补下面的配置。这实现了增量定制而无需 fork。"},{en:"The effect stack follows LIFO order for cleanup, ensuring proper teardown of dependencies.",zh:"效果栈遵循 LIFO 顺序进行清理，确保依赖关系的正确拆解。"}],flowchartSvg:`<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s01-architecture.html",annotatedCode:{overview:{en:"Cordis plugin lifecycle",zh:"Cordis 插件生命周期"},annotations:[{lineStart:1,lineEnd:5,text:"Plugin registration with config",zhText:"带配置的插件注册"},{lineStart:7,lineEnd:12,text:"Effect registration with cleanup",zhText:"带清理的效果注册"}],flowSummary:{en:"Boot → Load → Mount → Register → Ready",zh:"启动 → 加载 → 挂载 → 注册 → 就绪"}},claudeCodeComparison:{en:"DeepSeek Harness uses Cordis plugins; Claude Code uses monolithic core with CLI flags.",zh:"DeepSeek Harness 使用 Cordis 插件；Claude Code 使用带 CLI 标志的单体核心。"}},s02:{description:"The session log is the source of truth for the agent. It's an append-only event log that stores every fact the model sees. This design ensures that all model-visible information can be reconstructed from the log.",zhDescription:"会话日志是 agent 的单一事实来源。它是一个追加写入的事件日志，存储模型看到的每个事实。这种设计确保所有模型可见的信息都可以从日志中重建。",codeSample:`// Session event types
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
})`,codeLanguage:"typescript",learnSections:[{title:"Tool Definition and Registration",content:"Tools are defined declaratively with input/output schemas, enabling automatic validation and type-safe execution. The registry stores tool definitions and provides lookup by name. When a tool is registered, its schema is validated against the expected format.",zhTitle:"工具定义和注册",zhContent:"工具通过 input/output schema 声明式定义，实现自动验证和类型安全执行。注册表存储工具定义并提供按名称查找。注册工具时，其 schema 会根据预期格式进行验证。"},{title:"Validation Pipeline and Execution Guards",content:"The validation pipeline checks tool inputs against the schema before execution. Execution guards ensure only authorized tools can run, with permission checks before execution. This two-layer protection prevents malformed inputs and unauthorized access.",zhTitle:"验证管道和执行守卫",zhContent:"验证管道在执行前检查工具输入是否符合 schema。执行守卫确保只有授权的工具可以运行，在执行前进行权限检查。这种双层保护防止格式错误的输入和未授权的访问。"},{title:"Tool Presenter for Agent Consumption",content:"The tool presenter formats tool definitions for agent consumption, hiding implementation details. It provides a clean interface that the agent can use to understand available tools and their parameters.",zhTitle:"工具呈现器用于 Agent 消费",zhContent:"工具呈现器为 agent 格式化工具定义，隐藏实现细节。它提供一个干净的接口，agent 可以用它来理解可用工具及其参数。"}],designHighlights:[{en:"Tools are defined declaratively with input/output schemas, enabling automatic validation and type-safe execution.",zh:"工具通过 input/output schema 声明式定义，实现自动验证和类型安全执行。"},{en:"The execution guard pattern ensures only authorized tools can run, with permission checks before execution.",zh:"执行 guard 模式确保只有授权的工具可以运行，在执行前进行权限检查。"},{en:"Tool presenter formats tool definitions for agent consumption, hiding implementation details.",zh:"工具 presenter 为 agent 格式化工具定义，隐藏实现细节。"}],flowchartSvg:`<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s02-architecture.html",annotatedCode:{overview:{en:"Session event append",zh:"会话事件追加"},annotations:[{lineStart:1,lineEnd:8,text:"Session event type definitions",zhText:"会话事件类型定义"},{lineStart:10,lineEnd:16,text:"Append user message to log",zhText:"追加用户消息到日志"}],flowSummary:{en:"Event → Append → Log → Reconstruct",zh:"事件 → 追加 → 日志 → 重建"}},claudeCodeComparison:{en:"Both use append-only logs, but DeepSeek Harness exposes the log as a formal seam.",zh:"两者都使用追加写入的日志，但 DeepSeek Harness 将日志暴露为正式接缝。"}},s03:{description:"The agent loop manages turns and steps. A step is one model request plus the tools it calls. A turn groups zero or more steps into a coherent unit of work. This lifecycle management ensures proper ordering and cleanup.",zhDescription:"Agent 循环管理轮次和步骤。步骤是一次模型请求加工具调用。轮次将零个或多个步骤分组为连贯的工作单元。这种生命周期管理确保正确的顺序和清理。",codeSample:`// Turn lifecycle
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
}`,codeLanguage:"typescript",learnSections:[{title:"Turn/Step Lifecycle",content:"The agent loop uses a turn/step lifecycle: a turn claims a prompt, opens a session log entry, and runs steps until the model stops calling tools. Each step is one model request plus the tools it calls. This separation ensures proper ordering and cleanup.",zhTitle:"Turn/Step 生命周期",zhContent:"agent 循环使用 turn/step 生命周期：turn 获取提示，打开会话日志条目，运行 steps 直到模型停止调用工具。每个 step 是一次模型请求加上它调用的工具。这种分离确保正确的顺序和清理。"},{title:"Parallel Tool Execution",content:"Parallel-safe tool calls can run up to maxParallelToolCalls concurrently, with exclusive calls acting as ordering barriers. This maximizes throughput while maintaining correctness.",zhTitle:"并行工具执行",zhContent:"并行安全的工具调用可以并发运行最多 maxParallelToolCalls 次，独占调用作为排序屏障。这在保持正确性的同时最大化吞吐量。"},{title:"Cancellation Semantics",content:"Cancellation is cooperative: agent.cancel() aborts the current activity and clears pending work unless keepInbox is set. This ensures clean shutdown without data loss.",zhTitle:"取消语义",zhContent:"取消是协作式的：agent.cancel() 中止当前活动并清除待处理工作，除非设置了 keepInbox。这确保干净的关闭而不会丢失数据。"}],designHighlights:[{en:"The agent loop uses a turn/step lifecycle: a turn claims a prompt, opens a session log entry, and runs steps until the model stops calling tools.",zh:"agent 循环使用 turn/step 生命周期：turn 获取提示，打开会话日志条目，运行 steps 直到模型停止调用工具。"},{en:"Parallel-safe tool calls can run up to maxParallelToolCalls concurrently, with exclusive calls acting as ordering barriers.",zh:"并行安全的工具调用可以并发运行最多 maxParallelToolCalls 次，独占调用作为排序屏障。"},{en:"Cancellation is cooperative: agent.cancel() aborts the current activity and clears pending work unless keepInbox is set.",zh:"取消是协作式的：agent.cancel() 中止当前活动并清除待处理工作，除非设置了 keepInbox。"}],flowchartSvg:`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s03-sequence.html",annotatedCode:{overview:{en:"Turn/step lifecycle",zh:"轮次/步骤生命周期"},annotations:[{lineStart:1,lineEnd:3,text:"Turn start event",zhText:"轮次开始事件"},{lineStart:5,lineEnd:8,text:"Input claim loop",zhText:"输入声明循环"},{lineStart:10,lineEnd:14,text:"Step execution",zhText:"步骤执行"}],flowSummary:{en:"Turn → Claim → Step → LLM → Tools → Repeat",zh:"轮次 → 声明 → 步骤 → LLM → 工具 → 重复"}},claudeCodeComparison:{en:"DeepSeek Harness has formal turn/step lifecycle; Claude Code has simpler while loop.",zh:"DeepSeek Harness 有正式的轮次/步骤生命周期；Claude Code 有更简单的 while 循环。"}},s04:{description:"The tool system provides a scoped registry with pre/post execution pipeline. Tools are registered with guards that validate inputs and outputs, and the pipeline handles telemetry and error recovery.",zhDescription:"工具系统提供带预执行/后执行管道的作用域注册表。工具通过守卫注册，守卫验证输入和输出，管道处理遥测和错误恢复。",codeSample:`// Tool registration
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
})`,codeLanguage:"typescript",learnSections:[{title:"Provider Abstraction Layer",content:"The LLM seam provides a provider-agnostic interface, allowing seamless switching between DeepSeek, OpenAI, and other providers. This abstraction layer handles the differences between provider APIs while maintaining a consistent interface.",zhTitle:"Provider 抽象层",zhContent:"LLM seam 提供与 provider 无关的接口，允许在 DeepSeek、OpenAI 和其他 provider 之间无缝切换。这个抽象层处理 provider API 之间的差异，同时保持一致的接口。"},{title:"Retry Logic and Error Handling",content:"Retry logic handles transient failures with exponential backoff, ensuring robust model communication. The system automatically retries failed requests while respecting rate limits and provider-specific constraints.",zhTitle:"重试逻辑和错误处理",zhContent:"重试逻辑通过指数退避处理瞬态故障，确保稳健的模型通信。系统自动重试失败的请求，同时遵守速率限制和 provider 特定的约束。"},{title:"Token Metering and Usage Tracking",content:"Token metering tracks usage per request for cost monitoring and rate limiting. This enables accurate billing, usage analytics, and proactive rate limit management.",zhTitle:"Token 计量和使用跟踪",zhContent:"Token 计量跟踪每次请求的使用量，用于成本监控和速率限制。这支持准确的计费、使用分析和主动的速率限制管理。"}],designHighlights:[{en:"The LLM seam provides a provider-agnostic interface, allowing seamless switching between DeepSeek, OpenAI, and other providers.",zh:"LLM seam 提供与 provider 无关的接口，允许在 DeepSeek、OpenAI 和其他 provider 之间无缝切换。"},{en:"Retry logic handles transient failures with exponential backoff, ensuring robust model communication.",zh:"重试逻辑通过指数退避处理瞬态故障，确保稳健的模型通信。"},{en:"Token metering tracks usage per request for cost monitoring and rate limiting.",zh:"Token 计量跟踪每次请求的使用量，用于成本监控和速率限制。"}],flowchartSvg:`<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s04-architecture.html",annotatedCode:{overview:{en:"Tool registration and execution",zh:"工具注册和执行"},annotations:[{lineStart:1,lineEnd:12,text:"Tool registration with schema",zhText:"带模式的工具注册"},{lineStart:14,lineEnd:20,text:"Execution with guards",zhText:"带守卫的执行"}],flowSummary:{en:"Call → Pre Guard → Execute → Post Guard → Result",zh:"调用 → 预守卫 → 执行 → 后守卫 → 结果"}},claudeCodeComparison:{en:"DeepSeek Harness has formal guard pipeline; Claude Code has simpler tool execution.",zh:"DeepSeek Harness 有正式的守卫管道；Claude Code 有更简单的工具执行。"}},s05:{description:"Capability seams follow the three-role pattern: Service Definition declares the interface, Service Provider implements it, and Consumer uses it. Swapping one provider changes the whole product.",zhDescription:"能力接缝遵循三角色模式：服务定义声明接口，服务提供者实现它，消费者使用它。替换一个提供者就能改变整个产品。",codeSample:`// Service Definition
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
ctx.shell.execute('ls -la')`,codeLanguage:"typescript",learnSections:[{title:"System Prompt Assembly",content:"System prompt is assembled from ordered sections, with tool schemas injected and dynamic variables resolved at runtime. This modular approach allows different components to contribute to the prompt without conflicts.",zhTitle:"系统提示组装",zhContent:"系统提示从有序部分组装，工具 schema 注入，动态变量在运行时解析。这种模块化方法允许不同组件为提示做出贡献而不会产生冲突。"},{title:"Context Window Management",content:"The context window manages token limits by tracking usage and triggering compaction when needed. This ensures the model receives optimal input within token limits while preserving important information.",zhTitle:"上下文窗口管理",zhContent:"上下文窗口通过跟踪使用情况并在需要时触发压缩来管理 token 限制。这确保模型在 token 限制内接收最优输入，同时保留重要信息。"},{title:"Compaction Strategy",content:"The compaction engine compresses context when token limits are exceeded, using intelligent strategies to preserve important information while reducing token count.",zhTitle:"压缩策略",zhContent:"当 token 限制超出时，压缩引擎压缩上下文，使用智能策略在减少 token 数量的同时保留重要信息。"}],designHighlights:[{en:"System prompt is assembled from ordered sections, with tool schemas injected and dynamic variables resolved at runtime.",zh:"系统提示从有序部分组装，工具 schema 注入，动态变量在运行时解析。"},{en:"The compaction engine compresses context when token limits are exceeded, preserving important information.",zh:"当 token 限制超出时，压缩引擎压缩上下文，保留重要信息。"},{en:"Context window management ensures the model receives optimal input within token limits.",zh:"上下文窗口管理确保模型在 token 限制内接收最优输入。"}],flowchartSvg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s05-dataflow.html",annotatedCode:{overview:{en:"Capability seam pattern",zh:"能力接缝模式"},annotations:[{lineStart:1,lineEnd:4,text:"Service Definition interface",zhText:"服务定义接口"},{lineStart:7,lineEnd:12,text:"Service Provider implementation",zhText:"服务提供者实现"},{lineStart:15,lineEnd:17,text:"Consumer usage",zhText:"消费者使用"}],flowSummary:{en:"Define → Implement → Consume → Swap",zh:"定义 → 实现 → 消费 → 替换"}},claudeCodeComparison:{en:"DeepSeek Harness has formal capability seams; Claude Code has implicit providers.",zh:"DeepSeek Harness 有正式的能力接缝；Claude Code 有隐式提供者。"}},s06:{description:"The LLM layer provides message vocabulary and streaming. Providers register adapters that handle the actual API calls, while the core loop works with a unified message format.",zhDescription:"LLM 层提供消息词汇和流式处理。提供者注册适配器处理实际的 API 调用，而核心循环使用统一的消息格式。",codeSample:`// LLM adapter registration
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
})`,codeLanguage:"typescript",learnSections:[{title:"Event Taxonomy and Types",content:"Events are dispatched to all subscribers in priority order, with async handlers running concurrently. The event taxonomy defines standard event types for consistent plugin interaction.",zhTitle:"事件分类和类型",zhContent:"事件按优先级顺序分发给所有订阅者，异步处理器并发运行。事件分类定义标准事件类型，确保插件交互一致性。"},{title:"Publish-Subscribe Pattern",content:"The event bus provides decoupled communication between plugins, enabling loose coupling. Plugins can subscribe to events without knowing who emits them, and emitters don't need to know who listens.",zhTitle:"发布-订阅模式",zhContent:"事件总线提供插件之间的解耦通信，实现松耦合。插件可以订阅事件而无需知道谁发出它们，发出者也不需要知道谁在监听。"},{title:"Async Handling and Prioritization",content:"Event handlers run asynchronously and can be prioritized. This ensures critical handlers run first while allowing background processing of less important events.",zhTitle:"异步处理和优先级",zhContent:"事件处理器异步运行，可以设置优先级。这确保关键处理器首先运行，同时允许后台处理不太重要的事件。"}],designHighlights:[{en:"Events are dispatched to all subscribers in priority order, with async handlers running concurrently.",zh:"事件按优先级顺序分发给所有订阅者，异步处理器并发运行。"},{en:"The event bus provides decoupled communication between plugins, enabling loose coupling.",zh:"事件总线提供插件之间的解耦通信，实现松耦合。"},{en:"Event taxonomy defines standard event types for consistent plugin interaction.",zh:"事件分类定义标准事件类型，确保插件交互一致性。"}],flowchartSvg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s06-sequence.html",annotatedCode:{overview:{en:"LLM adapter registration",zh:"LLM 适配器注册"},annotations:[{lineStart:1,lineEnd:12,text:"Adapter implementation",zhText:"适配器实现"}],flowSummary:{en:"Request → Layer → Adapter → API → Response",zh:"请求 → 层 → 适配器 → API → 响应"}},claudeCodeComparison:{en:"Both use adapter patterns, but DeepSeek Harness formalizes the seam.",zh:"两者都使用适配器模式，但 DeepSeek Harness 正式化了接缝。"}},s07:{description:"Shell execution is a capability with local, remote, or sandboxed providers all sharing one interface. This allows the same tools to work in different environments.",zhDescription:"Shell 执行是一种能力，本地、远程或沙箱提供者共享同一接口。这允许相同的工具在不同环境中工作。",codeSample:`// Shell capability seam
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
}`,codeLanguage:"typescript",learnSections:[{title:"Append-Only Event Log",content:"The session uses an append-only event log, ensuring complete audit trail and enabling history derivation. Events are never modified or deleted, only appended.",zhTitle:"追加写入事件日志",zhContent:"会话使用追加写入的事件日志，确保完整的审计跟踪并支持历史派生。事件永远不会被修改或删除，只能被追加。"},{title:"Derived History from Events",content:"History is derived from events, not stored directly, enabling flexible projections and views. Different consumers can read the session state in different ways.",zhTitle:"从事件派生历史",zhContent:"历史从事件派生，而非直接存储，支持灵活的投影和视图。不同的消费者可以以不同的方式读取会话状态。"},{title:"Projection Seam and Lineage",content:"Lineage tracking maintains ancestry information for session evolution. The projection seam allows different views of the same session data.",zhTitle:"投影接缝和血缘",zhContent:"血缘追踪维护会话演化的祖先信息。投影接缝允许同一会话数据的不同视图。"}],designHighlights:[{en:"The session uses an append-only event log, ensuring complete audit trail and enabling history derivation.",zh:"会话使用追加写入的事件日志，确保完整的审计跟踪并支持历史派生。"},{en:"History is derived from events, not stored directly, enabling flexible projections and views.",zh:"历史从事件派生，而非直接存储，支持灵活的投影和视图。"},{en:"Lineage tracking maintains ancestry information for session evolution.",zh:"血缘追踪维护会话演化的祖先信息。"}],flowchartSvg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s07-architecture.html",annotatedCode:{overview:{en:"Shell capability seam",zh:"Shell 能力接缝"},annotations:[{lineStart:1,lineEnd:4,text:"Shell interface definition",zhText:"Shell 接口定义"},{lineStart:7,lineEnd:12,text:"Local provider",zhText:"本地提供者"},{lineStart:15,lineEnd:20,text:"Remote provider",zhText:"远程提供者"}],flowSummary:{en:"Tool → Seam → Provider → Environment",zh:"工具 → 接缝 → 提供者 → 环境"}},claudeCodeComparison:{en:"DeepSeek Harness has pluggable shell providers; Claude Code has fixed local execution.",zh:"DeepSeek Harness 有可插拔的 shell 提供者；Claude Code 有固定的本地执行。"}},s08:{description:"The subagent system enables delegation through a capability seam. Child agents get clean context while preserving the main thread through delegation.",zhDescription:"子代理系统通过能力接缝实现委派。子代理获得干净的上下文，同时通过委派保留主线程。",codeSample:`// Subagent delegation
const childAgent = await ctx.agents.create({
  profile: 'headless',
  task: 'Analyze this codebase',
  parent: currentAgent.id
})

// Child agent runs independently
const result = await childAgent.run()

// Parent can continue while child runs
console.log('Child result:', result)`,codeLanguage:"typescript",learnSections:[{title:"Storage Seam Abstraction",content:"The storage seam provides a provider-agnostic interface for persistence, enabling backend swapping. This allows the same tools to work with different storage backends.",zhTitle:"存储 seam 抽象",zhContent:"存储 seam 提供与 provider 无关的持久化接口，支持后端切换。这允许相同的工具与不同的存储后端一起工作。"},{title:"Content-Addressed Storage",content:"Content-addressed storage ensures deduplication and efficient caching. Files are stored by their content hash, eliminating duplicate storage.",zhTitle:"内容寻址存储",zhContent:"内容寻址存储确保去重和高效缓存。文件按内容哈希存储，消除重复存储。"},{title:"Spill Policy for Large Results",content:"Spill policy handles large results by persisting to disk when memory limits are exceeded. This prevents out-of-memory errors while maintaining performance.",zhTitle:"大结果溢出策略",zhContent:"溢出策略通过在内存限制超出时持久化到磁盘来处理大结果。这防止内存不足错误，同时保持性能。"}],designHighlights:[{en:"The storage seam provides a provider-agnostic interface for persistence, enabling backend swapping.",zh:"存储 seam 提供与 provider 无关的持久化接口，支持后端切换。"},{en:"Content-addressed storage ensures deduplication and efficient caching.",zh:"内容寻址存储确保去重和高效缓存。"},{en:"Spill policy handles large results by persisting to disk when memory limits are exceeded.",zh:"溢出策略通过在内存限制超出时持久化到磁盘来处理大结果。"}],flowchartSvg:`<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s08-dataflow.html",annotatedCode:{overview:{en:"Subagent delegation",zh:"子代理委派"},annotations:[{lineStart:1,lineEnd:6,text:"Create child agent",zhText:"创建子代理"},{lineStart:9,lineEnd:12,text:"Run and collect results",zhText:"运行并收集结果"}],flowSummary:{en:"Create → Delegate → Run → Collect",zh:"创建 → 委派 → 运行 → 收集"}},claudeCodeComparison:{en:"Both have subagents, but DeepSeek Harness formalizes the delegation seam.",zh:"两者都有子代理，但 DeepSeek Harness 正式化了委派接缝。"}},s09:{description:"Profiles stack bundles in order, and each layer can patch the config below it. This enables incremental customization without fork.",zhDescription:"配置按顺序堆叠 bundle，每层都可以修补下面的配置。这实现了增量定制而无需 fork。",codeSample:`# cordis.yml profile
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
      model: deepseek-chat`,codeLanguage:"yaml",learnSections:[{title:"Scoped Registration and Event Routing",content:"Scoped registration isolates plugin contributions, preventing naming collisions and enabling dependency injection. Plugins register in their own scope and communicate through events.",zhTitle:"作用域注册和事件路由",zhContent:"作用域隔离插件贡献，防止命名冲突并支持依赖注入。插件在自己的作用域中注册，通过事件进行通信。"},{title:"Service Definition/Provider Pattern",content:"Service Definition defines the contract, while Service Provider implements it, enabling loose coupling. This pattern allows different providers to be swapped without changing consumers.",zhTitle:"Service Definition/Provider 模式",zhContent:"Service Definition 定义契约，Service Provider 实现它，实现松耦合。这种模式允许在不改变消费者的情况下切换不同的提供者。"},{title:"Inter-Plugin Communication Channels",content:"Event channels provide decoupled communication between plugins without direct dependencies. Plugins can emit and subscribe to events without knowing each other.",zhTitle:"插件间通信通道",zhContent:"事件通道提供插件之间无直接依赖的解耦通信。插件可以发出和订阅事件而无需了解彼此。"}],designHighlights:[{en:"Scoped registration isolates plugin contributions, preventing naming collisions and enabling dependency injection.",zh:"作用域隔离插件贡献，防止命名冲突并支持依赖注入。"},{en:"Service Definition defines the contract, while Service Provider implements it, enabling loose coupling.",zh:"Service Definition 定义契约，Service Provider 实现它，实现松耦合。"},{en:"Event channels provide decoupled communication between plugins without direct dependencies.",zh:"事件通道提供插件之间无直接依赖的解耦通信。"}],flowchartSvg:`<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s09-architecture.html",annotatedCode:{overview:{en:"Profile composition",zh:"配置组合"},annotations:[{lineStart:1,lineEnd:4,text:"Bundle stack order",zhText:"Bundle 堆叠顺序"},{lineStart:7,lineEnd:14,text:"User patch overrides",zhText:"用户补丁覆盖"}],flowSummary:{en:"Profile → Bundles → Patches → Running Tree",zh:"配置 → Bundle → 补丁 → 运行树"}},claudeCodeComparison:{en:"DeepSeek Harness has formal profile/bundle composition; Claude Code has simpler config.",zh:"DeepSeek Harness 有正式的配置/bundle 组合；Claude Code 有更简单的配置。"}},s10:{description:"The event system provides typed extension points with waterfall semantics. Listeners must call next() to delegate, otherwise they short-circuit the chain.",zhDescription:"事件系统提供具有 waterfall 语义的类型化扩展点。监听器必须调用 next() 来委派，否则会短路链。",codeSample:`// Event registration with waterfall
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
})`,codeLanguage:"typescript",learnSections:[{title:"Scoped Registration and Event Routing",content:"Scoped registration isolates plugin contributions, preventing naming collisions and enabling dependency injection. Plugins register in their own scope and communicate through events.",zhTitle:"作用域注册和事件路由",zhContent:"作用域隔离插件贡献，防止命名冲突并支持依赖注入。插件在自己的作用域中注册，通过事件进行通信。"},{title:"Hook Lifecycle and Waterfall Chains",content:"Hook lifecycle follows registration → mount → ready, with teardown for cleanup. Waterfall chains allow listeners to process events in sequence, with each listener calling next() to continue.",zhTitle:"Hook 生命周期和 Waterfall 链",zhContent:"Hook 生命周期遵循注册 → 挂载 → 就绪，带有清理的卸载。Waterfall 链允许监听器按顺序处理事件，每个监听器调用 next() 继续。"},{title:"Extension Points and Composition",content:"Extension points enable plugins to hook into the system's lifecycle without modifying core code. This pattern supports composition and customization through event-driven architecture.",zhTitle:"扩展点和组合",zhContent:"扩展点允许插件在不修改核心代码的情况下接入系统生命周期。这种模式通过事件驱动架构支持组合和定制。"}],designHighlights:[{en:"Scoped registration isolates plugin contributions, preventing naming collisions and enabling dependency injection.",zh:"作用域隔离插件贡献，防止命名冲突并支持依赖注入。"},{en:"Hook lifecycle follows registration → mount → ready, with teardown for cleanup.",zh:"Hook 生命周期遵循注册 → 挂载 → 就绪，带有清理的卸载。"},{en:"Extension points enable plugins to hook into the system's lifecycle without modifying core code.",zh:"扩展点允许插件在不修改核心代码的情况下接入系统生命周期。"}],flowchartSvg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
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
</svg>`,flowchartHtml:"s10-sequence.html",annotatedCode:{overview:{en:"Waterfall event listener",zh:"Waterfall 事件监听器"},annotations:[{lineStart:1,lineEnd:8,text:"Pre-execution validation",zhText:"预执行验证"},{lineStart:10,lineEnd:11,text:"MUST call next()",zhText:"必须调用 next()"},{lineStart:13,lineEnd:15,text:"Post-execution logic",zhText:"后执行逻辑"}],flowSummary:{en:"Event → Validate → next() → Continue",zh:"事件 → 验证 → next() → 继续"}},claudeCodeComparison:{en:"DeepSeek Harness has formal waterfall events; Claude Code has simpler hooks.",zh:"DeepSeek Harness 有正式的 waterfall 事件；Claude Code 有更简单的钩子。"}}};var d=e.i(32674);function c({content:e,annotations:i,locale:r,t:o}){let s=e.learnSections||[],[a,l]=(0,n.useState)(!1);return(0,t.jsxs)("div",{className:"flex flex-col gap-8",children:[a&&(0,t.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4",onClick:()=>l(!1),children:(0,t.jsxs)("div",{className:"relative max-h-[90vh] max-w-[95vw] overflow-auto rounded-xl bg-white p-6 dark:bg-zinc-950",children:[(0,t.jsx)("button",{onClick:()=>l(!1),className:"absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600",children:"✕"}),e.flowchartHtml?(0,t.jsx)("iframe",{src:`/learn_harness/diagrams/${e.flowchartHtml}`,className:"min-w-[800px] min-h-[600px] border-0",title:"Architecture Diagram"}):(0,t.jsx)("div",{className:"min-w-[500px]",dangerouslySetInnerHTML:{__html:e.flowchartSvg}})]})}),(0,t.jsx)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===r?e.zhDescription:e.description})}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"mb-3 flex items-center justify-between",children:[(0,t.jsx)("h3",{className:"text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===r?"架构流程图":"Architecture Flow"}),(0,t.jsx)("button",{onClick:()=>l(!0),className:"text-xs text-[var(--color-text-secondary)] underline underline-offset-2 hover:text-[var(--color-text)]",children:"zh"===r?"全屏查看":"Full Screen"})]}),e.flowchartHtml?(0,t.jsx)("iframe",{src:`/learn_harness/diagrams/${e.flowchartHtml}`,className:"w-full h-[400px] border-0 rounded-xl",title:"Architecture Diagram"}):(0,t.jsx)("div",{className:"overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-4 dark:bg-zinc-950 max-w-xl mx-auto",dangerouslySetInnerHTML:{__html:e.flowchartSvg}})]}),s.length>0&&(0,t.jsx)("div",{className:"flex flex-col gap-6",children:s.map((e,i)=>(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-2 text-base font-bold",children:"zh"===r?e.zhTitle:e.title}),(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===r?e.zhContent:e.content})]},i))}),e.designHighlights.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:o("design_decisions")}),(0,t.jsx)("div",{className:"flex flex-col gap-3",children:e.designHighlights.map((e,i)=>(0,t.jsx)("div",{className:"rounded-lg border-l-2 border-[var(--color-text)] bg-[var(--color-bg-secondary)] px-4 py-3",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===r?e.zh:e.en})},i))})]}),e.claudeCodeComparison&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===r?"对比 Claude Code":"Comparison: Claude Code"}),(0,t.jsx)("div",{className:"rounded-lg border border-[var(--color-border)] bg-gradient-to-r from-amber-50/50 to-transparent p-4 dark:from-amber-950/10",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===r?e.claudeCodeComparison.zh:e.claudeCodeComparison.en})})]}),i?.decisions&&i.decisions.length>0&&(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)("h3",{className:"text-base font-bold",children:"zh"===r?"深入设计决策":"Deep Dive: Design Decisions"}),i.decisions.map(e=>(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] p-4",children:[(0,t.jsx)("h4",{className:"font-semibold",children:"zh"===r?e.zh.title:e.title}),(0,t.jsx)("p",{className:"mt-2 text-sm text-[var(--color-text-secondary)]",children:"zh"===r?e.zh.description:e.description}),(0,t.jsxs)("div",{className:"mt-3 rounded-lg bg-[var(--color-bg-secondary)] p-3",children:[(0,t.jsx)("span",{className:"text-xs font-medium text-[var(--color-text-secondary)]",children:"zh"===r?"备选方案: ":"Alternatives: "}),(0,t.jsx)("span",{className:"text-xs text-[var(--color-text-secondary)]",children:"zh"===r?e.zh.alternatives:e.alternatives})]})]},e.id))]})]})}function h({annotations:e,locale:i}){return e.overview.en||e.flowSummary.en?(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===i?e.overview.zh:e.overview.en})}),e.annotations.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===i?"逐行解析":"Line-by-Line Analysis"}),(0,t.jsx)("div",{className:"flex flex-col gap-3",children:e.annotations.map((e,n)=>(0,t.jsxs)("div",{className:"rounded-lg border border-[var(--color-border)] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-[var(--color-bg-secondary)] px-3 py-1.5 text-xs font-mono text-[var(--color-text-secondary)]",children:"zh"===i?`行 ${e.lineStart}${e.lineEnd>e.lineStart?`-${e.lineEnd}`:""}`:`Line ${e.lineStart}${e.lineEnd>e.lineStart?`-${e.lineEnd}`:""}`}),(0,t.jsx)("div",{className:"px-3 py-2 text-sm text-[var(--color-text-secondary)]",children:"zh"===i?e.zhText:e.text})]},n))})]}),e.flowSummary.en&&(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:[(0,t.jsx)("h4",{className:"mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===i?"执行流程":"Execution Flow"}),(0,t.jsx)("p",{className:"text-sm font-mono text-[var(--color-text-secondary)]",children:"zh"===i?e.flowSummary.zh:e.flowSummary.en})]})]}):null}function x({versionId:e,annotations:x}){let m=(0,r.useTranslations)("version"),f=(0,r.useLocale)(),p=o.VERSION_META[e],u=l[e],[g,y]=(0,n.useState)("learn");if(!p||!u)return null;let w=o.VERSION_ORDER.indexOf(e),v=w>0?o.VERSION_ORDER[w-1]:null,b=w<o.VERSION_ORDER.length-1?o.VERSION_ORDER[w+1]:null;return(0,t.jsxs)("div",{className:"flex flex-col gap-8 pb-16",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-[var(--color-text-secondary)]",children:[(0,t.jsx)(i.default,{href:`/${f}`,className:"hover:text-[var(--color-text)]",children:"zh"===f?"首页":"Home"}),(0,t.jsx)("span",{children:"/"}),(0,t.jsx)("span",{children:e})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(s.LayerBadge,{layer:p.layer,children:e}),(0,t.jsxs)("span",{className:"text-xs tabular-nums text-[var(--color-text-secondary)]",children:[p.loc," ",m("loc")]})]}),(0,t.jsx)("h1",{className:"mt-3 text-3xl font-bold",children:p.title}),(0,t.jsxs)("p",{className:"mt-1 text-lg text-[var(--color-text-secondary)]",children:["“",p.subtitle,"”"]})]}),(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:[(0,t.jsxs)("span",{className:"text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:[m("key_insight"),":"]}),(0,t.jsx)("p",{className:"mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]",children:p.keyInsight})]}),(0,t.jsx)("div",{className:"border-b border-[var(--color-border)]",children:(0,t.jsx)("div",{className:"flex gap-6",children:["learn","code"].map(e=>(0,t.jsx)("button",{onClick:()=>y(e),className:(0,d.cn)("pb-2 text-sm font-medium transition-colors",g===e?"border-b-2 border-[var(--color-text)] text-[var(--color-text)]":"text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"),children:"learn"===e?"zh"===f?"学习与设计":"Learn & Design":m("tab_code")},e))})}),(0,t.jsxs)("div",{children:["learn"===g&&(0,t.jsx)(c,{content:u,annotations:x,locale:f,t:m}),"code"===g&&(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)(h,{annotations:u.annotatedCode,locale:f}),(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-zinc-950 overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5",children:[(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-red-500/70"}),(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-yellow-500/70"}),(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-green-500/70"}),(0,t.jsxs)("span",{className:"ml-3 text-xs text-zinc-500",children:["code.","python"===u.codeLanguage?"py":"typescript"===u.codeLanguage?"ts":"js"]})]}),(0,t.jsx)("pre",{className:"overflow-x-auto p-4 text-sm leading-relaxed",children:(0,t.jsx)("code",{className:"text-zinc-300 whitespace-pre font-mono",children:u.codeSample})})]})]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between border-t border-[var(--color-border)] pt-6",children:[v?(0,t.jsxs)(i.default,{href:`/${f}/${v}`,className:"flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",children:[(0,t.jsx)("span",{"aria-hidden":"true",children:"←"})," ",m("prev"),": ",o.VERSION_META[v].title]}):(0,t.jsx)("div",{}),b?(0,t.jsxs)(i.default,{href:`/${f}/${b}`,className:"flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",children:[m("next"),": ",o.VERSION_META[b].title," ",(0,t.jsx)("span",{"aria-hidden":"true",children:"→"})]}):(0,t.jsx)("div",{})]}),(0,t.jsx)(a,{})]})}e.s(["SessionDetail",()=>x],32953)}]);