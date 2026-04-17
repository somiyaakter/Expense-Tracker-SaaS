import { NextRequest, NextResponse } from "next/server";

const routePermissions = {
  auth: ["/sign-in", "/sign-up"],
  protected: ["/dashboard", "/accounts", "/categories", "/transactions"],
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

  const sessionCookie =
    req.cookies.get("better-auth.session_token") ||
    req.cookies.get("__Secure-better-auth.session_token");
  const isAuthenticated = Boolean(sessionCookie);

  if (routeType === "auth" && isAuthenticated) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    const destination = callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/dashboard";
    return NextResponse.redirect(new URL(destination, req.url));
  }

  if (routeType === "protected" && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname + req.nextUrl.search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
