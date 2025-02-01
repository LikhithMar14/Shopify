import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/db";
import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Role as UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },

  callbacks: {
    async session({ token, session }) {
      if (token.name) session.user.name = token.name;
      if (token.role) session.user.role = token.role;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        token.role = "USER"; 
        return token;
      }

      const existingUser = await db.user.findUnique({ where: { id: token.sub } });


      if (!existingUser) {
        token.role = "USER";
        return token;
      }

      token.role = existingUser.role;
      token.name = existingUser.name;
      return token;
    },
  },

  ...authConfig,
});


export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// Extend JWT token type
declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}
