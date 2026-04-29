import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isLoginRoute =
      pathname.startsWith("/admin/login") ||
      pathname.startsWith("/admin/verify");

    if (!isLoginRoute) {
      const sessionCookie =
        req.cookies.get("authjs.session-token") ||
        req.cookies.get("__Secure-authjs.session-token");

      if (!sessionCookie) {
        const loginUrl = new URL("/admin/login", req.nextUrl.origin);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
