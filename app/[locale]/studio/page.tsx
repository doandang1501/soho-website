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
      title: "Căn Hộ Studio Có Ban Công Quận 1 | SOHO Residence",
      description:
        "Studio 30 m² tại Quận 1, TP.HCM. Có bếp, ban công, máy giặt riêng và Wi-Fi. Xem phòng tại SOHO Residence & Hotel.",
      alternates: {
        canonical: "https://sohoresidencehotel.vn/vi/studio",
        languages: {
          vi: "https://sohoresidencehotel.vn/vi/studio",
          en: "https://sohoresidencehotel.vn/studio",
          "zh-CN": "https://sohoresidencehotel.vn/zh/studio",
        },
      },
      openGraph: {
        title: "Căn Hộ Studio Có Ban Công Quận 1 | SOHO Residence",
        description:
          "Studio 30 m² tại Quận 1, TP.HCM. Có bếp, ban công, máy giặt riêng và Wi-Fi. Xem phòng tại SOHO Residence & Hotel.",
        images: [{ url: "/images/studio-1.jpg" }],
      },
    };
  }

  if (locale === "zh") {
    return {
      title: "第一郡带阳台单间开间公寓 | SOHO Residence",
      description:
        "胡志明市第一郡 30 m² 开间公寓。配有厨房、独立阳台、专属洗衣机及免费 Wi-Fi。欢迎查看 SOHO Residence & Hotel 客房。",
      alternates: {
        canonical: "https://sohoresidencehotel.vn/zh/studio",
        languages: {
          vi: "https://sohoresidencehotel.vn/vi/studio",
          en: "https://sohoresidencehotel.vn/studio",
          "zh-CN": "https://sohoresidencehotel.vn/zh/studio",
        },
      },
      openGraph: {
        title: "第一郡带阳台单间开间公寓 | SOHO Residence",
        images: [{ url: "/images/studio-1.jpg" }],
      },
    };
  }

  return {
    title: "Studio Apartment with Balcony District 1 | SOHO Residence",
    description:
      "30 m² Studio in District 1, HCMC. Features kitchen, private balcony, washing machine, and Wi-Fi. View room at SOHO Residence & Hotel.",
    alternates: {
      canonical: "https://sohoresidencehotel.vn/studio",
      languages: {
        vi: "https://sohoresidencehotel.vn/vi/studio",
        en: "https://sohoresidencehotel.vn/studio",
        "zh-CN": "https://sohoresidencehotel.vn/zh/studio",
      },
    },
    openGraph: {
      title: "Studio Apartment with Balcony | SOHO Residence & Hotel",
      images: [{ url: "/images/studio-1.jpg" }],
    },
  };
}

const IMAGES = [
  "/images/studio-1.jpg",
  "/images/studio-2.jpg",
  "/images/studio-3.jpg",
  "/images/studio-4.jpg",
  "/images/studio-5.jpg",
];

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rooms" });
  const tAmenities = await getTranslations({ locale, namespace: "amenities" });

  const specs = [
    { label: t("specSize"), value: t("studio.size") },
    { label: t("specGuests"), value: t("studio.guests") },
    { label: t("specBeds"), value: t("studio.beds") },
  ];

  const features = [
    t("studio.feat0"),
    t("studio.feat1"),
    t("studio.feat2"),
    t("studio.feat3"),
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
        tagline={t("studio.name")}
        name={t("studio.tagline")}
        description={t("studio.description")}
        price={t("studio.price")}
        perNight={t("perNight")}
        images={IMAGES}
        features={features}
        specs={specs}
        roomKey="studio"
      />

      {/* ── What's included ────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full mt-16">
        <AnimateInView direction="up">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-7 h-px bg-[var(--color-gold)]" />
            <h2 className="font-serif text-2xl text-[var(--color-ivory)]">
              {t("whatsIncluded")}
            </h2>
          </div>
        </AnimateInView>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {included.map((item, i) => (
            <AnimateInView key={i} delay={i * 0.04} direction="up">
              <div className="flex items-start gap-3 p-4 border border-[var(--color-border)] bg-[var(--color-charcoal-50)]">
                <span className="text-[var(--color-gold)] mt-0.5 text-sm flex-shrink-0">✦</span>
                <span className="font-sans text-sm text-[var(--color-ivory-dim)]">{item}</span>
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Dryer Notice */}
        <p className="font-sans text-xs text-[var(--color-ivory-dim)] italic border-l-2 border-[var(--color-gold)] pl-3">
          {tAmenities("dryerNotice")}
        </p>
      </div>
    </div>
  );
}
