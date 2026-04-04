import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link, useRouter, usePathname, redirect — use these instead
// of next/navigation throughout the app so locale prefix is handled correctly.
export const { Link, useRouter, usePathname, redirect } = createNavigation(routing);
