/** The weekly email. Change the name here and it updates site-wide. */
export const NEWSLETTER = {
  name: "Lab Notes",
  cadence: "One email a week",
  promise:
    "The useful AI and Claude stuff, tested and explained in plain English. One email a week.",
  contents: [
    {
      title: "One Claude trick",
      body: "A prompt or workflow you can copy and use the same day.",
    },
    {
      title: "One new tool",
      body: "What it does, who it's for, and what it costs, checked on the official pricing page.",
    },
    {
      title: "One thing worth knowing",
      body: "The AI news that changes something for you, minus the hype.",
    },
  ],
} as const;

/** Cookie set after a successful signup. Unlocks packs on /get/[keyword]. */
export const SUBSCRIBER_COOKIE = "al_sub";

/** Signup sources are short slugs (pack keywords, page names). */
export function normalizeSource(raw: unknown): string {
  if (typeof raw !== "string") return "website";
  const slug = raw.toLowerCase().trim();
  return /^[a-z0-9-]{1,40}$/.test(slug) ? slug : "website";
}
