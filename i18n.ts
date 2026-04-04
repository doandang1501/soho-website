import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "vi", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
  zh: "中文",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  vi: "🇻🇳",
  zh: "🇨🇳",
};

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = (locale ?? defaultLocale) as Locale;
  if (!locales.includes(resolvedLocale)) notFound();
  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
