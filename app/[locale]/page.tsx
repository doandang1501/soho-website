import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HeroSection      from "@/components/sections/HeroSection";
import RoomsSection     from "@/components/sections/RoomsSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import LocationSection  from "@/components/sections/LocationSection";
import ContactSection   from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "SOHO Residence & Hotel | District 1 | Ho Chi Minh City",
  description:
    "Luxury boutique apartment-hotel in the heart of District 1, Ho Chi Minh City. " +
    "Studio, 2-bedroom & 3-bedroom serviced apartments with city views, full kitchen, and 24/7 check-in.",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
