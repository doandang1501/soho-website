import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import RoomDetailHero from "@/components/sections/RoomDetailHero";
import AnimateInView  from "@/components/ui/AnimateInView";

export const metadata: Metadata = {
  title: "2-Bedroom Apartment with City View",
  description:
    "Spacious 2-bedroom apartment with panoramic city view balcony at SOHO Residence & Hotel, District 1. From 1,700,000 VND/night. Ideal for families and business travellers.",
  openGraph: {
    title: "2-Bedroom Apartment | SOHO Residence & Hotel",
    images: [{ url: "/images/2bed-1.jpg" }],
  },
};

const IMAGES   = ["/images/2bed-1.jpg","/images/2bed-2.jpg","/images/2bed-3.jpg","/images/2bed-4.jpg"];
const FEATURES = ["2 separate bedrooms","City view balcony","Spacious living room","Full kitchen","Smart TV + Netflix","Free Wi-Fi","Air conditioning in all rooms","Washing machine"];
const SPECS    = [
  { label: "Room size",  value: "65 – 80 m²"     },
  { label: "Guests",     value: "2 – 4"            },
  { label: "Bedrooms",   value: "2"                },
  { label: "Balcony",    value: "City view"        },
  { label: "Living area",value: "Separate"         },
  { label: "Check-in",   value: "24 / 7"          },
];

const INCLUDED = [
  "Free high-speed Wi-Fi throughout the apartment",
  "Smart TV with Netflix in living room and bedrooms",
  "Fully equipped kitchen (cookware, cutlery, microwave, fridge, oven)",
  "Washing machine + dryer + cleaning supplies",
  "Individual air conditioning — each room",
  "Panoramic city view from private balcony",
  "Smoke alarm & carbon monoxide detector",
  "Daily housekeeping available on request",
  "24/7 on-site security",
  "Elevator access",
  "In-house coffee shop on premises",
];

export default async function TwoBedPage({
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
        tagline={t("twobed.name")}
        name={t("twobed.tagline")}
        description={t("twobed.description")}
        price={t("twobed.price")}
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
