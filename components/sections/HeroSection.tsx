"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const SLIDES = [
  { src: "/images/hero_1.webp", alt: "SOHO Residence & Hotel - Không gian lưu trú tiện nghi giữa trung tâm Sài Gòn" },
  { src: "/images/hero_2.webp", alt: "SOHO Residence & Hotel - Căn hộ phòng ngủ tiện nghi" },
  { src: "/images/hero_3.webp", alt: "SOHO Residence & Hotel - Khách sạn căn hộ Quận 1" },
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
  const [hasMounted, setHasMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
      {/* LCP Static Base Image (Instant First Paint, No JS Render Delay) */}
      <div className="absolute inset-0">
        <Image
          src={SLIDES[0].src}
          alt={SLIDES[0].alt}
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
        />
      </div>

      {/* Animated transitions only when moving between slides after hydration */}
      {hasMounted && current > 0 && (
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
              className="object-cover object-center"
              sizes="100vw"
              quality={75}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── Gradient overlays: Standard Hero Dark Overlay across whole viewport ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-[1]" />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full pb-10 sm:pb-14 md:pb-20 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          custom={0.2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-4"
        >
          <span className="block w-8 h-px bg-[#f1c964]" />
          <span className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f1c964] font-bold">
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
            className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.12] !text-white block font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block !text-white">
                {i === 1 ? <span className="!text-[#f5d061] font-medium">{line}</span> : line}
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
          className="font-sans text-sm sm:text-base md:text-lg !text-white/95 max-w-2xl leading-relaxed mb-8 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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
              bg-[#c99a2c] !text-white font-sans font-bold text-xs tracking-[0.18em] uppercase
              px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.35)]
              transition-all duration-300
              hover:bg-[#a77b1b] hover:shadow-[0_4px_25px_rgba(201,154,44,0.5)]
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
              border border-white/70 !text-white bg-white/10 backdrop-blur-sm
              font-sans font-semibold text-xs tracking-[0.18em] uppercase
              px-8 py-4 rounded-xl
              transition-all duration-300
              hover:bg-white hover:!text-[#1e2022] hover:border-white hover:shadow-xl
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
          className="flex items-center gap-1 mt-10 -ml-2"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="p-2.5 flex items-center justify-center cursor-pointer group"
              aria-label={`Go to slide ${i + 1}`}
            >
            <span
              className={`block h-1 transition-all duration-500 rounded-full ${i === current
                  ? "w-8 bg-[var(--color-gold)]"
                  : "w-4 bg-[rgba(245,240,232,0.35)] group-hover:bg-[rgba(245,240,232,0.7)]"
                }`}
            />
            </button>
          ))}
      </motion.div>

    </div>
    </section >
  );
}
