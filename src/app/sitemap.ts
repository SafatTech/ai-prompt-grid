import type { MetadataRoute } from "next";
import { CATEGORY_SEEDS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = [
    "",
    "/styles",
    "/categories",
    "/coming-soon/video",
    "/coming-soon/generator",
    "/login",
    "/register",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...CATEGORY_SEEDS.map((category) => ({
      url: `${base}/categories/${category.slug}`,
      lastModified: new Date(),
    })),
  ];
}
