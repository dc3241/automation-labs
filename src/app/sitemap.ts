import type { MetadataRoute } from "next";
import { packs } from "@/content/packs";
import { plays } from "@/content/plays";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/plays",
    "/get",
    "/tools",
    "/newsletter",
    "/100-ways-to-make-money-with-ai",
  ];

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...plays.map((play) => ({
      url: `${siteUrl}/plays/${play.slug}`,
      lastModified: new Date(play.publishedOn),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...packs.map((pack) => ({
      url: `${siteUrl}/get/${pack.keyword}`,
      lastModified: new Date(pack.publishedOn),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
