"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const SLIDES = [
  { src: "/images/hero_1.jpg", alt: "SOHO Residence & Hotel - Không gian lưu trú tiện nghi giữa trung tâm Sài Gòn" },
  { src: "/images/hero_2.jpg", alt: "SOHO Residence & Hotel - Căn hộ phòng ngủ tiện nghi" },
  { src: "/images/hero_3.jpg", alt: "SOHO Residence & Hotel - Khách sạn căn hộ Quận 1" },
];

const SLIDE_DURATION = 5500;

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const imgVariants: Variants = {
  enter: { opacity: 0, scale: 1.06 },
  active: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.9, ease: EASE } },
};

const textVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: d, ease: EASE },
  }),
};

export default function HeroSection() {
  const t = useTranslations("hero");

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [next, isPaused]);

  const titleLines = t("title").split("\n");

  return (
    <section
      id="home"
      className="relative w-full min-h-[640px] lg:h-screen lg:min-h-[700px] overflow-hidden pt-28 pb-16 lg:pt-0 lg:pb-0 flex items-end"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero section"
    >
      {/* ── Background Slideshow ─────────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          variants={imgVariants}
          initial="enter"
          animate="active"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            priority={current === 0}
            fetchPriority={current === 0 ? "high" : "auto"}
            className="object-cover object-center"
            sizes="100vw"
            quality={current === 0 ? 90 : 75}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays ────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(22,23,27,0.38)] via-[rgba(22,23,27,0.18)] to-[rgba(22,23,27,0.78)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(22,23,27,0.4)] via-transparent to-transparent" />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full pb-8 sm:pb-12 md:pb-16 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          custom={0.2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-4"
        >
          <span className="block w-8 h-px bg-[var(--color-gold)]" />
          <span className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium">
            {t("eyebrow")}
          </span>
        </motion.div>

        {/* H1 Title */}
        <div className="mb-5 overflow-hidden">
          <motion.h1
            custom={0.35}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-serif text-[clamp(2rem,5.5vw,4.8rem)] leading-[1.1] text-[var(--color-ivory)] block"
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-gold-gradient">{line}</span> : line}
                {i < titleLines.length - 1 ? " " : ""}
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          custom={0.5}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-sans text-sm sm:text-base text-[var(--color-ivory-dim)] max-w-2xl leading-relaxed mb-8"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.65}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 sm:gap-4 items-center"
        >
          {/* Button 1: Khám phá căn hộ */}
          <a
            href="#rooms"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="
              inline-flex items-center gap-3
              bg-[var(--color-gold)] text-[var(--color-charcoal)]
              font-sans font-semibold text-xs tracking-[0.18em] uppercase
              px-8 py-4
              transition-all duration-300
              hover:bg-[var(--color-gold-light)] hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]
              active:scale-95
              group
            "
          >
            {t("cta")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          {/* Button 2: Kiểm tra phòng trống */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-booking-modal"));
            }}
            className="
              inline-flex items-center gap-3
              border border-[rgba(245,240,232,0.45)] text-[var(--color-ivory)]
              font-sans font-medium text-xs tracking-[0.18em] uppercase
              px-8 py-4
              transition-all duration-300
              hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
              active:scale-95 cursor-pointer
            "
          >
            {t("checkAvailability")}
          </button>
        </motion.div>

        {/* ── Slide indicators ─────────────────────────────────────────────── */}
        <motion.div
          custom={0.8}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 mt-10"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-0.5 transition-all duration-500 ${i === current ? "w-8 bg-[var(--color-gold)]" : "w-3 bg-[rgba(245,240,232,0.3)] hover:bg-[rgba(245,240,232,0.6)]"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
