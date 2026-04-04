import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import Header from "@/components/layout/Header";
import BookingBar from "@/components/booking/BookingBar";
import Footer from "@/components/layout/Footer";
import "../globals.css";

// ── Fonts ──────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// ── Metadata ───────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://sohoresidencehotel.vn"),
  title: {
    default: "SOHO Residence & Hotel | District 1 | Ho Chi Minh City",
    template: "%s | SOHO Residence & Hotel",
  },
  description:
    "Luxury boutique apartment-hotel in the heart of District 1, Ho Chi Minh City. Studio, 2-bedroom & 3-bedroom serviced apartments with city views, full kitchen, and 24/7 check-in.",
  keywords: [
    "SOHO Residence Hotel",
    "luxury apartment hotel HCMC",
    "serviced apartment District 1",
    "hotel Ben Thanh",
    "boutique hotel Saigon",
    "Co Giang hotel",
  ],
  openGraph: {
    type: "website",
    siteName: "SOHO Residence & Hotel",
    title: "SOHO Residence & Hotel | Luxury Apartments in District 1",
    description:
      "Boutique apartment-hotel in the heart of Saigon. Studio, 2-bed & 3-bed residences with city views.",
    images: [
      {
        url: "/images/hero_1.jpg",
        width: 1200,
        height: 630,
        alt: "SOHO Residence & Hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOHO Residence & Hotel",
    description:
      "Luxury boutique apartment-hotel in District 1, Ho Chi Minh City.",
    images: ["/images/hero_1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

// ── Layout ─────────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  // Must be called before any next-intl server functions (enables static rendering)
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-charcoal)] text-[var(--color-ivory)] antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Sticky header */}
          <Header />

          {/* Sticky booking bar (below header) */}
          <BookingBar />

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
