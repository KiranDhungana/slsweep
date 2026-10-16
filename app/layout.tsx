import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/seo/Analytics";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  jsonLd,
  siteJsonLd,
  siteUrl,
  socialMetadata,
} from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const defaultTitle = "SL Sweep – Sweepstakes Games Online | Orion Stars, Juwa";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    types: {
      "application/rss+xml": [{ url: siteUrl("/blog/rss.xml"), title: `${SITE_NAME} Blog` }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...socialMetadata({
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    url: siteUrl("/"),
  }),
  verification: {
    google: process.env.GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#067647",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd()) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
