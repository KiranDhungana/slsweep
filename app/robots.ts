import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * The player dashboard, wallet and account pages live on the separate
 * app.slsweep.com host, which needs its own robots.txt. On this site the only
 * private areas are the blog admin, its login, and the API routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login/", "/api/"],
    },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
