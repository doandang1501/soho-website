import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

// Next.js 16: file renamed from middleware.ts → proxy.ts
const intlMiddleware = createMiddleware(routing);

export function proxy(request: Request) {
  return intlMiddleware(request as Parameters<typeof intlMiddleware>[0]);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
