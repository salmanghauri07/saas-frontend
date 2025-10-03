import { NextResponse } from "next/server";

export function middleware(req) {
  const refreshToken = req.cookies.get("jwt")?.value;
  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = ["/login", "/signup", "/otp"];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (!refreshToken && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (refreshToken && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};
