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
  metadataBase: new URL("https://finfluencer.tr/"),
  title: "Finfluencer - Yapay Zeka Destekli Finansal Analiz",
  description: "Finansal influencerların başarı oranlarını takip edin ve yapay zeka destekli analizlerle yatırımlarınıza yön verin.",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Finfluencer - Yapay Zeka Destekli Finansal Analiz",
    description: "Finansal influencerların başarı oranlarını takip edin.",
    url: "https://finfluencer.tr",
    siteName: "Finfluencer",
    images: [
      {
        url: "/favicon/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Finfluencer Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finfluencer - Yapay Zeka Destekli Finansal Analiz",
    description: "Finansal influencerların başarı oranlarını takip edin.",
    images: ["/favicon/android-chrome-512x512.png"],
  },
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
