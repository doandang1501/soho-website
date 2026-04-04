import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales:       ["en", "vi", "zh"],
  defaultLocale: "en",
  localePrefix:  "as-needed", // / stays /, /vi and /zh are prefixed
});
