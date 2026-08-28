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

export type BuildCta = {
  label: string;
  href: string;
};

export type BuildVisual = {
  /** Path under /public once a real screenshot ships */
  src?: string;
  alt: string;
  /** Shown in the placeholder until src is set */
  placeholderHint: string;
};

export type Build = {
  id: string;
  slug: string;
  department: Department;
  engagementType: EngagementType;
  title: string;
  hook: string;
  problem: string;
  build: string;
  result: string;
  stack: string[];
  visual: BuildVisual;
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
    id: "content-dashboard",
    slug: "content-dashboard",
    department: "Marketing",
    engagementType: "Custom Build",
    title: "Content Dashboard",
    hook: "Replaced three spreadsheets and a scattered approval process with one tool the team actually opens.",
    problem:
      "A social media team tracking content performance across Instagram, TikTok, and YouTube had no single view — just scattered spreadsheets, manual data pulls, and an approval process nobody could follow. Nobody could answer \"what's working\" without an hour of copy-pasting first.",
    build: "Apify scrapers pull platform data on a schedule. A TypeScript/Node.js analysis layer processes it, the Anthropic API clusters content into themes and patterns, and the result renders as a static HTML dashboard the team opens like a webpage — no login, no spreadsheet, no waiting on an export.",
    result:
      "One tool replaced three spreadsheets and the manual approval chain that used to sit on top of them. The team can see what's performing without asking anyone to pull a report first.",
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
    problem:
      "Revenue was split across brand deals, affiliate income, ad/view revenue, and agency work — each living in its own platform, with no combined view of what the business was actually making, no KPI tracking, and no trailing-twelve-month picture without manually rebuilding one.",
    build: "A multi-tab spreadsheet system built with Python and openpyxl: four tabs, one per revenue stream, feeding a central KPI dashboard with TTM totals. Dark and light theme options so it's usable as a daily-open tool, not just a monthly report.",
    result:
      "One file replaced logging into four separate platforms to piece together the same picture. TTM totals and KPIs are always current, not rebuilt by hand each time someone asks.",
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
    problem:
      "Once an offer was signed, onboarding lived in four places: a spreadsheet nobody updated, an IT email thread, a payroll checklist, and Slack messages asking \"did they get a laptop yet?\" Nobody could answer where a hire stood without pinging three people.",
    build: "A small internal tool with one row per hire and a status for paperwork, equipment, payroll, and first-week plan. Form and email triggers update the row; the hiring manager opens a page instead of hunting through threads. TypeScript/Node.js on the backend, Postgres for state, a simple web UI the team bookmarks.",
    result:
      "Status questions stopped landing in Slack. IT and payroll see the same board the hiring manager does, and a new hire isn't stuck waiting because someone missed a thread.",
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
    problem:
      "Reps walked into first calls with a name, a company, and whatever they could skim in five minutes. Research was inconsistent: some people over-prepared, most people didn't, and nobody had time to do it for every inbound lead.",
    build: "A new record in the CRM kicks off a job: pull company context from the website and a few public sources, the Anthropic API turns it into a one-page brief (what they do, recent signals, likely pain), and the brief lands in Slack or email before the call. Custom TypeScript worker, no middleware platform in the middle.",
    result:
      "Reps open the brief instead of starting from zero. The research still happens — it just doesn't eat the twenty minutes before every call.",
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
    problem:
      "Laptop requests, access, vendor questions, and facilities issues all lived in DMs. The person who needed something had no idea if anyone saw it. The person doing the work had no queue — just a pile of Slack pings in different channels.",
    build: "A small portal: pick a request type, submit, get a ticket. Routing rules send it to the right owner; status is visible to the requester without a follow-up ping. TypeScript/Node.js, Postgres, a straightforward UI that replaces the DM as the system of record.",
    result:
      "\"Did anyone see my message?\" stopped being the intake process. Ops has a queue. Requesters can see where their ticket stands without chasing anyone.",
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
