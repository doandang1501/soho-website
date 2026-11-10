import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HeroSection      from "@/components/sections/HeroSection";
import RoomsSection     from "@/components/sections/RoomsSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import LocationSection  from "@/components/sections/LocationSection";
import FAQSection       from "@/components/sections/FAQSection";
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

  // Schema.org Hotel + sameAs (Verified OTAs and Map links)
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": "https://sohoresidencehotel.vn/#hotel",
    name: "SOHO Residence & Hotel",
    url: "https://sohoresidencehotel.vn/",
    telephone: "+84917719966",
    email: "booking@sohoresidencehotel.vn",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 Cô Giang, Phường Cầu Ông Lãnh",
      addressLocality: "Quận 1, TP. Hồ Chí Minh",
      addressRegion: "Hồ Chí Minh",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "10.7601",
      longitude: "106.6946",
    },
    sameAs: [
      "https://maps.app.goo.gl/MsnZLFW5v1iE6Sbr7",
      "https://www.trip.com/w/paLqGT5w6X2",
      "https://www.booking.com/Share-3QVN02h",
      "https://www.agoda.com/vi-vn/soho-bui-vien-apartment/hotel/ho-chi-minh-city-vn.html?cid=1844104",
      "https://trv.lk/02cc597b",
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free High-Speed Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private Balcony", value: true },
      { "@type": "LocationFeatureSpecification", name: "In-unit Washing Machine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kitchen with Refrigerator", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smart TV with Netflix Support", value: true },
      { "@type": "LocationFeatureSpecification", name: "Elevator", value: true },
      { "@type": "LocationFeatureSpecification", name: "24/7 Building Security", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smoke and Carbon Monoxide Alarms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Luggage Storage on 5th Floor", value: true },
    ],
  };

  // Schema.org FAQPage for conversational AI queries (AEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: locale === "vi" 
          ? "SOHO có căn hộ cho gia đình không?" 
          : locale === "zh" 
          ? "SOHO 是否提供适合家庭入住的公寓？" 
          : "Does SOHO offer apartments for families?",
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "vi"
            ? "Có. SOHO có căn 2 phòng ngủ 55 m² (phù hợp 3–4 người) và căn 3 phòng ngủ 95 m² (phù hợp 5–6 người). Cả hai đều có phòng khách, bếp nấu nướng và máy giặt riêng tại ban công."
            : locale === "zh"
            ? "是的。SOHO 提供 55 m² 两居室公寓（适合 3–4 人）及 95 m² 三居室公寓（适合 5–6 人）。均配有客厅、厨房与独立专属洗衣机。"
            : "Yes. SOHO offers 2-bedroom (55 m², 3–4 guests) and 3-bedroom (95 m², 5–6 guests) apartments with spacious living areas, kitchens, and private washing machines.",
        },
      },
      {
        "@type": "Question",
        name: locale === "vi"
          ? "SOHO có máy giặt và máy sấy không?"
          : locale === "zh"
          ? "SOHO 是否配备洗衣机和烘干机？"
          : "Does SOHO have washing machines and dryers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "vi"
            ? "Mỗi căn hộ tại SOHO đều có máy giặt riêng tại ban công. Đối với nhu cầu sấy khô, khách sạn có máy sấy dùng chung tại khu giặt ủi được nhân viên hỗ trợ."
            : locale === "zh"
            ? "每套公寓独立阳台均配有专属洗衣机。公共洗衣区配有烘干机，工作人员乐意提供协助。"
            : "Every apartment has an individual washing machine on its private balcony. Shared clothes dryers are available in the laundry area with staff assistance.",
        },
      },
      {
        "@type": "Question",
        name: locale === "vi"
          ? "SOHO gần phố Bùi Viện và Chợ Bến Thành không?"
          : locale === "zh"
          ? "SOHO 是否靠近范五老街和滨城市场？"
          : "Is SOHO close to Bui Vien Street and Ben Thanh Market?",
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "vi"
            ? "SOHO Residence & Hotel tọa lạc tại 100 Cô Giang, Quận 1, rất gần và thuận tiện di chuyển đến phố đi bộ Bùi Viện và Chợ Bến Thành."
            : locale === "zh"
            ? "SOHO 位于胡志明市第一郡 Cô Giang 街100号，前往范五老步行街与滨城市场非常便捷。"
            : "SOHO Residence & Hotel is located at 100 Co Giang Street, District 1, providing convenient access to Bui Vien Walking Street and Ben Thanh Market.",
        },
      },
      {
        "@type": "Question",
        name: locale === "vi"
          ? "Quy trình nhận phòng tại SOHO diễn ra như thế nào?"
          : locale === "zh"
          ? "在 SOHO 如何办理入住？"
          : "How does check-in work at SOHO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "vi"
            ? "Khi đến sảnh tòa nhà, quý khách gọi trực tiếp hotline +84 91 771 9966. Nhân viên SOHO sẽ xuống đón và hỗ trợ nhận phòng. Khách đến sau 22:00 vui lòng thông báo trước. SOHO không áp dụng tự nhận phòng."
            : locale === "zh"
            ? "抵达大堂时请致电 +84 91 771 9966，工作人员下楼协助办理入住。22:00后到达请提前告知。SOHO 不设自助入住。"
            : "Upon arrival at the lobby, call +84 91 771 9966 for staff to assist your check-in. Guests arriving after 22:00 should inform in advance. SOHO does not operate self-check-in.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

      {/* 5 — FAQ Section (AEO) */}
      <FAQSection />

      {/* 6 — Contact CTA */}
      <ContactSection />
    </>
  );
}
