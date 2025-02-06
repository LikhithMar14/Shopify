import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  allowRoutes,
  apiAuthPrefix
} from "@/lib/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const isPublicPath = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isAllowRoute = allowRoutes.find((route) => path.startsWith(route));
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);


  if(isApiAuthRoute){
    return NextResponse.next()
  }
  if(isLoggedIn && isAuthRoute){
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  if(isPublicPath){


    
    return NextResponse.next();
  }
  if( !isAllowRoute && !isPublicPath && !isLoggedIn){


    return NextResponse.redirect(new URL("/login", nextUrl));
  }

 
  
  const cookies = req.headers.get("cookie") || "";
  if (!cookies.includes("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();


    const response = NextResponse.next();
    response.headers.append(
      "Set-Cookie",
      `sessionCartId=${sessionCartId}; Path=/; HttpOnly; Secure`
    );
    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
