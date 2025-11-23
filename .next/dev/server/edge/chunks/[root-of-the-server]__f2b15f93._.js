(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
function middleware(req) {
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/",
        "/products",
        "/auth/:path*",
        "/admin/:path*",
        "/merchant/:path*",
        "/user/:path*"
    ]
}; // import { NextResponse } from "next/server";
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
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map