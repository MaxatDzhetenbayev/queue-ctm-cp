import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@i18/index";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes: Record<string, string> = {
  admin: "ADMIN",
  manager: "MANAGER",
};

/**
 * Функция для проверки токена
 *
 * @param token - JWT токен
 * @returns объект с данными пользователя или null
 */
async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || "JWT_SECRET";
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload as { id: string; email: string; role: string };
}

/**
 *
 * @param userRole - роль пользователя
 * @returns
 */
function getAllowedRoute(userRole: string) {
  console.log("🔍 Finding allowed route for role:", userRole);
  // ищем, куда можно пускать пользователя с его ролью
  const allowedRoute = Object.entries(protectedRoutes).find(
    ([, role]) => role === userRole
  )?.[0];

  console.log("🎯 Allowed route found:", allowedRoute);
  return allowedRoute;
}

/**
 * Middleware для обработки запросов
 *
 * @param req - объект запроса
 * @returns объект ответа
 */
export default async function middleware(req: NextRequest) {
  console.log("🔍 Middleware started");
  console.log("📍 Request URL:", req.url);

  const { pathname } = req.nextUrl;

  // Handle root path redirect
  if (pathname === "/") {
    console.log("🏠 Root path detected, redirecting to /kz/login");
    return NextResponse.redirect(new URL("/kz/login", req.url));
  }

  const intlResponse = intlMiddleware(req);
  console.log("🌐 Intl middleware response:", intlResponse ? "exists" : "null");
  if (intlResponse) {
    if (intlResponse.status !== 200) {
      console.log("❌ Intl middleware error, status:", intlResponse.status);
      return intlResponse;
    }
  }

  console.log("🛣️ Pathname:", pathname);

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("🍪 Access token:", !!accessToken);
  console.log("🔄 Refresh token:", !!refreshToken);

  const locale = pathname.split("/")[1];
  console.log("🌍 Locale:", locale);

  if (
    !accessToken &&
    !refreshToken &&
    !pathname.startsWith(`/${locale}/login`)
  ) {
    console.log(
      "❌ No tokens found and not on login page, redirecting to login"
    );
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  console.log("🔐 Verifying token...");
  const user = accessToken
    ? await verifyToken(accessToken).catch((error) => {
        console.log("💥 Token verification failed:", error);
        return null;
      })
    : null;
  console.log(
    "👤 User verified:",
    user ? { id: user.id, email: user.email, role: user.role } : "null"
  );

  if (pathname.startsWith(`/${locale}/login`)) {
    console.log("🔑 User is on login page");
    if (user) {
      console.log("✅ User is authenticated, redirecting to appropriate route");
      const allowedRoute = getAllowedRoute(user.role);
      console.log("🎯 Allowed route for role", user.role, ":", allowedRoute);
      return NextResponse.redirect(
        new URL(`/${locale}/${allowedRoute}`, req.url)
      );
    }

    console.log("✅ User not authenticated, allowing access to login page");
    return NextResponse.next();
  }

  for (const [route, allowedRole] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(`/${locale}/${route}`)) {
      console.log(
        "🛡️ Checking protected route:",
        route,
        "for role:",
        allowedRole
      );
      if (user && user.role !== allowedRole) {
        console.log(
          "🚫 User role",
          user.role,
          "doesn't match required role",
          allowedRole
        );
        const allowedRoute = getAllowedRoute(user.role);
        console.log("🔄 Redirecting to allowed route:", allowedRoute);
        return NextResponse.redirect(
          new URL(`/${locale}/${allowedRoute}`, req.url)
        );
      }
      console.log("✅ Access granted to protected route:", route);
      return NextResponse.next();
    }
  }

  console.log("✅ No specific route protection, allowing access");
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/(ru|kz)/:path*", // Locales
  ],
};
