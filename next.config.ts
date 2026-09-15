import type { NextConfig } from "next";

function supabaseImagePatterns(): NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) return [];

  try {
    const { hostname, protocol } = new URL(url);
    const proto = protocol.replace(":", "") as "http" | "https";
    return [
      {
        protocol: proto,
        hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: supabaseImagePatterns(),
  },
};

export default nextConfig;
