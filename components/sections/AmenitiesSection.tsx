"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";

// ── Luxury line-art SVG icons ─────────────────────────────────────────────────
const Icons: Record<string, React.ReactNode> = {
  checkin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15 15"/>
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  elevator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <path d="M8 10l4-4 4 4"/>
      <path d="M8 14l4 4 4-4"/>
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M17 8h1a3 3 0 010 6h-1"/>
      <path d="M3 8h14v8a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/>
      <line x1="6" y1="3" x2="6" y2="5"/>
      <line x1="10" y1="3" x2="10" y2="5"/>
      <line x1="14" y1="3" x2="14" y2="5"/>
    </svg>
  ),
  laundry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <circle cx="12" cy="13" r="5"/>
      <circle cx="7" cy="7" r="1" fill="currentColor" strokeWidth="0"/>
      <circle cx="10.5" cy="7" r="1" fill="currentColor" strokeWidth="0"/>
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M3 2v7c0 1.1.9 2 2 2 1.1 0 2-.9 2-2V2"/>
      <line x1="5" y1="11" x2="5" y2="22"/>
      <line x1="3" y1="6" x2="7" y2="6"/>
      <path d="M21 2c0 0 0 8-4 9v11"/>
    </svg>
  ),
  smoke: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  ),
  co: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M5 12.55a11 11 0 0114.08 0"/>
      <path d="M1.42 9a16 16 0 0121.16 0"/>
      <path d="M8.53 16.11a6 6 0 016.95 0"/>
      <circle cx="12" cy="20" r="1" fill="currentColor" strokeWidth="0"/>
    </svg>
  ),
  tv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="7" width="20" height="15" rx="2"/>
      <polyline points="17 2 12 7 7 2"/>
    </svg>
  ),
  balcony: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M17 18a5 5 0 00-10 0"/>
      <line x1="12" y1="2" x2="12" y2="4"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="2" y1="12" x2="4" y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  ac: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <line x1="12" y1="2" x2="12" y2="22"/>
      <path d="M17 7l-5-5-5 5"/>
      <path d="M17 17l-5 5-5-5"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M7 7l-5 5 5 5"/>
      <path d="M17 7l5 5-5 5"/>
    </svg>
  ),
};

const AMENITIES = [
  "checkin", "security", "elevator", "coffee",
  "laundry", "kitchen", "smoke", "co",
  "wifi", "tv", "balcony", "ac",
] as const;

export default function AmenitiesSection() {
  const t = useTranslations("amenities");

  return (
    <section
      id="amenities"
      className="py-16 sm:py-24 lg:py-32 bg-[var(--color-charcoal-50)]"
      aria-labelledby="amenities-heading"
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="mb-16 lg:flex lg:items-end lg:justify-between">
          <div>
            <AnimateInView direction="up">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-[var(--color-gold)]" />
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
                  Facilities
                </span>
              </div>
            </AnimateInView>

            <AnimateInView delay={0.1} direction="up">
              <h2
                id="amenities-heading"
                className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-[var(--color-ivory)]"
              >
                {t("title")}
              </h2>
            </AnimateInView>
          </div>

          <AnimateInView delay={0.2} direction="up">
            <p className="font-sans text-sm text-[var(--color-ivory-dim)] max-w-sm leading-relaxed mt-4 lg:mt-0 lg:text-right italic">
              {t("subtitle")}
            </p>
          </AnimateInView>
        </div>

        {/* Gold divider */}
        <AnimateInView direction="none">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent mb-16 opacity-40" />
        </AnimateInView>

        {/* Amenities grid — gap-px creates 1px dividers via background bleed */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
          {AMENITIES.map((key, i) => (
            <AnimateInView key={key} delay={i * 0.05} direction="up" className="h-full">
              <div className="
                h-full bg-[var(--color-charcoal-50)] p-5 sm:p-7
                flex flex-col gap-3 sm:gap-4
                group hover:bg-[rgba(201,168,76,0.05)]
                transition-colors duration-300
              ">
                {/* Icon */}
                <span
                  className="text-[var(--color-gold)] transition-transform duration-300 group-hover:scale-110 inline-block w-6 h-6 sm:w-7 sm:h-7"
                  aria-hidden="true"
                >
                  {Icons[key]}
                </span>

                {/* Label */}
                <div>
                  <h3 className="
                    font-sans font-semibold text-xs sm:text-sm text-[var(--color-ivory)]
                    group-hover:text-[var(--color-gold)]
                    transition-colors duration-300 mb-1
                  ">
                    {t(`items.${key}.label`)}
                  </h3>
                  <p className="font-sans text-xs text-[var(--color-ivory-dim)] leading-relaxed">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>

                {/* Gold underline on hover */}
                <div className="
                  w-0 h-px bg-[var(--color-gold)]
                  group-hover:w-8
                  transition-all duration-400
                " />
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Bottom note */}
        <AnimateInView delay={0.3} direction="up">
          <p className="mt-10 text-center font-sans text-xs text-[var(--color-ivory-dim)] tracking-wide">
            All amenities included in every residence type &nbsp;·&nbsp; No hidden fees
          </p>
        </AnimateInView>

      </div>
    </section>
  );
}
