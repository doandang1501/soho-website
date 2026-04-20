import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import RoomDetailHero from "@/components/sections/RoomDetailHero";
import AnimateInView  from "@/components/ui/AnimateInView";

export const metadata: Metadata = {
  title: "Studio Apartment with Balcony",
  description:
    "Modern open-plan studio with private balcony at SOHO Residence & Hotel, District 1. From 950,000 VND/night. Free Wi-Fi, Smart TV, full kitchen included.",
  openGraph: {
    title: "Studio Apartment | SOHO Residence & Hotel",
    images: [{ url: "/images/studio-1.jpg" }],
  },
};

const IMAGES   = ["/images/studio-1.jpg","/images/studio-2.jpg","/images/studio-3.jpg","/images/studio-4.jpg","/images/studio-5.jpg"];
const FEATURES = ["Private balcony","Open-plan layout","Full kitchen","Smart TV + Netflix","Free Wi-Fi","Air conditioning","Washing machine","Smoke & CO alarm"];
const SPECS    = [
  { label: "Room size",  value: "35 – 40 m²" },
  { label: "Guests",     value: "1 – 2"       },
  { label: "Bed",        value: "Queen bed"   },
  { label: "Balcony",    value: "Private"     },
  { label: "View",       value: "City / street" },
  { label: "Check-in",   value: "24 / 7"     },
];

const INCLUDED = [
  "Free high-speed Wi-Fi",
  "Smart TV with Netflix subscription",
  "Fully equipped kitchen (cookware, cutlery, microwave, fridge)",
  "Washing machine + cleaning supplies",
  "Air conditioning — individual control",
  "Smoke alarm & carbon monoxide detector",
  "Daily housekeeping available on request",
  "24/7 on-site security",
  "Elevator access",
  "In-house coffee shop",
];

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rooms" });

  return (
    <div className="pt-4 pb-24">
      <RoomDetailHero
        tagline={t("studio.name")}
        name={t("studio.tagline")}
        description={t("studio.description")}
        price={t("studio.price")}
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
