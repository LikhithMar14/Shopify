import NextAuth from "next-auth";
import authConfig from "@/auth.config";


import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    apiAuthPrefix,
    authRoutes
} from "@/lib/routes"
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);




/*
                    node_modules/next-auth/lib/index.d.ts
                export interface NextAuthRequest extends NextRequest {
                    auth: Session | null;
                }

*/

export default auth((req) => {
    const path = req.nextUrl.pathname;
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const isPublicPath = publicRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    
    if (isApiAuthRoute) {
        return ;
      }
      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return ;
      }
      if (!isLoggedIn && !isPublicPath) {
        return Response.redirect(new URL('/login', nextUrl))
      }
      return
    
})
export async function middleware(request: Request) {
  const session = await auth();
  const cookies = request.headers.get("cookie") || "";


  if (!cookies.includes("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    console.log("Generated sessionCartId:", sessionCartId);

    const response = NextResponse.next();
    response.headers.append("Set-Cookie", `sessionCartId=${sessionCartId}; Path=/; HttpOnly; Secure`);
    return response;
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
    ],
  }