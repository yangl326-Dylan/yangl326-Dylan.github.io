"use client";
import { VERSION_ORDER, VERSION_META, LAYER_BAR_COLORS } from "@/data/constants";

export function LocChart() {
  const maxLoc = Math.max(...VERSION_ORDER.map(id => VERSION_META[id].loc));
  return (
    <div className="flex items-end gap-2 h-40">
      {VERSION_ORDER.map(id => {
        const meta = VERSION_META[id];
        const height = (meta.loc / maxLoc) * 100;
        return (
          <div key={id} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] text-[var(--color-text-secondary)]">{meta.loc}</span>
            <div
              className="w-full rounded-t transition-all hover:opacity-80"
              style={{ height: `${height}%`, backgroundColor: LAYER_BAR_COLORS[meta.layer] }}
            />
            <span className="text-[10px] text-[var(--color-text-secondary)]">{id}</span>
          </div>
        );
      })}
    </div>
  );
}
