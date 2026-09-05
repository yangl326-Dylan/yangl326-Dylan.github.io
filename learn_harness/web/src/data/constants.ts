export type LayerType = "architecture" | "data" | "core" | "execution" | "design" | "model" | "planning" | "config" | "extensibility";

export interface SessionMeta {
  id: string;
  title: string;
  subtitle: string;
  loc: number;
  tools: string[];
  newTools: string[];
  coreAddition: string;
  keyInsight: string;
  layer: LayerType;
  prevVersion: string | null;
}

export const VERSION_ORDER = [
  "s01", "s02", "s03", "s04", "s05",
  "s06", "s07", "s08", "s09", "s10",
] as const;

export type VersionId = (typeof VERSION_ORDER)[number];

export const VERSION_META: Record<string, SessionMeta> = {
  s01: {
    id: "s01",
    title: "The Plugin Foundation",
    subtitle: "Everything Is a Plugin",
    loc: 75,
    tools: ["cordis"],
    newTools: ["cordis"],
    coreAddition: "Cordis plugin context",
    keyInsight: "DeepSeek Harness has no privileged core — every part, including the model adapter and agent loop, is a replaceable plugin.",
    layer: "architecture",
    prevVersion: null,
  },
  s02: {
    id: "s02",
    title: "Session Log",
    subtitle: "Append-Only Facts",
    loc: 90,
    tools: ["session"],
    newTools: ["session"],
    coreAddition: "Durable event log",
    keyInsight: "The session log is the source of truth — everything the model sees must be reconstructable from it.",
    layer: "data",
    prevVersion: "s01",
  },
  s03: {
    id: "s03",
    title: "Agent Loop",
    subtitle: "Turns and Steps",
    loc: 110,
    tools: ["agent-loop"],
    newTools: ["agent-loop"],
    coreAddition: "Turn/step lifecycle",
    keyInsight: "A step is one model request plus tools; a turn groups steps into a coherent unit of work.",
    layer: "core",
    prevVersion: "s02",
  },
  s04: {
    id: "s04",
    title: "Tool System",
    subtitle: "Scoped Registry + Pipeline",
    loc: 85,
    tools: ["tools"],
    newTools: ["tools"],
    coreAddition: "Tool registry with guards",
    keyInsight: "Tools are registered with scopes and executed through a pre/post pipeline for validation and telemetry.",
    layer: "execution",
    prevVersion: "s03",
  },
  s05: {
    id: "s05",
    title: "Capability Seams",
    subtitle: "Definition → Provider → Consumer",
    loc: 95,
    tools: ["seam"],
    newTools: ["seam"],
    coreAddition: "Three-role capability pattern",
    keyInsight: "A capability seam comprises Service Definition, Service Provider, and Consumer — swapping one provider changes the whole product.",
    layer: "design",
    prevVersion: "s04",
  },
  s06: {
    id: "s06",
    title: "LLM Integration",
    subtitle: "Adapters and Streaming",
    loc: 80,
    tools: ["llm"],
    newTools: ["llm"],
    coreAddition: "LLM adapter seam",
    keyInsight: "The LLM layer provides message vocabulary and streaming — providers register adapters that handle the actual API calls.",
    layer: "model",
    prevVersion: "s05",
  },
  s07: {
    id: "s07",
    title: "Shell & Subprocess",
    subtitle: "Execution Providers",
    loc: 100,
    tools: ["shell", "subprocess"],
    newTools: ["shell", "subprocess"],
    coreAddition: "Shell capability seam",
    keyInsight: "Shell execution is a capability — local, remote, or sandboxed providers all share one interface.",
    layer: "execution",
    prevVersion: "s06",
  },
  s08: {
    id: "s08",
    title: "Subagent System",
    subtitle: "Delegation and Child Agents",
    loc: 120,
    tools: ["subagent"],
    newTools: ["subagent"],
    coreAddition: "Subagent capability seam",
    keyInsight: "Subagents give each subtask a clean context while preserving the main thread through delegation.",
    layer: "planning",
    prevVersion: "s07",
  },
  s09: {
    id: "s09",
    title: "Profile & Bundles",
    subtitle: "Composition Layers",
    loc: 70,
    tools: ["profile", "bundle"],
    newTools: ["profile", "bundle"],
    coreAddition: "Profile composition system",
    keyInsight: "A profile stacks bundles in order — each layer can patch the config below it.",
    layer: "config",
    prevVersion: "s08",
  },
  s10: {
    id: "s10",
    title: "Event System",
    subtitle: "Waterfall Semantics",
    loc: 85,
    tools: ["events"],
    newTools: ["events"],
    coreAddition: "Typed event map",
    keyInsight: "Events are extension points — waterfall listeners must call next() to delegate, otherwise they short-circuit the chain.",
    layer: "extensibility",
    prevVersion: "s09",
  },
};

export const LAYERS = [
  { id: "architecture" as const, label: "Architecture", color: "#3B82F6", versions: ["s01"] },
  { id: "data" as const, label: "Data Layer", color: "#10B981", versions: ["s02"] },
  { id: "core" as const, label: "Core Loop", color: "#8B5CF6", versions: ["s03"] },
  { id: "execution" as const, label: "Execution", color: "#F59E0B", versions: ["s04", "s07"] },
  { id: "design" as const, label: "Design Patterns", color: "#EF4444", versions: ["s05"] },
  { id: "model" as const, label: "Model Layer", color: "#EC4899", versions: ["s06"] },
  { id: "planning" as const, label: "Planning", color: "#14B8A6", versions: ["s08"] },
  { id: "config" as const, label: "Configuration", color: "#6366F1", versions: ["s09"] },
  { id: "extensibility" as const, label: "Extensibility", color: "#F97316", versions: ["s10"] },
] as const;

export const LAYER_DOT_COLORS: Record<string, string> = {
  architecture: "bg-blue-500",
  data: "bg-emerald-500",
  core: "bg-purple-500",
  execution: "bg-amber-500",
  design: "bg-red-500",
  model: "bg-pink-500",
  planning: "bg-teal-500",
  config: "bg-indigo-500",
  extensibility: "bg-orange-500",
};

export const LAYER_BORDER_COLORS: Record<string, string> = {
  architecture: "border-blue-500/30 hover:border-blue-500/60",
  data: "border-emerald-500/30 hover:border-emerald-500/60",
  core: "border-purple-500/30 hover:border-purple-500/60",
  execution: "border-amber-500/30 hover:border-amber-500/60",
  design: "border-red-500/30 hover:border-red-500/60",
  model: "border-pink-500/30 hover:border-pink-500/60",
  planning: "border-teal-500/30 hover:border-teal-500/60",
  config: "border-indigo-500/30 hover:border-indigo-500/60",
  extensibility: "border-orange-500/30 hover:border-orange-500/60",
};

export const LAYER_BAR_COLORS: Record<string, string> = {
  architecture: "bg-blue-500",
  data: "bg-emerald-500",
  core: "bg-purple-500",
  execution: "bg-amber-500",
  design: "bg-red-500",
  model: "bg-pink-500",
  planning: "bg-teal-500",
  config: "bg-indigo-500",
  extensibility: "bg-orange-500",
};
