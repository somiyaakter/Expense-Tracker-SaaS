import { NextRequest, NextResponse } from "next/server";

const routePermissions = {
  auth: ["/sign-in", "/sign-up"],
  protected: ["/dashboard"],
};

function getRouteType(pathname: string) {
  if (routePermissions.protected.some((r) => pathname.startsWith(r))) {
    return "protected";
  }
  if (routePermissions.auth.some((r) => pathname.startsWith(r))) {
    return "auth";
  }
  return "public";
}

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const routeType = getRouteType(pathname);

  // ✅ Just check cookie existence
  const sessionCookie =
    req.cookies.get("better-auth.session") ||
    req.cookies.get("__Secure-better-auth.session");

  const isAuthenticated = Boolean(sessionCookie);

  if (routeType === "auth" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (routeType === "protected" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
