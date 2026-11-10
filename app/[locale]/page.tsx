import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HeroSection      from "@/components/sections/HeroSection";
import RoomsSection     from "@/components/sections/RoomsSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import LocationSection  from "@/components/sections/LocationSection";
import ContactSection   from "@/components/sections/ContactSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "vi") {
    return {
      title: "SOHO Residence & Hotel – Căn Hộ Dịch Vụ Quận 1, TP.HCM",
      description:
        "SOHO Residence & Hotel tại Quận 1, TP.HCM. Căn hộ Studio, 2–3 phòng ngủ có bếp, ban công, máy giặt riêng. Gần phố Bùi Viện và Chợ Bến Thành.",
      keywords: [
        "căn hộ dịch vụ Quận 1",
        "khách sạn căn hộ Quận 1",
        "căn hộ 2 phòng ngủ Quận 1",
        "căn hộ 3 phòng ngủ Quận 1",
        "SOHO Residence Hotel",
      ],
      alternates: {
        canonical: "https://sohoresidencehotel.vn/vi",
        languages: {
          vi: "https://sohoresidencehotel.vn/vi",
          en: "https://sohoresidencehotel.vn",
          "zh-CN": "https://sohoresidencehotel.vn/zh",
        },
      },
      openGraph: {
        title: "SOHO Residence & Hotel – Căn Hộ Dịch Vụ Quận 1, TP.HCM",
        description:
          "SOHO Residence & Hotel tại Quận 1, TP.HCM. Căn hộ Studio, 2–3 phòng ngủ có bếp, ban công, máy giặt riêng. Gần phố Bùi Viện và Chợ Bến Thành.",
        url: "https://sohoresidencehotel.vn/vi",
        siteName: "SOHO Residence & Hotel",
        images: [{ url: "/images/hero_1.jpeg", width: 1200, height: 630 }],
      },
    };
  }

  if (locale === "zh") {
    return {
      title: "SOHO Residence & Hotel – 胡志明市第一郡服务式公寓",
      description:
        "SOHO Residence & Hotel 位于胡志明市第一郡。配备厨房、独立阳台及专属洗衣机的开间、两居室和三居室公寓。临近范五老步行街与滨城市场。",
      alternates: {
        canonical: "https://sohoresidencehotel.vn/zh",
        languages: {
          vi: "https://sohoresidencehotel.vn/vi",
          en: "https://sohoresidencehotel.vn",
          "zh-CN": "https://sohoresidencehotel.vn/zh",
        },
      },
      openGraph: {
        title: "SOHO Residence & Hotel – 胡志明市第一郡服务式公寓",
        description:
          "SOHO Residence & Hotel 位于胡志明市第一郡。配备厨房、独立阳台及专属洗衣机的开间、两居室和三居室公寓。",
        url: "https://sohoresidencehotel.vn/zh",
        siteName: "SOHO Residence & Hotel",
        images: [{ url: "/images/hero_1.jpeg", width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: "SOHO Residence & Hotel – Serviced Apartments in District 1, HCMC",
    description:
      "SOHO Residence & Hotel in District 1, Ho Chi Minh City. Studio, 2-bed & 3-bed serviced apartments with kitchen, private balcony, and washing machine.",
    alternates: {
      canonical: "https://sohoresidencehotel.vn",
      languages: {
        vi: "https://sohoresidencehotel.vn/vi",
        en: "https://sohoresidencehotel.vn",
        "zh-CN": "https://sohoresidencehotel.vn/zh",
      },
    },
    openGraph: {
      title: "SOHO Residence & Hotel – Serviced Apartments in District 1, HCMC",
      description:
        "SOHO Residence & Hotel in District 1, Ho Chi Minh City. Studio, 2-bed & 3-bed serviced apartments.",
      url: "https://sohoresidencehotel.vn",
      siteName: "SOHO Residence & Hotel",
      images: [{ url: "/images/hero_1.jpeg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Schema.org LodgingBusiness
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "SOHO Residence & Hotel",
    url: "https://sohoresidencehotel.vn",
    telephone: "+84917719966",
    email: "booking@sohoresidencehotel.vn",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 Cô Giang, Phường Cầu Ông Lãnh",
      addressLocality: "Quận 1",
      addressRegion: "Hồ Chí Minh",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "10.7601",
      longitude: "106.6946",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private Balcony", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private Washing Machine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kitchen with Refrigerator", value: true },
      { "@type": "LocationFeatureSpecification", name: "Elevator", value: true },
      { "@type": "LocationFeatureSpecification", name: "24/7 Building Security", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smoke and CO Alarms", value: true },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 1 — Fullscreen hero with slideshow */}
      <HeroSection />

      {/* 2 — Room types with gallery hover */}
      <RoomsSection />

      {/* Thin gold rule between sections */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* 3 — Amenities grid */}
      <AmenitiesSection />

      {/* 4 — Location + map */}
      <LocationSection />

      {/* 5 — Contact CTA */}
      <ContactSection />
    </>
  );
}
