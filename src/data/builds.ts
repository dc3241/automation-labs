/**
 * Portfolio builds gallery data.
 *
 * Department is a first-class field so filter pills can be added later
 * without reshaping case study content — flip filters on when the list
 * hits DEPARTMENT_FILTER_THRESHOLD (~5–6 builds).
 */

export const DEPARTMENT_FILTER_THRESHOLD = 5;

export type Department =
  | "Marketing"
  | "Finance"
  | "Operations"
  | "Sales"
  | "Legal"
  | "Other";

export type EngagementType = "Custom Build" | "Workflow Automation";

export function engagementLabel(
  type: EngagementType | EngagementType[]
): string {
  return (Array.isArray(type) ? type : [type]).join(" · ");
}

export function buildKicker(build: {
  department: Department;
  engagementType: EngagementType | EngagementType[];
  focus?: string;
}): string {
  const parts = [build.department, engagementLabel(build.engagementType)];
  if (build.focus) parts.push(build.focus);
  return parts.join(" · ");
}

export type BuildCta = {
  label: string;
  href: string;
};

export type BuildVisual = {
  /** Path under /public once a real screenshot ships */
  src?: string;
  alt: string;
  /** Shown under the screenshot when src is set */
  caption?: string;
  /** Shown in the placeholder until src is set */
  placeholderHint: string;
};

/** A case-study beat: one claim, then a short paragraph. */
export type BuildBeat = {
  claim: string;
  body: string;
};

export type Build = {
  id: string;
  slug: string;
  department: Department;
  engagementType: EngagementType | EngagementType[];
  /** Optional third kicker, e.g. "Knowledge Management". */
  focus?: string;
  title: string;
  hook: string;
  problem: BuildBeat;
  build: BuildBeat;
  result: BuildBeat;
  stack: string[];
  visual: BuildVisual;
  /** Extra screenshots; the first visual stays the hero. */
  gallery?: BuildVisual[];
  cta: BuildCta;
  /**
   * Demo / config-layer builds (ecommerce, law firm, salon, home services).
   * When true, show demoNote so the write-up does not read as a client project.
   */
  isDemo?: boolean;
  demoNote?: string;
};

export const builds: Build[] = [
  {
    id: "client-knowledge-hub",
    slug: "client-knowledge-hub",
    department: "Operations",
    engagementType: "Custom Build",
    focus: "Knowledge Management",
    title: "Client Knowledge Hub",
    hook: "Replaced five tools and a “who do I ask?” Slack thread with a private hub that shows who works on every client and puts everything they need one click away.",
    problem: {
      claim: "Five tools, and a Slack thread, for one client’s rules.",
      body: "Guides lived in Atlassian, rules and the roster in a spreadsheet, work in Jira, the account in Salesforce, conversations in Gmail. Finding the answer took longer than asking a coworker.",
    },
    build: {
      claim: "One page per client, fed by the sheet the team already updates.",
      body: "The page shows the team, a briefing, and a plain-language answer with the source attached. Guides, rules, tickets, the account, and email open in the original tool, and coverage and new-hire mode come from that same sheet.",
    },
    result: {
      claim: "The question starts with the answer.",
      body: "Anyone can see who owns the client, who is covering, and open the exact doc. New hires have a map on day one.",
    },
    stack: [
      "Confluence",
      "Jira",
      "Salesforce",
      "Google Sheets",
      "Gmail",
      "Slack",
    ],
    visual: {
      src: "/images/builds/client-knowledge-hub-team.jpg",
      alt: "Client Atlas page for Bramblewood Home, with today’s briefing and the account team, including who is covering while the QA specialist is out",
      caption:
        "One client, one page. The team — and who is covering — comes from the roles sheet.",
      placeholderHint: "",
    },
    gallery: [
      {
        src: "/images/builds/client-knowledge-hub-answer.jpg",
        alt: "Ask Atlas answering whether Ferrow tents can be called waterproof, with citations to the client rules and category map",
        caption:
          "Ask in plain language. The answer cites the rule it used.",
        placeholderHint: "",
      },
      {
        src: "/images/builds/client-knowledge-hub-docs.jpg",
        alt: "Documentation for Ferrow Outdoor Co. filtered across Confluence, Google Sheets, Jira, Salesforce, and Gmail, with who to ask and what changed",
        caption:
          "Guides, rules, tickets, the account, and email — filterable by source.",
        placeholderHint: "",
      },
    ],
    cta: {
      label: "Start a custom build",
      href: "/contact?type=build",
    },
  },
  {
    id: "weekly-social-production",
    slug: "weekly-social-production",
    department: "Marketing",
    engagementType: ["Custom Build", "Workflow Automation"],
    title: "Weekly Social Production System",
    hook: "Replaced a content spreadsheet and a Friday “go make the graphics” chore with a private ops dashboard that produces a week of captions and brand-locked product images — then stops so a human still posts.",
    problem: {
      claim: "Nine channels, a mix rule, and a Friday graphic batch lived in a spreadsheet.",
      body: "The calendar drifted, the mix lived in someone’s head, and product shots got pasted into Canva as floating phones. Nobody could tell whether the week was actually done.",
    },
    build: {
      claim: "A private console produces the week. A person still hits publish.",
      body: "People tag platform, format, and audience; a Friday job writes the captions and brand-locked images. Approve files the post. Nothing calls Instagram, TikTok, or LinkedIn.",
    },
    result: {
      claim: "Friday produces a week of on-brand creative.",
      body: "Ideas aren’t repeated, the mix rule is a function, and missing product shots fail closed. Automate production, never publication.",
    },
    stack: [
      "Next.js",
      "Postgres",
      "Vercel Cron",
      "Anthropic",
      "Seedream (image-to-image)",
      "Private object storage",
    ],
    visual: {
      src: "/images/builds/first-look-content-queue.jpg",
      alt: "First Look content queue — generated Instagram graphics with approve, deny, and download",
      caption:
        "The review board. Approve files the post; a human still publishes.",
      placeholderHint: "",
    },
    gallery: [
      {
        src: "/images/builds/first-look-ideation.jpg",
        alt: "First Look ideation — generate ideas, like or pass, and tag platform, format, and audience",
        caption:
          "Taste loop: like, pass, and tag before Friday produces.",
        placeholderHint: "",
      },
      {
        src: "/images/builds/first-look-schedule.jpg",
        alt: "First Look weekly schedule — nine social channels with posted checkboxes and performance logging",
        caption:
          "The calendar the spreadsheet used to be — nine channels, posted or not.",
        placeholderHint: "",
      },
    ],
    cta: {
      label: "Start a custom build",
      href: "/contact?type=build",
    },
  },
  {
    id: "content-dashboard",
    slug: "content-dashboard",
    department: "Marketing",
    engagementType: "Custom Build",
    title: "Content Dashboard",
    hook: "Replaced three spreadsheets and a scattered approval process with one tool the team actually opens.",
    problem: {
      claim: "Nobody could answer “what’s working” without an hour of copy-pasting.",
      body: "Performance across Instagram, TikTok, and YouTube lived in scattered spreadsheets, with an approval process nobody could follow.",
    },
    build: {
      claim: "Scrapers, a clustering pass, and a page the team just opens.",
      body: "Apify pulls platform data on a schedule. The Anthropic API groups it into themes, and the result is a static dashboard — no login, no export.",
    },
    result: {
      claim: "One page replaced three spreadsheets and the approval chain on top of them.",
      body: "The team can see what’s performing without asking anyone to pull a report first.",
    },
    stack: ["Apify", "TypeScript/Node.js", "Anthropic API", "Static HTML"],
    visual: {
      alt: "Content Dashboard screenshot",
      placeholderHint:
        "Screenshot of the dashboard (or a 10–15s screen-capture loop). Highest-leverage visual on the page.",
    },
    cta: {
      label: "Start a custom build",
      href: "/contact?type=build",
    },
  },
  {
    id: "revenue-tracking-dashboard",
    slug: "revenue-tracking-dashboard",
    department: "Finance",
    engagementType: "Custom Build",
    title: "Revenue Tracking Dashboard",
    hook: "Replaced a fragmented mess of platform dashboards with one place to see every revenue stream.",
    problem: {
      claim: "Four revenue streams, and no picture of the business without rebuilding it by hand.",
      body: "Brand deals, affiliate income, ad revenue, and agency work each lived in their own platform. There was no KPI view and no trailing-twelve-month total unless someone assembled one.",
    },
    build: {
      claim: "Four tabs feed one KPI sheet, including trailing twelve months.",
      body: "Python and openpyxl keep a tab per revenue stream and a central dashboard. Dark and light themes make it a daily-open file, not a monthly report.",
    },
    result: {
      claim: "One file replaced logging into four platforms.",
      body: "Totals and KPIs stay current. Nobody rebuilds the picture each time someone asks.",
    },
    stack: ["Python", "openpyxl", "Excel"],
    visual: {
      alt: "Revenue Tracking Dashboard KPI tab (dark theme)",
      placeholderHint:
        "Screenshot of the KPI dashboard tab — dark theme reads better as a static image.",
    },
    cta: {
      label: "Start a custom build",
      href: "/contact?type=build",
    },
  },
  {
    id: "onboarding-tracker",
    slug: "onboarding-tracker",
    department: "Operations",
    engagementType: "Custom Build",
    title: "New-Hire Onboarding Tracker",
    hook: "Replaced the email-spreadsheet-Slack scramble with one place to see where each hire actually is.",
    problem: {
      claim: "After the offer, nobody could say where a hire stood without pinging three people.",
      body: "Onboarding lived in a spreadsheet, an IT thread, a payroll checklist, and Slack messages asking whether the laptop had arrived.",
    },
    build: {
      claim: "One row per hire, updated by the form and the email.",
      body: "Paperwork, equipment, payroll, and the first-week plan sit on one page. The hiring manager opens it instead of hunting threads.",
    },
    result: {
      claim: "Status questions left Slack.",
      body: "IT, payroll, and the hiring manager see the same board. A new hire isn’t stuck because someone missed a thread.",
    },
    stack: ["TypeScript/Node.js", "Postgres", "Resend"],
    visual: {
      alt: "New-hire onboarding tracker screenshot",
      placeholderHint:
        "Screenshot of the hire status board — columns for paperwork, equipment, payroll, first week.",
    },
    cta: {
      label: "Start a custom build",
      href: "/contact?type=build",
    },
    isDemo: true,
    demoNote:
      "Example build — representative of the kind of engagement we take on, not a named client project.",
  },
  {
    id: "lead-briefs",
    slug: "lead-briefs",
    department: "Sales",
    engagementType: "Workflow Automation",
    title: "Pre-Call Lead Briefs",
    hook: "Every new CRM lead arrives with a one-page brief — so the first call isn't a LinkedIn tab and a guess.",
    problem: {
      claim: "First calls started from a name, a company, and five minutes of skimming.",
      body: "Research was inconsistent. Some reps over-prepared, most didn’t, and nobody had time to do it for every inbound lead.",
    },
    build: {
      claim: "A new CRM record writes the brief before the call.",
      body: "A worker pulls public company context, and the Anthropic API turns it into one page — what they do, recent signals, likely pain — that lands in Slack or email.",
    },
    result: {
      claim: "Reps open the brief instead of starting from zero.",
      body: "The research still happens. It just doesn’t eat the twenty minutes before every call.",
    },
    stack: ["TypeScript/Node.js", "Anthropic API", "CRM API"],
    visual: {
      alt: "Pre-call lead brief example",
      placeholderHint:
        "Screenshot of a brief in Slack or email — company, signals, likely pain, in one page.",
    },
    cta: {
      label: "Start a workflow project",
      href: "/contact?type=workflow",
    },
    isDemo: true,
    demoNote:
      "Example build — representative of the kind of engagement we take on, not a named client project.",
  },
  {
    id: "request-portal",
    slug: "request-portal",
    department: "Operations",
    engagementType: "Custom Build",
    title: "Internal Request Portal",
    hook: "IT and ops requests left Slack DMs and got a submit-route-status flow the team can actually track.",
    problem: {
      claim: "Requests lived in DMs, so nobody had a queue and nobody knew if they’d been seen.",
      body: "Laptops, access, vendor questions, and facilities issues arrived as Slack pings in different channels.",
    },
    build: {
      claim: "Pick a type, submit, get a ticket the requester can see.",
      body: "Routing sends it to the right owner. Status is visible without a follow-up ping, and the portal replaces the DM as the record.",
    },
    result: {
      claim: "“Did anyone see my message?” stopped being the intake process.",
      body: "Ops has a queue. Requesters can see where a ticket stands without chasing anyone.",
    },
    stack: ["TypeScript/Node.js", "Postgres", "Next.js"],
    visual: {
      alt: "Internal request portal screenshot",
      placeholderHint:
        "Screenshot of the request queue — type, owner, status — plus the submit form.",
    },
    cta: {
      label: "Start a custom build",
      href: "/contact?type=build",
    },
    isDemo: true,
    demoNote:
      "Example build — representative of the kind of engagement we take on, not a named client project.",
  },
];

export function getBuildDepartments(items: Build[] = builds): Department[] {
  return Array.from(new Set(items.map((b) => b.department)));
}

export function shouldShowDepartmentFilters(
  items: Build[] = builds
): boolean {
  return items.length >= DEPARTMENT_FILTER_THRESHOLD;
}
