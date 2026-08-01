"use client";
import Link from "next/link";
import { useLocale } from "@/i18n/i18n";
import { VERSION_ORDER, VERSION_META, LAYER_DOT_COLORS, LAYER_BAR_COLORS } from "@/data/constants";

export function Timeline() {
  const locale = useLocale();
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-[var(--color-border)]" />
      {VERSION_ORDER.map((id) => {
        const meta = VERSION_META[id];
        const barColor = LAYER_BAR_COLORS[meta.layer];
        const dotColor = LAYER_DOT_COLORS[meta.layer];
        return (
          <Link key={id} href={`/${locale}/${id}`} className="group relative mb-8 flex gap-6">
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
              <div className={`h-3 w-3 rounded-full ${dotColor} ring-2 ring-[var(--color-bg)]`} />
            </div>
            <div className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 transition-all group-hover:border-[var(--color-text-secondary)]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold">{id}</span>
                  <span className="font-semibold text-sm">{meta.title}</span>
                </div>
                <div className={`h-1.5 w-16 rounded-full self-center ${barColor}`} />
              </div>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{meta.keyInsight}</p>
              <div className="mt-2 flex gap-3 text-xs text-[var(--color-text-secondary)]">
                <span>{meta.loc} LOC</span>
                <span>{meta.tools.length} tools</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
