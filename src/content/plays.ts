/**
 * Plays: the written version of each video. Steps are public; the copy-paste
 * prompts live in the linked pack (src/content/packs.ts) behind the email.
 * Newest first.
 */

export type Play = {
  slug: string;
  title: string;
  /** One line for cards and meta descriptions. */
  summary: string;
  publishedOn: string;
  topic: string;
  /** Opening paragraph. */
  intro: string;
  steps: { title: string; body: string }[];
  honest: string;
  /** Pack keyword for the CTA (/get/<keyword>). */
  pack?: string;
  /** Optional link to the short (YouTube, TikTok, Instagram). */
  videoUrl?: string;
};

export const plays: Play[] = [
  {
    slug: "delete-yourself-from-the-internet",
    title: "Delete yourself from the internet in one afternoon",
    summary:
      "Anyone can look up your home address in seconds. Here's how to take most of it down, with Claude doing the boring parts.",
    publishedOn: "2026-11-03",
    topic: "Privacy",
    intro:
      "Type your own name into a people-search site and there's a good chance your home address, phone number and relatives come up. You can get most of that removed in an afternoon. The work is mostly forms and emails, which is exactly the part Claude is good at.",
    steps: [
      {
        title: "Search yourself first",
        body: "Search your name, email address and phone number on Google. Screenshot what comes up, paste it into Claude, and have it sort every result into data brokers, old accounts and news articles, ranked by what to delete first.",
      },
      {
        title: "Opt out of the data brokers",
        body: "This is the quick win. Spokeo, BeenVerified and Whitepages each have a free, self-service opt-out. Each broker is separate, so one opt-out doesn't cover the others. Tell Claude which site, and it writes the removal request for you.",
      },
      {
        title: "Use your state's law if you have one",
        body: "Some states give residents a legal right to ask for deletion. California has a state tool, for California residents, that sends one deletion request to hundreds of registered brokers at once.",
      },
      {
        title: "Delete the old accounts",
        body: "Every forum and app you tried once is still holding your data. Ask Claude how to fully delete each one, not just deactivate it.",
      },
      {
        title: "Triage your breaches",
        body: "Check your email on Have I Been Pwned (free), paste the breaches into Claude and have it rank them. For each one: change the password, turn on two-factor, or close the account.",
      },
    ],
    honest:
      "You won't vanish completely. Brokers can list you again, so repeat this every few months. News articles and court records generally stay put.",
    pack: "privacy",
  },
];

export function getPlay(slug: string): Play | undefined {
  return plays.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
