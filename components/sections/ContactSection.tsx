"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";

const CHANNELS = [
  {
    icon: "✉",
    labelKey: "email",
    valueKey:  "emailValue",
    href:      "mailto:booking@sohoresidencehotel.vn",
  },
  {
    icon: "📞",
    labelKey: "phone",
    valueKey:  "phoneValue",
    href:      "tel:+84917719966",
  },
  {
    icon: "💬",
    labelKey: "whatsapp",
    valueKey:  "phoneValue",
    href:      "https://wa.me/84917719966",
  },
  {
    icon: "🌐",
    labelKey: "social",
    valueKey:  "socialValue",
    href:      "https://t.me/sohoresidencehotel",
  },
] as const;

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[var(--color-charcoal-50)]"
      aria-labelledby="contact-heading"
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <AnimateInView direction="up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block w-8 h-px bg-[var(--color-gold)]" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
                {t("eyebrow")}
              </span>
              <span className="block w-8 h-px bg-[var(--color-gold)]" />
            </div>
          </AnimateInView>

          <AnimateInView delay={0.1} direction="up">
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-[var(--color-ivory)] mb-4"
            >
              {t("title")}
            </h2>
          </AnimateInView>

          <AnimateInView delay={0.18} direction="up">
            <p className="font-sans text-sm text-[var(--color-ivory-dim)] max-w-md mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </AnimateInView>
        </div>

        {/* ── Contact channel cards ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CHANNELS.map(({ icon, labelKey, valueKey, href }, i) => (
            <AnimateInView key={labelKey} delay={i * 0.1} direction="up">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="
                  group flex flex-col gap-4 p-7
                  border border-[var(--color-border)]
                  bg-[var(--color-charcoal)]
                  hover:border-[rgba(201,168,76,0.45)]
                  hover:bg-[rgba(201,168,76,0.04)]
                  transition-all duration-300
                "
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110 inline-block">
                  {icon}
                </span>
                <div>
                  <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[var(--color-ivory-dim)] mb-1.5">
                    {t(labelKey)}
                  </span>
                  <span className="block font-sans text-sm text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors duration-300 leading-snug">
                    {t(valueKey)}
                  </span>
                </div>
                <span className="
                  block w-0 h-px bg-[var(--color-gold)]
                  group-hover:w-8
                  transition-all duration-400 mt-auto
                " />
              </a>
            </AnimateInView>
          ))}
        </div>

        {/* ── Full-width CTA strip ────────────────────────────────────────── */}
        <AnimateInView direction="up" delay={0.2}>
          <div className="
            relative overflow-hidden
            border border-[rgba(201,168,76,0.25)]
            bg-gradient-to-br from-[rgba(201,168,76,0.06)] to-[rgba(14,14,14,0.5)]
            p-10 lg:p-16
            flex flex-col lg:flex-row items-center justify-between gap-8
          ">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[var(--color-gold)] opacity-60" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[var(--color-gold)] opacity-60" />

            <div className="text-center lg:text-left">
              <h3 className="font-serif text-2xl lg:text-3xl text-[var(--color-ivory)] mb-3">
                {t("cta.heading")}
              </h3>
              <p className="font-sans text-sm text-[var(--color-ivory-dim)] max-w-md">
                {t("cta.body")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a
                href="mailto:booking@sohoresidencehotel.vn"
                className="
                  inline-flex items-center justify-center gap-2
                  border border-[rgba(245,240,232,0.3)] text-[var(--color-ivory)]
                  font-sans font-medium text-xs tracking-[0.15em] uppercase
                  px-7 py-3.5
                  hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
                  transition-all duration-300
                "
              >
                {t("cta.emailBtn")}
              </a>
              <a
                href="https://wa.me/84917719966"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-2
                  bg-[var(--color-gold)] text-[var(--color-charcoal)]
                  font-sans font-semibold text-xs tracking-[0.15em] uppercase
                  px-7 py-3.5
                  hover:bg-[var(--color-gold-light)]
                  hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]
                  transition-all duration-300 active:scale-95
                  group
                "
              >
                {t("cta.whatsappBtn")}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>
        </AnimateInView>

      </div>
    </section>
  );
}
