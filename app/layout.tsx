import "./globals.css";
import { CsvProvider } from "@/components/csv-data-provider";
import { LabelStoreProvider } from "@/components/label-store-provider";
import { SelectedWalletsProvider } from "@/components/selected-wallets-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletsListProvider } from "@/components/wallets-list-provider";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { WagmiProvider } from "@/components/wagmi-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
          )}
        >
          <WagmiProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <TooltipProvider>
                <SelectedWalletsProvider>
                  <CsvProvider>
                    <WalletsListProvider>
                      <LabelStoreProvider>
                        <div className="relative flex min-h-screen flex-col">
                          <div className="flex-1">{children}</div>
                        </div>
                      </LabelStoreProvider>
                    </WalletsListProvider>
                  </CsvProvider>
                </SelectedWalletsProvider>
              </TooltipProvider>
            </ThemeProvider>
          </WagmiProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </>
  );
}
