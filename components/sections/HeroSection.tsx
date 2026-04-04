"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const SLIDES = [
  { src: "/images/hero_1.jpeg", alt: "SOHO Residence - Living space" },
  { src: "/images/hero_2.png", alt: "SOHO Residence - Bedroom" },
  { src: "/images/hero_3.jpeg", alt: "SOHO Residence - City view" },
];

const SLIDE_DURATION = 5500;

// Bezier tuple typed explicitly for Framer Motion 12
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Slide transition variants ────────────────────────────────────────────────
const imgVariants: Variants = {
  enter:  { opacity: 0, scale: 1.06 },
  active: { opacity: 1, scale: 1,    transition: { duration: 1.4, ease: EASE } },
  exit:   { opacity: 0, scale: 0.97, transition: { duration: 0.9, ease: EASE } },
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
  const t      = useTranslations("hero");
  const tRooms = useTranslations("rooms");
  const locale = useLocale();

  const [current,  setCurrent]  = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    []
  );

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [next, isPaused]);

  const localePath = (href: string) =>
    locale === "en" ? href : `/${locale}${href}`;

  // Split title on \n for line-by-line animation
  const titleLines = t("title").split("\n");

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
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
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays ────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(14,14,14,0.45)] via-[rgba(14,14,14,0.3)] to-[rgba(14,14,14,0.85)]" />
      {/* Left vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(14,14,14,0.5)] via-transparent to-transparent" />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">

        {/* Eyebrow */}
        <motion.div
          custom={0.2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-5"
        >
          <span className="block w-8 h-px bg-[var(--color-gold)]" />
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
            {t("eyebrow")}
          </span>
        </motion.div>

        {/* Title */}
        <div className="mb-6 overflow-hidden">
          {titleLines.map((line, i) => (
            <motion.h1
              key={i}
              custom={0.35 + i * 0.12}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[1.02] text-[var(--color-ivory)] block"
            >
              {i === 1 ? (
                <span className="text-gold-gradient">{line}</span>
              ) : (
                line
              )}
            </motion.h1>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          custom={0.6}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-sans text-sm md:text-base text-[var(--color-ivory-muted)] max-w-lg leading-relaxed mb-10"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.75}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 items-center"
        >
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

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="
              inline-flex items-center gap-3
              border border-[rgba(245,240,232,0.35)] text-[var(--color-ivory)]
              font-sans font-medium text-xs tracking-[0.18em] uppercase
              px-8 py-4
              transition-all duration-300
              hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
              active:scale-95
            "
          >
            Contact Us
          </a>
        </motion.div>

        {/* ── Slide indicators ─────────────────────────────────────────────── */}
        <motion.div
          custom={0.9}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 mt-12"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="group relative h-px overflow-hidden"
              style={{ width: i === current ? "2.5rem" : "1rem" }}
            >
              <span
                className={`
                  block h-full transition-all duration-500
                  ${i === current
                    ? "bg-[var(--color-gold)] w-full"
                    : "bg-[rgba(245,240,232,0.3)] w-full group-hover:bg-[rgba(245,240,232,0.6)]"
                  }
                `}
              />
              {/* Progress bar on active slide */}
              {i === current && !isPaused && (
                <motion.span
                  className="absolute inset-0 bg-[rgba(245,240,232,0.3)] origin-left"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}

          {/* Scroll cue */}
          <div className="ml-auto flex items-center gap-2 text-[var(--color-ivory-dim)]">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase">
              {t("scroll")}
            </span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[var(--color-gold)]"
            >
              ↓
            </motion.span>
          </div>
        </motion.div>

      </div>

      {/* ── Room type quick stats ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="
          absolute bottom-0 right-0
          hidden lg:flex flex-col
          bg-[rgba(14,14,14,0.82)] backdrop-blur-sm
          border-l border-t border-[var(--color-border)]
        "
      >
        {[
          { label: tRooms("studio.name"),  price: "from 950K VND" },
          { label: tRooms("twobed.name"),  price: "from 1.7M VND" },
          { label: tRooms("threebed.name"),price: "from 2.6M VND" },
        ].map(({ label, price }, i) => (
          <a
            key={label}
            href="#rooms"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`
              flex items-center justify-between gap-12 px-6 py-3.5
              font-sans text-xs
              hover:bg-[rgba(201,168,76,0.08)] hover:text-[var(--color-gold)]
              transition-colors duration-200 group
              ${i < 2 ? "border-b border-[var(--color-border)]" : ""}
            `}
          >
            <span className="text-[var(--color-ivory-muted)] tracking-[0.1em] group-hover:text-[var(--color-gold)] transition-colors">
              {label}
            </span>
            <span className="text-[var(--color-gold)] font-medium">{price}</span>
          </a>
        ))}
      </motion.div>

    </section>
  );
}
