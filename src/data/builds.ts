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
];

export function getBuildDepartments(items: Build[] = builds): Department[] {
  return Array.from(new Set(items.map((b) => b.department)));
}

export function shouldShowDepartmentFilters(
  items: Build[] = builds
): boolean {
  return items.length >= DEPARTMENT_FILTER_THRESHOLD;
}
