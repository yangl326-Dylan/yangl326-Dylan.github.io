(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3974,e=>{"use strict";var t=e.i(56450),o=e.i(24596),i=e.i(97685),n=e.i(25875),s=e.i(28656),a=e.i(49648);function r(){return(0,t.jsx)("footer",{className:"border-t border-[var(--color-border)] py-8 text-center text-sm text-[var(--color-text-secondary)]",children:(0,t.jsx)("p",{children:"Learn OpenCode — Built with Next.js"})})}let l={s01:{description:"The core agent loop follows a clear pattern: a while loop calls the LLM, inspects the response for tool calls, executes them, and feeds the results back into the conversation. This pattern forms the foundation of every AI coding agent. The loop itself is framework-agnostic, working with Anthropic's SDK, OpenAI, or any other provider.",zhDescription:"核心 agent 循环遵循一个清晰的模式：一个 while 循环调用 LLM，检查响应中是否包含工具调用，执行这些调用，并将结果回传至对话。这一模式是所有 AI 编码 agent 的基础。循环本身与框架无关，无论使用 Anthropic 的 SDK、OpenAI 还是其他提供商，它都同样适用。",codeSample:`while True:
    response = client.messages.create(
        messages=messages,
        tools=TOOLS,
        system=SYSTEM,
        model=MODEL,
    )
    if response.stop_reason != "tool_use":
        break
    for content in response.content:
        if content.type == "tool_use":
            result = execute_tool(content.name, content.input)
            messages.append({
                "role": "user",
                "content": result
            })`,codeLanguage:"python",learnSections:[{title:"The Problem: How Does an AI Agent Take Actions?",content:"An LLM alone cannot execute code, read files, or interact with the environment. It can only generate text. To become an agent, the model needs a mechanism to request actions and receive results. The simplest approach is to let the model output structured responses, known as tool calls, intercept them in a loop, execute the requested action, and feed the result back into the conversation. This creates a closed feedback loop that lets the model work iteratively toward a goal.",zhTitle:"问题：AI Agent 如何执行操作？",zhContent:"LLM 本身无法执行代码、读取文件或与环境交互，它只能生成文本。要成为一个 agent，模型需要一种机制来请求操作并接收结果。最简单的方法是让模型输出结构化响应（即工具调用），在循环中拦截这些调用，执行所请求的操作，并将结果回传至对话。这样就形成了一个闭环反馈系统，使模型能够迭代地朝着目标推进。"},{title:"Why a Simple Loop Wins",content:"The while-true loop represents the minimal viable architecture for an AI agent. There is no state machine, no planner, no task queue. The system prompt tells the model how to behave, and the model's own reasoning determines which tools to call and in what order. This simplicity carries significant advantages: the loop is provably correct, always running until the model signals completion; it is trivially debuggable, with every iteration forming a complete request-response cycle; and it is infinitely extensible, as new capabilities enter through tools rather than modifications to loop logic.",zhTitle:"为什么简单循环胜出",zhContent:"while-true 循环代表了 AI agent 的最小可行架构。其中没有状态机，没有规划器，也没有任务队列。系统提示词规定了模型的行为方式，而模型自身的推理则决定调用哪些工具及其调用顺序。这种简洁性带来了显著的优势：循环是可证明正确的，始终运行至模型发出完成信号；它易于调试，每次迭代都是一个完整的请求-响应周期；它无限可扩展，新能力通过工具而非修改循环逻辑来加入。"},{title:"Real Implementation: Effect-Based Concurrency",content:"OpenCode's V2 agent loop (packages/core/src/session/runner/llm.ts) replaces the basic while-true pattern with the Effect TypeScript library. Each turn executes through runTurnAttempt(), which streams the LLM call through the provider SDK, detects tool calls, and settles them in parallel using FiberSet, Effect's structured concurrency primitive. The loop handles multiple exit paths: tool_use continuation, step limits where agent.info.steps bounds the iteration count, context overflow with auto-compaction mid-stream, and interruption signals. Tool calls are not sequential. FiberSet runs all tools concurrently and awaits their collective completion before proceeding to the next LLM call.",zhTitle:"真实实现：基于 Effect 的并发架构",zhContent:"OpenCode V2 的 agent 循环 (packages/core/src/session/runner/llm.ts) 以 Effect TypeScript 库取代了基础的 while-true 模式。每次轮次通过 runTurnAttempt() 执行，将 LLM 调用流经提供商 SDK，检测工具调用，并使用 FiberSet（Effect 的结构化并发原语）并行处理它们。循环处理多个退出路径：tool_use 延续、步骤限制（agent.info.steps 限定迭代次数）、上下文溢出（流中自动压缩）以及中断信号。工具调用并非顺序执行。FiberSet 并发运行所有工具，等待它们全部完成后再进行下一次 LLM 调用。"}],designHighlights:[{en:"The loop checks `stop_reason != 'tool_use'` instead of checking for an explicit 'done' signal. This means the model naturally signals completion when it has nothing left to execute, with no extra protocol required.",zh:"循环通过检查 `stop_reason != 'tool_use'` 来判断完成，而非依赖显式的 'done' 信号。这意味着模型在没有更多操作可执行时会自然发出完成信号，无需额外的协议。"},{en:"Model selection is a configuration parameter rather than a hardcoded value. The same loop works with any OpenAI-compatible API, making it provider-agnostic from the start.",zh:"模型选择是配置参数而非硬编码值。同一个循环适用于任何兼容 OpenAI 的 API，从一开始就实现了与提供商无关。"}],flowchartSvg:`<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs>
    <marker id="arrow-s01" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- Start -->
  <rect x="190" y="10" width="120" height="40" rx="20" fill="#1e40af" opacity="0.9"/>
  <text x="250" y="35" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Start</text>
  <line x1="250" y1="50" x2="250" y2="75" stroke="#666" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <!-- Call LLM -->
  <rect x="160" y="75" width="180" height="45" rx="6" fill="#3b82f6" opacity="0.9"/>
  <text x="250" y="102" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Call LLM</text>
  <line x1="250" y1="120" x2="250" y2="145" stroke="#666" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <!-- Decision: tool_use? -->
  <polygon points="250,145 370,195 250,245 130,195" fill="#f59e0b" opacity="0.9"/>
  <text x="250" y="192" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">tool_use?</text>
  <text x="250" y="205" text-anchor="middle" fill="#fff" font-size="10" font-family="system-ui">stop_reason</text>
  <!-- Yes arrow -->
  <line x1="315" y1="195" x2="430" y2="195" stroke="#666" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <text x="360" y="188" text-anchor="middle" fill="#059669" font-size="11" font-family="system-ui">Yes</text>
  <!-- No arrow (break) -->
  <line x1="185" y1="230" x2="185" y2="290" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <text x="178" y="265" text-anchor="end" fill="#dc2626" font-size="11" font-family="system-ui">No → Break</text>
  <!-- End -->
  <rect x="140" y="285" width="90" height="36" rx="18" fill="#dc2626" opacity="0.8"/>
  <text x="185" y="308" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">End</text>
  <!-- Execute tool -->
  <rect x="340" y="170" width="160" height="45" rx="6" fill="#10b981" opacity="0.9"/>
  <text x="420" y="197" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui">Execute Tool</text>
  <!-- Feedback arrow -->
  <line x1="420" y1="215" x2="420" y2="285" stroke="#666" stroke-width="2"/>
  <line x1="420" y1="285" x2="250" y2="285" stroke="#666" stroke-width="2"/>
  <line x1="250" y1="285" x2="250" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrow-s01)"/>
  <text x="430" y="260" fill="#666" font-size="10" font-family="system-ui">Feed result back</text>
</svg>`,flowchartHtml:"s01-workflow.html",annotatedCode:{overview:{en:"The agent loop is a concise while loop with four stages: call the model, check for tool calls, execute tools, and repeat. The entire architecture fits in roughly 15 lines.",zh:"Agent 循环是一个简洁的 while 循环，包含四个阶段：调用模型、检查工具调用、执行工具、重复。整个架构仅需约 15 行代码。"},annotations:[{lineStart:1,lineEnd:1,text:"An infinite loop: the agent continues until the model decides it is done. Each iteration represents a complete thought-action-observation cycle.",zhText:"无限循环：agent 持续运行直到模型决定完成。每次迭代都是一个完整的思考-行动-观察周期。"},{lineStart:2,lineEnd:7,text:"The LLM call. `messages` accumulates the entire conversation history, including previous tool results. `tools=TOOLS` informs the model about available actions.",zhText:"LLM 调用。`messages` 累积了包含先前工具结果在内的完整对话历史。`tools=TOOLS` 告知模型可用的操作。"},{lineStart:8,lineEnd:9,text:"The termination check: if the model did not request a tool, it is signaling completion. No special 'done' token is required.",zhText:"终止检查：如果模型没有请求工具，说明它在发出完成信号。无需特殊的 'done' 标记。"},{lineStart:10,lineEnd:12,text:"Iterating over response content blocks. Tool calls are structured objects with a name and input, the model's way of requesting the execution of a function with specific parameters.",zhText:"遍历响应内容块。工具调用是带有名称和输入的结构化对象，是模型表达'用这些参数运行此函数'的方式。"},{lineStart:13,lineEnd:17,text:"The result is appended as a user message rather than a system message. This distinction matters: the model perceives tool output as if the user provided it, preserving the natural flow of conversation.",zhText:"结果作为用户消息而非系统消息追加。这一区别很重要：模型将工具输出视为用户提供的内容，从而保持对话的自然性。"}],flowSummary:{en:"Flow: LLM Call → Check stop_reason → (tool_use?) → Execute Tool → Append Result → LLM Call → (no tool_use?) → Break",zh:"流程：调用 LLM → 检查 stop_reason → (工具调用?) → 执行工具 → 追加结果 → 调用 LLM → (无工具调用?) → 退出"}},claudeCodeComparison:{en:"Claude Code uses the same tool-use loop architecture of send, tool_use, execute, append, and repeat. OpenCode distinguishes itself through async Effect and Stream primitives for LLM calls and a formal ToolID schema registry. Where Claude Code uses a flat tool list, OpenCode organizes tools by category (read, write, shell, skill) with structured input and output schemas.",zh:"Claude Code 使用相同的工具调用循环架构（发送、tool_use、执行、追加、重复），但 OpenCode 的特色在于使用异步 Effect/Stream 原语进行 LLM 调用，并采用正式的 ToolID schema 注册表。Claude Code 使用扁平的工具列表，而 OpenCode 按类别组织工具（read、write、shell、skill），并配备结构化的输入/输出模式。"}},s02:{description:"A dispatch table, TOOL_MAP, maps tool names to handler functions. Rather than maintaining a growing if-else chain, the loop performs a single map lookup. Adding a new tool requires just one line: registering the name and its handler in the map. The loop code itself never changes.",zhDescription:"调度表将工具名称映射到处理函数。与不断膨胀的 if-else 链不同，循环只需一次 map 查找即可。添加新工具仅需一行代码：在 map 中注册名称及其处理函数。循环代码本身永远无需修改。",codeSample:`TOOL_MAP = {
    "bash": run_bash,
    "read": run_read,
    "write": run_write,
    "edit": run_edit,
    "glob": run_glob,
}

def execute_tool(name, input):
    handler = TOOL_MAP.get(name)
    if not handler:
        return f"Unknown tool: {name}"
    return handler(**input)

while True:
    ...
    for content in response.content:
        if content.type == "tool_use":
            result = execute_tool(content.name, content.input)`,codeLanguage:"python",learnSections:[{title:"The Problem: How to Add New Tools Without Changing the Loop",content:"If tool execution logic were inlined in the loop, every new tool would require modifying the loop body, adding an elif branch, a new import, and special-case handling. Over time, the loop accumulates an unwieldy set of branches, making it difficult to reason about and fragile to modify. The solution is a dispatch table: a dictionary that maps tool names to handler functions. The loop calls execute_tool(name, input) and never needs to know which tool actually runs. Adding a new tool becomes a one-line registration.",zhTitle:"问题：如何在不修改循环的情况下添加新工具？",zhContent:"如果将工具执行逻辑内联在循环中，每个新工具都需要修改循环体：添加 elif 分支、新的 import 以及特殊处理。随着时间推移，循环会积累大量难以维护的分支，导致代码难以理解且修改脆弱。解决方案是采用调度表：一个将工具名称映射到处理函数的字典。循环调用 execute_tool(name, input)，完全不需要了解具体哪个工具在运行。添加新工具只需一行注册代码。"},{title:"The Open/Closed Principle in Practice",content:"The dispatch table embodies the Open/Closed Principle: the loop is closed for modification but open for extension. The loop never changes. New capabilities arrive as new entries in TOOL_MAP. This pattern also simplifies testing: each handler is an independently testable function, and the dispatch logic itself is a trivial dictionary lookup that is easily verified. The handler signature is standardized, accepting an input dict and returning an output string, so any function fitting this shape can serve as a tool.",zhTitle:"开闭原则的实践",zhContent:"调度表体现了开闭原则：循环对修改关闭，但对扩展开放。循环本身从不改变，新能力以 TOOL_MAP 中新条目的形式加入。这一模式也简化了测试：每个处理函数都是独立可测试的函数，而调度逻辑本身仅是一个简单的字典查找，易于验证。处理函数的签名是标准化的，接受输入字典并返回输出字符串，因此任何符合此形式的函数都可以作为工具使用。"},{title:"Real Implementation: Two-Tier Registration",content:"OpenCode's actual tool system (packages/core/src/tool/) uses a two-tier registration model rather than a single flat map. Application-level tools, which are user-facing and process-global, are registered via ApplicationTools.Service using State.Transformable. Per-location tools, which are directory-scoped, are registered separately and override application tools with the same name. All tools are canonical, created via Tool.make() which returns an opaque Definition with input/output schemas and an executor. The Registry.materialize() step derives tool definitions, applies permission filters, and produces a settle function that the loop calls. This design means the same tool abstraction works for builtins, MCP servers, and plugins. There is no separate path for external tools.",zhTitle:"真实实现：双层注册机制",zhContent:"OpenCode 实际的工具系统采用双层注册模型，而非单一扁平映射。应用级工具（面向用户、进程全局）通过 ApplicationTools.Service 并使用 State.Transformable 进行注册。每位置工具（目录级作用域）单独注册，同名时覆盖应用工具。所有工具都是规范的，通过 Tool.make() 创建，返回一个带有输入/输出模式和执行器的不透明 Definition。Registry.materialize() 步骤派生工具定义，应用权限过滤器，并生成循环调用的 settle 函数。这一设计意味着相同的工具抽象适用于内置工具、MCP 服务器和插件，外部工具无需额外的路径。"}],designHighlights:[{en:"The dispatch map uses `dict.get(name)` with a fallback to `None` rather than `dict[name]`, which would raise a KeyError. This means unknown tool names produce a friendly error message instead of crashing the agent.",zh:"调度表使用 `dict.get(name)` 并回退到 `None`，而非使用会引发 KeyError 的 `dict[name]`。这意味着未知的工具名称会产生友好的错误消息，而不是让 agent 崩溃。"},{en:"Handlers receive `**input`, unpacked keyword arguments, meaning each tool defines its own parameter schema. The dispatch table does not need to know or validate parameters. That responsibility belongs to the handler.",zh:"处理函数接收 `**input`（解包后的关键字参数），这意味着每个工具定义自己的参数模式。调度表不需要了解或验证参数，那是处理函数的职责。"}],flowchartSvg:`<svg viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
    <marker id="arrow-s02" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <rect x="10" y="10" width="480" height="340" rx="8" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.4"/>
  <text x="250" y="30" text-anchor="middle" fill="#3b82f6" font-size="11" font-family="system-ui" opacity="0.6">TOOL_MAP (Dispatch Table)</text>
  <!-- Table header -->
  <rect x="50" y="50" width="180" height="30" rx="4" fill="#1e3a5f"/>
  <text x="140" y="70" text-anchor="middle" fill="#93c5fd" font-size="12" font-family="monospace" font-weight="bold">Tool Name</text>
  <line x1="230" y1="50" x2="230" y2="300" stroke="#3b82f6" stroke-width="1" opacity="0.3"/>
  <rect x="230" y="50" width="180" height="30" rx="4" fill="#1e3a5f"/>
  <text x="320" y="70" text-anchor="middle" fill="#93c5fd" font-size="12" font-family="monospace" font-weight="bold">Handler</text>
  <!-- Table rows -->
  <rect x="50" y="85" width="180" height="28" rx="3" fill="#0f172a"/><text x="140" y="103" text-anchor="middle" fill="#e2e8f0" font-size="12" font-family="monospace">"bash"</text>
  <rect x="230" y="85" width="180" height="28" rx="3" fill="#0f172a"/><text x="320" y="103" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="monospace">run_bash</text>
  <rect x="50" y="117" width="180" height="28" rx="3" fill="#0f172a"/><text x="140" y="135" text-anchor="middle" fill="#e2e8f0" font-size="12" font-family="monospace">"read"</text>
  <rect x="230" y="117" width="180" height="28" rx="3" fill="#0f172a"/><text x="320" y="135" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="monospace">run_read</text>
  <rect x="50" y="149" width="180" height="28" rx="3" fill="#0f172a"/><text x="140" y="167" text-anchor="middle" fill="#e2e8f0" font-size="12" font-family="monospace">"write"</text>
  <rect x="230" y="149" width="180" height="28" rx="3" fill="#0f172a"/><text x="320" y="167" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="monospace">run_write</text>
  <rect x="50" y="181" width="180" height="28" rx="3" fill="#0f172a"/><text x="140" y="199" text-anchor="middle" fill="#e2e8f0" font-size="12" font-family="monospace">"edit"</text>
  <rect x="230" y="181" width="180" height="28" rx="3" fill="#0f172a"/><text x="320" y="199" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="monospace">run_edit</text>
  <rect x="50" y="213" width="180" height="28" rx="3" fill="#0f172a"/><text x="140" y="231" text-anchor="middle" fill="#e2e8f0" font-size="12" font-family="monospace">"glob"</text>
  <rect x="230" y="213" width="180" height="28" rx="3" fill="#0f172a"/><text x="320" y="231" text-anchor="middle" fill="#6ee7b7" font-size="12" font-family="monospace">run_glob</text>
  <!-- Flow arrows -->
  <text x="430" y="105" fill="#666" font-size="11" font-family="system-ui">← lookup</text>
  <text x="430" y="165" fill="#666" font-size="11" font-family="system-ui">← lookup</text>
  <text x="430" y="230" fill="#666" font-size="11" font-family="system-ui">← lookup</text>
  <!-- Caller box at bottom -->
  <rect x="130" y="270" width="240" height="36" rx="6" fill="#3b82f6" opacity="0.8"/>
  <text x="250" y="293" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">execute_tool(name, input)</text>
  <line x1="250" y1="260" x2="250" y2="245" stroke="#666" stroke-width="1.5" marker-end="url(#arrow-s02)"/>
  <line x1="250" y1="270" x2="250" y2="260" stroke="#666" stroke-width="1.5"/>
  <!-- Result output -->
  <rect x="170" y="315" width="160" height="28" rx="14" fill="#10b981" opacity="0.7"/>
  <text x="250" y="333" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">return result string</text>
  <line x1="250" y1="306" x2="250" y2="315" stroke="#666" stroke-width="1.5" marker-end="url(#arrow-s02)"/>
</svg>`,flowchartHtml:"s03-lifecycle.html",annotatedCode:{overview:{en:"The dispatch map uses `dict.get(name)` with a fallback to `None` rather than `dict[name]`, which would raise a KeyError. This means unknown tool names produce a friendly error message instead of crashing the agent.",zh:"调度表使用 `dict.get(name)` 并回退到 `None`，而非使用会引发 KeyError 的 `dict[name]`。这意味着未知的工具名称会产生友好的错误消息，而不是让 agent 崩溃。"},annotations:[{lineStart:1,lineEnd:6,text:"The dispatch table is a plain dictionary. Each key is a tool name matching what the LLM outputs in tool_use.name, and each value is a handler function. Adding a new tool requires one new line in this dictionary.",zhText:"调度表是一个普通字典。每个键对应一个工具名称（与 LLM 在 tool_use.name 中输出的内容匹配），每个值对应一个处理函数。添加新工具只需在该字典中增加一行。"},{lineStart:8,lineEnd:12,text:"The lookup and execution. `TOOL_MAP.get(name)` returns None for unknown tools instead of raising a KeyError. `handler(**input)` unpacks the tool input dictionary as keyword arguments. Each handler defines its own parameter shape.",zhText:"查找与执行。`TOOL_MAP.get(name)` 对未知工具返回 None，而非引发 KeyError。`handler(**input)` 将工具输入字典解包为关键字参数，每个处理函数定义自己的参数形式。"},{lineStart:14,lineEnd:18,text:"The loop body never changes. It calls execute_tool() and neither knows nor cares which tool ran. This embodies the Open/Closed Principle: the loop is closed to modification but open to extension.",zhText:"循环体从不改变。它调用 execute_tool()，既不知道也不关心是哪个工具在运行。这体现了开闭原则：循环对修改关闭，对扩展开放。"}],flowSummary:{en:"Flow: Loop → execute_tool(name, input) → TOOL_MAP.get(name) → handler(**input) → result string → appended to messages",zh:"流程：循环 → execute_tool(name, input) → TOOL_MAP.get(name) → handler(**input) → 结果字符串 → 追加到消息"}},claudeCodeComparison:{en:"Both systems use dispatch table and registry patterns. Claude Code provides a built-in tool set with extensibility through MCP servers. OpenCode's TOOL_MAP is conceptually similar but is designed for first-class extensibility: the tool registry is a formal data structure with ToolID, schema, and handler rather than an implicit if-else chain. New tools register themselves with metadata, enabling features such as wildcard permission rules and typed argument validation.",zh:"两个系统都使用调度表和注册表模式。Claude Code 提供内置工具集，并通过 MCP 服务器实现可扩展性。OpenCode 的 TOOL_MAP 在概念上类似，但设计为头等可扩展性：工具注册表是一个正式的数据结构（包含 ToolID、schema 和 handler），而非隐式的 if-else 链。新工具通过元数据注册自身，从而支持通配符权限规则和类型化参数验证等功能。"}},s03:{description:"Before executing a tool, the harness checks whether the action requires permission. Dangerous commands, such as filesystem writes, network access, and code execution, prompt the user for confirmation. Read-only operations pass through automatically. Because this gate lives at the harness level, every tool receives permission checking without additional code.",zhDescription:"在执行工具之前，harness 会检查该操作是否需要权限。危险命令（如文件系统写入、网络访问和代码执行）会提示用户确认。只读操作则自动放行。由于这一权限门位于 harness 层，每个工具都能自动获得权限检查能力。",codeSample:`async function executeTool(name, input, opts) {
  const action = classifyAction(name, input);
  if (action.dangerLevel === "dangerous") {
    const approved = await promptUser(
      \`Allow \${name} with: \${JSON.stringify(input)}?\`
    );
    if (!approved) return "Operation cancelled by user";
  }
  const handler = TOOL_MAP[name];
  return handler(input);
}`,codeLanguage:"javascript",learnSections:[{title:"The Problem: Automation Without Recklessness",content:"An agent with arbitrary tool access is powerful but dangerous. A single hallucinated bash command could delete files, install malware, or exfiltrate data. The solution is not to remove tools but to add a permission gate that classifies every action before execution. Read operations, such as glob, grep, and read, pass through automatically. Write operations, including edit, write, and bash, prompt the user. This approach balances safety with workflow efficiency: the agent moves quickly on safe operations but pauses for confirmation on dangerous ones.",zhTitle:"问题：自动化而不鲁莽",zhContent:"拥有任意工具访问权限的 agent 功能强大但也伴随着风险。一条因模型幻觉而生成的 bash 命令可能导致文件删除、恶意软件安装或数据泄露。解决方案并非移除工具，而是在执行前添加一个权限门，对每个操作进行分类。读取操作（如 glob、grep、read）自动放行。写入操作（如 edit、write、bash）则提示用户确认。这种方法在安全性与工作流畅性之间取得了平衡：agent 在安全操作上快速执行，在危险操作上暂停等待确认。"},{title:"Safety at the Harness Level",content:"The permission gate lives in execute_tool(), not in individual handlers. This is intentional: safety is a cross-cutting concern that should not be duplicated across tools. A single gate protects all tools, including future ones that do not yet exist. The classification function classifyAction() uses both the tool name and the input parameters to determine the danger level. Writing to /etc/passwd is more dangerous than writing to /tmp/test.txt, even though both operations use the write tool.",zhTitle:"Harness 级别的安全机制",zhContent:"权限门位于 execute_tool() 中，而非单个处理函数中。这是有意为之：安全是一个横切关注点，不应在工具之间重复实现。单个权限门即可保护所有工具，包括尚不存在的未来工具。分类函数 classifyAction() 同时使用工具名称和输入参数来确定危险级别。写入 /etc/passwd 比写入 /tmp/test.txt 更危险，尽管两者都使用 write 工具。"}],designHighlights:[{en:"The permission check is async, using await promptUser, which means the agent yields control to the user interface. The agent literally waits for human input before proceeding, with no silent approvals.",zh:"权限检查是异步的（使用 await promptUser），这意味着 agent 将控制权交给用户界面。Agent 在继续之前会等待人工输入，不存在静默批准的情况。"},{en:"Danger level classification is not hardcoded. Plugins can register custom classifiers or override default ones through hooks. This allows organizations to enforce their own security policies.",zh:"危险级别分类并非硬编码。插件可以通过钩子注册自定义分类器或覆盖默认分类器。这使得组织能够执行自己的安全策略。"}],flowchartSvg:`<svg viewBox="0 0 500 380" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
    <marker id="arrow-s03" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- Incoming call -->
  <rect x="160" y="10" width="180" height="36" rx="6" fill="#3b82f6" opacity="0.8"/>
  <text x="250" y="33" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">executeTool(name, input)</text>
  <line x1="250" y1="46" x2="250" y2="65" stroke="#666" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <!-- Classify -->
  <rect x="170" y="65" width="160" height="36" rx="6" fill="#6366f1" opacity="0.85"/>
  <text x="250" y="88" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">classifyAction()</text>
  <line x1="250" y1="101" x2="250" y2="120" stroke="#666" stroke-width="2"/>
  <!-- Decision diamond -->
  <polygon points="250,120 370,165 250,210 130,165" fill="#f59e0b" opacity="0.85"/>
  <text x="250" y="162" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">dangerous?</text>
  <line x1="250" y1="101" x2="250" y2="118" stroke="#666" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <!-- No = safe path (right) -->
  <line x1="315" y1="165" x2="430" y2="165" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <text x="365" y="158" fill="#10b981" font-size="11" font-family="system-ui">No (safe)</text>
  <rect x="340" y="150" width="100" height="30" rx="15" fill="#10b981" opacity="0.8"/>
  <text x="390" y="169" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Execute ✓</text>
  <!-- Yes = dangerous path (down) -->
  <line x1="185" y1="195" x2="185" y2="240" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <text x="175" y="225" text-anchor="end" fill="#ef4444" font-size="11" font-family="system-ui">Yes (dangerous)</text>
  <!-- Prompt user -->
  <rect x="100" y="240" width="170" height="36" rx="6" fill="#f97316" opacity="0.85"/>
  <text x="185" y="263" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">promptUser()</text>
  <line x1="185" y1="276" x2="185" y2="295" stroke="#666" stroke-width="2"/>
  <!-- User decision -->
  <polygon points="185,295 285,330 185,365 85,330" fill="#a855f7" opacity="0.85"/>
  <text x="185" y="327" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Approved?</text>
  <!-- No -->
  <line x1="120" y1="330" x2="30" y2="330" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <text x="65" y="323" fill="#ef4444" font-size="10" font-family="system-ui">No: cancel</text>
  <!-- Yes -->
  <line x1="230" y1="295" x2="390" y2="295" stroke="#10b981" stroke-width="2"/>
  <line x1="390" y1="295" x2="390" y2="165" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-s03)"/>
  <text x="390" y="240" fill="#10b981" font-size="10" font-family="system-ui">Yes → Execute</text>
</svg>`,flowchartHtml:"s04-workflow.html",annotatedCode:{overview:{en:"The permission gate wraps tool execution with a security check. classifyAction() determines the danger level, and only dangerous operations trigger user prompts. Safe operations proceed without user visibility.",zh:"权限门以安全检查包装工具执行过程。classifyAction() 确定危险级别，仅危险操作才触发用户提示。安全操作对用户保持透明。"},annotations:[{lineStart:2,lineEnd:2,text:"classifyAction() examines both the tool name and the input parameters. Reading a file is safe; writing to system directories is dangerous. This cross-check prevents the agent from misrepresenting the nature of its action.",zhText:"classifyAction() 同时检查工具名称和输入参数。读取文件安全，写入系统目录危险。这种交叉验证防止 agent 对操作性质进行误导性描述。"},{lineStart:3,lineEnd:7,text:"The async prompt shows the user exactly what tool and parameters are requested. The user sees the actual command, not a sanitized description. This transparency is critical for building trust, as the user always knows what the agent is about to do.",zhText:"异步提示向用户显示所请求的确切工具和参数。用户看到的是实际命令，而非经过修饰的描述。这种透明度对建立信任至关重要，用户始终清楚 agent 将要执行什么操作。"},{lineStart:8,lineEnd:9,text:"If the user cancels, the agent receives a clear 'cancelled' message. The agent can then try a different approach or ask for clarification. It does not crash or retry the same dangerous action.",zhText:"如果用户取消操作，agent 会收到清晰的 'cancelled' 消息。Agent 随后可以尝试不同的方法或请求澄清，而不会崩溃或重试相同的危险操作。"},{lineStart:10,lineEnd:12,text:"Safe operations skip the permission gate entirely. The handler is called directly with no user-facing prompt. This keeps the agent fast for routine operations while remaining safe for dangerous ones.",zhText:"安全操作完全跳过权限门，直接调用处理函数而无需用户提示。这使得 agent 在日常操作中保持高效，同时在危险操作上确保安全。"}],flowSummary:{en:"Flow: executeTool() → classifyAction() → dangerous? → No → execute handler | Yes → promptUser() → approved? → Yes → execute | No → return cancelled",zh:"流程：executeTool() → classifyAction() → 危险? → 否 → 执行处理函数 | 是 → promptUser() → 批准? → 是 → 执行 | 否 → 返回已取消"}},claudeCodeComparison:{en:"Both prioritize permission gates over sandbox isolation. Claude Code requires explicit user approval for file writes and shell commands. OpenCode's permission system takes this further with classifyAction(), a structured classification function that uses wildcard path patterns (allow, deny, ask) rather than simple binary prompts. The Deferred<PermissionEval> pattern means permissions can be pre-evaluated and cached, reducing user prompt fatigue.",zh:"两者都优先使用权限门而非沙箱隔离。Claude Code 要求文件写入和 shell 命令必须获得用户明确批准。OpenCode 的权限系统则更进一步，通过 classifyAction() 这一使用通配符路径模式（allow、deny、ask）而非简单二元提示的结构化分类函数来实现。Deferred<PermissionEval> 模式意味着权限可以预先评估和缓存，从而减少用户提示疲劳。"}},s04:{description:"Hooks are lifecycle callbacks that plugins register at specific points in the agent's execution: before and after tool execution, when messages are created, during configuration loading, and more. This keeps the core loop clean while enabling rich extensibility. A slow hook never blocks the agent. Hooks run with timeouts, and any failures are logged without disrupting the main flow.",zhDescription:"钩子是生命周期回调函数，插件可在特定执行点注册：工具执行前后、消息创建时、配置加载时等。这种设计既保持了核心循环的简洁，又提供了丰富的可扩展性。慢钩子不会阻塞 agent。钩子执行带有超时机制，失败会被记录而不影响主流程。",codeSample:`const plugin = {
  name: "my-plugin",
  hooks: {
    "tool.execute.before": async ({ tool, input }) => {
      if (tool === "bash") {
        console.log(\`Executing: \${input.command}\`);
      }
    },
    "tool.execute.after": async ({ tool, result }) => {
      if (result.error) {
        await notify(result.error);
      }
    },
    "config": async (config) => {
      config.skillPaths.push("/my/custom/skills");
      return config;
    }
  }
};

for (const hook of registeredHooks["tool.execute.before"]) {
  await hook({ tool, input });
}`,codeLanguage:"javascript",learnSections:[{title:"The Problem: Cross-Cutting Concerns Without Core Pollution",content:"Logging, telemetry, custom validation, and audit trails are cross-cutting concerns that do not belong inside the agent loop or individual tool handlers. Without hooks, developers face an unpleasant choice: either litter the core with optional callbacks, making the logic harder to reason about, or fork the codebase, which makes upgrades impossible. Hooks solve this problem by defining extension points around the core loop. Any number of plugins can register for the same hook and execute in registration order. The core loop never imports plugin code. It simply checks whether any hooks are registered for a given event name.",zhTitle:"问题：横切关注点而不污染核心",zhContent:"日志、遥测、自定义验证和审计追踪都属于横切关注点，不应混杂在 agent 循环或工具处理函数中。如果没有钩子机制，开发者面临两难：要么用可选回调污染核心逻辑，使其难以维护；要么 fork 代码库，导致无法跟随上游升级。钩子通过在核心循环周围定义扩展点来解决这一问题。任意数量的插件可为同一钩子注册，并按注册顺序依次执行。核心循环从不导入插件代码，只检查特定事件名称是否有已注册的钩子。"},{title:"Hook Design: Named Events with Typed Payloads",content:"Each hook is a named event with a typed context object. 'tool.execute.before' receives { tool, input, opts }, and 'tool.execute.after' receives { tool, result, duration }. This structured approach makes hooks discoverable (event names follow a consistent convention), type-safe (each event defines its payload shape), and isolated (a single hook failure does not crash others, as timeouts are enforced). The naming convention, domain.event, mirrors DOM events and makes each hook's intent clear. 'tool.execute.before' runs before tool execution; 'config' runs when configuration loads.",zhTitle:"钩子设计：带类型化载荷的命名事件",zhContent:"每个钩子都是一个命名事件，配有类型化的上下文对象。'tool.execute.before' 接收 { tool, input, opts }，'tool.execute.after' 接收 { tool, result, duration }。这种结构化设计使钩子具备可发现性（事件名遵循统一约定）、类型安全性（每个事件定义明确的载荷结构）和隔离性（单个钩子失败不会影响其他钩子，超时机制保证了这一点）。命名约定 domain.event 借鉴了 DOM 事件模式，使每个钩子的意图一目了然。'tool.execute.before' 在工具执行前触发，'config' 在配置加载时触发。"}],designHighlights:[{en:"Hooks execute with configurable timeouts. A misbehaving plugin, whether stuck in an infinite loop or waiting on a slow network call, gets terminated after the timeout expires. The error is logged, and the core loop continues without interruption.",zh:"钩子带有可配置的超时机制。行为异常的插件，无论是陷入死循环还是等待缓慢的网络调用，都会在超时后被终止。错误被记录，核心循环则不受影响地继续执行。"},{en:"Hook registration order matters. Plugins registered first have their hooks executed first. This enables priority-based behavior: a security plugin can validate input before a logging plugin records it.",zh:"钩子的注册顺序非常重要。先注册的插件，其钩子优先执行。这实现了基于优先级的行为编排：安全插件可在日志插件记录输入之前先行验证。"}],flowchartSvg:`<svg viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
    <marker id="arrow-s04" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- Core loop box -->
  <rect x="160" y="30" width="180" height="160" rx="8" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="250" y="52" text-anchor="middle" fill="#3b82f6" font-size="11" font-family="system-ui" font-weight="bold">Core Loop</text>
  <!-- Hook points on the left -->
  <rect x="20" y="70" width="110" height="32" rx="16" fill="#8b5cf6" opacity="0.85"/>
  <text x="75" y="90" text-anchor="middle" fill="#fff" font-size="10" font-family="system-ui">config</text>
  <line x1="130" y1="86" x2="158" y2="86" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow-s04)"/>
  <rect x="20" y="115" width="110" height="32" rx="16" fill="#8b5cf6" opacity="0.85"/>
  <text x="75" y="135" text-anchor="middle" fill="#fff" font-size="10" font-family="system-ui">tool.execute.before</text>
  <line x1="130" y1="131" x2="158" y2="131" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow-s04)"/>
  <!-- Call LLM inside loop -->
  <rect x="185" y="75" width="130" height="30" rx="4" fill="#1e40af" opacity="0.8"/>
  <text x="250" y="94" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="system-ui">Call LLM</text>
  <line x1="250" y1="105" x2="250" y2="115" stroke="#666" stroke-width="1.5"/>
  <rect x="185" y="115" width="130" height="30" rx="4" fill="#1e40af" opacity="0.8"/>
  <text x="250" y="134" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="system-ui">Execute Tool</text>
  <line x1="250" y1="145" x2="250" y2="155" stroke="#666" stroke-width="1.5"/>
  <rect x="185" y="155" width="130" height="30" rx="4" fill="#1e40af" opacity="0.8"/>
  <text x="250" y="174" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="system-ui">Feed Back</text>
  <!-- Hook points on the right -->
  <rect x="370" y="70" width="110" height="32" rx="16" fill="#8b5cf6" opacity="0.85"/>
  <text x="425" y="90" text-anchor="middle" fill="#fff" font-size="10" font-family="system-ui">tool.execute.after</text>
  <line x1="340" y1="86" x2="368" y2="86" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow-s04)"/>
  <rect x="370" y="115" width="110" height="32" rx="16" fill="#8b5cf6" opacity="0.85"/>
  <text x="425" y="135" text-anchor="middle" fill="#fff" font-size="10" font-family="system-ui">permission.ask</text>
  <line x1="340" y1="131" x2="368" y2="131" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow-s04)"/>
  <!-- Plugin label at bottom -->
  <rect x="70" y="200" width="360" height="36" rx="4" fill="none" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4,2" opacity="0.5"/>
  <text x="250" y="215" text-anchor="middle" fill="#8b5cf6" font-size="10" font-family="system-ui">Plugins register hooks → hooks wrap core loop → core never imports plugins</text>
  <!-- Hook runner -->
  <rect x="160" y="250" width="180" height="36" rx="6" fill="#6366f1" opacity="0.8"/>
  <text x="250" y="273" text-anchor="middle" fill="#fff" font-size="11" font-family="monospace">for (hook of hooks[name]) { ... }</text>
  <line x1="250" y1="236" x2="250" y2="248" stroke="#666" stroke-width="1" marker-end="url(#arrow-s04)"/>
  <text x="250" y="310" text-anchor="middle" fill="#666" font-size="10" font-family="system-ui">Each hook gets typed payload + timeout</text>
</svg>`,annotatedCode:{overview:{en:"Plugins register hook functions for named lifecycle events. The core loop invokes these hooks at the appropriate points without any knowledge of which plugins exist.",zh:"插件为已命名的生命周期事件注册钩子函数。核心循环在适当的时机调用这些钩子，无需知晓具体有哪些插件存在。"},annotations:[{lineStart:5,lineEnd:11,text:"Pre-execution hook: runs before every tool call. This example logs bash commands, but a security plugin could use the same hook to validate commands. Multiple plugins can coexist on the same hook, each serving a different purpose.",zhText:"执行前钩子：在每个工具调用之前触发。此示例用于记录 bash 命令，安全插件则可用同一钩子验证命令。多个插件可在同一钩子上共存，各自承担不同的职责。"},{lineStart:12,lineEnd:18,text:"Post-execution hook: runs after every tool call with the result attached. This is where error notifications, metrics collection, and audit logging belong.",zhText:"执行后钩子：在每个工具调用之后触发，并附带执行结果。错误通知、指标收集和审计日志等功能都适合在此处实现。"},{lineStart:19,lineEnd:25,text:"Config hook: runs when the agent loads configuration. This allows plugins to modify the config before it takes effect, such as adding skill paths or setting defaults.",zhText:"配置钩子：在 agent 加载配置时触发。这允许插件在配置生效前进行修改，例如添加技能路径或设置默认值。"},{lineStart:29,lineEnd:31,text:"Hook invocation: the core loop iterates over all registered hooks for a given event and calls them in order. If a hook throws an error or times out, the exception is caught and logged. Other hooks continue to run unaffected.",zhText:"钩子调用：核心循环遍历给定事件的所有已注册钩子，并按顺序依次调用。如果某钩子抛出异常或超时，错误会被捕获并记录，其他钩子不受影响继续执行。"}],flowSummary:{en:"Flow: Plugin registers hooks → Hook registry stores them → Loop reaches event point → Iterates registered hooks → Each hook runs with typed context and timeout → Loop continues unaffected by individual hook failures",zh:"流程：插件注册钩子 → 钩子注册表存储 → 循环到达事件点 → 遍历已注册钩子 → 每个钩子携带类型化上下文和超时执行 → 单个钩子失败不影响循环继续"}},claudeCodeComparison:{en:"Claude Code does not expose a plugin system in the traditional sense. OpenCode's lifecycle hooks (beforeToolExecute, afterToolExecute, beforeLlmCall, onConfigLoad) are a distinguishing feature. They allow any external code to intercept and augment the core loop without modifying the source. This is closer to VS Code's extension model than anything found in Claude Code.",zh:"Claude Code 不提供传统意义上的插件系统。OpenCode 的生命周期钩子（beforeToolExecute、afterToolExecute、beforeLlmCall、onConfigLoad）是其显著特性。这些钩子允许任何外部代码拦截并增强核心循环的功能，而无需修改源代码。这更接近 VS Code 的扩展模型，而非 Claude Code 中的任何机制。"}},s05:{description:"Tasks are classified into categories before execution. Each category (quick, deep, visual-engineering, artistry, and more) maps to an agent configuration optimized for that type of work. The model never sees the routing logic. It receives only the appropriate system prompt and tool set for its assigned category.",zhDescription:"任务在执行前按类别分类。每个类别（quick、deep、visual-engineering、artistry 等）都映射到针对该工作类型优化的 agent 配置。模型不感知路由逻辑的存在，只接收对应类别的系统提示和工具集。",codeSample:`const CATEGORIES = {
  quick: {
    model: "fast-model",
    temperature: 0.2,
    tools: ["bash", "read", "edit"],
    systemPrompt: "Make minimal, targeted changes."
  },
  deep: {
    model: "powerful-model",
    temperature: 0.1,
    tools: ["bash", "read", "write", "glob"],
    systemPrompt: "Research thoroughly before acting."
  },
  "visual-engineering": {
    model: "powerful-model",
    temperature: 0.3,
    tools: ["bash", "read", "write"],
    systemPrompt: "You are a UI designer-developer."
  }
};

function dispatchTask(input) {
  const category = classifyInput(input);
  const config = CATEGORIES[category];
  return agentLoop(input, config);
}`,codeLanguage:"javascript",learnSections:[{title:"The Problem: One Size Does Not Fit All",content:"A single agent configuration cannot be optimal for every task. Simple edits need speed and low latency, while deep architectural work demands powerful reasoning and broader context. Using the same model and tools for all tasks wastes tokens on simple requests and underdelivers on complex ones. The solution is a category system: classify the task before execution, then route it to a specialized configuration. Each category specifies its own model, temperature, tool set, and system prompt. The dispatch is invisible to the model. It simply receives the correct configuration and proceeds.",zhTitle:"问题：一刀切并不适用所有场景",zhContent:"单一的 agent 配置无法对所有任务达到最优。简单的编辑需要速度和低延迟，而深层的架构工作需要强大的推理能力和更丰富的上下文。对所有任务使用相同的模型和工具，既在简单任务上浪费 tokens，又在复杂任务上力不从心。解决方案是分类系统：在执行前对任务分类，再路由到专门配置。每个分类指定自己的模型、温度、工具集和系统提示。调度过程对模型完全透明，它只需接收正确的配置即可执行。"},{title:"Classifier Design: Heuristics Over Model Calls",content:"The classifyInput() function uses rule-based heuristics instead of querying another LLM. Task length, keywords, file types being edited, and the presence of specific patterns such as 'refactor' or 'add test' determine the category. This keeps classification instantaneous and cost-free. The classifier is also pluggable. Plugins can add new categories or override the classification rules for existing ones.",zhTitle:"分类器设计：启发式优于模型调用",zhContent:"classifyInput() 函数采用基于规则的启发式方法，而非调用另一个 LLM 来判断。任务长度、关键词、正在编辑的文件类型，以及是否存在 'refactor' 或 'add test' 等特定模式，共同决定了分类结果。这使分类过程瞬时完成且零成本。分类器本身也是可插拔的：插件可以添加新类别，也可覆盖现有类别的分类规则。"},{title:"Real Implementation: Agent Selection via Plugin System",content:"In the actual opencode codebase (packages/core/src/plugin/agent.ts), agent selection uses the plugin system rather than a routing table. Agents are registered through plugin hooks (build, plan, general, explore, compaction, title, summary), and each is distinguished by its mode (primary, subagent, all) and a hidden boolean flag. The 'categories' concept in the web application UI exists only for command palette organization. The core runtime selects agents by mode, not by category. Task-specific routing is achieved through agent hierarchy. The build agent, the default primary, dispatches to subagents such as explore or oracle based on the task description.",zhTitle:"真实实现：通过插件系统的 Agent 选择",zhContent:"在 opencode 的实际代码库中，agent 的选择依赖插件系统而非路由表。Agent 通过插件钩子注册（build、plan、general、explore、compaction、title、summary），每种 agent 由其模式（primary、subagent、all）和 hidden 布尔值区分。Web 应用 UI 中的 'categories' 概念仅服务于命令面板的组织。核心运行时按模式而非类别选择 agent。任务级别的路由通过 agent 层次结构实现：build agent（默认 primary）根据任务描述将工作分派给 explore 或 oracle 等子代理。"}],designHighlights:[{en:"Temperature varies by category. Quick tasks use higher temperature for more creative and divergent thinking, while deep tasks use lower temperature for focused and precise reasoning. This is an inexpensive yet effective way to steer model behavior.",zh:"温度随类别而变化。快速任务使用较高温度以激发创造性和发散思维，深度任务则使用较低温度以保证专注和精确。这是控制模型行为的一种廉价而有效的手段。"},{en:"Tool availability is restricted per category. A 'quick' agent does not receive write access. It can only read and edit existing files. This provides an additional safety boundary beyond the permission gate.",zh:"每个类别的工具可用性受到限制。'quick' agent 不具备写入权限，只能读取和编辑已有文件。这是在权限门之外又增加了一层安全边界。"}],flowchartSvg:`<svg viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
    <marker id="arrow-s05" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- Input -->
  <rect x="180" y="10" width="140" height="36" rx="6" fill="#3b82f6" opacity="0.8"/>
  <text x="250" y="33" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Task Input</text>
  <line x1="250" y1="46" x2="250" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s05)"/>
  <!-- Classifier -->
  <rect x="160" y="70" width="180" height="36" rx="6" fill="#6366f1" opacity="0.85"/>
  <text x="250" y="93" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">classifyInput()</text>
  <line x1="250" y1="106" x2="250" y2="130" stroke="#666" stroke-width="2"/>
  <!-- Router -->
  <polygon points="250,130 370,180 250,230 130,180" fill="#f59e0b" opacity="0.85"/>
  <text x="250" y="177" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Category?</text>
  <!-- quick branch -->
  <line x1="130" y1="180" x2="60" y2="180" stroke="#10b981" stroke-width="2"/>
  <line x1="60" y1="180" x2="60" y2="260" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-s05)"/>
  <text x="85" y="175" fill="#10b981" font-size="10" font-family="system-ui">quick</text>
  <rect x="20" y="260" width="80" height="40" rx="4" fill="#059669" opacity="0.7"/>
  <text x="60" y="275" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">fast-model</text>
  <text x="60" y="290" text-anchor="middle" fill="#a7f3d0" font-size="8" font-family="system-ui">temp: 0.2</text>
  <!-- deep branch -->
  <line x1="250" y1="230" x2="250" y2="260" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-s05)"/>
  <text x="260" y="248" fill="#3b82f6" font-size="10" font-family="system-ui">deep</text>
  <rect x="210" y="260" width="80" height="40" rx="4" fill="#2563eb" opacity="0.7"/>
  <text x="250" y="275" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">powerful</text>
  <text x="250" y="290" text-anchor="middle" fill="#93c5fd" font-size="8" font-family="system-ui">temp: 0.1</text>
  <!-- visual-engineering branch -->
  <line x1="370" y1="180" x2="440" y2="180" stroke="#8b5cf6" stroke-width="2"/>
  <line x1="440" y1="180" x2="440" y2="260" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrow-s05)"/>
  <text x="415" y="175" fill="#8b5cf6" font-size="10" font-family="system-ui">visual</text>
  <rect x="400" y="260" width="80" height="40" rx="4" fill="#7c3aed" opacity="0.7"/>
  <text x="440" y="275" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">powerful</text>
  <text x="440" y="290" text-anchor="middle" fill="#c4b5fd" font-size="8" font-family="system-ui">temp: 0.3</text>
  <!-- Each routes to agentLoop -->
  <text x="250" y="330" text-anchor="middle" fill="#666" font-size="10" font-family="system-ui">Each → agentLoop(input, config)</text>
</svg>`,annotatedCode:{overview:{en:"The category dispatch system separates 'what to do' from 'how to do it'. classifyInput() analyzes the task and routes it to the appropriate agent configuration.",zh:"分类调度系统将'做什么'与'怎么做'相分离。classifyInput() 分析任务后，将其路由到合适的 agent 配置。"},annotations:[{lineStart:1,lineEnd:16,text:"Categories are configuration objects, not classes or instances. Each one specifies a model, temperature, tool whitelist, and a system prompt that steers the agent toward the appropriate behavior for that category.",zhText:"类别是配置对象，而非类或实例。每个类别指定了模型、温度、工具白名单和系统提示，引导 agent 展现出适合该类别的工作行为。"},{lineStart:21,lineEnd:23,text:"classifyInput() analyzes the task text and context using heuristics. Short tasks that reference file paths receive the 'quick' category. Tasks mentioning 'architecture' or spanning many files are classified as 'deep'. UI-related tasks are routed to 'visual-engineering'.",zhText:"classifyInput() 使用启发式规则分析任务文本和上下文。简短且引用文件路径的任务归类为 'quick'；提及 'architecture' 或涉及多个文件的任务归类为 'deep'；与 UI 相关的任务则路由到 'visual-engineering'。"},{lineStart:24,lineEnd:25,text:"The agentLoop() function is the same one introduced in s01. It is called with the task input and the category's configuration. The loop itself is reused; only the configuration changes.",zhText:"agentLoop() 函数与 s01 中介绍的完全相同。它以任务输入和类别配置为参数被调用。循环本身被复用，变化的只有配置。"}],flowSummary:{en:"Flow: Task arrives → classifyInput() determines category → CATEGORIES[category] lookup → agentLoop(input, config) runs with category-specific model, tools, and prompt",zh:"流程：任务到达 → classifyInput() 确定类别 → 查找 CATEGORIES[category] → agentLoop(input, config) 使用类别专属的模型、工具和提示执行"}},claudeCodeComparison:{en:"Claude Code routes tasks to appropriate configurations internally but does not expose the routing mechanism. OpenCode's CATEGORIES map is an explicit, configurable routing table. It classifies incoming tasks through input analysis and selects the model, tool set, and system prompt per category (visual tasks receive a vision model, coding tasks receive a code model, and so on). This config-driven approach makes the agent adaptable to different task domains without requiring code changes.",zh:"Claude Code 在内部将任务路由到合适的配置，但不暴露路由机制。OpenCode 的 CATEGORIES 映射是一个显式且可配置的路由表。它通过输入分析对任务进行分类，并按类别选择模型、工具集和系统提示（视觉类任务分配视觉模型，编码类任务分配代码模型，依此类推）。这种配置驱动的方式使 agent 能够适应不同的任务领域，而无需更改代码。"}},s06:{description:"OpenCode's subagent system provides 10 named agents, each with documented expertise. Oracle handles architecture, explore searches the codebase, librarian looks up documentation, and more. Subagents receive isolated context with a clean message history and can be dispatched via @mention or programmatically.",zhDescription:"OpenCode 的子代理系统提供 10 个命名代理，每个都有明确的专长文档。Oracle 负责架构分析，explore 搜索代码库，librarian 查阅文档，依此类推。子代理拥有隔离的上下文和干净的消息历史，可通过 @mention 或编程方式调度。",codeSample:`const AGENTS = {
  oracle: {
    description: "High-IQ reasoning for hard problems",
    model: "powerful-model",
    temperature: 0.1,
  },
  explore: {
    description: "Contextual codebase search",
    model: "fast-model",
    temperature: 0.2,
    tools: ["bash", "grep", "glob"],
  },
  librarian: {
    description: "External docs & reference search",
    model: "powerful-model",
    temperature: 0.2,
    tools: ["web_search", "web_fetch"],
  },
};

async function callSubagent(name, task) {
  const agent = AGENTS[name];
  if (!agent) throw new Error(\`Unknown agent: \${name}\`);

  const messages = [
    { role: "system", content: buildSystemPrompt(agent) },
    { role: "user", content: task }
  ];

  return agentLoop(messages, agent);
}`,codeLanguage:"javascript",learnSections:[{title:"The Problem: Context Pollution in Single-Agent Systems",content:"In a single-agent system, every tool result, error message, and intermediate thought pollutes the same conversation. The agent must constantly refilter what is relevant from the growing noise. Subagents solve this problem by creating isolated contexts. Each subagent is a fresh agent loop with its own message history. The parent dispatches a task, and the subagent works independently, returning only the final result. This prevents the parent's context from being diluted by exploration that only the subagent needs to see.",zhTitle:"问题：单代理系统中的上下文污染",zhContent:"在单代理系统中，每个工具的执行结果、错误消息和中间思考都会污染同一个对话空间。Agent 必须持续从不断增长的噪音中重新筛选相关信息。子代理通过创建隔离的上下文来解决这一问题。每个子代理都是一个拥有独立消息历史的 agent 循环。父级调度一个任务后，子代理独立完成工作，只返回最终结果。这防止了父级的上下文被子代理所需的探索过程所稀释。"},{title:"Composition Through Isolation",content:"Each subagent runs its own agentLoop(), the same function introduced in s01. This means subagents inherit all capabilities, including tools, hooks, and permissions, without requiring any special code. The only differences are that the message history starts clean and the system prompt tailors behavior. The parent can dispatch multiple subagents in parallel, as explored in s09, and collect results as they complete. This transforms the agent into an orchestrator that decomposes complex tasks, delegates pieces to specialists, and synthesizes the final results.",zhTitle:"通过隔离实现组合",zhContent:"每个子代理都运行自己的 agentLoop()，即 s01 中介绍的那个函数。这意味着子代理继承了所有能力（工具、钩子、权限），无需编写任何特殊代码。唯一的区别在于消息历史从空白开始，系统提示定制了具体行为。父级可以并行调度多个子代理（详见 s09），并在它们完成后收集结果。这将 agent 转变为一个编排器：分解复杂任务，将各个部分委托给专家代理，最后综合所有结果。"},{title:"Real Implementation: Task Tool and BackgroundJob",content:"OpenCode's actual subagent dispatch uses the task tool (packages/opencode/src/tool/task.ts) combined with BackgroundJob (packages/core/src/background-job.ts). Instead of making a direct function call, the task tool creates a child session with its own permission scope. This scope inherits the parent's deny rules and adds the subagent's own ruleset. Subagents can run in two modes. In foreground mode, the parent awaits the result via background.wait(). In background mode, the call returns immediately and results are injected when the subagent finishes. The task_id parameter allows resuming the same subagent session across multiple calls, unlike the simplified version where each call creates a new context.",zhTitle:"真实实现：Task Tool 和 BackgroundJob",zhContent:"OpenCode 实际的子代理调度使用 task tool (packages/opencode/src/tool/task.ts) 结合 BackgroundJob (packages/core/src/background-job.ts)。与直接函数调用不同，task tool 创建一个带有独立权限范围的子会话。该范围继承父级的 deny 规则，并叠加子代理自身的规则集。子代理支持两种运行模式。在前台模式下，父级通过 background.wait() 等待结果。在后台模式下，调用立即返回，子代理完成后注入结果。task_id 参数支持跨多次调用恢复同一子代理会话，这与简化版本每次调用都创建新上下文的方式不同。"}],designHighlights:[{en:"Subagents are dispatched with a clean context, but the parent can pass relevant context snippets. The prompt building function extracts only the portions of the conversation that are relevant to the subagent's specialty.",zh:"子代理以干净上下文被调度，但父级可传递相关的上下文片段。提示构建函数仅提取对话中与子代理专长相关的部分。"},{en:"Subagent results are returned as structured data rather than being appended to the parent's message history as a flat string. This enables the parent to parse, validate, and selectively incorporate the subagent's output.",zh:"子代理的结果以结构化数据形式返回，而非以纯文本字符串附加到父级的消息历史中。这使得父级能够解析、验证并有选择性地整合子代理的输出。"}],flowchartSvg:`<svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
    <marker id="arrow-s06" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- Main agent -->
  <rect x="180" y="10" width="140" height="40" rx="8" fill="#3b82f6" opacity="0.85"/>
  <text x="250" y="35" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui" font-weight="bold">Main Agent</text>
  <!-- Dispatch lines -->
  <line x1="180" y1="30" x2="60" y2="90" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-s06)"/>
  <text x="100" y="55" fill="#10b981" font-size="9" font-family="system-ui">oracle</text>
  <line x1="250" y1="50" x2="250" y2="90" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-s06)"/>
  <text x="260" y="75" fill="#10b981" font-size="9" font-family="system-ui">explore</text>
  <line x1="320" y1="30" x2="440" y2="90" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-s06)"/>
  <text x="400" y="55" fill="#10b981" font-size="9" font-family="system-ui">librarian</text>
  <!-- Subagent boxes -->
  <rect x="10" y="90" width="100" height="90" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
  <text x="60" y="112" text-anchor="middle" fill="#6ee7b7" font-size="10" font-family="system-ui" font-weight="bold">oracle</text>
  <text x="60" y="130" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">reasoning</text>
  <text x="60" y="145" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">temp: 0.1</text>
  <text x="60" y="160" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">powerful</text>
  <rect x="200" y="90" width="100" height="90" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
  <text x="250" y="112" text-anchor="middle" fill="#6ee7b7" font-size="10" font-family="system-ui" font-weight="bold">explore</text>
  <text x="250" y="130" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">grep/glob</text>
  <text x="250" y="145" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">temp: 0.2</text>
  <text x="250" y="160" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">fast</text>
  <rect x="390" y="90" width="100" height="90" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
  <text x="440" y="112" text-anchor="middle" fill="#6ee7b7" font-size="10" font-family="system-ui" font-weight="bold">librarian</text>
  <text x="440" y="130" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">web/docs</text>
  <text x="440" y="145" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">temp: 0.2</text>
  <text x="440" y="160" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">powerful</text>
  <!-- Results back -->
  <line x1="60" y1="180" x2="60" y2="240" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="60" y1="240" x2="250" y2="280" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-s06)"/>
  <line x1="250" y1="180" x2="250" y2="280" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-s06)"/>
  <line x1="440" y1="180" x2="440" y2="240" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="440" y1="240" x2="250" y2="280" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrow-s06)"/>
  <!-- Results collection -->
  <rect x="160" y="270" width="180" height="36" rx="6" fill="#3b82f6" opacity="0.8"/>
  <text x="250" y="293" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Collect & Synthesize</text>
  <!-- Clean context note -->
  <text x="250" y="340" text-anchor="middle" fill="#666" font-size="10" font-family="system-ui">Each subagent = fresh agentLoop() + clean message history</text>
</svg>`,flowchartHtml:"s07-workflow.html",annotatedCode:{overview:{en:"Subagents are named agent configurations dispatched with a clean context. callSubagent() creates a fresh agent loop with a tailored system prompt and an isolated message history.",zh:"子代理是带有干净上下文的命名 agent 配置。callSubagent() 创建一个全新的 agent 循环，配有定制化的系统提示和隔离的消息历史。"},annotations:[{lineStart:1,lineEnd:18,text:"Agent definitions: named configurations that include a description, model selection, temperature, and tool whitelist. Each agent is optimized for a specific domain of work.",zhText:"Agent 定义：包含描述、模型选择、温度和工具白名单的命名配置。每个 agent 均针对特定工作领域进行了优化。"},{lineStart:20,lineEnd:22,text:"The callSubagent() function looks up the agent configuration and validates the agent name. Unknown agent names produce a clear error rather than failing silently.",zhText:"callSubagent() 函数查找 agent 配置并验证名称是否有效。未知的 agent 名称会产生明确的错误信息，而非静默失败。"},{lineStart:24,lineEnd:28,text:"Building a clean context: a fresh system message with the agent's prompt, combined with the user's task. No prior tool results, no conversation history. Only the task at hand.",zhText:"构建干净上下文：一条包含 agent 提示的新系统消息，加上用户的任务。没有之前的工具结果，没有对话历史。只有当前的任务。"},{lineStart:30,lineEnd:31,text:"The same agentLoop() from s01 is reused. Subagents are not special. They are the same loop running with different configuration. This is composition over inheritance in practice.",zhText:"复用 s01 中同一个 agentLoop()。子代理并无特殊之处，它们是以不同配置运行的同一循环。这正是组合优于继承的实践体现。"}],flowSummary:{en:"Flow: Parent identifies subtask → callSubagent(name, task) → buildSystemPrompt(agent) → fresh agentLoop() starts → subagent works independently → returns structured result → parent synthesizes all results",zh:"流程：父级识别子任务 → callSubagent(name, task) → buildSystemPrompt(agent) → 启动全新 agentLoop() → 子代理独立执行 → 返回结构化结果 → 父级综合所有结果"}},claudeCodeComparison:{en:"Both support subagent delegation. Claude Code does so through its agent mode, while OpenCode uses its subagent system. OpenCode's approach is more granular: each subagent gets its own loop, tool set, and permission context. The specialized agent types in OpenCode, such as Explorer, Librarian, and Oracle, mirror real engineering roles. Each comes with tuned system prompts and tool access. The parent agent can dispatch tasks to multiple subagents in parallel and synthesize the results.",zh:"两者都支持子代理委派。Claude Code 通过其 agent 模式实现，而 OpenCode 则使用其子代理系统。OpenCode 的方法粒度更细：每个子代理拥有自己的循环、工具集和权限上下文。OpenCode 中的 Explorer、Librarian 和 Oracle 等专用代理类型，对应了真实的工程角色。每种代理都配有经过调优的系统提示和工具访问权限。父代理可以并行向多个子代理分派任务，并综合它们的结果。"}},s07:{description:"Skills are SKILL.md files with YAML frontmatter. They load in strict priority order: project-level skills take precedence, followed by personal skills, then built-in defaults. A higher-priority skill shadows any skill sharing its name at a lower tier. The skill tool loads content on demand, injecting it into context only when the agent requests it.",zhDescription:"技能是带有 YAML 前置元数据的 SKILL.md 文件。加载顺序遵循严格的优先级层级：项目级技能最优先，其次为个人技能，最后是内置默认技能。高优先级的同名技能会覆盖低层级的技能。Skill 工具仅在 agent 请求时才将内容按需加载到上下文中。",codeSample:`# Example SKILL.md file:
# ---
# name: react-testing
# description: Best practices for testing React components with Vitest
# ---

# Priority loading:
# project/.opencode/skills/react-testing/SKILL.md  ← highest
# ~/.config/opencode/skills/react-testing/SKILL.md ← medium  
# (built-in)/react-testing/SKILL.md                 ← lowest

def load_skill(name):
    for dir in SKILL_DIRS:  # [project, personal, built-in]
        path = f"{dir}/{name}/SKILL.md"
        if os.path.exists(path):
            return parse_skill(path)
    return None`,codeLanguage:"python",learnSections:[{title:"The Problem: How to Inject Specialized Knowledge Without Overloading Context",content:"A general-purpose coding agent cannot know every framework, library, or project convention in advance. Pre-loading all possible knowledge would exhaust the context window. The solution is an on-demand skill system: skills are markdown files with structured metadata, stored in a priority-ordered directory tree. The skill tool loads content only when the agent explicitly requests it or when a task description matches a skill's declared purpose. This approach keeps the context window lean while making specialized knowledge available precisely when needed.",zhTitle:"问题：如何在不过载上下文的情况下注入专业知识",zhContent:"通用编程 agent 不可能预先了解每个框架、库或项目约定的细节。预加载所有知识会迅速耗尽上下文窗口。解决方案是按需技能系统：技能是带有结构化元数据的 markdown 文件，按优先级顺序存储在目录树中。Skill 工具仅在 agent 明确请求或任务描述与技能的声明用途匹配时才加载其内容。这种方法在保持上下文精简的同时，确保专业知识在需要时精准可用。"},{title:"Priority-Based Loading: Predictable Override",content:"The three-tier priority system (project, personal, built-in) makes loading behavior fully deterministic. A project-level skill always wins, so there is no ambiguity about which version of a skill like 'react-testing' takes effect. This design allows organizations to distribute standard skills through their repository, lets individual developers override skills to match their preferences, and enables opencode itself to ship sensible defaults. The load_skill() function iterates directories in priority order and returns the first match, short-circuiting on success.",zhTitle:"基于优先级的加载：可预测的覆盖",zhContent:"三层优先级系统（项目级、个人级、内置级）使加载行为完全确定。项目级技能始终优先，因此不会对 'react-testing' 这类技能的哪个版本生效产生歧义。这种设计允许组织通过仓库分发标准技能，允许个人开发者按自身偏好覆盖技能，同时使 opencode 自身能够提供合理的默认值。load_skill() 函数按优先级顺序遍历目录，返回第一个匹配项，成功后即短路退出。"}],designHighlights:[{en:"Skill descriptions serve double duty: the agent uses them to discover relevant skills at runtime. When encountering an unfamiliar task, the agent scans available descriptions and requests the matching skill. This is a form of just-in-time knowledge retrieval.",zh:"技能描述承担双重职责：agent 在运行时利用它们发现相关技能。遇到不熟悉的任务时，agent 扫描可用描述并请求匹配的技能。这是一种即时知识检索形式。"},{en:"Skills are pure markdown with no executable code. This guarantees safe loading from untrusted repositories. A skill file cannot execute arbitrary code or modify agent behavior beyond providing textual context.",zh:"技能是纯 markdown，不含可执行代码。这保证了从未知仓库加载的安全性。技能文件无法执行任意代码，也无法在提供文本上下文之外修改 agent 的行为。"}],flowchartSvg:`<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs>
    <marker id="arrow-s07" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- load_skill call -->
  <rect x="175" y="10" width="150" height="36" rx="6" fill="#8b5cf6" opacity="0.85"/>
  <text x="250" y="33" text-anchor="middle" fill="#fff" font-size="12" font-family="monospace">load_skill(name)</text>
  <line x1="250" y1="46" x2="250" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow-s07)"/>
  <!-- Priority 1: Project -->
  <rect x="120" y="70" width="260" height="44" rx="6" fill="#10b981" opacity="0.85"/>
  <text x="140" y="90" text-anchor="start" fill="#fff" font-size="12" font-family="system-ui" font-weight="bold">① project/.opencode/skills/</text>
  <text x="140" y="105" text-anchor="start" fill="#a7f3d0" font-size="10" font-family="system-ui">Highest priority: checked first</text>
  <!-- Found? -->
  <polygon points="250,114 310,140 250,166 190,140" fill="#f59e0b" opacity="0.8"/>
  <text x="250" y="138" text-anchor="middle" fill="#fff" font-size="10" font-family="system-ui">Found?</text>
  <line x1="250" y1="114" x2="250" y2="138" stroke="#666" stroke-width="1.5"/>
  <!-- Yes → Return -->
  <line x1="310" y1="140" x2="430" y2="140" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-s07)"/>
  <text x="380" y="133" fill="#10b981" font-size="10" font-family="system-ui">Yes → Return</text>
  <!-- No → Next -->
  <line x1="190" y1="155" x2="90" y2="200" stroke="#666" stroke-width="1.5" marker-end="url(#arrow-s07)"/>
  <text x="120" y="183" fill="#666" font-size="9" font-family="system-ui">Not found → check personal</text>
  <!-- Priority 2: Personal -->
  <rect x="120" y="200" width="260" height="44" rx="6" fill="#6366f1" opacity="0.85"/>
  <text x="140" y="220" text-anchor="start" fill="#fff" font-size="12" font-family="system-ui" font-weight="bold">② ~/.config/opencode/skills/</text>
  <text x="140" y="235" text-anchor="start" fill="#c4b5fd" font-size="10" font-family="system-ui">Medium priority: user installed</text>
  <polygon points="250,244 310,270 250,296 190,270" fill="#f59e0b" opacity="0.8"/>
  <text x="250" y="268" text-anchor="middle" fill="#fff" font-size="10" font-family="system-ui">Found?</text>
  <line x1="250" y1="244" x2="250" y2="268" stroke="#666" stroke-width="1.5"/>
  <!-- Yes → Return -->
  <line x1="310" y1="270" x2="430" y2="270" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-s07)"/>
  <text x="380" y="263" fill="#10b981" font-size="10" font-family="system-ui">Yes → Return</text>
  <!-- Note about built-in -->
  <text x="250" y="318" text-anchor="middle" fill="#666" font-size="10" font-family="system-ui">③ Built-in: fallback if not found in project or personal</text>
</svg>`,annotatedCode:{overview:{en:"Skill loading follows a simple priority-chain pattern. Directories are checked in order, returning the first match. This makes override behavior fully predictable.",zh:"技能加载遵循简单的优先级链模式。按顺序检查目录，返回第一个匹配项。这使覆盖行为完全可预测。"},annotations:[{lineStart:2,lineEnd:5,text:"YAML frontmatter defines the skill's name and description. The description serves as the discovery index: the agent scans these at runtime to find relevant skills.",zhText:"YAML 前置元数据定义了技能的名称和描述。描述充当发现索引：agent 在运行时扫描这些内容以查找相关技能。"},{lineStart:8,lineEnd:11,text:"Priority ordering is hardcoded: project first, then personal config, then built-in. Placing a file with the same name at a higher-priority location overrides any lower-tier skill.",zhText:"优先级顺序是硬编码的：项目优先，然后是个人配置，最后是内置。在更高级别位置放置同名文件即可覆盖任何低层级技能。"},{lineStart:13,lineEnd:17,text:"The load_skill() function iterates each priority directory in order. It returns the first file found. If no file exists across all directories, it returns None: the skill does not exist.",zhText:"load_skill() 函数按顺序遍历每个优先级目录。返回第一个找到的文件。如果所有目录中都不存在该文件，则返回 None，该技能不存在。"}],flowSummary:{en:"Flow: load_skill(name) → check project/ → found? → return | not found → check personal/ → found? → return | not found → check built-in/ → found? → return | not found → None",zh:"流程：load_skill(name) → 检查 project/ → 找到? → 返回 | 未找到 → 检查 personal/ → 找到? → 返回 | 未找到 → 检查 built-in/ → 找到? → 返回 | 未找到 → None"}},claudeCodeComparison:{en:"Both systems support SKILL.md-based skill loading. OpenCode's three-tier priority chain (project, user, built-in) is more explicit than Claude Code's implicit discovery mechanism. The priority system means a project skill overrides a personal skill, which in turn overrides a built-in default. This is essential for team environments where project-level standards must take precedence.",zh:"两者都支持基于 SKILL.md 的技能加载。OpenCode 的三层优先级链（项目级、用户级、内置级）比 Claude Code 的隐式发现机制更明确。优先级系统意味着项目技能覆盖个人技能，个人技能覆盖内置默认值。这对团队环境至关重要，项目级标准必须具有优先权。"}},s08:{description:"The @opencode-ai/plugin package defines hooks as the public API between the agent core and extensions. Hooks cover every lifecycle stage: config loading, tool execution (before and after), message processing, permissions, authentication, shell environment setup, and session compaction. This comprehensive coverage means most extension needs are met without patching core code.",zhDescription:"@opencode-ai/plugin 包将钩子定义为 agent 核心与扩展之间的公共 API。钩子覆盖了每个生命周期阶段：配置加载、工具执行（前后）、消息处理、权限、认证、shell 环境设置和会话压缩。这种全面覆盖意味着大多数扩展需求无需修改核心代码即可满足。",codeSample:`interface Hooks {
  config?: (config: Config) => Config | void;
  event?: (event: Event) => void;
  tool?: (tool: ToolDef) => ToolDef | void;
  auth?: (auth: Auth) => Auth | void;
  provider?: (provider: Provider) => Provider | void;
  "tool.execute.before"?: (ctx: ToolContext) => void;
  "tool.execute.after"?: (ctx: ToolResult) => void;
  "shell.env"?: (env: Env) => Env;
  "experimental.session.compacting"?: (ctx: SessionCtx) => SessionCtx;
}

export default function myPlugin() {
  return {
    config: (config) => {
      config.skillPaths.push("/my/custom/path");
      return config;
    },
    "tool.execute.before": ({ tool, input }) => {
      log(\`Tool: \${tool}, Input: \${input}\`);
    }
  };
}`,codeLanguage:"typescript",learnSections:[{title:"The Problem: Stable Core, Unstable Extensions",content:"Every plugin system faces the same tension: the core must be stable enough to reason about, yet flexible enough to accommodate unknown future needs. OpenCode's plugin SDK resolves this by defining hooks as a TypeScript interface, a contract between core and extensions. The core declares: I will call these functions at these points. Plugins declare: I will provide functions matching these signatures. As long as both sides honor the interface, the core never needs to know about specific plugins, and plugins never need to patch the core.",zhTitle:"问题：稳定的核心，不稳定的扩展",zhContent:"每个插件系统都面临同样的张力：核心必须足够稳定以保证可推理性，同时又必须足够灵活以适应未知的未来需求。OpenCode 的插件 SDK 通过将钩子定义为 TypeScript 接口来解决这个问题。这是核心与扩展之间的契约。核心声明：我将在这些时间点调用这些函数。插件声明：我将提供匹配这些签名的函数。只要双方遵守该接口，核心永远不需要了解具体插件，插件也永远不需要修补核心。"},{title:"Comprehensive Hook Coverage: Why Every Hook Exists",content:"Each hook exists because someone needed it. The 'config' hook lets plugins modify settings before the agent starts. 'tool.execute.before' and 'tool.execute.after' enable logging, metrics, and validation. 'permission.ask' allows plugins to implement custom approval workflows. 'shell.env' injects environment variables for reproducible builds. 'experimental.session.compacting' lets plugins control how conversation history is summarized. This comprehensive coverage means the answer to 'can I do X with the plugin API?' is almost always 'yes, there is a hook for that.'",zhTitle:"全面的钩子覆盖：每个钩子为什么存在",zhContent:"每个钩子的存在都源于实际需求。'config' 钩子允许插件在 agent 启动前修改配置。'tool.execute.before' 和 'tool.execute.after' 支持日志、指标收集和验证。'permission.ask' 允许插件实现自定义审批流程。'shell.env' 注入环境变量以确保可重现的构建。全面覆盖意味着对于'能否用插件 API 实现 X？'这类问题，答案几乎总是'是的，有对应的钩子。'"}],designHighlights:[{en:"The Hooks interface uses optional methods: a plugin implements only the hooks it needs. No base class to extend, no abstract methods to implement. This is structural typing in action.",zh:"Hooks 接口使用可选方法：插件只实现它需要的钩子。无需继承基类或实现抽象方法。这是结构化类型系统的实际应用。"},{en:"The 'experimental.' prefix on certain hooks signals that their API may change. This gives the core team freedom to evolve while providing plugin authors early access. Once stabilized, the prefix is removed.",zh:"某些钩子上的 'experimental.' 前缀表示其 API 可能发生变化。这为核心团队保留了演进自由，同时为插件作者提供早期访问权限。稳定后，该前缀会被移除。"}],flowchartSvg:`<svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
    <marker id="arrow-s08" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- Plugin SDK box -->
  <rect x="150" y="10" width="200" height="36" rx="8" fill="#8b5cf6" opacity="0.9"/>
  <text x="250" y="33" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui" font-weight="bold">@opencode-ai/plugin</text>
  <!-- Hook categories -->
  <rect x="30" y="65" width="130" height="30" rx="4" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="95" y="84" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="system-ui">config</text>
  <rect x="185" y="65" width="130" height="30" rx="4" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="250" y="84" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="system-ui">tool.execute.before</text>
  <rect x="340" y="65" width="130" height="30" rx="4" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="405" y="84" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="system-ui">tool.execute.after</text>
  <rect x="30" y="105" width="130" height="30" rx="4" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="95" y="124" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="system-ui">permission.ask</text>
  <rect x="185" y="105" width="130" height="30" rx="4" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="250" y="124" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="system-ui">shell.env</text>
  <rect x="340" y="105" width="130" height="30" rx="4" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="405" y="124" text-anchor="middle" fill="#c4b5fd" font-size="10" font-family="system-ui">experimental.*</text>
  <!-- Arrow down -->
  <line x1="250" y1="135" x2="250" y2="160" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow-s08)"/>
  <!-- Plugin code box -->
  <rect x="100" y="160" width="300" height="80" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
  <text x="250" y="185" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="monospace">export default function myPlugin() {</text>
  <text x="250" y="205" text-anchor="middle" fill="#6ee7b7" font-size="11" font-family="monospace">  return { config, "tool.execute.before", ... }</text>
  <text x="250" y="225" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="monospace">}</text>
  <!-- Arrow down -->
  <line x1="250" y1="240" x2="250" y2="265" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#arrow-s08)"/>
  <!-- Core integration -->
  <rect x="100" y="265" width="300" height="36" rx="6" fill="#1e40af" opacity="0.85"/>
  <text x="250" y="288" text-anchor="middle" fill="#93c5fd" font-size="11" font-family="system-ui">Core Loop: iterates registered hooks by name</text>
  <!-- Bottom note -->
  <text x="250" y="340" text-anchor="middle" fill="#666" font-size="10" font-family="system-ui">Plugins register hook functions → Core calls them at lifecycle points → Never modified</text>
</svg>`,annotatedCode:{overview:{en:"The Hooks interface is the complete public API for extensions. Every method is optional: a plugin implements only what it needs. The core calls registered hooks at lifecycle points without knowing which plugin registered them.",zh:"Hooks 接口是扩展的完整公共 API。每个方法都是可选的：插件只实现其所需的部分。核心在生命周期点调用已注册的钩子，而无需知道是哪个插件注册的。"},annotations:[{lineStart:1,lineEnd:12,text:"The complete hooks API surface. Each hook targets a specific lifecycle point. The naming convention (domain.subdomain) makes the interface self-documenting: 'tool.execute.before' runs before tool execution, 'shell.env' fires when setting up the shell environment.",zhText:"完整的钩子 API 面。每个钩子针对特定的生命周期点。命名约定使其自文档化：'tool.execute.before' 在工具执行前运行，'shell.env' 在设置 shell 环境时触发。"},{lineStart:7,lineEnd:8,text:"The permission hook allows plugins to override the default permission gate with custom logic. An enterprise plugin might enforce IP-based restrictions or require multi-party approval for destructive operations.",zhText:"权限钩子允许插件用自定义逻辑覆盖默认权限门。企业插件可以强制执行基于 IP 的限制或要求对破坏性操作进行多方审批。"},{lineStart:14,lineEnd:24,text:"A real plugin factory function. It returns an object containing only the hooks it needs. The config hook modifies settings; the tool.execute.before hook logs every tool invocation. No base class, no interface implementation: just an object that matches the expected shape.",zhText:"一个真实的插件工厂函数。它返回一个只包含所需钩子的对象。config 钩子修改设置；tool.execute.before 钩子记录每次工具调用。没有基类，无需接口实现，只返回一个匹配预期形状的对象。"}],flowSummary:{en:"Flow: Plugin → returns hook object → PluginRegistry.register(plugin) → Core reaches lifecycle event → iterates registered hooks[event] → calls each with typed context → collects results or mutations",zh:"流程：插件 → 返回钩子对象 → PluginRegistry.register(plugin) → 核心到达生命周期事件 → 遍历已注册的 hooks[event] → 用类型化上下文调用每个钩子 → 收集结果或变更"}},claudeCodeComparison:{en:"The Plugin SDK is one of OpenCode's most distinctive features. Claude Code has no equivalent. The registerPlugin(plugin: Plugin) → hooks[] → lifecycle events pattern enables a marketplace-style ecosystem where third-party plugins add capabilities (new tools, permission policies, config transformations) without forking the core repository.",zh:"Plugin SDK 是 OpenCode 最独特的特性之一，Claude Code 没有对等功能。registerPlugin(plugin: Plugin) → hooks[] → lifecycle events 模式支持市场风格的生态系统，第三方插件可以添加新工具、权限策略和配置转换，而无需 fork 核心仓库。"}},s09:{description:"Slow operations execute in background threads so the agent can continue reasoning. Results are pushed to an event bus with no polling required. This dramatically improves throughput for long-running tests, network calls, file downloads, and similar operations.",zhDescription:"慢操作在后台线程中执行，使 agent 可以继续推理。结果被推送到事件总线，无需轮询。这大幅提升了长时间运行的测试、网络调用、文件下载等操作的吞吐量。",codeSample:`const backgroundTasks = new Map();
const eventBus = new EventEmitter();

async function runBackground(taskId, fn) {
  const promise = fn();
  backgroundTasks.set(taskId, { promise, status: "running" });
  promise.then((result) => {
    backgroundTasks.set(taskId, { result, status: "done" });
    eventBus.emit("task.complete", { taskId, result });
  });
  return taskId;
}

eventBus.on("task.complete", ({ taskId, result }) => {
  messages.push({
    role: "user",
    content: \`Background task \${taskId} completed: \${result}\`
  });
});

const taskId = await runBackground("build", () =>
  exec("npm run build")
);`,codeLanguage:"typescript",learnSections:[{title:"The Problem: Blocking Operations Kill Agent Throughput",content:"When the agent runs a slow command such as npm install, a test suite, or a git clone, the loop blocks. The model sits idle, waiting for the result. A thirty-second test run means thirty seconds of dead time. Background tasks solve this by decoupling execution from reasoning. The agent starts the task, continues reasoning (planning next steps, preparing follow-up work), and collects the result when it arrives through the event bus. This transforms sequential wait time into parallel productivity.",zhTitle:"问题：阻塞操作扼杀 Agent 吞吐量",zhContent:"当 agent 运行慢命令（如 npm install、测试套件或 git clone）时，循环被阻塞。模型处于空闲状态，等待结果。30 秒的测试运行意味着 30 秒的闲置。后台任务通过将执行与推理解耦来解决这个问题。Agent 启动任务，继续推理（规划后续步骤、准备后续工作），并在结果通过事件总线到达时获取。这将串行的等待时间转化为并行的生产能力。"},{title:"Event Bus: The Glue Between Parallel Workstreams",content:"The event bus is a simple publish-subscribe mechanism. Background tasks emit events on completion; the agent loop listens for those events and incorporates results into the conversation. This pattern is more flexible than callbacks (multiple listeners can react to the same event) and more efficient than polling (no wasted cycles checking task status). The event bus also solves the join problem: if the agent dispatches multiple background tasks, it can wait for all of them or respond to the first one that completes.",zhTitle:"事件总线：并行工作流之间的粘合剂",zhContent:"事件总线是一种简单的发布-订阅机制。后台任务在完成时发出事件；agent 循环监听这些事件并将结果合并到对话中。这种模式比回调更灵活（多个监听器可以响应同一事件），比轮询更高效（无需浪费周期检查任务状态）。事件总线还解决了合并问题：如果 agent 调度了多个后台任务，它可以等待所有任务完成，或响应最先完成的那一个。"},{title:"Real Implementation: Promotion Pattern",content:"OpenCode's actual BackgroundJob system (packages/core/src/background-job.ts) uses a promotion pattern rather than a simple start-and-await approach. Jobs transition through states: start, extend (chained sequential work), promote (mark as background), then wait for promotion. The key insight is that a job can start in foreground mode and later get promoted to background, or vice versa. This enables a start-foreground-decide-later pattern: the agent begins a task synchronously, then promotes it to background if it takes too long. The subagent task tool uses this exact pattern: foreground subagents await the result, while background subagents continue independently.",zhTitle:"真实实现：Promotion 模式",zhContent:"OpenCode 实际的 BackgroundJob 系统使用 promotion 模式而非简单的启动等待方式。任务经历一系列状态转换：start、extend（链式顺序工作）、promote（标记为后台）、wait for promotion。关键在于任务可以以前台模式启动，随后提升为后台，反之亦然。这实现了先前台后决定的模式：agent 同步启动任务，如果耗时过长则将其提升为后台。子代理 task tool 正是使用这种模式：前台子代理等待结果，后台子代理独立继续。"}],designHighlights:[{en:"Background tasks use the agent's own tool system. Running 'npm run build' uses the same bash tool: the only difference is the agent does not wait for the result. Background tasks inherit all tool capabilities and security controls.",zh:"后台任务使用 agent 自身的工具系统。执行 'npm run build' 使用相同的 bash 工具，区别仅在于 agent 不等待结果。后台任务继承了所有工具能力和安全控制。"},{en:"The event bus runs synchronously within the agent process. There is no message queue, no serialization, and no network. This keeps latency near zero and avoids the complexity of distributed systems.",zh:"事件总线在 agent 进程内同步运行。没有消息队列，没有序列化，没有网络延迟。这使延迟接近于零，并避免了分布式系统的复杂性。"}],flowchartSvg:`<svg viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
    <marker id="arrow-s09" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- Agent Loop -->
  <rect x="160" y="10" width="180" height="40" rx="8" fill="#f59e0b" opacity="0.85"/>
  <text x="250" y="35" text-anchor="middle" fill="#fff" font-size="13" font-family="system-ui" font-weight="bold">Agent Loop</text>
  <!-- Dispatch -->
  <line x1="160" y1="30" x2="60" y2="80" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrow-s09)"/>
  <text x="90" y="55" fill="#f59e0b" font-size="9" font-family="system-ui">runBackground</text>
  <!-- Continue reasoning -->
  <line x1="250" y1="50" x2="250" y2="90" stroke="#666" stroke-width="1.5" marker-end="url(#arrow-s09)"/>
  <text x="260" y="75" fill="#666" font-size="9" font-family="system-ui">Continues reasoning (non-blocking)</text>
  <!-- Background thread -->
  <rect x="10" y="80" width="100" height="60" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="60" y="103" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="system-ui" font-weight="bold">Background</text>
  <text x="60" y="120" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="system-ui">Thread</text>
  <!-- Running indicator -->
  <animateTransform attributeName="transform" type="rotate" from="0 60 140" to="360 60 140" dur="2s" repeatCount="indefinite">
    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
  </animateTransform>
  <rect x="35" y="130" width="50" height="18" rx="9" fill="#f59e0b" opacity="0.6"/>
  <text x="60" y="142" text-anchor="middle" fill="#fff" font-size="8" font-family="system-ui">running...</text>
  <!-- Event bus -->
  <rect x="370" y="30" width="120" height="140" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="430" y="55" text-anchor="middle" fill="#fbbf24" font-size="12" font-family="system-ui" font-weight="bold">Event Bus</text>
  <text x="430" y="80" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="system-ui">task.complete</text>
  <text x="430" y="100" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="system-ui">task.error</text>
  <text x="430" y="120" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="system-ui">task.progress</text>
  <!-- Complete flow -->
  <line x1="60" y1="140" x2="60" y2="200" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="60" y1="200" x2="250" y2="240" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrow-s09)"/>
  <text x="130" y="215" fill="#f59e0b" font-size="9" font-family="system-ui">Event: task done</text>
  <!-- Result processing -->
  <rect x="160" y="240" width="180" height="36" rx="6" fill="#f59e0b" opacity="0.8"/>
  <text x="250" y="263" text-anchor="middle" fill="#fff" font-size="11" font-family="system-ui">Push result → messages[]</text>
  <!-- Arrow back to loop -->
  <line x1="250" y1="276" x2="250" y2="90" stroke="#f59e0b" stroke-width="1" marker-end="url(#arrow-s09)"/>
  <text x="270" y="300" fill="#666" font-size="9" font-family="system-ui">Agent notices result on next LLM call</text>
</svg>`,annotatedCode:{overview:{en:"The background task system lets the agent delegate slow operations to a separate thread and continue reasoning. Results arrive through an event bus, not via polling.",zh:"后台任务系统允许 agent 将慢操作委托给独立线程并继续推理。结果通过事件总线到达，而非轮询。"},annotations:[{lineStart:1,lineEnd:2,text:"A registry tracks all active background tasks. The event bus serves as the communication channel: tasks emit events and the loop listens. There is no shared mutable state between the task thread and the agent loop.",zhText:"注册表跟踪所有活跃的后台任务。事件总线充当通信渠道：任务发出事件，循环监听。任务线程与 agent 循环之间没有共享的可变状态。"},{lineStart:4,lineEnd:10,text:"runBackground() starts the task and returns immediately. The promise's .then() handler emits a completion event. The result is not forced into the conversation; the loop picks it up when ready.",zhText:"runBackground() 启动任务并立即返回。Promise 的 .then() 处理函数发出完成事件。结果不会被强制注入对话；循环在就绪时获取它。"},{lineStart:12,lineEnd:17,text:"The event listener pushes completed results into the message history as user messages. The agent perceives them as though the user provided the information, consistent with how tool results flow through the core loop.",zhText:"事件监听器将完成的结果作为用户消息推送到消息历史中。Agent 感知这些结果如同用户提供的信息，与核心循环中工具结果的处理方式一致。"},{lineStart:19,lineEnd:20,text:"The agent starts a build task and immediately continues reasoning about what to do next. The build result arrives later through the event bus.",zhText:"Agent 启动构建任务并立即继续推理后续步骤。构建结果稍后通过事件总线到达。"}],flowSummary:{en:"Flow: Agent identifies slow operation → runBackground(id, fn) → fn runs in background thread → Agent continues reasoning → fn completes → Event Bus emits 'task.complete' → Listener pushes result to messages → Agent sees result on next iteration",zh:"流程：Agent 识别慢操作 → runBackground(id, fn) → fn 在后台线程运行 → Agent 继续推理 → fn 完成 → 事件总线发出 'task.complete' → 监听器将结果推送到消息 → Agent 在下一次迭代中看到结果"}},claudeCodeComparison:{en:"Claude Code processes tasks synchronously: each tool call blocks the agent loop. OpenCode's background job system is a clear differentiator. Long-running operations (web searches, code compilation, test suites) run in the background while the agent continues reasoning. Results arrive through the event bus and are injected into the conversation when ready, enabling a non-blocking, concurrent workflow.",zh:"Claude Code 同步处理任务：每个工具调用阻塞 agent 循环。OpenCode 的后台任务系统是一个明显的差异化优势。长时间运行的操作（网络搜索、代码编译、测试套件）在后台运行，同时 agent 继续推理。结果通过事件总线到达并在准备好时注入对话，实现非阻塞、并发的工作流。"}},s10:{description:"OpenCode uses a single configuration file (opencode.jsonc) that declares the model, plugins, skill paths, and all other settings. The default file resides at ~/.config/opencode/opencode.jsonc. Projects can override settings by placing their own opencode.jsonc in the project root; settings merge rather than replace.",zhDescription:"OpenCode 使用单个配置文件声明模型、插件、技能路径和所有其他设置。默认配置文件位于 ~/.config/opencode/opencode.jsonc。项目可以通过在根目录放置自己的 opencode.jsonc 来覆盖设置；配置会合并而非替换。",codeSample:`// Global config: ~/.config/opencode/opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "your-model",
  "plugins": ["my-plugin@latest"],
  "skillPaths": ["~/.config/opencode/skills"]
}

// Per-project override: ./opencode.jsonc
{
  "model": "project-specific-model",
  "plugins": ["project-plugin@latest"]
}

function loadConfig() {
  const global = readConfig("~/.config/opencode/opencode.jsonc");
  const local = findProjectConfig();
  if (local) {
    return deepMerge(global, local);
  }
  return global;
}`,codeLanguage:"javascript",learnSections:[{title:"The Problem: Every Project Is Different, Every Developer Has Preferences",content:"A developer might prefer Claude Sonnet for most tasks but need GPT-4 for a specific project. They might have personal skill collections while their team maintains shared project skills. The config system must reconcile global defaults, which are sensible for everyone, with project overrides that are specific to a repo, while preserving the ability to override anything without copying everything. Deep merge solves this: global config provides defaults; project config overrides specific fields; everything else remains unchanged.",zhTitle:"问题：每个项目都不同，每个开发者都有偏好",zhContent:"开发者可能在大多数任务中偏好 Claude Sonnet，但特定项目需要 GPT-4。他们可能有个人技能集合，而团队维护共享项目技能。配置系统必须协调全局默认值与项目级覆盖，同时保留覆盖任何内容而不复制所有内容的能力。深度合并解决了这个问题：全局配置提供默认值；项目配置覆盖特定字段；其余内容保持不变。"},{title:"Discoverability and the $schema",content:"The opencode.jsonc file references a JSON Schema through its $schema URL. This is not decorative: it enables IDE autocompletion, validation, and inline documentation when editing the config file. The schema also serves as the canonical reference for all available configuration options. New options are added to the schema first, then implemented in the code. This documentation-driven approach ensures the config surface is always documented and validated.",zhTitle:"可发现性与 $schema",zhContent:"opencode.jsonc 文件通过 $schema URL 引用 JSON Schema。这并非装饰性的：它在编辑配置文件时启用 IDE 自动完成、验证和内联文档。该 schema 还充当所有可用配置选项的规范参考。新选项首先添加到 schema，然后在代码中实现。这种文档驱动的方法确保配置面始终有文档和验证。"},{title:"Real Implementation: Event-Sourced Sessions with SQLite",content:"OpenCode's session system (packages/core/src/session.ts) goes beyond config management. Sessions are event-sourced and stored in SQLite via Drizzle ORM. Each session maintains a timeline of durable events (Created, PromptSubmitted, StepEnded, Compacted, and others) that are projected into the current context. This means sessions survive restarts, support revert and rollback through event replay, and can be shared between processes through the same SQLite store. The SessionRunCoordinator serializes execution per session with wake coalescing: if two prompts arrive simultaneously, they are queued and processed sequentially rather than in parallel.",zhTitle:"真实实现：带 SQLite 的事件溯源会话",zhContent:"OpenCode 的会话系统超越了配置管理。会话是事件溯源的，通过 Drizzle ORM 存储在 SQLite 中。每个会话维护一个持久事件的 Timeline。这意味着会话在重启后仍然存在，支持通过事件回放进行回滚，并且可以通过同一 SQLite 存储在进程之间共享。SessionRunCoordinator 按会话序列化执行，带有唤醒合并：如果两个提示同时到达，它们被排队并顺序处理，而不是并行处理。"}],designHighlights:[{en:"Config discovery walks up the directory tree from the project root, not from the current working directory. This means any subdirectory within a project correctly resolves to the project's opencode.jsonc.",zh:"配置发现从项目根目录向上遍历目录树，而非从当前工作目录开始。这意味着项目中的任何子目录都能正确解析到项目的 opencode.jsonc。"},{en:"JSONC format (JSON with comments) is used instead of plain JSON. Comments make the config self-documenting: developers can annotate their choices inline without maintaining a separate documentation file.",zh:"使用 JSONC 格式（带注释的 JSON）而非纯 JSON。注释使配置自文档化：开发者可以在行内注解自己的选择，无需维护单独的文档文件。"}],flowchartSvg:`<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <defs>
    <marker id="arrow-s10" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#666"/></marker>
  </defs>
  <!-- Global config -->
  <rect x="140" y="10" width="220" height="55" rx="8" fill="#0f172a" stroke="#ef4444" stroke-width="1.5"/>
  <text x="155" y="30" text-anchor="start" fill="#fca5a5" font-size="11" font-family="system-ui" font-weight="bold">~/.config/opencode/opencode.jsonc</text>
  <text x="155" y="50" text-anchor="start" fill="#94a3b8" font-size="10" font-family="monospace">{ model, plugins, skillPaths }</text>
  <!-- Merge arrow -->
  <line x1="250" y1="65" x2="250" y2="100" stroke="#ef4444" stroke-width="2"/>
  <polygon points="200,95 250,115 300,95" fill="#ef4444" opacity="0.7"/>
  <text x="310" y="108" fill="#ef4444" font-size="11" font-family="system-ui" font-weight="bold">deepMerge()</text>
  <!-- Project config -->
  <rect x="140" y="120" width="220" height="55" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="155" y="140" text-anchor="start" fill="#fbbf24" font-size="11" font-family="system-ui" font-weight="bold">./opencode.jsonc</text>
  <text x="155" y="160" text-anchor="start" fill="#94a3b8" font-size="10" font-family="monospace">{ model: "override" }</text>
  <!-- Override arrow -->
  <path d="M140 140 L90 140 L90 100 L200 100" stroke="#f59e0b" stroke-width="1.5" fill="none" stroke-dasharray="5,3" marker-end="url(#arrow-s10)"/>
  <text x="100" y="125" fill="#f59e0b" font-size="9" font-family="system-ui">Overrides</text>
  <!-- Merged config result -->
  <rect x="140" y="190" width="220" height="55" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
  <text x="155" y="210" text-anchor="start" fill="#6ee7b7" font-size="11" font-family="system-ui" font-weight="bold">Merged Config</text>
  <text x="155" y="230" text-anchor="start" fill="#94a3b8" font-size="10" font-family="monospace">{ model: "override", plugins: [...], skillPaths: [...] }</text>
  <line x1="250" y1="175" x2="250" y2="188" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-s10)"/>
  <!-- Result -->
  <rect x="160" y="270" width="180" height="36" rx="6" fill="#10b981" opacity="0.8"/>
  <text x="250" y="293" text-anchor="middle" fill="#fff" font-size="12" font-family="system-ui">Agent starts with merged config</text>
  <line x1="250" y1="245" x2="250" y2="268" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-s10)"/>
</svg>`,flowchartHtml:"s10-lifecycle.html",annotatedCode:{overview:{en:"The config system uses a two-tier merge pattern: global defaults plus project overrides produce the effective configuration. deepMerge() handles nested objects so partial overrides work intuitively.",zh:"配置系统使用两层合并模式：全局默认值加上项目覆盖产生有效配置。deepMerge() 处理嵌套对象，使部分覆盖能够直观地工作。"},annotations:[{lineStart:2,lineEnd:7,text:"Global config: the defaults that work for most projects. Located at ~/.config/opencode/, it serves as the single source of truth for the user's agent preferences.",zhText:"全局配置：适用于大多数项目的默认值。位于 ~/.config/opencode/，是用户 agent 偏好的单一真相来源。"},{lineStart:10,lineEnd:14,text:"Per-project override: specifies only what differs. The model is different, and a project-specific plugin is added. Everything else, including skill paths, is inherited from the global config.",zhText:"项目级覆盖：只指定不同的内容。模型不同，并添加了项目特定的插件。其他所有内容，包括技能路径，都从全局配置继承。"},{lineStart:16,lineEnd:22,text:"The loadConfig() function loads the global config, walks up the directory tree looking for a project config, deep merges if found, or uses the global config as-is. The merge is deep: nested objects are merged recursively, not replaced outright.",zhText:"loadConfig() 函数加载全局配置，向上遍历目录树查找项目配置，如果找到则深度合并，否则按原样使用全局配置。合并是深度的：嵌套对象被递归合并，而非直接替换。"}],flowSummary:{en:"Flow: loadConfig() → read global (~/.config/opencode/opencode.jsonc) → findProjectConfig() → found? → deepMerge(global, local) → effective config | not found → global config → agent starts",zh:"流程：loadConfig() → 读取全局配置 → findProjectConfig() → 找到? → deepMerge(全局, 本地) → 有效配置 | 未找到 → 全局配置 → agent 启动"}},claudeCodeComparison:{en:"Both systems use config files, but OpenCode's multi-source deepMerge pattern is more elaborate. The global config (~/.config/opencode/) provides defaults, the project config overrides specifics, and the two are merged recursively. Claude Code uses a simpler single-config approach. OpenCode's session system also adds compaction and message versioning, which are critical for long-running sessions that would otherwise exceed context windows.",zh:"两者都使用配置文件，但 OpenCode 的多源 deepMerge 模式更精细。全局配置 (~/.config/opencode/) 提供默认值，项目配置覆盖特定内容，两者被递归合并。Claude Code 使用更简单的单一配置方式。OpenCode 的会话系统还增加了压缩和消息版本管理，这对于长时间运行的会话至关重要，否则会超出上下文窗口。"}}};var c=e.i(27962);function d({content:e,annotations:o,locale:n,t:s}){let a=e.learnSections||[],[r,l]=(0,i.useState)(!1);return(0,t.jsxs)("div",{className:"flex flex-col gap-8",children:[r&&(0,t.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4",onClick:()=>l(!1),children:(0,t.jsxs)("div",{className:"relative max-h-[90vh] max-w-[95vw] overflow-auto rounded-xl bg-white p-6 dark:bg-zinc-950",children:[(0,t.jsx)("button",{onClick:()=>l(!1),className:"absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600",children:"✕"}),e.flowchartHtml?(0,t.jsx)("iframe",{src:`/learn_opencode/diagrams/${e.flowchartHtml}`,className:"min-w-[800px] min-h-[600px] border-0",title:"Architecture Diagram"}):(0,t.jsx)("div",{className:"min-w-[500px]",dangerouslySetInnerHTML:{__html:e.flowchartSvg}})]})}),(0,t.jsx)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===n?e.zhDescription:e.description})}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"mb-3 flex items-center justify-between",children:[(0,t.jsx)("h3",{className:"text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===n?"架构流程图":"Architecture Flow"}),(0,t.jsx)("button",{onClick:()=>l(!0),className:"text-xs text-[var(--color-text-secondary)] underline underline-offset-2 hover:text-[var(--color-text)]",children:"zh"===n?"全屏查看":"Full Screen"})]}),e.flowchartHtml?(0,t.jsx)("iframe",{src:`/learn_opencode/diagrams/${e.flowchartHtml}`,className:"w-full h-[400px] border-0 rounded-xl",title:"Architecture Diagram"}):(0,t.jsx)("div",{className:"overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-4 dark:bg-zinc-950 max-w-xl mx-auto",dangerouslySetInnerHTML:{__html:e.flowchartSvg}})]}),a.length>0&&(0,t.jsx)("div",{className:"flex flex-col gap-6",children:a.map((e,o)=>(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-2 text-base font-bold",children:"zh"===n?e.zhTitle:e.title}),(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===n?e.zhContent:e.content})]},o))}),e.designHighlights.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:s("design_decisions")}),(0,t.jsx)("div",{className:"flex flex-col gap-3",children:e.designHighlights.map((e,o)=>(0,t.jsx)("div",{className:"rounded-lg border-l-2 border-[var(--color-text)] bg-[var(--color-bg-secondary)] px-4 py-3",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===n?e.zh:e.en})},o))})]}),e.claudeCodeComparison&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===n?"对比 Claude Code":"Comparison: Claude Code"}),(0,t.jsx)("div",{className:"rounded-lg border border-[var(--color-border)] bg-gradient-to-r from-amber-50/50 to-transparent p-4 dark:from-amber-950/10",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===n?e.claudeCodeComparison.zh:e.claudeCodeComparison.en})})]}),o?.decisions&&o.decisions.length>0&&(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)("h3",{className:"text-base font-bold",children:"zh"===n?"深入设计决策":"Deep Dive: Design Decisions"}),o.decisions.map(e=>(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] p-4",children:[(0,t.jsx)("h4",{className:"font-semibold",children:"zh"===n?e.zh.title:e.title}),(0,t.jsx)("p",{className:"mt-2 text-sm text-[var(--color-text-secondary)]",children:"zh"===n?e.zh.description:e.description}),(0,t.jsxs)("div",{className:"mt-3 rounded-lg bg-[var(--color-bg-secondary)] p-3",children:[(0,t.jsx)("span",{className:"text-xs font-medium text-[var(--color-text-secondary)]",children:"zh"===n?"备选方案: ":"Alternatives: "}),(0,t.jsx)("span",{className:"text-xs text-[var(--color-text-secondary)]",children:"zh"===n?e.zh.alternatives:e.alternatives})]})]},e.id))]})]})}function h({annotations:e,locale:o}){return e.overview.en||e.flowSummary.en?(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:(0,t.jsx)("p",{className:"text-sm leading-relaxed text-[var(--color-text-secondary)]",children:"zh"===o?e.overview.zh:e.overview.en})}),e.annotations.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===o?"逐行解析":"Line-by-Line Analysis"}),(0,t.jsx)("div",{className:"flex flex-col gap-3",children:e.annotations.map((e,i)=>(0,t.jsxs)("div",{className:"rounded-lg border border-[var(--color-border)] overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-[var(--color-bg-secondary)] px-3 py-1.5 text-xs font-mono text-[var(--color-text-secondary)]",children:"zh"===o?`行 ${e.lineStart}${e.lineEnd>e.lineStart?`-${e.lineEnd}`:""}`:`Line ${e.lineStart}${e.lineEnd>e.lineStart?`-${e.lineEnd}`:""}`}),(0,t.jsx)("div",{className:"px-3 py-2 text-sm text-[var(--color-text-secondary)]",children:"zh"===o?e.zhText:e.text})]},i))})]}),e.flowSummary.en&&(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:[(0,t.jsx)("h4",{className:"mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:"zh"===o?"执行流程":"Execution Flow"}),(0,t.jsx)("p",{className:"text-sm font-mono text-[var(--color-text-secondary)]",children:"zh"===o?e.flowSummary.zh:e.flowSummary.en})]})]}):null}function f({versionId:e,annotations:f}){let u=(0,n.useTranslations)("version"),m=(0,n.useLocale)(),p=s.VERSION_META[e],g=l[e],[x,y]=(0,i.useState)("learn");if(!p||!g)return null;let w=s.VERSION_ORDER.indexOf(e),b=w>0?s.VERSION_ORDER[w-1]:null,k=w<s.VERSION_ORDER.length-1?s.VERSION_ORDER[w+1]:null;return(0,t.jsxs)("div",{className:"flex flex-col gap-8 pb-16",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-[var(--color-text-secondary)]",children:[(0,t.jsx)(o.default,{href:`/${m}`,className:"hover:text-[var(--color-text)]",children:"zh"===m?"首页":"Home"}),(0,t.jsx)("span",{children:"/"}),(0,t.jsx)("span",{children:e})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(a.LayerBadge,{layer:p.layer,children:e}),(0,t.jsxs)("span",{className:"text-xs tabular-nums text-[var(--color-text-secondary)]",children:[p.loc," ",u("loc")]})]}),(0,t.jsx)("h1",{className:"mt-3 text-3xl font-bold",children:p.title}),(0,t.jsxs)("p",{className:"mt-1 text-lg text-[var(--color-text-secondary)]",children:["“",p.subtitle,"”"]})]}),(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4",children:[(0,t.jsxs)("span",{className:"text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]",children:[u("key_insight"),":"]}),(0,t.jsx)("p",{className:"mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]",children:p.keyInsight})]}),(0,t.jsx)("div",{className:"border-b border-[var(--color-border)]",children:(0,t.jsx)("div",{className:"flex gap-6",children:["learn","code"].map(e=>(0,t.jsx)("button",{onClick:()=>y(e),className:(0,c.cn)("pb-2 text-sm font-medium transition-colors",x===e?"border-b-2 border-[var(--color-text)] text-[var(--color-text)]":"text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"),children:"learn"===e?"zh"===m?"学习与设计":"Learn & Design":u("tab_code")},e))})}),(0,t.jsxs)("div",{children:["learn"===x&&(0,t.jsx)(d,{content:g,annotations:f,locale:m,t:u}),"code"===x&&(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsx)(h,{annotations:g.annotatedCode,locale:m}),(0,t.jsxs)("div",{className:"rounded-xl border border-[var(--color-border)] bg-zinc-950 overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5",children:[(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-red-500/70"}),(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-yellow-500/70"}),(0,t.jsx)("span",{className:"h-3 w-3 rounded-full bg-green-500/70"}),(0,t.jsxs)("span",{className:"ml-3 text-xs text-zinc-500",children:["code.","python"===g.codeLanguage?"py":"typescript"===g.codeLanguage?"ts":"js"]})]}),(0,t.jsx)("pre",{className:"overflow-x-auto p-4 text-sm leading-relaxed",children:(0,t.jsx)("code",{className:"text-zinc-300 whitespace-pre font-mono",children:g.codeSample})})]})]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between border-t border-[var(--color-border)] pt-6",children:[b?(0,t.jsxs)(o.default,{href:`/${m}/${b}`,className:"flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",children:[(0,t.jsx)("span",{"aria-hidden":"true",children:"←"})," ",u("prev"),": ",s.VERSION_META[b].title]}):(0,t.jsx)("div",{}),k?(0,t.jsxs)(o.default,{href:`/${m}/${k}`,className:"flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",children:[u("next"),": ",s.VERSION_META[k].title," ",(0,t.jsx)("span",{"aria-hidden":"true",children:"→"})]}):(0,t.jsx)("div",{})]}),(0,t.jsx)(r,{})]})}e.s(["SessionDetail",()=>f],3974)}]);