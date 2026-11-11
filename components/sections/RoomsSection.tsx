"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimateInView from "@/components/ui/AnimateInView";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const ROOMS = [
  {
    key:     "studio",
    image:   "/images/type_1.jpg",
    gallery: ["/images/studio-1.jpg", "/images/studio-2.jpg", "/images/studio-3.jpg"],
    detailHref: "/studio",
  },
  {
    key:     "twobed",
    image:   "/images/type_2.jpg",
    gallery: ["/images/2bed-1.jpg", "/images/2bed-2.webp", "/images/2bed-3.webp"],
    detailHref: "/2-bedroom",
  },
  {
    key:     "threebed",
    image:   "/images/type_3.jpg",
    gallery: ["/images/img_1.jpg", "/images/img_2.jpg", "/images/img_3.jpg"],
    detailHref: "/3-bedroom",
  },
] as const;

// ── Room card ─────────────────────────────────────────────────────────────────
function RoomCard({
  room,
  index,
}: {
  room: (typeof ROOMS)[number];
  index: number;
}) {
  const t      = useTranslations("rooms");
  const locale = useLocale();
  const [hovered, setHovered] = useState(false);
  const [imgIdx,  setImgIdx]  = useState(0);

  const localePath = locale === "en"
    ? room.detailHref
    : `/${locale}${room.detailHref}`;

  const handleMouseEnter = () => {
    setHovered(true);
    let i = 1;
    const id = setInterval(() => {
      setImgIdx((c) => {
        const next = (c + 1) % room.gallery.length;
        i++;
        if (i >= room.gallery.length) clearInterval(id);
        return next;
      });
    }, 700);
    return () => clearInterval(id);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setImgIdx(0);
  };

  const features = (["feat0", "feat1", "feat2", "feat3"] as const).map(
    (k) => t(`${room.key}.${k}`)
  );

  return (
    <AnimateInView delay={index * 0.13} direction="up">
      <Link
        href={localePath}
        className="block group relative overflow-hidden bg-white rounded-xl border border-[#e9ecef] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:border-[var(--color-gold)] transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={t(`${room.key}.tagline`)}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={room.image}
            alt={t(`${room.key}.tagline`)}
            fill
            className={`object-cover transition-all duration-700 ${hovered ? "scale-105 opacity-0" : "scale-100 opacity-100"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            src={room.gallery[imgIdx]}
            alt={`${t(`${room.key}.tagline`)} gallery`}
            fill
            className={`object-cover transition-all duration-700 ${hovered ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Price badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-white/40">
            <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-[#6c757d]">{t("from")}</span>
            <span className="ml-1.5 font-sans text-xs font-bold text-[#c99a2c]">{t(`${room.key}.price`)}</span>
            <span className="font-sans text-[10px] text-[#6c757d]">{" "}{t("perNight")}</span>
          </div>

          {/* Direct booking perk badge (Bear House style) */}
          <div className="absolute top-4 left-4 bg-[#c99a2c] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
            Tiết kiệm 15%
          </div>

          {/* Gallery dots */}
          {hovered && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {room.gallery.map((_, i) => (
                <span key={i} className={`block rounded-full transition-all duration-300 ${i === imgIdx ? "w-4 h-1 bg-[var(--color-gold)]" : "w-1 h-1 bg-white/70"}`} />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="block w-4 h-px bg-[var(--color-gold)]" />
            <span className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-[#c99a2c]">
              {t(`${room.key}.name`)}
            </span>
          </div>

          {/* H3 Heading */}
          <h3 className="font-serif text-xl md:text-2xl text-[#1e2022] mb-3 leading-snug group-hover:text-[#c99a2c] transition-colors duration-300">
            {t(`${room.key}.tagline`)}
          </h3>

          <p className="font-sans text-sm text-[#495057] leading-relaxed mb-5 line-clamp-2">
            {t(`${room.key}.description`)}
          </p>

          {/* Feature pills */}
          <ul className="flex flex-wrap gap-2 mb-6">
            {features.map((f) => (
              <li key={f} className="font-sans text-[11px] font-medium tracking-[0.04em] bg-[#f8f9fa] border border-[#e9ecef] rounded-md px-2.5 py-1 text-[#495057]">
                {f}
              </li>
            ))}
          </ul>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-[#f1f3f5]">
            <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-[0.12em] uppercase text-[#c99a2c] group-hover:text-[#a77b1b] transition-all duration-200">
              {t("viewDetails")}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ✓ Đặt trực tiếp
            </span>
          </div>
        </div>

        {/* Top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </AnimateInView>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function RoomsSection() {
  const t = useTranslations("rooms");

  return (
    <section
      id="rooms"
      className="py-16 sm:py-20 lg:py-28 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
      aria-labelledby="rooms-heading"
    >
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
          <h2 id="rooms-heading" className="font-serif text-[clamp(1.8rem,3.8vw,3.2rem)] text-[var(--color-ivory)] mb-4">
            {t("title")}
          </h2>
        </AnimateInView>

        <AnimateInView delay={0.2} direction="up">
          <p className="font-sans text-sm sm:text-base text-[var(--color-ivory-dim)] max-w-2xl leading-relaxed mb-4">
            {t("subtitle")}
          </p>
          <p className="font-sans text-xs text-[var(--color-ivory-dim)] italic">
            * {t("imageDisclaimer")}
          </p>
        </AnimateInView>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
        {ROOMS.map((room, i) => (
          <RoomCard key={room.key} room={room} index={i} />
        ))}
      </div>
    </section>
  );
}
