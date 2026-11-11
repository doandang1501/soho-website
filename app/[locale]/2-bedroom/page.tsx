import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import RoomDetailHero from "@/components/sections/RoomDetailHero";
import AnimateInView  from "@/components/ui/AnimateInView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "vi") {
    return {
      title: "Căn Hộ 2 Phòng Ngủ Quận 1 | SOHO Residence",
      description:
        "Căn hộ 2 phòng ngủ 55 m² tại Quận 1, có phòng khách, bếp, ban công và máy giặt riêng. Phù hợp cho gia đình, nhóm bạn.",
      alternates: {
        canonical: "https://sohoresidencehotel.vn/vi/2-bedroom",
        languages: {
          vi: "https://sohoresidencehotel.vn/vi/2-bedroom",
          en: "https://sohoresidencehotel.vn/2-bedroom",
          "zh-CN": "https://sohoresidencehotel.vn/zh/2-bedroom",
        },
      },
      openGraph: {
        title: "Căn Hộ 2 Phòng Ngủ Quận 1 | SOHO Residence",
        description:
          "Căn hộ 2 phòng ngủ 55 m² tại Quận 1, có phòng khách, bếp, ban công và máy giặt riêng. Phù hợp cho gia đình, nhóm bạn.",
        images: [{ url: "/images/2bed-1.jpg" }],
      },
    };
  }

  if (locale === "zh") {
    return {
      title: "第一郡两居室公寓 | SOHO Residence",
      description:
        "胡志明市第一郡 55 m² 两居室公寓。设有独立客厅、厨房、独立阳台及专属洗衣机。非常适合家庭或朋友出游。",
      alternates: {
        canonical: "https://sohoresidencehotel.vn/zh/2-bedroom",
        languages: {
          vi: "https://sohoresidencehotel.vn/vi/2-bedroom",
          en: "https://sohoresidencehotel.vn/2-bedroom",
          "zh-CN": "https://sohoresidencehotel.vn/zh/2-bedroom",
        },
      },
      openGraph: {
        title: "第一郡两居室公寓 | SOHO Residence",
        images: [{ url: "/images/2bed-1.jpg" }],
      },
    };
  }

  return {
    title: "2-Bedroom Apartment District 1 | SOHO Residence",
    description:
      "55 m² 2-Bedroom apartment in District 1, HCMC. Features living room, kitchen, balcony, and private washer. Perfect for families or friends.",
    alternates: {
      canonical: "https://sohoresidencehotel.vn/2-bedroom",
      languages: {
        vi: "https://sohoresidencehotel.vn/vi/2-bedroom",
        en: "https://sohoresidencehotel.vn/2-bedroom",
        "zh-CN": "https://sohoresidencehotel.vn/zh/2-bedroom",
      },
    },
    openGraph: {
      title: "2-Bedroom Apartment | SOHO Residence & Hotel",
      images: [{ url: "/images/2bed-1.jpg" }],
    },
  };
}

const IMAGES = [
  "/images/2bed-1.jpg",
  "/images/2bed-2.webp",
  "/images/2bed-3.webp",
  "/images/2bed-4.jpg",
];

export default async function TwoBedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rooms" });
  const tAmenities = await getTranslations({ locale, namespace: "amenities" });

  const specs = [
    { label: t("specSize"), value: t("twobed.size") },
    { label: t("specGuests"), value: t("twobed.guests") },
    { label: t("specBeds"), value: t("twobed.beds") },
  ];

  const features = [
    t("twobed.feat0"),
    t("twobed.feat1"),
    t("twobed.feat2"),
    t("twobed.feat3"),
  ];

  const included = [
    tAmenities("items.wifi.label") + " – " + tAmenities("items.wifi.desc"),
    tAmenities("items.tv.label") + " – " + tAmenities("items.tv.desc"),
    tAmenities("items.kitchen.label") + " – " + tAmenities("items.kitchen.desc"),
    tAmenities("items.laundry.label") + " – " + tAmenities("items.laundry.desc"),
    tAmenities("items.ac.label") + " – " + tAmenities("items.ac.desc"),
    tAmenities("items.alarms.label") + " – " + tAmenities("items.alarms.desc"),
    tAmenities("items.security.label") + " – " + tAmenities("items.security.desc"),
    tAmenities("items.elevator.label") + " – " + tAmenities("items.elevator.desc"),
    tAmenities("items.luggage.label") + " – " + tAmenities("items.luggage.desc"),
  ];

  return (
    <div className="pt-4 pb-24">
      <RoomDetailHero
        tagline={t("twobed.name")}
        name={t("twobed.tagline")}
        description={t("twobed.description")}
        price={t("twobed.price")}
        perNight={t("perNight")}
        images={IMAGES}
        features={features}
        specs={specs}
        roomKey="twobed"
      />

      {/* ── What's included ────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full mt-16">
        <AnimateInView direction="up">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-7 h-px bg-[var(--color-gold)]" />
            <h2 className="font-serif text-2xl text-[#1e2022]">
              {t("whatsIncluded")}
            </h2>
          </div>
        </AnimateInView>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {included.map((item, i) => (
            <AnimateInView key={i} delay={i * 0.04} direction="up">
              <div className="flex items-start gap-3 p-4 border border-[#e9ecef] bg-[#f8f9fa]">
                <span className="text-[var(--color-gold)] mt-0.5 text-sm flex-shrink-0">✦</span>
                <span className="font-sans text-sm text-[#6c757d]">{item}</span>
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Dryer Notice */}
        <p className="font-sans text-xs text-[#6c757d] italic border-l-2 border-[var(--color-gold)] pl-3">
          {tAmenities("dryerNotice")}
        </p>
      </div>
    </div>
  );
}
