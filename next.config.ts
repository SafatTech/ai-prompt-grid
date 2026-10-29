import type { NextConfig } from "next";
import { writePublishedGuideManifest } from "./src/lib/guides/published-manifest";
import { isVercelImageOptEnabled } from "./src/lib/images/vercel-image-opt";

// Bake published slugs into the layout bundle before compile. The root layout
// imports that module instead of reading content/guides, because other
// serverless functions (style pages, explore, and so on) do not trace the
// markdown files and would otherwise drop the Guides link after publishing.
writePublishedGuideManifest();

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  serverExternalPackages: [
    "sharp",
    "@tensorflow/tfjs",
    "@tensorflow-models/blazeface",
  ],
  // Trailing-slash redirects are handled in middleware so legacy WordPress
  // URLs can return 410/301 directly instead of bouncing onto a 404.
  skipTrailingSlashRedirect: true,
  experimental: {
    // Tree-shake lucide icon imports (how-it-works pages) without polyfill bloat.
    optimizePackageImports: ["lucide-react"],
    // inlineCss was enabled in #43 but duplicated ~globals into the RSC payload
    // (~300ms style-page main-thread task, home HTML over 1MB). Keep external
    // CSS; home inlines only hero-critical CSS, style pages preload w=640.
  },
  images: {
    // Pro default: /_next/image from original Supabase URLs. Kill switch:
    // NEXT_PUBLIC_VERCEL_IMAGE_OPT=0 → unoptimized originals (no transforms).
    unoptimized: !isVercelImageOptEnabled(),
    formats: ["image/avif", "image/webp"],
    // Cache optimized variants at the edge for a year (catalog assets are immutable).
    minimumCacheTTL: 31_536_000,
    // Trimmed to the widths we actually render (fewer transforms + origin fetches):
    // cards ~50–92vw @390 → ≤720–828 at 2×; heroes/guides ≤1200; no 1920/3840.
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbmirzmppbytorbhncxj.supabase.co",
        pathname: "/storage/v1/object/public/catalog-public/**",
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
