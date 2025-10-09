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
  // ищем, куда можно пускать пользователя с его ролью
  const allowedRoute = Object.entries(protectedRoutes).find(
    ([, role]) => role === userRole
  )?.[0];

  return allowedRoute;
}

/**
 * Middleware для обработки запросов
 *
 * @param req - объект запроса
 * @returns объект ответа
 */
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Handle root path redirect
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/kz/login", req.url));
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    if (intlResponse.status !== 200) {
      return intlResponse;
    }
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const locale = pathname.split("/")[1];

  if (
    !accessToken &&
    !refreshToken &&
    !pathname.startsWith(`/${locale}/login`)
  ) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  const user = accessToken
    ? await verifyToken(accessToken).catch(() => {
        return null;
      })
    : null;

  if (pathname.startsWith(`/${locale}/login`)) {
    if (user) {
      const allowedRoute = getAllowedRoute(user.role);
      return NextResponse.redirect(
        new URL(`/${locale}/${allowedRoute}`, req.url)
      );
    }

    return NextResponse.next();
  }

  for (const [route, allowedRole] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(`/${locale}/${route}`)) {
      if (user && user.role !== allowedRole) {
        const allowedRoute = getAllowedRoute(user.role);
        return NextResponse.redirect(
          new URL(`/${locale}/${allowedRoute}`, req.url)
        );
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/(ru|kz)/:path*", // Locales
  ],
};
