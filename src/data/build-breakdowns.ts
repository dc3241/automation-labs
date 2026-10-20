/**
 * Long-form page copy for /projects/[slug].
 * The gallery card stays short. This is the indexable breakdown:
 * who it is for, what it replaces, how it works, and the questions
 * a buyer would actually search.
 */

import { builds, type BuildBeat } from "@/data/builds";

export type BuildStep = {
  title: string;
  body: string;
};

export type BuildFaq = {
  question: string;
  answer: string;
};

export type BuildBreakdown = {
  /** Document title. The root layout appends "| Automation Labs". */
  seoTitle: string;
  seoDescription: string;
  /** Visible H1. Sentence case, includes the product and the audience. */
  headline: string;
  audience: BuildBeat;
  replaces: string[];
  howItWorks: BuildStep[];
  faqs: BuildFaq[];
};

const breakdowns: Record<string, BuildBreakdown> = {
  "client-knowledge-hub": {
    seoTitle: "Client Knowledge Hub for Operations Teams",
    seoDescription:
      "A private client knowledge base for operations and account teams. One page per client shows who owns the account, who is covering, and a source-backed answer — instead of hunting Confluence, Jira, Salesforce, Gmail, and Slack.",
    headline: "Client knowledge hub for operations teams",
    audience: {
      claim: "For the person who gets asked who owns the client.",
      body: "Operations leads, account managers, and new hires at agencies and service firms. The rules, the roster, and the work already live in Confluence, Jira, Salesforce, a spreadsheet, and Gmail. The hub is the map on top of those tools, not a second place to file things.",
    },
    replaces: [
      "Searching a Confluence space for one client’s rule",
      "A roster spreadsheet plus a Slack message to find out who is covering",
      "Opening Jira, Salesforce, and Gmail separately to reconstruct one account",
      "The “who do I ask?” thread that starts every new question",
    ],
    howItWorks: [
      {
        title: "The sheet the team already updates",
        body: "Coverage, roles, and new-hire mode come from the same roster. Nobody retypes the account team into another tool.",
      },
      {
        title: "One page per client",
        body: "The page shows today’s briefing, the account team, and who is out. Guides, tickets, the Salesforce account, and email open in the original system.",
      },
      {
        title: "Ask in plain language",
        body: "A question returns an answer with the rule it used, so the source stays attached instead of living in someone’s memory.",
      },
      {
        title: "Filter the record",
        body: "Documentation is grouped by source — Confluence, Google Sheets, Jira, Salesforce, and Gmail — with who to ask and what changed.",
      },
    ],
    faqs: [
      {
        question: "What is a client knowledge hub?",
        answer:
          "A private page per client that shows the account team, who is covering, and the documents that govern the work. It answers a question in plain language and links back to the source in Confluence, Jira, Salesforce, Sheets, or Gmail.",
      },
      {
        question: "Does this replace Confluence, Jira, or Salesforce?",
        answer:
          "No. Those stay the systems of record. The hub reads the roster the team already maintains and links out to the guide, the ticket, the account, and the email thread.",
      },
      {
        question: "Who uses a client knowledge base day to day?",
        answer:
          "Account and operations teams who need to know who owns a client before they change a rule, and new hires who need a map on day one.",
      },
      {
        question: "Can you build this on our stack?",
        answer:
          "The version we shipped sits on Confluence, Jira, Salesforce, Google Sheets, Gmail, and Slack. A custom solution starts from the tools your team already updates.",
      },
    ],
  },
  "weekly-social-production": {
    seoTitle: "Weekly Social Media Content Production System",
    seoDescription:
      "A private social content system for marketing teams. It turns a nine-channel calendar into captions and brand-locked product images, then stops so a person still publishes to Instagram, TikTok, and LinkedIn.",
    headline: "Weekly social media content production system",
    audience: {
      claim: "For a marketing team running several channels from a spreadsheet.",
      body: "In-house content leads who own a weekly calendar, a mix rule, and a Friday batch of product graphics. The system produces the creative. A person still decides what gets published.",
    },
    replaces: [
      "A content spreadsheet that drifts by midweek",
      "A channel mix rule that only one person remembers",
      "Product shots pasted into Canva as floating phones",
      "A Friday “go make the graphics” chore with no way to see if the week is done",
    ],
    howItWorks: [
      {
        title: "Tag the idea first",
        body: "People mark platform, format, and audience, then like or pass. Taste stays with the team. Friday does not invent the week from a blank prompt.",
      },
      {
        title: "A scheduled job produces the week",
        body: "Captions and brand-locked images are written from the product shot. If the shot is missing, the job fails closed instead of shipping a broken graphic.",
      },
      {
        title: "Approve files the post",
        body: "The review board is approve, deny, or download. Nothing calls Instagram, TikTok, or LinkedIn. Publication stays with a person.",
      },
      {
        title: "The calendar is the record",
        body: "Nine channels show what is posted and what is still open. That is the spreadsheet this replaced, with a posted checkbox and a place to log performance.",
      },
    ],
    faqs: [
      {
        question: "Does this auto-post to Instagram, TikTok, or LinkedIn?",
        answer:
          "No. Production is automated. Publication stays with a person. Approve files the post; someone still hits publish in the native app.",
      },
      {
        question: "What does a social content production system replace?",
        answer:
          "The weekly spreadsheet, the mix rule kept in someone’s head, and the Friday batch of product graphics. The calendar, captions, and brand-locked images live in one private console.",
      },
      {
        question: "How does it keep product images on brand?",
        answer:
          "Product shots go through an image-to-image step with the brand locked in. A missing source shot fails the job instead of inventing a graphic.",
      },
      {
        question: "Who is this social workflow for?",
        answer:
          "Marketing teams and operators who publish across several channels every week and want captions and graphics ready before anyone opens Instagram, TikTok, or LinkedIn.",
      },
    ],
  },
  "content-dashboard": {
    seoTitle: "Social Content Performance Dashboard",
    seoDescription:
      "A content performance dashboard for small marketing teams. Instagram, TikTok, and YouTube results land on one page, so “what’s working” does not take an hour of spreadsheets and an approval chain.",
    headline: "Social content performance dashboard for small marketing teams",
    audience: {
      claim: "For the marketing manager who is asked what is performing.",
      body: "Small teams whose Instagram, TikTok, and YouTube numbers live in separate spreadsheets. The dashboard is the page they open instead of copying a week of posts into a sheet before a meeting.",
    },
    replaces: [
      "A spreadsheet per social platform",
      "An approval process nobody can follow",
      "An hour of copy-paste before anyone can say what is working",
      "Asking someone to pull a report before the meeting starts",
    ],
    howItWorks: [
      {
        title: "Platform data arrives on a schedule",
        body: "Apify pulls Instagram, TikTok, and YouTube performance. Nobody exports a CSV to start the week.",
      },
      {
        title: "Posts are grouped into themes",
        body: "A clustering pass turns the raw pull into themes, so the page is something a person can read rather than a dump of every post.",
      },
      {
        title: "The result is a page, not a login",
        body: "The dashboard is static. There is no account to provision and no export step between the data and the answer.",
      },
      {
        title: "The meeting starts from the page",
        body: "The team can see what is performing without asking someone to build a report first.",
      },
    ],
    faqs: [
      {
        question: "Which platforms does a content performance dashboard cover?",
        answer:
          "This build pulls Instagram, TikTok, and YouTube onto one page. The point is a single view of performance that used to live in three spreadsheets.",
      },
      {
        question: "Do people have to log in or export a CSV?",
        answer:
          "No. Scrapers run on a schedule, posts are grouped into themes, and the team opens a static page. There is no login and no export.",
      },
      {
        question: "What problem does this solve for a marketing team?",
        answer:
          "“What’s working?” used to take an hour of copy-paste and an approval chain on top of the sheet. The dashboard is that answer, already on the page.",
      },
    ],
  },
  "revenue-tracking-dashboard": {
    seoTitle: "Multi-Stream Revenue Tracking Dashboard",
    seoDescription:
      "A revenue tracking dashboard in Excel for founders and finance leads. Brand deals, affiliate income, ad revenue, and agency work roll into one KPI view, including trailing twelve months.",
    headline: "Multi-stream revenue tracking dashboard",
    audience: {
      claim: "For a founder whose revenue lives in four logins.",
      body: "Finance leads and operators tracking brand deals, affiliate income, ad revenue, and agency work. Each stream has its own platform. None of them show the business, and trailing twelve months only exists if someone builds it by hand.",
    },
    replaces: [
      "Four platform dashboards that never show the whole business",
      "A hand-built total every time someone asks how the year looks",
      "A missing trailing-twelve-month view",
      "A monthly report nobody opens on a normal day",
    ],
    howItWorks: [
      {
        title: "One tab per revenue stream",
        body: "Brand deals, affiliate income, ad revenue, and agency work each keep their own tab, so a stream can be checked without disturbing the others.",
      },
      {
        title: "One KPI sheet",
        body: "Python and openpyxl roll those tabs into a central dashboard, including trailing twelve months.",
      },
      {
        title: "A file you actually open",
        body: "Dark and light themes make it a daily workbook, not a slide someone rebuilds at the end of the month.",
      },
      {
        title: "The picture stays in the file",
        body: "Totals and KPIs stay current. Answering “what did we make?” no longer means logging into four platforms.",
      },
    ],
    faqs: [
      {
        question: "What revenue streams can a dashboard like this combine?",
        answer:
          "The build covers brand deals, affiliate income, ad revenue, and agency work. Each stream stays in its own tab. The KPI sheet is the combined view, including trailing twelve months.",
      },
      {
        question: "Is this a web app or a spreadsheet?",
        answer:
          "An Excel workbook maintained with Python and openpyxl. It is a file the operator opens, with a dark theme that reads clearly as a static view of the business.",
      },
      {
        question: "Why track trailing twelve months in one file?",
        answer:
          "Platform dashboards show one stream. Trailing twelve months is how you see the business, and it should not require rebuilding the sheet every time someone asks.",
      },
    ],
  },
  "onboarding-tracker": {
    seoTitle: "New-Hire Onboarding Tracker for Small Teams",
    seoDescription:
      "An example new-hire onboarding tracker for operations teams. Paperwork, equipment, payroll, and the first week sit on one board instead of a spreadsheet, an IT thread, and Slack.",
    headline: "New-hire onboarding tracker for small teams",
    audience: {
      claim: "For the ops lead who cannot say where a hire stands.",
      body: "People and operations teams at small companies. After the offer, onboarding is a spreadsheet, an IT thread, a payroll checklist, and a Slack ping about the laptop. This example shows those on one board.",
    },
    replaces: [
      "An onboarding spreadsheet only one person updates",
      "An IT thread for the laptop and accounts",
      "A payroll checklist that lives in email",
      "Slack messages asking whether equipment has arrived",
    ],
    howItWorks: [
      {
        title: "One row per hire",
        body: "Paperwork, equipment, payroll, and the first-week plan are columns on the same board. Status is a row, not a search across tools.",
      },
      {
        title: "The form and the email update the row",
        body: "Changes come from the form and from email. Nobody retypes a Slack thread into the tracker at the end of the day.",
      },
      {
        title: "The hiring manager opens the board",
        body: "IT, payroll, and the hiring manager see the same row, so a status question has one place to land.",
      },
      {
        title: "The follow-up leaves Slack",
        body: "A new hire is not stuck because someone missed a message about a laptop, a payroll form, or day-one access.",
      },
    ],
    faqs: [
      {
        question: "Is this a live client onboarding system?",
        answer:
          "This is an example build. It shows the kind of new-hire onboarding tracker we scope for operations teams. It is not a named client project.",
      },
      {
        question: "What does an onboarding tracker replace?",
        answer:
          "The scramble after the offer: a spreadsheet, an IT thread, a payroll checklist, and Slack messages about equipment. One row per hire shows paperwork, the laptop, payroll, and the first week.",
      },
      {
        question: "Who needs to see a new hire’s status?",
        answer:
          "IT, payroll, and the hiring manager. They share one board, so “where do they stand?” is not a ping to three people.",
      },
    ],
  },
  "lead-briefs": {
    seoTitle: "Pre-Call Sales Lead Briefs from the CRM",
    seoDescription:
      "An example sales workflow that writes a one-page pre-call brief when a CRM lead arrives. Reps get what the company does, recent signals, and likely pain before the first call.",
    headline: "Pre-call sales lead briefs from your CRM",
    audience: {
      claim: "For a sales team whose first call starts on LinkedIn.",
      body: "Founders and sales leads whose inbound record is a name and a company. Some reps over-prepare. Most do not have twenty minutes before every call. The brief is written when the lead arrives.",
    },
    replaces: [
      "Opening LinkedIn in the five minutes before a first call",
      "Inconsistent prep — a few reps over-prepare, most do not",
      "A CRM record that is only a name and a company",
      "Research that never happens on a day when the calendar is full",
    ],
    howItWorks: [
      {
        title: "A new CRM record starts the job",
        body: "The brief is written when the lead arrives, not when the rep remembers to research the company.",
      },
      {
        title: "Public context becomes one page",
        body: "A worker pulls public company context. The model turns it into what they do, recent signals, and likely pain — a page, not a dossier.",
      },
      {
        title: "It lands where the rep already is",
        body: "The brief shows up in Slack or email, attached to the lead the CRM already created.",
      },
      {
        title: "The call starts from the brief",
        body: "The research still happens. It does not consume the twenty minutes immediately before the meeting.",
      },
    ],
    faqs: [
      {
        question: "Is this a client sales deployment?",
        answer:
          "This is an example workflow. It shows how a new CRM lead becomes a one-page pre-call brief. It is not a named client project.",
      },
      {
        question: "What is in a pre-call lead brief?",
        answer:
          "One page: what the company does, recent public signals, and the likely pain. It is written for the first call, not a full account plan.",
      },
      {
        question: "Does a lead brief replace the CRM?",
        answer:
          "No. The CRM stays the record. A new lead triggers the brief, and the page is delivered in Slack or email before the call.",
      },
      {
        question: "Will the brief invent facts about the lead?",
        answer:
          "It is built from public company context and should be read as a starting point for the call, not a verified dossier.",
      },
    ],
  },
  "request-portal": {
    seoTitle: "Internal IT and Ops Request Portal",
    seoDescription:
      "An example internal request portal for small operations teams. Laptops, access, vendor questions, and facilities issues get a submit, route, and status flow instead of a Slack DM.",
    headline: "Internal request portal for IT and operations",
    audience: {
      claim: "For an ops lead whose queue is a Slack DM.",
      body: "IT and operations teams at small companies. Laptops, access, vendor questions, and facilities issues arrive as pings in different channels. Nobody has a queue, and the requester cannot tell whether the message was seen.",
    },
    replaces: [
      "Slack DMs for laptops and account access",
      "Vendor and facilities questions scattered across channels",
      "A queue that exists only in someone’s memory",
      "Follow-up pings that really mean “did anyone see this?”",
    ],
    howItWorks: [
      {
        title: "Pick a type and submit",
        body: "Laptops, access, vendors, and facilities each have a path. The request starts as a form, not a direct message.",
      },
      {
        title: "Routing picks the owner",
        body: "The ticket goes to the person who handles that type, so intake is not “whoever happened to see the channel.”",
      },
      {
        title: "The requester can see status",
        body: "The ticket is the record. Checking where it stands does not require a follow-up ping.",
      },
      {
        title: "Ops has a queue",
        body: "The portal replaces the DM as the place a request lives. Seen, owned, and done are visible.",
      },
    ],
    faqs: [
      {
        question: "Is this a live help desk installed for a client?",
        answer:
          "This is an example build. It shows an internal request portal of the kind we scope for operations and IT teams. It is not a named client project.",
      },
      {
        question: "What belongs in an internal request portal?",
        answer:
          "The requests that currently arrive as Slack pings: laptops, access, vendor questions, and facilities issues. Each one gets a type, an owner, and a status.",
      },
      {
        question: "How is an internal request portal different from Slack?",
        answer:
          "Slack is still where the team talks. The portal is the record: submit, route, and a status the requester can see without asking if anyone saw the message.",
      },
    ],
  },
};

const missing = builds.filter((build) => !breakdowns[build.slug]);
if (missing.length > 0) {
  throw new Error(
    `Missing build breakdown: ${missing.map((build) => build.slug).join(", ")}`
  );
}

export function getBuildBreakdown(slug: string): BuildBreakdown | undefined {
  return breakdowns[slug];
}
