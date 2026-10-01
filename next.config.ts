import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  serverExternalPackages: ["sharp"],
  // Guide markdown is read from disk at request/build time, not imported.
  outputFileTracingIncludes: {
    "/guides": ["./content/guides/**/*.mdx"],
    "/guides/[slug]": ["./content/guides/**/*.mdx"],
    "/sitemap.xml": ["./content/guides/**/*.mdx"],
  },
};

export default nextConfig;
