import NextAuth from "next-auth";
import authConfig from "@/auth.config";


import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    apiAuthPrefix,
    authRoutes
} from "@/lib/routes"

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

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }