export const CONSULTING_PRICE_LABEL = "$250";
export const CONSULTING_DURATION_LABEL = "90 minutes";
export const CONSULTING_DURATION_ADJECTIVE = "90-minute";
export const CONSULTING_EMAIL = "hello@automationlabsai.com";

/**
 * Cal.com event path, such as "your-name/working-session".
 * NEXT_PUBLIC_CAL_LINK may be that path or a full https://cal.com/... URL.
 */
export function getCalLink(): string {
  const raw = process.env.NEXT_PUBLIC_CAL_LINK?.trim();
  if (!raw) return "";

  return raw
    .replace(/^https?:\/\/(www\.|app\.)?cal\.com\//i, "")
    .split("?")[0]
    .replace(/\/+$/, "");
}
