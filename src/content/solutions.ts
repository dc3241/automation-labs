/**
 * Solutions: custom marketing, social media and lead generation systems we build
 * for companies. Each entry becomes a landing page at /solutions/<slug> with its
 * own inquiry form.
 *
 * Rules for this file:
 * - No invented results. No customer names, logos, testimonials or ROI numbers
 *   unless they are real and you can show them. The example output on each page
 *   is fictional and the page says so.
 * - `startingAt` is deliberately empty. Set it to a price you will honor, e.g.
 *   "Pilots start at $X". Pages show nothing until it is set.
 * - `demoVideoUrl` is optional. When set, the page embeds it above the example.
 * - Qualifier options feed the inquiry form AND the server-side allow-list, so
 *   changing them here changes both.
 *
 * To add a solution: copy an entry, give it a new slug, and it appears on
 * /solutions, in the sitemap, and as its own page.
 */

export type ExampleTone = "ok" | "warn" | "error";

export type Solution = {
  slug: string;
  name: string;
  department: "Lead generation" | "Social media" | "Marketing";
  /** One line under the page title. */
  tagline: string;
  /** Meta description, under ~160 characters. */
  summary: string;
  /** Who this is for, as short bullets. */
  forWho: string[];
  problem: { heading: string; body: string };
  steps: { title: string; body: string }[];
  included: string[];
  notIncluded: string[];
  /** Fictional example output, shown with a clear label. */
  example: {
    title: string;
    caption: string;
    rows: { label: string; value: string; tone?: ExampleTone }[];
  };
  faq: { q: string; a: string }[];
  /** Extra questions on the inquiry form. Select fields only. */
  qualifiers: { id: string; label: string; options: string[] }[];
  /** How we engage, one sentence. */
  engagement: string;
  /** e.g. "Pilots start at $X". Leave undefined until you have set pricing. */
  startingAt?: string;
  demoVideoUrl?: string;
};

export const solutions: Solution[] = [
  {
    slug: "lead-list-builder",
    name: "Lead list builder",
    department: "Lead generation",
    tagline:
      "Bring the sources you are allowed to use. Get back a cleaned, de-duplicated, scored prospect list your team can review.",
    summary:
      "A custom system that cleans, de-duplicates and scores prospect lists from sources you provide, then queues them for your team to review and export.",
    forWho: [
      "Agencies and service businesses that already have prospect data in spreadsheets, a CRM or a licensed provider and spend hours cleaning it",
      "Sales teams that want one repeatable way to decide which prospects are worth contacting",
      "Founders who know who their customer is but cannot tell which rows in a messy list are worth a message",
    ],
    problem: {
      heading: "Lists arrive messy, and nobody can say why a prospect was chosen",
      body: "Data comes from a CRM export, a purchased list, a trade show sheet or a data provider. It is full of duplicates, closed businesses and poor fits, and sorting it by hand eats hours that should go to selling.",
    },
    steps: [
      {
        title: "We define your ideal customer",
        body: "Business types, size signals and the things that make a prospect a bad fit, written down once so every list is judged by the same rules.",
      },
      {
        title: "You provide the data",
        body: "From your CRM, a spreadsheet, a data provider you have an account with, or any source you have the right to use. You choose the sources. We build the tooling, not the collection.",
      },
      {
        title: "We clean and de-duplicate",
        body: "Duplicates merged, obviously broken records flagged, and email addresses checked for basic validity before they reach your list.",
      },
      {
        title: "We score against your criteria",
        body: "Each prospect is checked against your rules, and the reason for each score is shown so your team can trust it or overrule it.",
      },
      {
        title: "A person reviews and decides",
        body: "Your team approves the list in a review screen, then exports it to a spreadsheet or your CRM. Nothing is contacted automatically.",
      },
    ],
    included: [
      "A list-cleaning and scoring tool set up in your own account, tuned to your ideal customer",
      "De-duplication and email validity checks",
      "A scoring rule set with the reason shown for every score",
      "A review screen and an export to a spreadsheet or your CRM",
      "A short runbook and a handover call",
    ],
    notIncluded: [
      "Collecting data from websites or services. You supply the data and the right to use it.",
      "Sending messages. People decide who is contacted.",
      "Legal advice. Rules on using contact data differ by country and by source.",
      "Guaranteed list quality or reply rates",
    ],
    example: {
      title: "Example: what the review screen shows",
      caption:
        "Fictional businesses, shown only to illustrate the format. Not real prospects or client data.",
      rows: [
        { label: "Sample Roofing Co. · fictional", value: "Fits: roofing category, 10–49 employees, valid email", tone: "ok" },
        { label: "Example Roof & Gutter · fictional", value: "Possible duplicate of Sample Roofing Co. (same phone number)", tone: "warn" },
        { label: "Placeholder Roofing LLC · fictional", value: "Email address is malformed. Held back.", tone: "error" },
        { label: "Demo Exteriors · fictional", value: "No email in the source data. Phone only.", tone: "warn" },
      ],
    },
    faq: [
      {
        q: "Where does the data come from?",
        a: "From you. You choose and supply the sources, such as your CRM, past customers, a spreadsheet or a data provider you have an account with. We do not scrape websites or services, and we will not build collection from a source whose terms forbid it.",
      },
      {
        q: "Does it send emails or messages?",
        a: "No. It cleans and scores lists. Anything sent to a prospect is sent by your team, from your own accounts.",
      },
      {
        q: "Is using this data allowed?",
        a: "That depends on the source and on where you and your prospects are. Laws such as CAN-SPAM, GDPR and CCPA apply to how contact data is used, and sources have their own terms. Confirm your obligations with your own counsel.",
      },
      {
        q: "Where does the data live?",
        a: "In your own account. We do not keep a copy of your lists.",
      },
    ],
    qualifiers: [
      {
        id: "data_source",
        label: "Where does your prospect data come from today?",
        options: ["Our CRM", "Spreadsheets", "A data provider we pay for", "Purchased or licensed lists", "We do not have any yet"],
      },
      {
        id: "list_use",
        label: "Where will the finished list go?",
        options: ["A spreadsheet", "HubSpot", "Salesforce", "Another CRM", "Not sure yet"],
      },
    ],
    engagement:
      "A fixed-fee pilot on one of your lists, reviewed with you on real output, then optional monthly support.",
  },
  {
    slug: "social-content-pipeline",
    name: "Social content pipeline",
    department: "Social media",
    tagline:
      "Ideas to scheduled posts in your own brand voice. A person approves every post before it goes out.",
    summary:
      "A custom content system that drafts posts in your brand voice, adapts them per platform, queues them for approval and schedules them from a tool you own.",
    forWho: [
      "Businesses and creators posting on several platforms who lose time rewriting the same idea for each one",
      "Teams where one person carries all the content work and posting stalls when they are busy",
      "Agencies that want consistent drafts for clients without losing the final edit",
    ],
    problem: {
      heading: "Posting consistently is mostly rewriting, formatting and remembering",
      body: "One idea has to become a post for each platform, in the right length and tone, then be scheduled somewhere. When the person doing it is busy, the calendar goes quiet and the brand voice drifts.",
    },
    steps: [
      {
        title: "We capture your brand voice",
        body: "Your audience, offers, tone and the things you never say, written into a brand file the drafts are held to. We build it from your real posts and website.",
      },
      {
        title: "You drop in an idea",
        body: "A topic, a link, a rough note or a transcript. That is the only input your team has to supply.",
      },
      {
        title: "We draft per platform",
        body: "One idea becomes a version for each channel you use, with the length, format and tone each one needs.",
      },
      {
        title: "A person approves",
        body: "Drafts land in a review queue. Edit, approve or reject. Nothing is posted without an approval.",
      },
      {
        title: "Approved posts are scheduled",
        body: "Posts publish on your calendar from a scheduler set up in your own cloud account, with failures flagged instead of silently dropped.",
      },
    ],
    included: [
      "A brand voice file built from your own content",
      "A drafting and review workflow for the platforms you choose",
      "A scheduler running in your own cloud account, connected to your accounts",
      "Retry and failure alerts so missed posts are visible",
      "A runbook and a handover call",
    ],
    notIncluded: [
      "Posting without approval",
      "Creating graphics or video unless scoped separately",
      "Guaranteed reach, followers or engagement",
      "Managing your accounts for you",
    ],
    example: {
      title: "Example: one idea, drafted per platform",
      caption:
        "Fictional business and posts, shown only to illustrate the format. Not client content.",
      rows: [
        { label: "Idea", value: "Three questions to ask before hiring a landscaper (fictional)" },
        { label: "LinkedIn draft", value: "Longer version with a short list. Waiting for approval.", tone: "warn" },
        { label: "X draft", value: "Short thread, three posts. Approved, scheduled for Tuesday.", tone: "ok" },
        { label: "Instagram draft", value: "Caption ready. Needs an image from your team.", tone: "warn" },
      ],
    },
    faq: [
      {
        q: "Will it sound like us?",
        a: "That is what the brand voice file is for, and we test it on your real topics before launch. You will still edit. The goal is a draft that needs light edits, not none.",
      },
      {
        q: "Does it post on its own?",
        a: "No. Every post waits for a person to approve it.",
      },
      {
        q: "Which platforms work?",
        a: "It depends on what the scheduler supports and on each platform's own rules for connecting accounts. Tell us your channels on the inquiry form and we will say honestly what is possible.",
      },
      {
        q: "Where do our posts and account connections live?",
        a: "In your own cloud account. If an AI model writes the drafts, the text you provide is sent to that provider under data terms we agree with you first.",
      },
    ],
    qualifiers: [
      {
        id: "platforms",
        label: "Where do you post most?",
        options: ["LinkedIn", "Instagram", "X", "Several of these", "Not sure yet"],
      },
      {
        id: "posts_per_week",
        label: "How many posts do you want out each week?",
        options: ["1–3", "4–7", "8–15", "15+"],
      },
    ],
    engagement:
      "A fixed-fee pilot for one brand and up to three platforms, then optional monthly support.",
  },
  {
    slug: "lead-follow-up",
    name: "Lead follow-up and reactivation",
    department: "Lead generation",
    tagline:
      "Every new and cold lead gets a timely, personal follow-up draft. You approve what is sent.",
    summary:
      "A custom system that drafts personal follow-ups for new inquiries and old leads from your own mailbox, tracks who has replied and flags who needs a person.",
    forWho: [
      "Businesses with a pile of past inquiries, quotes or contacts that nobody followed up on",
      "Teams where new leads wait hours or days for a first reply",
      "Owners who want every lead touched without sending a generic blast",
    ],
    problem: {
      heading: "Leads go cold because follow-up depends on someone remembering",
      body: "A form comes in, a quote goes out, and the next step lives in someone's head. Older leads sit in a spreadsheet or inbox. Nobody has time to write a thoughtful message to each one.",
    },
    steps: [
      {
        title: "We gather your leads",
        body: "New inquiries and a past list from a spreadsheet, CRM or inbox, with each lead's history and last contact.",
      },
      {
        title: "We segment them",
        body: "New, quoted but quiet, past customers and unknown, so each group gets the right kind of message.",
      },
      {
        title: "We draft a personal follow-up",
        body: "Each draft uses what you actually know about the lead and your offer, in your voice. It does not invent history or claims.",
      },
      {
        title: "A person approves and sends",
        body: "Drafts wait in a review queue. Approved messages go from your own mailbox, with a clear way for anyone to opt out.",
      },
      {
        title: "Replies and stragglers are tracked",
        body: "Replies are flagged for a person, opt-outs are honored automatically, and leads with no reply are scheduled for one more touch, not an endless sequence.",
      },
    ],
    included: [
      "Lead intake from a form, spreadsheet, CRM or inbox you already use",
      "Segments and follow-up drafts tuned to your offer and voice",
      "A review queue and sending from your own mailbox",
      "Opt-out handling and a cap on how often a lead is contacted",
      "A runbook and a handover call",
    ],
    notIncluded: [
      "Buying lists, new domains or warmed-up sending inboxes for mass cold email",
      "Messages sent without a person approving them",
      "Legal advice. Email rules differ by location, so confirm your obligations with your own counsel.",
      "Guaranteed replies or booked meetings",
    ],
    example: {
      title: "Example: the follow-up queue",
      caption:
        "Fictional leads, shown only to illustrate the format. Not client data.",
      rows: [
        { label: "New inquiry · fictional lead A", value: "Draft ready: reply to the question they asked", tone: "ok" },
        { label: "Quote sent 3 weeks ago · fictional lead B", value: "Draft ready: short check-in, no reply since the quote", tone: "ok" },
        { label: "Past customer · fictional lead C", value: "No recent history. Draft held for a person to review.", tone: "warn" },
        { label: "Fictional lead D", value: "Opted out. Removed from all follow-ups.", tone: "error" },
      ],
    },
    faq: [
      {
        q: "Does it send emails by itself?",
        a: "No. A person approves messages before they are sent from your mailbox.",
      },
      {
        q: "Is this cold email?",
        a: "It is for people who already know you: inquiries, quotes and past customers. It is not built for mass outreach to strangers.",
      },
      {
        q: "Could it say something wrong about a lead?",
        a: "It only uses what is in your records, and a person reads every draft. Where the history is thin, it keeps the message general or holds it for review.",
      },
      {
        q: "Where do our leads and messages live?",
        a: "In your own accounts. If an AI model writes the drafts, the lead details used for a draft are sent to that provider under data terms we agree with you first.",
      },
    ],
    qualifiers: [
      {
        id: "lead_volume",
        label: "Roughly how many leads sit unfollowed today?",
        options: ["Under 100", "100–500", "500–2,000", "2,000+", "Not sure"],
      },
      {
        id: "lead_source",
        label: "Where do your leads live?",
        options: ["A spreadsheet", "HubSpot", "Another CRM", "Email only", "Website forms"],
      },
    ],
    engagement:
      "A fixed-fee pilot on one lead list, reviewed with you on real drafts, then optional monthly support.",
  },
  {
    slug: "marketing-skill-pack",
    name: "Custom Claude marketing skills",
    department: "Marketing",
    tagline:
      "A set of Claude skills trained on your brand, offers and audience, so your team gets on-brand marketing work in minutes.",
    summary:
      "We build custom Claude skills for your team: copywriting, SEO, social and email workflows that already know your brand, offers and audience.",
    forWho: [
      "Marketing teams and owners already using Claude who rewrite the same context into every prompt",
      "Small teams that want consistent copy and content without hiring more people",
      "Agencies that want a repeatable on-brand process for each client",
    ],
    problem: {
      heading: "Generic AI output needs heavy editing, and every prompt starts from zero",
      body: "Most people re-explain their brand and offer each time, and get generic copy back. Results depend on who wrote the prompt, so quality varies from person to person and week to week.",
    },
    steps: [
      {
        title: "We learn your brand",
        body: "We read your site, past campaigns and best-performing content, and interview you on your audience, offers and what you refuse to say.",
      },
      {
        title: "We choose the skills you need",
        body: "Which tasks eat your time: landing page copy, blog outlines, social posts, email sequences, SEO checks. We start from proven open-source marketing skills and rewrite them for you.",
      },
      {
        title: "We build and test on your real work",
        body: "Each skill is tested on real tasks from your business until the output needs light editing, and we show you where it still falls short.",
      },
      {
        title: "We hand it over and train your team",
        body: "Installed in your Claude account, with a short guide for each skill and a live session so your team can use them from day one.",
      },
    ],
    included: [
      "A brand and offer knowledge file every skill draws on",
      "Three to six skills chosen for your biggest time sinks",
      "Testing on your real tasks, with the results shared",
      "A guide for each skill and a team training session",
      "One round of revisions after your team has used them",
    ],
    notIncluded: [
      "A Claude subscription. Your team needs its own account.",
      "Guaranteed rankings, traffic, conversions or revenue",
      "Publishing or sending anything for you",
    ],
    example: {
      title: "Example: what a skill takes in and returns",
      caption:
        "Fictional business and skill, shown only to illustrate the format. Not client work.",
      rows: [
        { label: "Skill", value: "Landing page copy for a fictional plumbing company" },
        { label: "You provide", value: "The service, the city and the offer", tone: "ok" },
        { label: "It already knows", value: "Brand voice, audience, guarantees you can truthfully make, words to avoid", tone: "ok" },
        { label: "You get", value: "A draft page with headline options. A person edits and approves.", tone: "warn" },
      ],
    },
    faq: [
      {
        q: "What is a Claude skill?",
        a: "A saved set of instructions and reference material that Claude loads when a task calls for it, so your team does not rewrite the same context into every prompt.",
      },
      {
        q: "Where does our brand information go?",
        a: "The skills live in your own Claude account. Anything your team runs through them follows the data terms of your Claude plan.",
      },
      {
        q: "Will the output be ready to publish?",
        a: "Treat it as a strong first draft. A person should always review it, check any claim, and approve it.",
      },
      {
        q: "Do we need to be technical?",
        a: "No. We handle setup, and your team uses the skills by describing the task in plain language.",
      },
    ],
    qualifiers: [
      {
        id: "claude_use",
        label: "Does your team use Claude today?",
        options: ["Yes, daily", "Occasionally", "Not yet"],
      },
      {
        id: "marketing_focus",
        label: "Where does your team lose the most marketing time?",
        options: ["Website and landing page copy", "Social content", "Email", "SEO and blog content", "Several of these"],
      },
    ],
    engagement:
      "A fixed-fee build for one brand, then optional monthly updates as your offers change.",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** Company sizes accepted by the inquiry form. Matches the admin filters. */
export const COMPANY_SIZES = ["1-9", "10-49", "50-200", "200+"] as const;
