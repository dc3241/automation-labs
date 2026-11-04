/**
 * Tool drops. Rules:
 * - Prices come from the vendor's official pricing page, with the date checked.
 *   No promo prices. If the billing basis is unclear, say so or leave it out.
 * - Only claim features verified on the vendor's own site.
 * - affiliateUrl: paste the approved affiliate link here once you have it.
 *   Cards use it in place of the official URL and mark the link as sponsored.
 * Newest first.
 */

export type Tool = {
  slug: string;
  name: string;
  category: string;
  /** What it does, one or two sentences, verified claims only. */
  blurb: string;
  /** Who should try it. */
  bestFor: string;
  pricing: string;
  /** true only when a free plan was verified on the pricing page. */
  hasFreePlan: boolean;
  priceCheckedOn: string;
  url: string;
  affiliateUrl?: string;
  /** Shown on the homepage. */
  featured?: boolean;
};

export const tools: Tool[] = [
  {
    slug: "help-scout",
    name: "Help Scout",
    category: "Customer support",
    blurb:
      "A shared inbox for customer emails, with assignments, workflows and a help-center docs site, so the team stops answering out of one Gmail.",
    bestFor: "Small teams answering customers from a shared email address.",
    pricing: "Free plan for 5 users, 1 inbox and 1 docs site. Paid plans per user per month.",
    hasFreePlan: true,
    priceCheckedOn: "2026-11-03",
    url: "https://www.helpscout.com/pricing/",
    featured: true,
  },
  {
    slug: "jotform-app-builder",
    name: "Jotform App Builder",
    category: "Forms and apps",
    blurb:
      "Describe a simple app in a Claude or ChatGPT chat (an intake form, a sign-in sheet, a checkout log) and the Jotform connector builds it. Share by link, QR code or embed.",
    bestFor: "Anyone who keeps building the same form and spreadsheet by hand.",
    pricing: "Free plan available. Paid plans start at $19 per month.",
    hasFreePlan: true,
    priceCheckedOn: "2026-10-30",
    url: "https://www.jotform.com/pricing/",
    featured: true,
  },
  {
    slug: "hubspot-crm",
    name: "HubSpot CRM",
    category: "Sales",
    blurb:
      "A CRM with a free tier. Paid plans add AI features such as a data agent that answers questions about a contact from your CRM, calls, emails and documents.",
    bestFor: "Small sales teams still tracking deals in a spreadsheet.",
    pricing: "Free CRM for up to 2 users. AI features depend on the paid plan.",
    hasFreePlan: true,
    priceCheckedOn: "2026-10-28",
    url: "https://www.hubspot.com/pricing/crm",
    featured: true,
  },
  {
    slug: "scribe",
    name: "Scribe",
    category: "Documentation",
    blurb:
      "Records you doing a task and turns it into a step-by-step guide with screenshots, so the process stops living in one person's head.",
    bestFor: "Teams that keep re-explaining the same process.",
    pricing:
      "Basic plan is free. Pro Team is $17 per user per month billed monthly, or $13 billed yearly, with a 5-seat minimum.",
    hasFreePlan: true,
    priceCheckedOn: "2026-10-28",
    url: "https://scribe.com/pricing",
  },
  {
    slug: "notion",
    name: "Notion",
    category: "Docs and projects",
    blurb:
      "Docs, wikis and project boards in one workspace. Notion Agent is listed on the Business plan.",
    bestFor: "Teams whose notes, docs and to-dos are spread across five apps.",
    pricing: "Free plan available. Plus $10 and Business $20 per member per month.",
    hasFreePlan: true,
    priceCheckedOn: "2026-10-29",
    url: "https://www.notion.com/pricing",
  },
  {
    slug: "buffer",
    name: "Buffer",
    category: "Social media",
    blurb: "Schedule posts across your social channels from one queue.",
    bestFor: "Small businesses posting to a few channels every week.",
    pricing: "Team plan is $10 per channel per month, billed monthly.",
    hasFreePlan: false,
    priceCheckedOn: "2026-10-29",
    url: "https://buffer.com/pricing",
  },
  {
    slug: "calendly",
    name: "Calendly",
    category: "Scheduling",
    blurb:
      "Booking links tied to your calendar. The Teams plan adds round-robin, routing forms and CRM connections.",
    bestFor: "Anyone still trading emails to find a meeting time.",
    pricing: "Standard $10 and Teams $16 per seat per month (the page shows a discount for yearly billing).",
    hasFreePlan: false,
    priceCheckedOn: "2026-10-28",
    url: "https://calendly.com/pricing",
  },
];

export function toolHref(tool: Tool): string {
  return tool.affiliateUrl || tool.url;
}
