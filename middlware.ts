import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("a_session"); // Check if session cookie exists
    if (!token) {
        return NextResponse.redirect(new URL("/entry", request.url)); // Redirect if not authenticated
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"], // Protect dashboard routes
};
