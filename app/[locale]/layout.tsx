import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
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

// ── Root Layout Metadata with Verification, hreflang & OpenGraph ───────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://sohoresidencehotel.vn"),
  verification: {
    google: "asdughxL5e5BcG7BTvYtbq-E_H-qHebq6b5dtyDpiwo",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
        url: "/images/hero_1.webp",
        width: 1200,
        height: 630,
        alt: "SOHO Residence & Hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero_1.webp"],
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
      </head>
        <body className="min-h-full flex flex-col bg-white text-[#1e2022] antialiased">
          {/* Google Analytics 4 (GA4) - Lazy loaded to avoid blocking initial render */}
          <Script
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=G-XB5PH0L00Q"
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XB5PH0L00Q', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />

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
