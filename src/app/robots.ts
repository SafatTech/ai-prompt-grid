import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

/**
 * Crawl policy for search engines (Robots Exclusion Protocol).
 * Public catalog pages are allowed; auth, account, admin, and API paths are blocked.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/api/",
        "/auth/",
        "/sign-in",
        "/library",
        "/creations/",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
