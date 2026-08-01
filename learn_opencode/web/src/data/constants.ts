export type LayerType = "tools" | "planning" | "extensibility" | "concurrency" | "platform";

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
    title: "The Agent Loop",
    subtitle: "One Loop Is All You Need",
    loc: 50,
    tools: ["bash"],
    newTools: ["bash"],
    coreAddition: "Minimal model/tool loop",
    keyInsight: "The smallest useful agent is a loop that calls the model, runs tools, and feeds results back.",
    layer: "tools",
    prevVersion: null,
  },
  s02: {
    id: "s02",
    title: "Tool Dispatch",
    subtitle: "Register Once, Use Everywhere",
    loc: 80,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: ["read", "write", "edit", "glob"],
    coreAddition: "Tool dispatch map",
    keyInsight: "The loop stays stable while capabilities register into a dispatch table.",
    layer: "tools",
    prevVersion: "s01",
  },
  s03: {
    id: "s03",
    title: "Permission Gate",
    subtitle: "Check Before You Execute",
    loc: 65,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: [],
    coreAddition: "Permission gate",
    keyInsight: "Dangerous actions need a harness decision point before the shell runs.",
    layer: "tools",
    prevVersion: "s02",
  },
  s04: {
    id: "s04",
    title: "Hook System",
    subtitle: "Hang on the Loop, Don't Write into It",
    loc: 90,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: [],
    coreAddition: "Lifecycle hooks",
    keyInsight: "Cross-cutting behavior belongs around the loop, not tangled inside it.",
    layer: "tools",
    prevVersion: "s03",
  },
  s05: {
    id: "s05",
    title: "Task Categories",
    subtitle: "Category Is the Router",
    loc: 75,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: [],
    coreAddition: "Category dispatch system",
    keyInsight: "Routing tasks by category decouples intent from implementation.",
    layer: "planning",
    prevVersion: "s04",
  },
  s06: {
    id: "s06",
    title: "Subagent",
    subtitle: "Specialists for Every Job",
    loc: 110,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: [],
    coreAddition: "Named agent dispatch",
    keyInsight: "Subagents give each subtask a clean context while preserving the main thread.",
    layer: "planning",
    prevVersion: "s05",
  },
  s07: {
    id: "s07",
    title: "Skill Loading",
    subtitle: "Load Only When Needed",
    loc: 85,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: [],
    coreAddition: "On-demand skill loader",
    keyInsight: "Inject specialized knowledge only when the task actually needs it.",
    layer: "planning",
    prevVersion: "s06",
  },
  s08: {
    id: "s08",
    title: "Plugin SDK",
    subtitle: "Hooks Are the API",
    loc: 135,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: [],
    coreAddition: "@opencode-ai/plugin Hooks API",
    keyInsight: "A well-designed hook system makes the agent infinitely extensible.",
    layer: "extensibility",
    prevVersion: "s07",
  },
  s09: {
    id: "s09",
    title: "Background Tasks",
    subtitle: "Slow Operations Go to the Background",
    loc: 95,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: [],
    coreAddition: "Parallel execution",
    keyInsight: "The agent can keep reasoning while slow work completes elsewhere.",
    layer: "concurrency",
    prevVersion: "s08",
  },
  s10: {
    id: "s10",
    title: "Config & Session",
    subtitle: "Configure Once, Run Everywhere",
    loc: 60,
    tools: ["bash", "read", "write", "edit", "glob"],
    newTools: [],
    coreAddition: "Global config + session management",
    keyInsight: "A single config file controls the entire agent harness behavior.",
    layer: "platform",
    prevVersion: "s09",
  },
};

export const LAYERS = [
  { id: "tools" as const, label: "Tools & Execution", color: "#3B82F6", versions: ["s01", "s02", "s03", "s04"] },
  { id: "planning" as const, label: "Planning & Control", color: "#10B981", versions: ["s05", "s06", "s07"] },
  { id: "extensibility" as const, label: "Extensibility", color: "#8B5CF6", versions: ["s08"] },
  { id: "concurrency" as const, label: "Concurrency", color: "#F59E0B", versions: ["s09"] },
  { id: "platform" as const, label: "Platform", color: "#EF4444", versions: ["s10"] },
] as const;

export const LAYER_DOT_COLORS: Record<string, string> = {
  tools: "bg-blue-500",
  planning: "bg-emerald-500",
  extensibility: "bg-purple-500",
  concurrency: "bg-amber-500",
  platform: "bg-red-500",
};

export const LAYER_BORDER_COLORS: Record<string, string> = {
  tools: "border-blue-500/30 hover:border-blue-500/60",
  planning: "border-emerald-500/30 hover:border-emerald-500/60",
  extensibility: "border-purple-500/30 hover:border-purple-500/60",
  concurrency: "border-amber-500/30 hover:border-amber-500/60",
  platform: "border-red-500/30 hover:border-red-500/60",
};

export const LAYER_BAR_COLORS: Record<string, string> = {
  tools: "bg-blue-500",
  planning: "bg-emerald-500",
  extensibility: "bg-purple-500",
  concurrency: "bg-amber-500",
  platform: "bg-red-500",
};
