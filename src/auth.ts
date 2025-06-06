import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/db";
import { type DefaultSession } from "next-auth";
import { cookies } from "next/headers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },

  callbacks: {
    async session({ token, session }) {
      session.user = {
        ...session.user,
        id: token.sub!,
        name: token.name ?? session.user.name,
        role: token.role ?? "USER",
      };
      return session;
    },

    async jwt({ token, trigger }) {

      if (!token.sub) {
        token.role = "USER";
        return token;
      }
      token.id = token.sub;
      return token;
    },


  },

  ...authConfig,
});

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "ADMIN" | "USER";
  }
}
