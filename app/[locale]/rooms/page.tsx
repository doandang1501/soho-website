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
    key:    "studio",
    image:  "/images/type_1.jpg",
    href:   "/studio",
    price:  "950,000 VND",
    beds:   "Studio",
    size:   "35–40 m²",
    guests: "1–2",
    gallery:["/images/studio-1.jpg", "/images/studio-2.jpg", "/images/studio-3.jpg", "/images/studio-4.jpg"],
  },
  {
    key:    "twobed",
    image:  "/images/type_2.jpg",
    href:   "/2-bedroom",
    price:  "1,700,000 VND",
    beds:   "2 Bedrooms",
    size:   "65–80 m²",
    guests: "2–4",
    gallery:["/images/2bed-1.jpg", "/images/2bed-2.jpg", "/images/2bed-3.jpg", "/images/2bed-4.jpg"],
  },
  {
    key:    "threebed",
    image:  "/images/type_3.jpg",
    href:   "/3-bedroom",
    price:  "2,600,000 VND",
    beds:   "3 Bedrooms",
    size:   "95–115 m²",
    guests: "4–6",
    gallery:["/images/img_1.jpg", "/images/img_2.jpg", "/images/img_3.jpg"],
  },
] as const;

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t      = await getTranslations("rooms");


  const localePath = (href: string) =>
    locale === "en" ? href : `/${locale}${href}`;

  return (
    <div className="pt-4 pb-24">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="relative h-56 md:h-72 overflow-hidden mb-16">
        <Image
          src="/images/hero_2.png"
          alt="SOHO Rooms"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(14,14,14,0.5)] to-[rgba(14,14,14,0.9)]" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pb-10">
          <AnimateInView direction="up">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-7 h-px bg-[var(--color-gold)]" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
                Residences
              </span>
            </div>
          </AnimateInView>
          <AnimateInView delay={0.1} direction="up">
            <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] text-[var(--color-ivory)]">
              {t("title")}
            </h1>
          </AnimateInView>
        </div>
      </div>

      {/* ── Room cards ───────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full flex flex-col gap-20">
        {ROOMS.map((room, i) => (
          <AnimateInView key={room.key} delay={i * 0.08} direction="up">
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--color-border)] group">

              {/* Image */}
              <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={room.image}
                  alt={t(`${room.key}.tagline`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,14,0.4)] to-transparent" />

                {/* Thumbnail previews */}
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {room.gallery.slice(1, 4).map((src, j) => (
                    <div key={j} className="relative w-12 h-12 overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
                      <Image src={src} alt="" fill className="object-cover" sizes="48px" />
                    </div>
                  ))}
                  <div className="w-12 h-12 bg-[rgba(14,14,14,0.7)] flex items-center justify-center">
                    <span className="font-sans text-[9px] text-[var(--color-ivory-dim)]">+{room.gallery.length}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-center p-8 lg:p-12 bg-[var(--color-charcoal-50)] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-5 h-px bg-[var(--color-gold)]" />
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)]">
                    {room.beds}
                  </span>
                </div>

                <h2 className="font-serif text-2xl lg:text-3xl text-[var(--color-ivory)] mb-4 group-hover:text-[var(--color-gold-light)] transition-colors duration-300">
                  {t(`${room.key}.tagline`)}
                </h2>

                <p className="font-sans text-sm text-[var(--color-ivory-dim)] leading-relaxed mb-8">
                  {t(`${room.key}.description`)}
                </p>

                {/* Quick specs */}
                <div className="flex gap-6 mb-8">
                  {[
                    { label: "Size",   value: room.size   },
                    { label: "Guests", value: room.guests },
                    { label: "Beds",   value: room.beds   },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="block font-sans text-[10px] tracking-[0.12em] uppercase text-[var(--color-ivory-dim)] mb-0.5">{label}</span>
                      <span className="block font-sans text-sm font-medium text-[var(--color-ivory)]">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-6">
                  <div>
                    <span className="block font-sans text-[10px] uppercase tracking-[0.12em] text-[var(--color-ivory-dim)] mb-0.5">
                      {t("from")}
                    </span>
                    <span className="font-serif text-xl text-[var(--color-gold)]">
                      {t(`${room.key}.price`)}
                      <span className="font-sans text-xs text-[var(--color-ivory-dim)] ml-1">{t("perNight")}</span>
                    </span>
                  </div>

                  <Link
                    href={localePath(room.href)}
                    className="
                      inline-flex items-center gap-2
                      border border-[var(--color-gold)] text-[var(--color-gold)]
                      font-sans font-medium text-xs tracking-[0.15em] uppercase
                      px-6 py-3
                      hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)]
                      transition-all duration-300 group/btn
                    "
                  >
                    {t("viewDetails")}
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>

            </article>
          </AnimateInView>
        ))}
      </div>
    </div>
  );
}
