import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const routePermissions = {
  auth: ["/sign-in", "/sign-up"],
  protected: ["/dashboard"],
  public: ["/", "/about", "/contact"], // Add public routes
};

function getRouteType(pathname: string) {
  if (routePermissions.protected.some((route) => pathname.startsWith(route))) {
    return "protected";
  }
  if (routePermissions.auth.some((route) => pathname.startsWith(route))) {
    return "auth";
  }
  if (
    routePermissions.public.some(
      (route) => pathname === route || pathname.startsWith(route)
    )
  ) {
    return "public";
  }
  return "public"; // Default to public instead of protected
}

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const routeType = getRouteType(pathname);

  console.log("Middleware triggered on:", pathname, "Type:", routeType);

  try {
    // Use req.headers directly instead of headers() function
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    console.log("Session:", session ? "exists" : "null");

    if (routeType === "auth" && session) {
      console.log("Redirecting authenticated user from auth page to dashboard");
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (routeType === "protected" && !session) {
      console.log("Redirecting unauthenticated user to sign-in");
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
