import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import AnimateInView from "@/components/ui/AnimateInView";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SOHO Residence & Hotel — a luxury boutique apartment-hotel in District 1, Ho Chi Minh City. Modern design, full amenities, and 24/7 hospitality.",
  openGraph: {
    title: "About SOHO Residence & Hotel",
    images: [{ url: "/images/about_2.jpg" }],
  },
};

const VALUES = [
  {
    icon:  "✦",
    title: "Crafted Comfort",
    body:  "Every residence is finished with care — premium linens, quality cookware, smart tech. Nothing superfluous, nothing missing.",
  },
  {
    icon:  "✦",
    title: "Central Location",
    body:  "100 Co Giang, District 1. Steps from Ben Thanh Market, dining, transport, and business hubs. You are exactly where the city is.",
  },
  {
    icon:  "✦",
    title: "Always Available",
    body:  "Check-in 24/7, security 24/7. Whether you arrive at noon or 3 AM, we are ready to welcome you.",
  },
  {
    icon:  "✦",
    title: "Long or Short Stay",
    body:  "Our residences suit solo travellers, couples, families, and remote workers — for one night or many months.",
  },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-4 pb-24">

      {/* ── Hero banner ───────────────────────────────────────────────── */}
      <div className="relative h-60 md:h-80 overflow-hidden mb-0">
        <Image src="/images/about_2.jpg" alt="SOHO Residence interior" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(14,14,14,0.4)] to-[rgba(14,14,14,0.85)]" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pb-12">
          <AnimateInView direction="up">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-7 h-px bg-[var(--color-gold)]" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">Our Story</span>
            </div>
          </AnimateInView>
          <AnimateInView delay={0.1} direction="up">
            <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] text-[var(--color-ivory)]">About SOHO</h1>
          </AnimateInView>
        </div>
      </div>

      {/* ── Introduction ──────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <AnimateInView direction="left">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src="/images/about_3.jpg" alt="SOHO Residence" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[var(--color-gold)]" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[var(--color-gold)]" />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-6 bg-[var(--color-charcoal-50)] border border-[var(--color-border)] p-6 shadow-luxury">
                <span className="block font-serif text-4xl text-[var(--color-gold)]">24/7</span>
                <span className="block font-sans text-xs tracking-[0.15em] uppercase text-[var(--color-ivory-dim)] mt-1">Check-in & Security</span>
              </div>
            </div>
          </AnimateInView>

          <div className="flex flex-col gap-6">
            <AnimateInView direction="right" delay={0.05}>
              <h2 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] text-[var(--color-ivory)]">
                A Modern Oasis in the Heart of Saigon
              </h2>
            </AnimateInView>
            <AnimateInView direction="right" delay={0.12}>
              <p className="font-sans text-sm text-[var(--color-ivory-dim)] leading-relaxed">
                SOHO Residence &amp; Hotel is a luxury boutique apartment-hotel located at
                100 Co Giang, District 1 — one of Ho Chi Minh City's most vibrant and
                well-connected neighbourhoods.
              </p>
            </AnimateInView>
            <AnimateInView direction="right" delay={0.18}>
              <p className="font-sans text-sm text-[var(--color-ivory-dim)] leading-relaxed">
                We designed SOHO as a place where living and working coexist beautifully.
                Each residence offers the full comfort of a luxury apartment — spacious
                layouts, full kitchen, private balcony, smart technology — combined with
                the attentive service of a premium hotel.
              </p>
            </AnimateInView>
            <AnimateInView direction="right" delay={0.24}>
              <p className="font-sans text-sm text-[var(--color-ivory-dim)] leading-relaxed">
                Whether you are a solo traveller, a family, a business executive, or a
                remote worker seeking a productive base in Southeast Asia, SOHO is built
                for you.
              </p>
            </AnimateInView>

            {/* Quick stats */}
            <AnimateInView direction="right" delay={0.3}>
              <div className="grid grid-cols-3 gap-px bg-[var(--color-border)] mt-4">
                {[
                  { n: "3",    label: "Room types" },
                  { n: "12",   label: "Amenities"  },
                  { n: "D.1",  label: "District 1" },
                ].map(({ n, label }) => (
                  <div key={label} className="bg-[var(--color-charcoal-50)] px-5 py-5 text-center">
                    <span className="block font-serif text-3xl text-[var(--color-gold)]">{n}</span>
                    <span className="block font-sans text-[10px] tracking-[0.12em] uppercase text-[var(--color-ivory-dim)] mt-1">{label}</span>
                  </div>
                ))}
              </div>
            </AnimateInView>
          </div>

        </div>
      </div>

      {/* ── Gold divider ──────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-30" />
      </div>

      {/* ── Our values ────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-20">
        <AnimateInView direction="up">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-7 h-px bg-[var(--color-gold)]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">What We Stand For</span>
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-[var(--color-ivory)] mb-14">
            Our Principles
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map(({ icon, title, body }, i) => (
            <AnimateInView key={title} delay={i * 0.1} direction="up">
              <div className="border border-[var(--color-border)] bg-[var(--color-charcoal-50)] p-8 group hover:border-[rgba(201,168,76,0.4)] transition-colors duration-300">
                <span className="block text-[var(--color-gold)] text-lg mb-4">{icon}</span>
                <h3 className="font-serif text-xl text-[var(--color-ivory)] mb-3 group-hover:text-[var(--color-gold-light)] transition-colors duration-300">
                  {title}
                </h3>
                <p className="font-sans text-sm text-[var(--color-ivory-dim)] leading-relaxed">{body}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>

    </div>
  );
}
