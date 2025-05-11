import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow access to login page and public files
    if (pathname.startsWith("/login") || pathname === "/favicon.ico") {
        return NextResponse.next();
    }

    // Check for auth cookie
    const authCookie = request.cookies.get("site-auth")?.value;
    if (authCookie === process.env.SITE_PASSWORD) {
        return NextResponse.next();
    }

    // Redirect to login if not authenticated
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api|login).*)"],
};
