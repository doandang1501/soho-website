import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimateInView from "@/components/ui/AnimateInView";

export const metadata: Metadata = {
  title: "Rooms & Residences",
  description:
    "Choose from Studio, 2-Bedroom, or 3-Bedroom apartments at SOHO Residence & Hotel, District 1, Ho Chi Minh City. All with private balcony, full kitchen, and city views.",
  openGraph: {
    title: "Rooms & Residences | SOHO Residence & Hotel",
    images: [{ url: "/images/type_1.jpg" }],
  },
};

const ROOMS = [
  {
    key:     "studio",
    image:   "/images/type_1.jpg",
    href:    "/studio",
    gallery: ["/images/studio-1.jpg", "/images/studio-2.jpg", "/images/studio-3.jpg", "/images/studio-4.jpg"],
  },
  {
    key:     "twobed",
    image:   "/images/type_2.jpg",
    href:    "/2-bedroom",
    gallery: ["/images/2bed-1.jpg", "/images/2bed-2.jpg", "/images/2bed-3.jpg", "/images/2bed-4.jpg"],
  },
  {
    key:     "threebed",
    image:   "/images/type_3.jpg",
    href:    "/3-bedroom",
    gallery: ["/images/img_1.jpg", "/images/img_2.jpg", "/images/img_3.jpg"],
  },
] as const;

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rooms" });

  const localePath = (href: string) =>
    locale === "en" ? href : `/${locale}${href}`;

  return (
    <div className="pt-4 pb-24">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="relative h-48 sm:h-56 md:h-72 overflow-hidden mb-10 md:mb-16">
        <Image
          src="/images/hero_2.png"
          alt="SOHO Rooms"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(14,14,14,0.5)] to-[rgba(14,14,14,0.9)]" />
        <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pb-8 md:pb-10">
          <AnimateInView direction="up">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="block w-7 h-px bg-[var(--color-gold)]" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
                {t("eyebrow")}
              </span>
            </div>
          </AnimateInView>
          <AnimateInView delay={0.1} direction="up">
            <h1 className="font-serif text-[clamp(1.8rem,5vw,4rem)] text-[var(--color-ivory)]">
              {t("title")}
            </h1>
          </AnimateInView>
        </div>
      </div>

      {/* ── Room cards ──────────────────────────────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full flex flex-col gap-10 md:gap-20">
        {ROOMS.map((room, i) => (
          <AnimateInView key={room.key} delay={i * 0.08} direction="up">

            {/* Entire card links to room detail */}
            <Link
              href={localePath(room.href)}
              className="block group border border-[var(--color-border)] hover:border-[rgba(201,168,76,0.4)] transition-colors duration-300"
              aria-label={t(`${room.key}.tagline`)}
            >
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                {/* Image side */}
                <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={room.image}
                    alt={t(`${room.key}.tagline`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,14,0.4)] to-transparent" />

                  {/* Thumbnail strip */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {room.gallery.slice(1, 4).map((src, j) => (
                      <div key={j} className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden opacity-70 group-hover:opacity-90 transition-opacity">
                        <Image src={src} alt="" fill className="object-cover" sizes="48px" />
                      </div>
                    ))}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgba(14,14,14,0.7)] flex items-center justify-center">
                      <span className="font-sans text-[9px] text-[var(--color-ivory-dim)]">+{room.gallery.length}</span>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-12 bg-[var(--color-charcoal-50)] ${i % 2 === 1 ? "lg:order-1" : ""}`}>

                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <span className="block w-5 h-px bg-[var(--color-gold)]" />
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)]">
                      {t(`${room.key}.name`)}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[var(--color-ivory)] mb-3 md:mb-4 group-hover:text-[var(--color-gold-light)] transition-colors duration-300">
                    {t(`${room.key}.tagline`)}
                  </h2>

                  <p className="font-sans text-sm text-[var(--color-ivory-dim)] leading-relaxed mb-5 md:mb-8">
                    {t(`${room.key}.description`)}
                  </p>

                  {/* Specs row — translated labels & values */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 mb-5 md:mb-8">
                    {[
                      { label: t("specSize"),   value: t(`${room.key}.size`)   },
                      { label: t("specGuests"), value: t(`${room.key}.guests`) },
                      { label: t("specBeds"),   value: t(`${room.key}.beds`)   },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <span className="block font-sans text-[10px] tracking-[0.12em] uppercase text-[var(--color-ivory-dim)] mb-0.5">{label}</span>
                        <span className="block font-sans text-sm font-medium text-[var(--color-ivory)]">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-[var(--color-border)] pt-5 md:pt-6">
                    <div>
                      <span className="block font-sans text-[10px] uppercase tracking-[0.12em] text-[var(--color-ivory-dim)] mb-0.5">
                        {t("from")}
                      </span>
                      <span className="font-serif text-lg sm:text-xl text-[var(--color-gold)]">
                        {t(`${room.key}.price`)}
                        <span className="font-sans text-xs text-[var(--color-ivory-dim)] ml-1">{t("perNight")}</span>
                      </span>
                    </div>

                    {/* VIEW DETAILS button — styled via parent group-hover */}
                    <span className="
                      inline-flex items-center gap-2 self-start sm:self-auto
                      border border-[var(--color-gold)] text-[var(--color-gold)]
                      font-sans font-medium text-xs tracking-[0.15em] uppercase
                      px-5 sm:px-6 py-3
                      group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-charcoal)]
                      transition-all duration-300
                    ">
                      {t("viewDetails")}
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>

                </div>
              </article>
            </Link>

          </AnimateInView>
        ))}
      </div>
    </div>
  );
}
