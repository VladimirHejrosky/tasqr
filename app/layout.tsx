import BottomNavBar from "@/app/components/BottomNavBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import theme from "../theme";
import AuthProvider from "./auth/Provider";
import MainHeader from "./components/MainHeader";
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Tasqr",
  description: "Aplikace na úkoly",
  icons: "/icons/favicon.ico",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <QueryClientProvider>
            <InitColorSchemeScript attribute="class" />
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme} defaultMode="dark">
                <header>
                  <MainHeader />
                </header>
                <main>{children}</main>
                <footer>
                  <BottomNavBar />
                </footer>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </QueryClientProvider>
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
