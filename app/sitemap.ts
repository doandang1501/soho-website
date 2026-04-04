import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

const BASE_URL = "https://sohoresidencehotel.vn";

const ROUTES = [
  { path: "",          priority: 1.0,  changeFrequency: "weekly"  as const },
  { path: "/rooms",    priority: 0.9,  changeFrequency: "monthly" as const },
  { path: "/studio",   priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/2-bedroom",priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/3-bedroom",priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/about",    priority: 0.7,  changeFrequency: "yearly"  as const },
  { path: "/contact",  priority: 0.8,  changeFrequency: "yearly"  as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const { path, priority, changeFrequency } of ROUTES) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      entries.push({
        url:             `${BASE_URL}${prefix}${path}`,
        lastModified:    new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  return entries;
}
