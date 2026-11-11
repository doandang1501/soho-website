"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";

const LANDMARK_KEYS = [
  "buivien",
  "benthanh",
  "nguyenhue",
  "bitexco",
  "notredame",
] as const;

export default function LocationSection() {
  const t = useTranslations("location");
  const [loadMap, setLoadMap] = useState(false);

  return (
    <section
      id="location"
      className="py-16 sm:py-20 lg:py-28"
      aria-labelledby="location-heading"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">

        {/* Section header */}
        <div className="mb-14">
          <AnimateInView direction="up">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-[var(--color-gold)]" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
                {t("eyebrow")}
              </span>
            </div>
          </AnimateInView>

          <AnimateInView delay={0.1} direction="up">
            {/* H2 Title */}
            <h2
              id="location-heading"
              className="font-serif text-[clamp(1.8rem,3.8vw,3.2rem)] text-[var(--color-ivory)] mb-3"
            >
              {t("title")}
            </h2>
          </AnimateInView>

          <AnimateInView delay={0.18} direction="up">
            <p className="font-sans text-sm text-[var(--color-gold)] tracking-wide mb-3">
              {t("subtitle")}
            </p>
          </AnimateInView>

          <AnimateInView delay={0.26} direction="up">
            <p className="font-sans text-sm sm:text-base text-[var(--color-ivory-dim)] max-w-2xl leading-relaxed">
              {t("description")}
            </p>
          </AnimateInView>
        </div>

        {/* Map + info layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Map embed — col-span-2 with Interactive/Scroll Lazy-load */}
          <AnimateInView delay={0.1} direction="left" className="lg:col-span-2">
            <div 
              className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden border border-[var(--color-border)] bg-[var(--color-charcoal-50)] flex items-center justify-center cursor-pointer"
              onMouseEnter={() => setLoadMap(true)}
              onTouchStart={() => setLoadMap(true)}
            >
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-gold)] z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-gold)] z-10 pointer-events-none" />

              {loadMap ? (
                <iframe
                  title="SOHO Residence & Hotel location map"
                  src="https://maps.google.com/maps?q=100+C%C3%B4+Giang%2C+C%E1%BA%A7u+%C3%94ng+L%C3%A3nh%2C+H%E1%BB%93+Ch%C3%AD+Minh+700000%2C+Vietnam&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.3) invert(0.12) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              ) : (
                <div 
                  onClick={() => setLoadMap(true)}
                  className="flex flex-col items-center justify-center p-6 text-center gap-3 z-10 w-full h-full group hover:bg-[var(--color-gold)]/5 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full border border-[var(--color-gold)] flex items-center justify-center text-2xl text-[var(--color-gold)] group-hover:scale-110 transition-transform">
                    📍
                  </div>
                  <div>
                    <span className="font-serif text-lg text-[var(--color-ivory)] block mb-1">
                      100 Cô Giang, Phường Cầu Ông Lãnh, Quận 1
                    </span>
                    <span className="font-sans text-xs text-[var(--color-gold)] uppercase tracking-widest border-b border-[var(--color-gold)]/40 pb-0.5">
                      Bấm để tải bản đồ trực tiếp
                    </span>
                  </div>
                </div>
              )}
            </div>
          </AnimateInView>

          {/* Nearby info panel */}
          <AnimateInView delay={0.2} direction="right">
            <div className="flex flex-col gap-6">

              {/* Address card */}
              <div className="border border-[var(--color-border)] p-6 bg-[var(--color-charcoal-50)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📍</span>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] font-medium">
                    {t("address")}
                  </span>
                </div>
                <address className="font-sans text-sm text-[var(--color-ivory)] not-italic leading-relaxed whitespace-pre-line">
                  {t("addressValue")}
                </address>
                <a
                  href="https://maps.google.com/?q=100+Co+Giang,+Cau+Ong+Lanh,+District+1,+Ho+Chi+Minh+City,+Vietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2 mt-4
                    font-sans text-xs tracking-[0.12em] uppercase
                    text-[var(--color-gold)] hover:text-[var(--color-gold-light)]
                    border-b border-[var(--color-gold-muted)] hover:border-[var(--color-gold)]
                    pb-0.5 transition-all duration-200 group
                  "
                >
                  {t("openMaps")}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>

              {/* Destinations list */}
              <div className="border border-[var(--color-border)] p-6 bg-[var(--color-charcoal-50)]">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] block mb-4 font-medium">
                  {t("nearby")}
                </span>
                <ul className="space-y-2.5">
                  {LANDMARK_KEYS.map((key) => (
                    <li key={key} className="flex items-center font-sans text-sm text-[var(--color-ivory-dim)]">
                      <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] mr-2.5 flex-shrink-0" />
                      {t(`landmarks.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* H2 Sub-section: Hỗ trợ nhận phòng và gửi hành lý */}
              <div className="border border-[rgba(201,168,76,0.3)] p-6 bg-[rgba(201,168,76,0.04)]">
                <h3 className="font-serif text-base text-[var(--color-gold)] mb-2">
                  {t("checkinTitle")}
                </h3>
                <p className="font-sans text-xs text-[var(--color-ivory-dim)] leading-relaxed">
                  {t("checkinNote")}
                </p>
              </div>

            </div>
          </AnimateInView>

        </div>
      </div>
    </section>
  );
}
