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
  // Guide pages read the markdown at runtime. The sitemap uses the generated
  // manifest instead, so it does not need those files in its serverless trace.
  outputFileTracingIncludes: {
    "/guides": ["./content/guides/**/*.mdx"],
    "/guides/[slug]": ["./content/guides/**/*.mdx"],
  },
};

export default nextConfig;
