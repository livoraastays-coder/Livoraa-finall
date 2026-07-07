import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { siteSettings } from "@/lib/data/siteSettings";

const editorial = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.siteUrl),
  title: {
    default: siteSettings.seoDefaults.defaultTitle,
    template: `%s — ${siteSettings.seoDefaults.titleSuffix}`,
  },
  description: siteSettings.seoDefaults.defaultDescription,
  openGraph: {
    title: siteSettings.seoDefaults.defaultTitle,
    description: siteSettings.seoDefaults.defaultDescription,
    url: siteSettings.siteUrl,
    siteName: siteSettings.brandName,
    images: [siteSettings.seoDefaults.ogImage],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.seoDefaults.defaultTitle,
    description: siteSettings.seoDefaults.defaultDescription,
    site: siteSettings.seoDefaults.twitterHandle,
    images: [siteSettings.seoDefaults.ogImage],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${editorial.variable} ${body.variable}`}>
      <body className="min-h-screen bg-background font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
