// middleware.js

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  login: string;
  role: string;
}

export function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;
  // const token = req.cookies.get("access_token");
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  // try {
  //   const decoded = jwt.decode(token.value) as DecodedToken;
  //   if (decoded.role === "manager" && !pathname.startsWith("/dashboard")) {
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   }
  //   if (decoded.role === "admin" && !pathname.startsWith("/admin")) {
  //     return NextResponse.redirect(new URL("/admin", req.url));
  //   }
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
