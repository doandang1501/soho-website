"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";

const CHANNELS = [
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
    href:      "#",
  },
  {
    icon: "✉",
    labelKey: "email",
    valueKey:  "emailValue",
    href:      "mailto:booking@sohoresidencehotel.vn",
  },
] as const;

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-28 bg-[#f8f9fa] border-t border-[#e9ecef]"
      aria-labelledby="contact-heading"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-14 text-center">
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
            {/* H2 Title */}
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(1.8rem,3.8vw,3.2rem)] text-[var(--color-ivory)] mb-4"
            >
              {t("title")}
            </h2>
          </AnimateInView>

          <AnimateInView delay={0.18} direction="up">
            <p className="font-sans text-sm sm:text-base text-[var(--color-ivory-dim)] max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </AnimateInView>
        </div>

        {/* ── Contact channel cards ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {CHANNELS.map(({ icon, labelKey, valueKey, href }, i) => (
            <AnimateInView key={labelKey} delay={i * 0.08} direction="up">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="
                  group flex flex-col justify-between p-6 h-full
                  rounded-xl border border-[#e9ecef]
                  bg-white shadow-sm
                  hover:border-[#c99a2c] hover:shadow-md
                  transition-all duration-300
                "
              >
                <div>
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110 inline-block mb-3 p-2 bg-[#f8f9fa] rounded-lg">
                    {icon}
                  </span>
                  <div>
                    <span className="block font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-[#6c757d] mb-1.5">
                      {t(labelKey)}
                    </span>
                    <span className="block font-sans text-sm font-semibold text-[#1e2022] group-hover:text-[#c99a2c] transition-colors duration-300 leading-snug">
                      {t(valueKey)}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-[#c99a2c] mt-4">
                  Kết nối <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </a>
            </AnimateInView>
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <AnimateInView delay={0.3} direction="up">
          <div className="rounded-2xl border border-[#e9ecef] p-8 sm:p-12 bg-white shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="font-serif text-2xl text-[#1e2022] mb-2 font-medium">
                {t("cta.heading")}
              </h3>
              <p className="font-sans text-sm text-[#6c757d] leading-relaxed">
                {t("cta.body")}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-booking-modal"));
                }}
                className="
                  inline-flex items-center gap-2.5
                  bg-[#c99a2c] text-white
                  font-sans font-bold text-xs tracking-[0.15em] uppercase
                  px-7 py-3.5 rounded-sm
                  transition-all duration-300
                  hover:bg-[#a77b1b]
                  hover:shadow-[0_4px_15px_rgba(201,154,44,0.3)]
                  active:scale-95 cursor-pointer
                "
              >
                {t("cta.checkRooms")}
              </button>

              <a
                href="tel:+84917719966"
                className="
                  inline-flex items-center gap-2.5
                  border border-[#dee2e6] text-[#1e2022] bg-[#f8f9fa]
                  font-sans font-medium text-xs tracking-[0.15em] uppercase
                  px-7 py-3.5 rounded-sm
                  transition-all duration-300
                  hover:border-[#c99a2c] hover:text-[#c99a2c]
                  active:scale-95
                "
              >
                {t("cta.contactDirect")}
              </a>
            </div>
          </div>
        </AnimateInView>

      </div>
    </section>
  );
}
