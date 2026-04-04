"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import AnimateInView from "@/components/ui/AnimateInView";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface RoomDetailHeroProps {
  tagline:     string;
  name:        string;
  description: string;
  price:       string;
  perNight:    string;
  images:      string[];
  features:    string[];
  specs: { label: string; value: string }[];
}

export default function RoomDetailHero({
  tagline,
  name,
  description,
  price,
  perNight,
  images,
  features,
  specs,
}: RoomDetailHeroProps) {
  const locale  = useLocale();
  const [active, setActive] = useState(0);

  const localePath = (href: string) =>
    locale === "en" ? href : `/${locale}${href}`;

  return (
    <div>
      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pt-10 pb-4">
        <nav className="flex items-center gap-2 font-sans text-xs text-[var(--color-ivory-dim)]" aria-label="Breadcrumb">
          <Link href={localePath("/")} className="hover:text-[var(--color-gold)] transition-colors duration-200">Home</Link>
          <span className="opacity-40">/</span>
          <Link href={localePath("/rooms")} className="hover:text-[var(--color-gold)] transition-colors duration-200">Rooms</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-gold)]">{name}</span>
        </nav>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — Gallery */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-charcoal-50)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } }}
                  exit={{   opacity: 0, scale: 0.97, transition: { duration: 0.3,  ease: EASE } }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[active]}
                    alt={`${name} — photo ${active + 1}`}
                    fill
                    priority={active === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={88}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gold corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-gold)] z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-gold)] z-10 pointer-events-none" />
            </div>

            {/* Thumbnail strip */}
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`
                    relative aspect-[4/3] overflow-hidden transition-all duration-300
                    ${i === active ? "ring-1 ring-[var(--color-gold)]" : "opacity-60 hover:opacity-85"}
                  `}
                  aria-label={`View photo ${i + 1}`}
                >
                  <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="15vw" />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col">
            <AnimateInView direction="right" delay={0.05}>
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-6 h-px bg-[var(--color-gold)]" />
                <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-[var(--color-gold)]">
                  {tagline}
                </span>
              </div>
            </AnimateInView>

            <AnimateInView direction="right" delay={0.1}>
              <h1 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-[var(--color-ivory)] mb-5 leading-tight">
                {name}
              </h1>
            </AnimateInView>

            <AnimateInView direction="right" delay={0.15}>
              <p className="font-sans text-sm text-[var(--color-ivory-dim)] leading-relaxed mb-8">
                {description}
              </p>
            </AnimateInView>

            {/* Specs grid */}
            <AnimateInView direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-px bg-[var(--color-border)] mb-8">
                {specs.map(({ label, value }) => (
                  <div key={label} className="bg-[var(--color-charcoal-50)] px-4 py-4">
                    <span className="block font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-ivory-dim)] mb-1">
                      {label}
                    </span>
                    <span className="block font-sans text-sm font-medium text-[var(--color-ivory)]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </AnimateInView>

            {/* Features */}
            <AnimateInView direction="right" delay={0.25}>
              <ul className="flex flex-wrap gap-2 mb-10">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-1.5 font-sans text-xs text-[var(--color-ivory-dim)] border border-[var(--color-border)] px-3 py-1.5"
                  >
                    <span className="text-[var(--color-gold)] text-[10px]">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
            </AnimateInView>

            {/* Price + CTA */}
            <AnimateInView direction="right" delay={0.3}>
              <div className="border-t border-[var(--color-border)] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="block font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-ivory-dim)] mb-1">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl text-[var(--color-gold)]">{price}</span>
                    <span className="font-sans text-xs text-[var(--color-ivory-dim)]">{perNight}</span>
                  </div>
                </div>

                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = localePath("/") + "#contact";
                  }}
                  className="
                    inline-flex items-center gap-3
                    bg-[var(--color-gold)] text-[var(--color-charcoal)]
                    font-sans font-semibold text-xs tracking-[0.18em] uppercase
                    px-8 py-4 transition-all duration-300
                    hover:bg-[var(--color-gold-light)]
                    hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]
                    active:scale-95 group
                  "
                >
                  Book This Room
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </AnimateInView>
          </div>

        </div>
      </div>
    </div>
  );
}
