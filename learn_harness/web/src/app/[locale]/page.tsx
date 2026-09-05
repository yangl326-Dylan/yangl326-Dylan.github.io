"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "@/i18n/i18n";
import { VERSION_ORDER, VERSION_META, LAYERS, LAYER_BORDER_COLORS, LAYER_BAR_COLORS, LAYER_DOT_COLORS } from "@/data/constants";
import { LayerBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function ArchitectureSection({ t, locale }: { t: (key: string) => string; locale: string }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("architecture_title")}</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">{t("architecture_desc")}</p>
      </div>
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-2 dark:bg-zinc-950">
        <img src="/learn_harness/agent-loop.svg" alt={locale === "zh" ? "DeepSeek Harness 系统架构" : "DeepSeek Harness System Architecture"} className="w-full" />
      </div>
    </section>
  );
}

function LayerSection({ layer, locale }: { layer: typeof LAYERS[number]; locale: string }) {
  const colorMap: Record<string, string> = {
    architecture: "border-blue-500/30 bg-blue-500/[0.04]",
    data: "border-emerald-500/30 bg-emerald-500/[0.04]",
    core: "border-purple-500/30 bg-purple-500/[0.04]",
    execution: "border-amber-500/30 bg-amber-500/[0.04]",
    design: "border-red-500/30 bg-red-500/[0.04]",
    model: "border-pink-500/30 bg-pink-500/[0.04]",
    planning: "border-teal-500/30 bg-teal-500/[0.04]",
    config: "border-indigo-500/30 bg-indigo-500/[0.04]",
    extensibility: "border-orange-500/30 bg-orange-500/[0.04]",
  };
  const dotMap: Record<string, string> = {
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

  return (
    <div className={cn("rounded-xl border p-4", colorMap[layer.id])}>
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("h-3 w-3 rounded-full", dotMap[layer.id])} />
        <h3 className="text-sm font-bold">{layer.label}</h3>
        <span className="text-xs text-[var(--color-text-secondary)]">
          {layer.versions.length} {locale === "zh" ? "个章节" : "sessions"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {layer.versions.map((vid) => {
          const meta = VERSION_META[vid];
          if (!meta) return null;
          return (
            <Link key={vid} href={`/${locale}/${vid}`}>
              <div className={cn(
                "group rounded-lg border px-3 py-2 text-xs transition-colors hover:bg-[var(--color-bg-secondary)]",
                LAYER_BORDER_COLORS[meta.layer as keyof typeof LAYER_BORDER_COLORS]
              )}>
                <div className="flex items-center gap-1.5">
                  <LayerBadge layer={meta.layer}>{vid}</LayerBadge>
                  <span className="font-medium group-hover:underline">{meta.title}</span>
                </div>
                <p className="mt-0.5 text-[var(--color-text-secondary)]">{meta.keyInsight}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-20 pb-16">
      <section className="flex flex-col items-center px-2 pt-8 text-center sm:pt-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {t("hero_title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--color-text-secondary)] sm:text-xl">
          {t("hero_subtitle")}
        </p>
        <div className="mt-8">
          <Link
            href={`/${locale}/timeline`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {t("start")}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("core_pattern")}</h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">{t("core_pattern_desc")}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
          <img src="/learn_harness/agent-loop.svg" alt="Agent Loop Diagram" className="w-full max-w-4xl mx-auto" />
        </div>
      </section>

      <ArchitectureSection t={t} locale={locale} />

      <section>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("layers_title")}</h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">{t("layers_desc")}</p>
        </div>
        <div className="flex flex-col gap-3">
          {LAYERS.map((layer) => (
            <LayerSection key={layer.id} layer={layer} locale={locale} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {locale === "zh" ? "与 Claude Code 对比" : "Comparison: Claude Code"}
          </h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            {locale === "zh"
              ? "两种 agent 共享相同的核心循环架构，但在策略层有所不同"
              : "Both agents share the same core loop architecture, differing in policy layers"}
          </p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <th className="px-4 py-3 font-semibold">{locale === "zh" ? "机制" : "Mechanism"}</th>
                <th className="px-4 py-3 font-semibold">Claude Code</th>
                <th className="px-4 py-3 font-semibold">OpenCode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                { mech: { en: "Core Loop", zh: "核心循环" }, cc: "while(model responds)", oc: "while(tool_use) via Effect/Stream" },
                { mech: { en: "Tool Dispatch", zh: "工具调度" }, cc: "Function calling API", oc: "TOOL_MAP registry + Schema" },
                { mech: { en: "Permission Model", zh: "权限模型" }, cc: "User confirmation prompt", oc: "Wildcard patterns · allow/deny/ask · Deferred" },
                { mech: { en: "Extensibility", zh: "可扩展性" }, cc: "CLI flags + env vars", oc: "Plugin SDK · Hooks API · Skill system" },
                { mech: { en: "Subagents", zh: "子代理" }, cc: "@mentions", oc: "Named agents · clean context · task_id resume" },
                { mech: { en: "Skill System", zh: "技能系统" }, cc: "Custom instructions", oc: "SKILL.md · priority chain · YAML frontmatter" },
                { mech: { en: "Config", zh: "配置" }, cc: "CLAUDE.md + env", oc: "opencode.jsonc · deepMerge · JSON Schema" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[var(--color-bg-secondary)]/50">
                  <td className="px-4 py-2.5 font-medium">{locale === "zh" ? row.mech.zh : row.mech.en}</td>
                  <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{row.cc}</td>
                  <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{row.oc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
          {locale === "zh"
            ? "参考: learn.shareai.run — Claude Code 学习站点"
            : "Reference: learn.shareai.run — Claude Code learning site"}
        </p>
      </section>

      <section>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("learning_path")}</h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">{t("learning_path_desc")}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VERSION_ORDER.map((versionId) => {
            const meta = VERSION_META[versionId];
            return (
              <Link
                key={versionId}
                href={`/${locale}/${versionId}`}
                className="group block"
              >
                <Card className={cn("h-full border transition-all duration-200", LAYER_BORDER_COLORS[meta.layer])}>
                  <div className="flex items-start justify-between gap-2">
                    <LayerBadge layer={meta.layer}>{versionId}</LayerBadge>
                    <span className="text-xs tabular-nums text-[var(--color-text-secondary)]">
                      {meta.loc} {t("loc")}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold group-hover:underline">
                    {meta.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    {meta.keyInsight}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
