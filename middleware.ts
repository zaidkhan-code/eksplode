import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const role = req.cookies.get("role")?.value;

  // // ✅ Define public routes
  // const publicRoutes = ["/", "/products", "/auth/login", "/auth/register"];
  // const isPublic = publicRoutes.some(
  //   (route) => pathname === route || pathname.startsWith(route)
  // );

  // // ✅ If logged-in user visits a public route → redirect to their dashboard
  // if (isPublic && role) {
  //   const dashboardPath = `/${role}/dashboard`;
  //   if (!pathname.startsWith(`/${role}`)) {
  //     return NextResponse.redirect(new URL(dashboardPath, req.url));
  //   }
  // }

  // // 🔒 Protect role-based areas
  // if (pathname.startsWith("/admin")) {
  //   if (role !== "admin") {
  //     return NextResponse.redirect(new URL("/auth/login", req.url));
  //   }
  // }

  // if (pathname.startsWith("/merchant")) {
  //   if (role !== "merchant") {
  //     return NextResponse.redirect(new URL("/auth/login", req.url));
  //   }
  // }

  // if (pathname.startsWith("/user")) {
  //   if (role !== "user") {
  //     return NextResponse.redirect(new URL("/auth/login", req.url));
  //   }
  // }

  return NextResponse.next();
}

// ✅ Apply to necessary routes
export const config = {
  matcher: [
    "/",
    "/products",
    "/auth/:path*",
    "/admin/:path*",
    "/merchant/:path*",
    "/user/:path*",
  ],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const role = req.cookies.get("role")?.value;

//   // Allow public routes
//   if (pathname.startsWith("/auth") || pathname === "/") {
//     return NextResponse.next();
//   }

//   // 🔒 Role-based route protection
//   if (pathname.startsWith("/admin") && role !== "admin") {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   if (pathname.startsWith("/merchant") && role !== "merchant") {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   if (pathname.startsWith("/user") && role !== "user") {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   return NextResponse.next();
// }

// // ✅ Specify which routes middleware runs on
// export const config = {
//   matcher: ["/admin/:path*", "/merchant/:path*", "/user/:path*"],
// };
