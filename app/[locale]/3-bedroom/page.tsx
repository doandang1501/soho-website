import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import RoomDetailHero from "@/components/sections/RoomDetailHero";
import AnimateInView  from "@/components/ui/AnimateInView";

export const metadata: Metadata = {
  title: "3-Bedroom Apartment with City View",
  description:
    "Premium 3-bedroom apartment with panoramic city view balcony at SOHO Residence & Hotel, District 1. From 2,600,000 VND/night. Perfect for families and groups.",
  openGraph: {
    title: "3-Bedroom Apartment | SOHO Residence & Hotel",
    images: [{ url: "/images/img_1.jpg" }],
  },
};

const IMAGES   = ["/images/img_1.jpg","/images/img_2.jpg","/images/img_3.jpg","/images/img_4.jpg"];
const FEATURES = ["3 separate bedrooms","Panoramic city view balcony","Large living & dining room","Full kitchen","Smart TV + Netflix in all rooms","Free Wi-Fi","Air conditioning throughout","Washing machine","Ideal for 4–6 guests"];
const SPECS    = [
  { label: "Room size",   value: "95 – 115 m²" },
  { label: "Guests",      value: "4 – 6"        },
  { label: "Bedrooms",    value: "3"             },
  { label: "Balcony",     value: "Panoramic view"},
  { label: "Living area", value: "Separate"      },
  { label: "Check-in",    value: "24 / 7"       },
];

const INCLUDED = [
  "Free high-speed Wi-Fi throughout the apartment",
  "Smart TV with Netflix — living room + all 3 bedrooms",
  "Fully equipped kitchen (cookware, cutlery, microwave, fridge, oven, dishwasher)",
  "Washing machine + dryer + full set of cleaning supplies",
  "Individual air conditioning — every room",
  "Large panoramic balcony with city skyline view",
  "Smoke alarm & carbon monoxide detector in all rooms",
  "Daily housekeeping available on request",
  "24/7 on-site security",
  "Elevator access",
  "In-house coffee shop on premises",
  "Priority booking for group stays",
];

export default async function ThreeBedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("rooms");

  return (
    <div className="pt-4 pb-24">
      <RoomDetailHero
        tagline={t("threebed.name")}
        name={t("threebed.tagline")}
        description={t("threebed.description")}
        price={t("threebed.price")}
        perNight={t("perNight")}
        images={IMAGES}
        features={FEATURES}
        specs={SPECS}
      />

      {/* ── What's included ────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full mt-20">
        <AnimateInView direction="up">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-7 h-px bg-[var(--color-gold)]" />
            <h2 className="font-serif text-2xl text-[var(--color-ivory)]">What's Included</h2>
          </div>
        </AnimateInView>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INCLUDED.map((item, i) => (
            <AnimateInView key={item} delay={i * 0.05} direction="up">
              <div className="flex items-start gap-3 p-4 border border-[var(--color-border)] bg-[var(--color-charcoal-50)]">
                <span className="text-[var(--color-gold)] mt-0.5 text-sm flex-shrink-0">✦</span>
                <span className="font-sans text-sm text-[var(--color-ivory-dim)]">{item}</span>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </div>
  );
}
