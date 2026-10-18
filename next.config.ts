import type { NextConfig } from "next";
import { writePublishedGuideManifest } from "./src/lib/guides/published-manifest";

// Bake published slugs into the layout bundle before compile. The root layout
// imports that module instead of reading content/guides, because other
// serverless functions (style pages, explore, and so on) do not trace the
// markdown files and would otherwise drop the Guides link after publishing.
writePublishedGuideManifest();

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  serverExternalPackages: ["sharp"],
  // Trailing-slash redirects are handled in middleware so legacy WordPress
  // URLs can return 410/301 directly instead of bouncing onto a 404.
  skipTrailingSlashRedirect: true,
  images: {
    // Catalog originals are at most ~1200–1600px wide, so the 2048/3840
    // defaults only bloat every srcset (the homepage wall alone had 36+ of them).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbmirzmppbytorbhncxj.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Guide pages read the markdown at runtime. The sitemap uses the generated
  // manifest instead, so it does not need those files in its serverless trace.
  outputFileTracingIncludes: {
    "/guides": ["./content/guides/**/*.mdx"],
    "/guides/search": ["./content/guides/**/*.mdx"],
    "/guides/category/[category]": ["./content/guides/**/*.mdx"],
    "/guides/[slug]": ["./content/guides/**/*.mdx"],
  },
};

export default nextConfig;
