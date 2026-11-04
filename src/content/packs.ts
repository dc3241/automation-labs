/**
 * Free packs delivered by comment keyword ("Comment PRIVACY...").
 * Each pack lives at /get/<keyword>. The `prompts` stay server-side and are
 * only rendered after signup. Import this file from server components only.
 *
 * To add a pack: copy an entry, set a new lowercase keyword, write the prompts.
 */

export type PackPrompt = {
  title: string;
  /** When to use it, one line. */
  when: string;
  /** The copy-paste prompt. [Brackets] are for the reader to fill in. */
  prompt: string;
};

export type Pack = {
  keyword: string;
  title: string;
  /** Shown publicly, before signup. */
  teaser: string;
  /** Shown publicly: what's inside, without the prompts themselves. */
  outline: string[];
  /** Related play slug, if the pack belongs to a video. */
  play?: string;
  publishedOn: string;
  /** Gated. */
  beforeYouStart: string[];
  prompts: PackPrompt[];
};

export const packs: Pack[] = [
  {
    keyword: "privacy",
    title: "The Delete-Yourself Prompt Pack",
    teaser:
      "Six copy-paste Claude prompts to find where your personal info shows up online and get most of it taken down in an afternoon.",
    outline: [
      "Sort your search results into what to delete first",
      "Write a data broker opt-out request",
      "Check whether your state gives you a legal right to deletion",
      "Fully delete old accounts, not just deactivate them",
      "Triage your data breaches",
      "A 15-minute check to repeat every few months",
    ],
    play: "delete-yourself-from-the-internet",
    publishedOn: "2026-11-03",
    beforeYouStart: [
      "Never paste passwords, Social Security numbers or card numbers into any chat. Claude doesn't need them for any of this.",
      "Make a separate email address for opt-out confirmations, so brokers don't get your main inbox.",
      "Crop screenshots to just the search results before you paste them in.",
      "Claude can be out of date on a specific site's opt-out steps. If something doesn't match what you see, trust the site's own privacy or opt-out page.",
    ],
    prompts: [
      {
        title: "1. Sort what's out there",
        when: "After searching your name, email and phone number on Google.",
        prompt: `I'm cleaning up my personal information online. Below are the search results for my name, email address and phone number.

Sort every result into one of these groups:
- Data broker or people-search site
- An old account or profile I created
- News article or public record
- Other

For each result, list what it exposes (home address, phone, relatives, age, workplace, photos), then rank everything by what I should remove first, worst exposure at the top. Give me the result as a table.

[Paste your search results or screenshots here]`,
      },
      {
        title: "2. Data broker opt-out request",
        when: "For each people-search site that lists you (Spokeo, BeenVerified, Whitepages and similar).",
        prompt: `Help me remove my listing from [site name].

My listing's URL: [paste URL]
How my details appear on the listing: [name, city, age as shown]

1. Tell me the usual steps for this site's opt-out process and what to watch for, such as email verification or a request for extra ID. If you aren't sure the steps are current, say so and tell me to check the site's own opt-out page.
2. Write a short, polite removal request I can paste into their form or send by email, asking them to remove the listing and confirm when it's done.
3. Remind me to check back in 30 days whether the listing is gone.`,
      },
      {
        title: "3. Do I have a legal right to deletion?",
        when: "Before you send requests, to see if your state's law backs you up.",
        prompt: `I live in [state]. Does my state give residents a legal right to ask data brokers or companies to delete their personal information?

- If yes: name the law, explain in plain English what it covers and any deadlines companies have to respond, and draft a deletion request that cites it.
- If my state has a tool that sends one request to many brokers at once (California has one for California residents), tell me about it.
- If my state has no such law, say so clearly and draft a polite request that doesn't claim a legal right I don't have.

Note that you're not a lawyer and flag anything I should double-check on an official state website.`,
      },
      {
        title: "4. Fully delete old accounts",
        when: "For the forums, apps and shopping sites you tried once and forgot.",
        prompt: `Here's a list of old accounts I want gone for good: [list the sites and apps].

For each one, tell me:
- How to permanently delete the account, not just deactivate it
- Anything I should download or save first
- How long deletion usually takes to finish
- If deletion isn't possible, what to scrub from the profile instead (name, photo, bio, location)

Put it in a checklist I can work through one by one. If you're unsure about a site's current steps, say so.`,
      },
      {
        title: "5. Triage your data breaches",
        when: "After checking your email on Have I Been Pwned (haveibeenpwned.com, free).",
        prompt: `These are the data breaches Have I Been Pwned lists for my email address:

[Paste the breach names and what data each one exposed]

Rank them by risk to me right now. For each breach, tell me which action to take and why:
- Change the password (and anywhere I reused it)
- Turn on two-factor authentication
- Close the account

Then give me the top three things to do tonight.`,
      },
      {
        title: "6. The every-few-months check",
        when: "Once you've done the first cleanup. Brokers can list you again.",
        prompt: `I just cleaned up my personal information online. These are the sites and searches I covered: [list them].

Make me a 15-minute checklist I can repeat every three months to:
- Re-run the searches for my name, email and phone
- Re-check each data broker for a new listing
- Catch new breaches

Format it as a simple checklist, and give me a calendar reminder title and description I can paste in.`,
      },
    ],
  },
];

export function getPack(keyword: string): Pack | undefined {
  const key = keyword.toLowerCase();
  return packs.find((p) => p.keyword === key);
}

/** Public info only, safe to pass to any page. */
export function packSummaries() {
  return packs.map(({ keyword, title, teaser, outline, publishedOn, prompts }) => ({
    keyword,
    title,
    teaser,
    outline,
    publishedOn,
    count: prompts.length,
  }));
}
