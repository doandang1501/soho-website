"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { localeLabels, localeFlags, type Locale } from "@/i18n";

const LOCALES: Locale[] = ["en", "vi", "zh"];

export default function LanguageSwitcher() {
  const locale   = useLocale() as Locale;
  const pathname = usePathname(); // path without locale prefix, e.g. "/" or "/rooms"
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Build locale-aware URL and navigate with a full page reload.
  // We also sync the NEXT_LOCALE cookie so the middleware respects the new
  // choice even when navigating to "/" (default locale — no prefix).
  const switchLocale = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;

    // Sync cookie so middleware doesn't redirect based on old preference
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`;

    // localePrefix "as-needed": en → no prefix, vi/zh → /{locale}
    const path = next === "en"
      ? pathname                                              // "/" or "/rooms"
      : `/${next}${pathname === "/" ? "" : pathname}`;       // "/vi" or "/vi/rooms"

    window.location.href = path || "/";
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center gap-1.5
          font-sans text-xs tracking-[0.12em] uppercase py-1 px-1
          transition-colors duration-200
          text-[var(--color-ivory-dim)] hover:text-[var(--color-ivory)]
        "
        aria-label="Change language"
        aria-expanded={open}
      >
        <span>{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className="text-[var(--color-gold)]"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="lang-dropdown"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: -6,  scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute right-0 top-full mt-2
              bg-[var(--color-charcoal-50)] border border-[var(--color-border)]
              shadow-[0_25px_60px_rgba(0,0,0,0.5)]
              min-w-[148px] overflow-hidden z-50
            "
          >
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3
                  font-sans text-xs tracking-[0.1em]
                  transition-colors duration-150 text-left
                  ${l === locale
                    ? "text-[var(--color-gold)] bg-[rgba(201,168,76,0.08)]"
                    : "text-[var(--color-ivory-muted)] hover:text-[var(--color-ivory)] hover:bg-[var(--color-border)]"
                  }
                `}
              >
                <span className="text-base leading-none">{localeFlags[l]}</span>
                <span>{localeLabels[l]}</span>
                {l === locale && (
                  <span className="ml-auto text-[var(--color-gold)] text-xs">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
