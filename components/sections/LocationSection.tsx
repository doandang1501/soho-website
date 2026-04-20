"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";

// Landmark names are proper nouns — universally understood, kept as-is
const NEARBY = [
  { label: "Ben Thanh Market",       dist: "300m" },
  { label: "Nguyen Hue Walking St.", dist: "600m" },
  { label: "Bitexco Tower",          dist: "700m" },
  { label: "Notre-Dame Cathedral",   dist: "1.2km" },
  { label: "Tan Son Nhat Airport",   dist: "6km"  },
] as const;

export default function LocationSection() {
  const t = useTranslations("location");

  return (
    <section
      id="location"
      className="py-24 lg:py-32"
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
            <h2
              id="location-heading"
              className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-[var(--color-ivory)] mb-3"
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
            <p className="font-sans text-sm text-[var(--color-ivory-dim)] max-w-xl leading-relaxed">
              {t("description")}
            </p>
          </AnimateInView>
        </div>

        {/* Map + info layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Map embed — col-span-2 */}
          <AnimateInView delay={0.1} direction="left" className="lg:col-span-2">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden border border-[var(--color-border)]">
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-gold)] z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-gold)] z-10 pointer-events-none" />

              <iframe
                title="SOHO Residence & Hotel location"
                src="https://maps.google.com/maps?q=100+C%C3%B4+Giang%2C+C%E1%BA%A7u+%C3%94ng+L%C3%A3nh%2C+H%E1%BB%93+Ch%C3%AD+Minh+700000%2C+Vietnam&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.4) invert(0.15) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </AnimateInView>

          {/* Nearby info panel */}
          <AnimateInView delay={0.2} direction="right">
            <div className="flex flex-col gap-6">

              {/* Address card */}
              <div className="border border-[var(--color-border)] p-6 bg-[var(--color-charcoal-50)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📍</span>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)]">
                    {t("address")}
                  </span>
                </div>
                <address className="font-sans text-sm text-[var(--color-ivory)] not-italic leading-relaxed whitespace-pre-line">
                  {t("addressValue")}
                </address>
                <a
                  href="https://maps.google.com/?q=QM7V%2BFR+Cau+Ong+Lanh,+Ho+Chi+Minh,+Vietnam"
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

              {/* Nearby places */}
              <div className="border border-[var(--color-border)] p-6 bg-[var(--color-charcoal-50)]">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] block mb-5">
                  {t("nearby")}
                </span>
                <ul className="space-y-3">
                  {NEARBY.map(({ label, dist }) => (
                    <li key={label} className="flex items-center justify-between font-sans text-sm">
                      <span className="text-[var(--color-ivory-dim)] flex items-center gap-2">
                        <span className="block w-1 h-1 rounded-full bg-[var(--color-gold)] flex-shrink-0" />
                        {label}
                      </span>
                      <span className="text-[var(--color-gold)] font-medium text-xs">{dist}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Check-in info */}
              <div className="border border-[rgba(201,168,76,0.3)] p-5 bg-[rgba(201,168,76,0.04)]">
                <p className="font-sans text-xs text-[var(--color-ivory-dim)] leading-relaxed">
                  <span className="text-[var(--color-gold)] font-semibold">{t("checkin247")}</span>
                  {" — "}{t("checkinNote")}
                </p>
              </div>

            </div>
          </AnimateInView>

        </div>
      </div>
    </section>
  );
}
