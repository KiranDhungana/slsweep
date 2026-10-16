import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a production build run alongside `next dev` (NEXT_DIST_DIR=.next-prod).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  compress: true,
  // Every page URL ends in "/". The other variant gets a permanent (308)
  // redirect, which search engines treat the same as a 301.
  trailingSlash: true,
  images: {
    // next/image serves AVIF/WebP automatically when the browser supports it.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
