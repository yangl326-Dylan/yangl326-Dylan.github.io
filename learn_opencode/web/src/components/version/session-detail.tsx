"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "@/i18n/i18n";
import { VERSION_META, VERSION_ORDER } from "@/data/constants";
import { LayerBadge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";
import { SESSION_CONTENT } from "@/data/session-content";
import type { LearnSection, CodeAnnotation } from "@/data/session-content";
import { cn } from "@/lib/utils";

interface DesignDecision {
  id: string;
  title: string;
  description: string;
  alternatives: string;
  zh: { title: string; description: string; alternatives: string };
}

interface Annotations {
  version: string;
  decisions: DesignDecision[];
}

function LearnTab({
  content,
  annotations,
  locale,
  t,
}: {
  content: (typeof SESSION_CONTENT)[keyof typeof SESSION_CONTENT];
  annotations: Annotations;
  locale: string;
  t: (key: string) => string;
}) {
  const sections = content.learnSections || [];
  const [fullscreenSvg, setFullscreenSvg] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Fullscreen SVG Modal */}
      {fullscreenSvg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setFullscreenSvg(false)}
        >
          <div className="relative max-h-[90vh] max-w-[95vw] overflow-auto rounded-xl bg-white p-6 dark:bg-zinc-950">
            <button
              onClick={() => setFullscreenSvg(false)}
              className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
            >
              ✕
            </button>
            {content.flowchartHtml ? (
              <iframe
                src={`/learn_opencode/diagrams/${content.flowchartHtml}`}
                className="min-w-[800px] min-h-[600px] border-0"
                title="Architecture Diagram"
              />
            ) : (
              <div
                className="min-w-[500px]"
                dangerouslySetInnerHTML={{ __html: content.flowchartSvg }}
              />
            )}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {locale === "zh" ? content.zhDescription : content.description}
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {locale === "zh" ? "架构流程图" : "Architecture Flow"}
          </h3>
          <button
            onClick={() => setFullscreenSvg(true)}
            className="text-xs text-[var(--color-text-secondary)] underline underline-offset-2 hover:text-[var(--color-text)]"
          >
            {locale === "zh" ? "全屏查看" : "Full Screen"}
          </button>
        </div>
        {content.flowchartHtml ? (
          <iframe
            src={`/learn_opencode/diagrams/${content.flowchartHtml}`}
            className="w-full h-[400px] border-0 rounded-xl"
            title="Architecture Diagram"
          />
        ) : (
          <div
            className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-4 dark:bg-zinc-950 max-w-xl mx-auto"
            dangerouslySetInnerHTML={{ __html: content.flowchartSvg }}
          />
        )}
      </div>

      {/* Learn Sections */}
      {sections.length > 0 && (
        <div className="flex flex-col gap-6">
          {sections.map((section: LearnSection, i: number) => (
            <div key={i}>
              <h3 className="mb-2 text-base font-bold">
                {locale === "zh" ? section.zhTitle : section.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {locale === "zh" ? section.zhContent : section.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Design Highlights */}
      {content.designHighlights.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {t("design_decisions")}
          </h3>
          <div className="flex flex-col gap-3">
            {content.designHighlights.map((h, i) => (
              <div
                key={i}
                className="rounded-lg border-l-2 border-[var(--color-text)] bg-[var(--color-bg-secondary)] px-4 py-3"
              >
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {locale === "zh" ? h.zh : h.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Claude Code Comparison */}
      {content.claudeCodeComparison && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {locale === "zh" ? "对比 Claude Code" : "Comparison: Claude Code"}
          </h3>
          <div className="rounded-lg border border-[var(--color-border)] bg-gradient-to-r from-amber-50/50 to-transparent p-4 dark:from-amber-950/10">
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {locale === "zh" ? content.claudeCodeComparison.zh : content.claudeCodeComparison.en}
            </p>
          </div>
        </div>
      )}

      {/* Annotations (legacy design decisions) */}
      {annotations?.decisions && annotations.decisions.length > 0 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-base font-bold">
            {locale === "zh" ? "深入设计决策" : "Deep Dive: Design Decisions"}
          </h3>
          {annotations.decisions.map((d: DesignDecision) => (
            <div key={d.id} className="rounded-xl border border-[var(--color-border)] p-4">
              <h4 className="font-semibold">
                {locale === "zh" ? d.zh.title : d.title}
              </h4>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {locale === "zh" ? d.zh.description : d.description}
              </p>
              <div className="mt-3 rounded-lg bg-[var(--color-bg-secondary)] p-3">
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  {locale === "zh" ? "备选方案: " : "Alternatives: "}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {locale === "zh" ? d.zh.alternatives : d.alternatives}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CodeAnnotations({
  annotations,
  locale,
}: {
  annotations: { overview: { en: string; zh: string }; annotations: CodeAnnotation[]; flowSummary: { en: string; zh: string } };
  locale: string;
}) {
  if (!annotations.overview.en && !annotations.flowSummary.en) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Overview */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {locale === "zh" ? annotations.overview.zh : annotations.overview.en}
        </p>
      </div>

      {/* Line-by-line annotations */}
      {annotations.annotations.length > 0 && (
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {locale === "zh" ? "逐行解析" : "Line-by-Line Analysis"}
          </h4>
          <div className="flex flex-col gap-3">
            {annotations.annotations.map((a, i) => (
              <div
                key={i}
                className="rounded-lg border border-[var(--color-border)] overflow-hidden"
              >
                <div className="bg-[var(--color-bg-secondary)] px-3 py-1.5 text-xs font-mono text-[var(--color-text-secondary)]">
                  {locale === "zh" ? `行 ${a.lineStart}${a.lineEnd > a.lineStart ? `-${a.lineEnd}` : ""}` : `Line ${a.lineStart}${a.lineEnd > a.lineStart ? `-${a.lineEnd}` : ""}`}
                </div>
                <div className="px-3 py-2 text-sm text-[var(--color-text-secondary)]">
                  {locale === "zh" ? a.zhText : a.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flow summary */}
      {annotations.flowSummary.en && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {locale === "zh" ? "执行流程" : "Execution Flow"}
          </h4>
          <p className="text-sm font-mono text-[var(--color-text-secondary)]">
            {locale === "zh" ? annotations.flowSummary.zh : annotations.flowSummary.en}
          </p>
        </div>
      )}
    </div>
  );
}

export function SessionDetail({ versionId, annotations }: { versionId: string; annotations: Annotations }) {
  const t = useTranslations("version");
  const locale = useLocale();
  const meta = VERSION_META[versionId];
  const content = SESSION_CONTENT[versionId];
  const [activeTab, setActiveTab] = useState<"learn" | "code">("learn");

  if (!meta || !content) return null;

  const currentIndex = VERSION_ORDER.indexOf(versionId as any);
  const prevId = currentIndex > 0 ? VERSION_ORDER[currentIndex - 1] : null;
  const nextId = currentIndex < VERSION_ORDER.length - 1 ? VERSION_ORDER[currentIndex + 1] : null;

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
        <Link href={`/${locale}`} className="hover:text-[var(--color-text)]">
          {locale === "zh" ? "首页" : "Home"}
        </Link>
        <span>/</span>
        <span>{versionId}</span>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <LayerBadge layer={meta.layer}>{versionId}</LayerBadge>
          <span className="text-xs tabular-nums text-[var(--color-text-secondary)]">{meta.loc} {t("loc")}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold">{meta.title}</h1>
        <p className="mt-1 text-lg text-[var(--color-text-secondary)]">&ldquo;{meta.subtitle}&rdquo;</p>
      </div>

      {/* Key Insight */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("key_insight")}:
        </span>
        <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {meta.keyInsight}
        </p>
      </div>

      {/* Tabs: Learn (merged with Design) | Code */}
      <div className="border-b border-[var(--color-border)]">
        <div className="flex gap-6">
          {(["learn", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-b-2 border-[var(--color-text)] text-[var(--color-text)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              )}
            >
              {tab === "learn" ? (locale === "zh" ? "学习与设计" : "Learn & Design") : t("tab_code")}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "learn" && (
          <LearnTab content={content} annotations={annotations} locale={locale} t={t} />
        )}

        {activeTab === "code" && (
          <div className="flex flex-col gap-6">
            {/* Code annotations first */}
            <CodeAnnotations annotations={content.annotatedCode} locale={locale} />

            {/* Code block */}
            <div className="rounded-xl border border-[var(--color-border)] bg-zinc-950 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-zinc-500">
                  code.{content.codeLanguage === "python" ? "py" : content.codeLanguage === "typescript" ? "ts" : "js"}
                </span>
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                <code className="text-zinc-300 whitespace-pre font-mono">{content.codeSample}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-6">
        {prevId ? (
          <Link
            href={`/${locale}/${prevId}`}
            className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          >
            <span aria-hidden="true">&larr;</span> {t("prev")}: {VERSION_META[prevId].title}
          </Link>
        ) : (
          <div />
        )}
        {nextId ? (
          <Link
            href={`/${locale}/${nextId}`}
            className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          >
            {t("next")}: {VERSION_META[nextId].title} <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <Footer />
    </div>
  );
}
