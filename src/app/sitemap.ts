import type { MetadataRoute } from "next";
import { builds } from "@/data/builds";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/consulting",
    "/blog",
    "/newsletter",
    "/contact",
    "/projects",
  ];

  const pages = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority:
      route === "" ? 1 : route === "/services" || route === "/consulting" ? 0.9 : 0.7,
  }));

  const buildPages = builds.map((build) => ({
    url: `${siteUrl}/projects/${build.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...buildPages];
}
