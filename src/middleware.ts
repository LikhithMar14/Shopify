import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  allowRoutes,
  apiAuthPrefix,
} from "@/lib/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const isPublicPath = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isAllowRoute = allowRoutes.some((route) => path.startsWith(route));
  const isApiAuthRoute = path.startsWith(apiAuthPrefix);

  const cookies = req.headers.get("cookie") || "";
  const hasSessionCartId = cookies.includes("sessionCartId");


  if (!hasSessionCartId) {
    const sessionCartId = crypto.randomUUID();
    const response = NextResponse.redirect(nextUrl);

    response.headers.append(
      "Set-Cookie",
      `sessionCartId=${sessionCartId}; Path=/; HttpOnly; Secure`
    );

    return response;
  }


  if (isApiAuthRoute) {
    return NextResponse.next();
  }


  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }


  if (isPublicPath) {
    return NextResponse.next();
  }


  if (!isAllowRoute && !isPublicPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
