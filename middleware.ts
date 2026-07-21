import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dokumentasi routes (Member access) except /dokumentasi/login
  if (pathname.startsWith("/dokumentasi") && pathname !== "/dokumentasi/login") {
    const authCookie = request.cookies.get("tawsec_internal_auth");

    if (!authCookie || !authCookie.value) {
      const loginUrl = new URL("/dokumentasi/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already authenticated and accessing member login, redirect to /dokumentasi
  if (pathname === "/dokumentasi/login") {
    const authCookie = request.cookies.get("tawsec_internal_auth");
    if (authCookie && authCookie.value) {
      const dokUrl = new URL("/dokumentasi", request.url);
      return NextResponse.redirect(dokUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dokumentasi/:path*", "/admin/:path*"],
};
