"use client";
import { useTranslations } from "@/i18n/i18n";
import { Timeline } from "@/components/timeline/timeline";
import { LocChart } from "@/components/timeline/loc-chart";
import { LAYERS, LAYER_DOT_COLORS } from "@/data/constants";

export default function TimelinePage() {
  const t = useTranslations("timeline");
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">{t("subtitle")}</p>
      </div>

      {/* Layer Legend */}
      <div className="mb-8 rounded-xl border border-[var(--color-border)] p-4">
        <h2 className="mb-3 text-sm font-semibold">{t("layer_legend")}</h2>
        <div className="flex flex-wrap gap-3">
          {LAYERS.map(layer => (
            <div key={layer.id} className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${LAYER_DOT_COLORS[layer.id]}`} />
              <span className="text-xs">{layer.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LOC Growth Chart */}
      <div className="mb-8 rounded-xl border border-[var(--color-border)] p-4">
        <h2 className="mb-4 text-sm font-semibold">{t("loc_growth")}</h2>
        <LocChart />
      </div>

      {/* Timeline */}
      <Timeline />
    </div>
  );
}
