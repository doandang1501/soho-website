"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import AnimateInView from "@/components/ui/AnimateInView";

const FAQ_ITEMS = [
  { key: "family" },
  { key: "laundry" },
  { key: "location" },
  { key: "checkin" },
] as const;

export default function FAQSection() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 lg:py-28 px-5 sm:px-8 md:px-12 lg:px-20 max-w-5xl mx-auto w-full"
      aria-labelledby="faq-heading"
    >
      <div className="mb-12 text-center">
        <AnimateInView direction="up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-px bg-[var(--color-gold)]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium">
              {t("eyebrow")}
            </span>
            <span className="block w-8 h-px bg-[var(--color-gold)]" />
          </div>
        </AnimateInView>

        <AnimateInView delay={0.1} direction="up">
          <h2
            id="faq-heading"
            className="font-serif text-[clamp(1.8rem,3.8vw,3.2rem)] text-[var(--color-ivory)] mb-3"
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

      <div className="space-y-4">
        {FAQ_ITEMS.map(({ key }, i) => {
          const isOpen = openIndex === i;
          return (
            <AnimateInView key={key} delay={i * 0.06} direction="up">
              <div className="rounded-xl border border-[#e9ecef] bg-white transition-all duration-200 hover:border-[#c99a2c] shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-[#1e2022] font-medium pr-2">
                    {t(`items.${key}.question`)}
                  </span>
                  <span
                    className={`text-[#c99a2c] font-mono text-xl transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#495057] leading-relaxed border-t border-[#f1f3f5]">
                        {t(`items.${key}.answer`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimateInView>
          );
        })}
      </div>
    </section>
  );
}

