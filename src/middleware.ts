import { NextRequest, NextResponse } from "next/server";

function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("access_token");

  if (req.nextUrl.pathname === `/login`) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(`/login`, req.nextUrl.origin));
  }

  return NextResponse.next();
}

export default function middleware(req: NextRequest) {
  const authResult = authMiddleware(req);
  if (authResult && authResult.status !== 200) {
    return authResult;
  }
}

export const config = {
  matcher: ["/", "/:path*"],
};
