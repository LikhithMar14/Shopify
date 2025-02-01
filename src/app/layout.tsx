import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { APP_NAME, SERVER_URL } from "@/lib/constants";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template:`%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: `{APP_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL),
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} >
      <head>
        <link
          rel="icon"
          href="https://cdn.shopify.com/shopifycloud/web/assets/v1/favicon-default-6cbad9de243dbae3.ico"
          type="image/lg-icon"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
      <NextTopLoader
          showSpinner={false}
        />
        <Providers>

          {children}
          <Toaster richColors/>
          
        </Providers>
      </body>
    </html>
  );
}
