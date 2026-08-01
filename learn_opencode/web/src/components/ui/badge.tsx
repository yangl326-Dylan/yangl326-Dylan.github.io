import { cn } from "@/lib/utils";

const BADGE_COLORS: Record<string, string> = {
  tools: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  planning: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  extensibility: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  concurrency: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  platform: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export function LayerBadge({ layer, children, className }: { layer: string; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", BADGE_COLORS[layer] || "", className)}>
      {children}
    </span>
  );
}
