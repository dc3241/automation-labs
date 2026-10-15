const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://automationlabsai.com";

/** Canonical origin, without a trailing slash. */
export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
