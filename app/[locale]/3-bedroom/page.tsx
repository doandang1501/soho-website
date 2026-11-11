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
      title: "Căn Hộ 3 Phòng Ngủ Quận 1 | SOHO Residence",
      description:
        "Căn hộ 3 phòng ngủ 95 m² tại Quận 1, gồm 2 phòng tắm, phòng khách, bếp và máy giặt riêng. Xem phòng tại SOHO.",
      alternates: {
        canonical: "https://sohoresidencehotel.vn/vi/3-bedroom",
        languages: {
          vi: "https://sohoresidencehotel.vn/vi/3-bedroom",
          en: "https://sohoresidencehotel.vn/3-bedroom",
          "zh-CN": "https://sohoresidencehotel.vn/zh/3-bedroom",
        },
      },
      openGraph: {
        title: "Căn Hộ 3 Phòng Ngủ Quận 1 | SOHO Residence",
        description:
          "Căn hộ 3 phòng ngủ 95 m² tại Quận 1, gồm 2 phòng tắm, phòng khách, bếp và máy giặt riêng. Xem phòng tại SOHO.",
        images: [{ url: "/images/img_1.jpg" }],
      },
    };
  }

  if (locale === "zh") {
    return {
      title: "第一郡三居室公寓 | SOHO Residence",
      description:
        "胡志明市第一郡 95 m² 三居室公寓。设有2间浴室、宽敞客厅、厨房及专属洗衣机。欢迎查看 SOHO 客房。",
      alternates: {
        canonical: "https://sohoresidencehotel.vn/zh/3-bedroom",
        languages: {
          vi: "https://sohoresidencehotel.vn/vi/3-bedroom",
          en: "https://sohoresidencehotel.vn/3-bedroom",
          "zh-CN": "https://sohoresidencehotel.vn/zh/3-bedroom",
        },
      },
      openGraph: {
        title: "第一郡三居室公寓 | SOHO Residence",
        images: [{ url: "/images/img_1.jpg" }],
      },
    };
  }

  return {
    title: "3-Bedroom Apartment District 1 | SOHO Residence",
    description:
      "95 m² 3-Bedroom apartment in District 1, HCMC. Features 2 bathrooms, living room, kitchen, and private washer. View room at SOHO.",
    alternates: {
      canonical: "https://sohoresidencehotel.vn/3-bedroom",
      languages: {
        vi: "https://sohoresidencehotel.vn/vi/3-bedroom",
        en: "https://sohoresidencehotel.vn/3-bedroom",
        "zh-CN": "https://sohoresidencehotel.vn/zh/3-bedroom",
      },
    },
    openGraph: {
      title: "3-Bedroom Apartment | SOHO Residence & Hotel",
      images: [{ url: "/images/img_1.jpg" }],
    },
  };
}

const IMAGES = [
  "/images/img_1.jpg",
  "/images/img_2.jpg",
  "/images/img_3.jpg",
  "/images/img_4.jpg",
];

export default async function ThreeBedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rooms" });
  const tAmenities = await getTranslations({ locale, namespace: "amenities" });

  const specs = [
    { label: t("specSize"), value: t("threebed.size") },
    { label: t("specGuests"), value: t("threebed.guests") },
    { label: t("specBeds"), value: t("threebed.beds") },
  ];

  const features = [
    t("threebed.feat0"),
    t("threebed.feat1"),
    t("threebed.feat2"),
    t("threebed.feat3"),
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
        tagline={t("threebed.name")}
        name={t("threebed.tagline")}
        description={t("threebed.description")}
        price={t("threebed.price")}
        perNight={t("perNight")}
        images={IMAGES}
        features={features}
        specs={specs}
        roomKey="threebed"
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
