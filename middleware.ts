import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  // Protect /dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard") && !sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to /dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
