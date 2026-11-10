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

// ── Root Layout Metadata with hreflang & OpenGraph ────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://sohoresidencehotel.vn"),
  title: {
    default: "SOHO Residence & Hotel",
    template: "%s | SOHO Residence & Hotel",
  },
  alternates: {
    languages: {
      vi: "https://sohoresidencehotel.vn/vi",
      en: "https://sohoresidencehotel.vn",
      "zh-CN": "https://sohoresidencehotel.vn/zh",
    },
  },
  openGraph: {
    type: "website",
    siteName: "SOHO Residence & Hotel",
    images: [
      {
        url: "/images/hero_1.jpeg",
        width: 1200,
        height: 630,
        alt: "SOHO Residence & Hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero_1.jpeg"],
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

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale === "zh" ? "zh-CN" : locale}
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
