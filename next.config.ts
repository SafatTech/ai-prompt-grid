import type { NextConfig } from "next";
import { writePublishedGuideManifest } from "./src/lib/guides/published-manifest";
import { isVercelImageOptEnabled } from "./src/lib/images/vercel-image-opt";

// Bake published slugs into the layout bundle before compile. The root layout
// imports that module instead of reading content/guides, because other
// serverless functions (style pages, explore, and so on) do not trace the
// markdown files and would otherwise drop the Guides link after publishing.
writePublishedGuideManifest();

const vercelImageOpt = isVercelImageOptEnabled();

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  serverExternalPackages: ["sharp"],
  // Trailing-slash redirects are handled in middleware so legacy WordPress
  // URLs can return 410/301 directly instead of bouncing onto a 404.
  skipTrailingSlashRedirect: true,
  experimental: {
    // Tree-shake lucide icon imports (how-it-works pages) without polyfill bloat.
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    // Hobby (default): custom loader → pre-generated `.w{n}.webp` on Supabase /
    // local public (no /_next/image). Pro: set NEXT_PUBLIC_VERCEL_IMAGE_OPT=1.
    ...(vercelImageOpt
      ? {}
      : {
          loader: "custom" as const,
          loaderFile: "./src/lib/images/supabase-image-loader.ts",
        }),
    // Srcset ladder matches generate-image-variants.ts (360/540/720/1080).
    // When Vercel opt is on these still cap the optimizer request widths.
    deviceSizes: [360, 540, 720, 1080],
    imageSizes: [360, 540],
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
