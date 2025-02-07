"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import SyncCartOnLogin from "@/sync/index";
import { SessionProvider, useSession } from "next-auth/react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};


const SyncCartWrapper = () => {
  const { data: session, status } = useSession();
  console.log("STATUS: ",status)
  console.log("UserId: ",session?.user.id)
  return status === "authenticated" && session?.user?.id ? <SyncCartOnLogin /> : null ;
};
