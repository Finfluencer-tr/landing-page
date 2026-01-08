import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finfluencer - Yapay Zeka Destekli Finansal Analiz",
  description: "Finansal influencerların başarı oranlarını takip edin ve yapay zeka destekli analizlerle yatırımlarınıza yön verin.",
};

import { LanguageProvider } from "@/context/LanguageContext";
import { PageTitleHandler } from "@/components/PageTitleHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <PageTitleHandler />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
