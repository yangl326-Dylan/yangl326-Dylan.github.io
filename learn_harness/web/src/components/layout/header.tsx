"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "@/i18n/i18n";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const otherLocale = locale === "zh" ? "en" : "zh";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="text-sm font-semibold">{t("home")}</Link>
        <nav className="hidden sm:flex items-center gap-6">
          <Link href={`/${locale}/timeline`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">{t("timeline")}</Link>
          <Link href={`/${otherLocale}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">{otherLocale === "zh" ? "中文" : "EN"}</Link>
        </nav>
        <button className="sm:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] px-4 py-3 sm:hidden">
          <Link href={`/${locale}/timeline`} className="block py-1 text-sm" onClick={() => setMobileOpen(false)}>{t("timeline")}</Link>
          <Link href={`/${otherLocale}`} className="block py-1 text-sm" onClick={() => setMobileOpen(false)}>{otherLocale === "zh" ? "中文" : "EN"}</Link>
        </div>
      )}
    </header>
  );
}
