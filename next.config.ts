import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  serverExternalPackages: ["sharp"],
  // Trailing-slash redirects are handled in middleware so legacy WordPress
  // URLs can return 410/301 directly instead of bouncing onto a 404.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
