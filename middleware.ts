import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const publicPaths = ["/login", "/api/auth"];
  if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const cookieToken = req.cookies.get("next-auth.session-token")?.value;
  const secureCookieToken = req.cookies.get("__Secure-next-auth.session-token")?.value;
  const sessionToken = cookieToken || secureCookieToken;

  console.log("Session Token",sessionToken)
  console.log("cookie Token",cookieToken)

  if (req.nextUrl.pathname.startsWith("/dashboard") && !sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Next Response");
  

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
