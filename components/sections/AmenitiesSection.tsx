"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";

// ── Luxury line-art SVG icons ─────────────────────────────────────────────────
const Icons: Record<string, React.ReactNode> = {
  kitchen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M3 2v7c0 1.1.9 2 2 2 1.1 0 2-.9 2-2V2"/>
      <line x1="5" y1="11" x2="5" y2="22"/>
      <line x1="3" y1="6" x2="7" y2="6"/>
      <path d="M21 2c0 0 0 8-4 9v11"/>
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
  dryer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <circle cx="12" cy="12" r="6"/>
      <path d="M12 8a4 4 0 0 1 4 4"/>
      <line x1="6" y1="5" x2="6.01" y2="5"/>
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
  elevator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <path d="M8 10l4-4 4 4"/>
      <path d="M8 14l4 4 4-4"/>
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  alarms: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  luggage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="6" y="7" width="12" height="14" rx="2"/>
      <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"/>
      <line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="16" x2="15" y2="16"/>
    </svg>
  ),
  checkin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15 15"/>
    </svg>
  ),
};

const AMENITY_KEYS = [
  "kitchen",
  "laundry",
  "dryer",
  "wifi",
  "tv",
  "ac",
  "balcony",
  "elevator",
  "security",
  "alarms",
  "luggage",
  "checkin",
] as const;

export default function AmenitiesSection() {
  const t = useTranslations("amenities");

  return (
    <section
      id="amenities"
      className="py-16 sm:py-20 lg:py-28 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
      aria-labelledby="amenities-heading"
    >
      <div className="mb-14">
        <AnimateInView direction="up">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-[var(--color-gold)]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
              SOHO Residence & Hotel
            </span>
          </div>
        </AnimateInView>

        <AnimateInView delay={0.1} direction="up">
          {/* H2 Title */}
          <h2
            id="amenities-heading"
            className="font-serif text-[clamp(1.8rem,3.8vw,3.2rem)] text-[var(--color-ivory)] mb-4"
          >
            {t("title")}
          </h2>
        </AnimateInView>

        <AnimateInView delay={0.18} direction="up">
          <p className="font-sans text-sm sm:text-base text-[var(--color-ivory-dim)] max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </AnimateInView>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {AMENITY_KEYS.map((key, i) => (
          <AnimateInView key={key} delay={i * 0.04} direction="up">
            <div className="p-6 rounded-xl border border-[#e9ecef] bg-white hover:border-[var(--color-gold)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-300 h-full flex flex-col justify-between group">
              <div>
                <div className="text-[var(--color-gold)] mb-4 p-2.5 bg-[#f8f9fa] rounded-lg inline-block group-hover:bg-[#fff9eb] transition-colors duration-200">
                  {Icons[key]}
                </div>
                <h3 className="font-serif text-lg text-[#1e2022] mb-2 group-hover:text-[var(--color-gold-dark)] transition-colors duration-200">
                  {t(`items.${key}.label`)}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6c757d] leading-relaxed">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            </div>
          </AnimateInView>
        ))}
      </div>

      {/* Dryer footnote */}
      <AnimateInView delay={0.3} direction="up">
        <div className="rounded-xl border border-[rgba(201,154,44,0.3)] p-4 bg-[#fffdfa] shadow-sm">
          <p className="font-sans text-xs text-[#6c757d] leading-relaxed">
            {t("dryerNotice")}
          </p>
        </div>
      </AnimateInView>
    </section>
  );
}
