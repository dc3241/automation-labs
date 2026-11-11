/**
 * Solutions: back-office automations we build for companies. Each entry becomes
 * a landing page at /solutions/<slug> with its own inquiry form.
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
  department: "Finance" | "HR";
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
    slug: "invoice-automation",
    name: "Invoice and accounts payable automation",
    department: "Finance",
    tagline:
      "Supplier invoices go in as PDFs. Checked, organized entries come out for someone to approve.",
    summary:
      "We read supplier invoices, check the math, catch duplicates and missing fields, and hand a person a clean approval queue instead of data entry.",
    forWho: [
      "Companies that receive a steady stream of supplier invoices and retype them into QuickBooks, Xero or an ERP",
      "Contractors, distributors, logistics and property management teams, where invoices arrive from many suppliers in many formats",
      "Teams that want less data entry without giving up the final say on what gets paid",
    ],
    problem: {
      heading: "Most of the work is retyping, and the mistakes hide in it",
      body: "Someone opens each invoice, copies the vendor, number, dates and totals into the accounting system, and hopes nothing was wrong on the invoice to begin with. Totals that do not add up and the same invoice arriving twice are easy to miss when you are keying in a stack of them.",
    },
    steps: [
      {
        title: "Invoices arrive",
        body: "From an upload page or an inbox you already use. Text PDFs read directly; scanned invoices need an extra OCR step, which we confirm on your real documents first.",
      },
      {
        title: "We read the fields",
        body: "Vendor, invoice number, dates, line items, tax and total, pulled into a structured record.",
      },
      {
        title: "We run checks",
        body: "Do the line items add up, does subtotal plus tax equal the total, is a field missing, is the due date before the invoice date, have we already seen this invoice from this vendor. Your own rules, such as approval thresholds, are added here.",
      },
      {
        title: "A person approves",
        body: "Clean invoices wait for one-click approval. Anything flagged shows exactly what is wrong and what to fix. Nothing is approved or paid without a person.",
      },
      {
        title: "It goes where you work",
        body: "Approved invoices export to a spreadsheet or are pushed into your accounting system, depending on what you use.",
      },
    ],
    included: [
      "An invoice intake and review screen, set up in your own cloud account",
      "Extraction and checks tuned on a sample of your real invoices",
      "Your approval rules and a clear list of what gets flagged and why",
      "An export or integration for your accounting system",
      "A short runbook and a handover call",
    ],
    notIncluded: [
      "Paying invoices. The system never moves money.",
      "Replacing your accounting software",
      "Guaranteed accuracy before we have tested on your invoices",
    ],
    example: {
      title: "Example: what the review screen flags",
      caption:
        "Fictional invoices and vendors, shown only to illustrate the checks. Not client data.",
      rows: [
        { label: "Invoice 1 · Fictional Supply Co.", value: "All checks passed", tone: "ok" },
        {
          label: "Invoice 2 · Sample Office Depot",
          value: "Subtotal plus tax is 963.83 but the stated total is 999.99",
          tone: "error",
        },
        {
          label: "Invoice 3 · Fictional Supply Co.",
          value: "Invoice number already in the system from this vendor",
          tone: "error",
        },
        { label: "Invoice 4 · Example Medical Supply", value: "Invoice number is missing", tone: "error" },
        { label: "Invoice 5 · Sample Freight LLC", value: "Total is above the approval threshold", tone: "warn" },
      ],
    },
    faq: [
      {
        q: "Will it pay invoices automatically?",
        a: "No. A person approves every invoice. The system decides what needs attention, not what gets paid.",
      },
      {
        q: "How accurate is it?",
        a: "We do not quote a number before we have seen your invoices. In a pilot we run it on a sample of your real documents, measure each field, and set what is flagged for review based on those results.",
      },
      {
        q: "Where does our data go?",
        a: "We set it up in your own cloud account, so your invoices stay with you. If an AI model is used to read the invoices, the invoice text is sent to that provider, and we agree the data terms with you before anything runs. Companies that cannot send documents out can use a self-hosted option, with the trade-offs explained up front.",
      },
      {
        q: "Do we have to change accounting software?",
        a: "No. It sits in front of what you already use.",
      },
      {
        q: "What if our invoices are scans or photos?",
        a: "That works through an extra OCR step. It is less reliable than text PDFs, and we test it on your actual scans before promising anything.",
      },
    ],
    qualifiers: [
      {
        id: "invoices_per_month",
        label: "Roughly how many invoices do you process each month?",
        options: ["Under 50", "50–200", "200–1,000", "1,000+", "Not sure"],
      },
      {
        id: "accounting_system",
        label: "What do you enter them into today?",
        options: ["QuickBooks", "Xero", "NetSuite", "Sage", "Another system", "Spreadsheets"],
      },
    ],
    engagement:
      "A fixed-fee pilot on a month of your real invoices first, then optional monthly support.",
  },
  {
    slug: "hiring-assistant",
    name: "Hiring pipeline assistant",
    department: "HR",
    tagline:
      "Resumes in, organized candidate summaries out. A person makes every hiring decision.",
    summary:
      "We turn resumes into consistent, comparable candidate summaries against your job requirements and keep your pipeline organized. People make every decision.",
    forWho: [
      "Small and mid-sized companies hiring regularly and managing applicants in email and spreadsheets",
      "Hiring managers who spend hours reading resumes in different formats",
      "HR teams that want a consistent first-pass summary without an automated yes or no",
    ],
    problem: {
      heading: "Reading resumes takes hours, and no two get read the same way",
      body: "Resumes arrive in every format. Each gets a different amount of attention depending on the day, and the pipeline lives in an inbox and a spreadsheet nobody fully trusts.",
    },
    steps: [
      {
        title: "Resumes come in",
        body: "From your inbox, your applicant tracking system or an upload page.",
      },
      {
        title: "We parse and summarize",
        body: "Each resume becomes a consistent record: experience, skills, dates, and a short summary, set against the requirements you wrote for the role.",
      },
      {
        title: "You get an organized view",
        body: "Candidates side by side with the evidence from their resume for each requirement, so reviewers can check it in seconds instead of trusting it.",
      },
      {
        title: "People decide",
        body: "The assistant never rejects or advances anyone. Every decision is made and recorded by a person.",
      },
      {
        title: "Status and scheduling stay tidy",
        body: "Stage tracking and interview reminders, so nobody waits in silence.",
      },
    ],
    included: [
      "Resume parsing and a consistent candidate summary per role",
      "Requirements you define, with the supporting evidence shown for each",
      "A pipeline view your team can use day to day",
      "A record of what was summarized and what people decided",
      "A runbook and a handover call",
    ],
    notIncluded: [
      "Automatic rejection or ranking that decides who gets an interview",
      "Legal advice. Rules on automated hiring tools vary by location, so we design for human decision-making and you should confirm your obligations with your own counsel.",
      "Sourcing or messaging candidates for you",
    ],
    example: {
      title: "Example: a candidate summary",
      caption:
        "Fictional candidate and role, shown only to illustrate the format. Not a real person.",
      rows: [
        { label: "Role requirement · 3+ years in a supervisory role", value: "Met: 4 years as a shift supervisor (resume, work history)", tone: "ok" },
        { label: "Role requirement · Forklift certification", value: "Not stated on the resume. Ask the candidate.", tone: "warn" },
        { label: "Role requirement · Inventory software experience", value: "Met: names two systems (resume, skills)", tone: "ok" },
        { label: "Decision", value: "Left for the hiring manager", tone: "warn" },
      ],
    },
    faq: [
      {
        q: "Does it decide who we interview?",
        a: "No. It summarizes and organizes. People make every decision, and nothing is rejected automatically.",
      },
      {
        q: "Is this legal?",
        a: "Rules on automated tools in hiring differ by city and state and are still changing, and some require audits or notices. We design this so people make the decisions, and you should confirm your specific obligations with your own counsel.",
      },
      {
        q: "Where do resumes go?",
        a: "We set it up in your own cloud account. If an AI model reads the resumes, the text is sent to that provider under data terms we agree with you first. Resumes contain personal information, so we keep what is stored to a minimum and set a retention period with you.",
      },
      {
        q: "Does it work with our applicant tracking system?",
        a: "That depends on the system. Tell us what you use on the inquiry form and we will say honestly what is possible.",
      },
    ],
    qualifiers: [
      {
        id: "applicants_per_month",
        label: "Roughly how many applications do you review each month?",
        options: ["Under 25", "25–100", "100–500", "500+", "Not sure"],
      },
      {
        id: "applicant_system",
        label: "Where do applications live today?",
        options: ["Email and spreadsheets", "Greenhouse", "Lever", "BambooHR", "Another system"],
      },
    ],
    engagement:
      "A fixed-fee pilot on one open role, then optional monthly support.",
  },
  {
    slug: "onboarding-assistant",
    name: "Onboarding and HR policy assistant",
    department: "HR",
    tagline:
      "New hires get a clear checklist and instant answers from your own handbook. Internal only.",
    summary:
      "An internal assistant that guides new hires through onboarding and answers policy questions from your own handbook, inside Slack or Teams. It never talks to customers.",
    forWho: [
      "Companies onboarding new hires with scattered documents, emails and reminders",
      "HR and office managers who answer the same policy questions every week",
      "Teams that keep their handbook in Google Drive, SharePoint or a PDF and want people to actually use it",
    ],
    problem: {
      heading: "The same questions, the same reminders, every new hire",
      body: "Time off, benefits, equipment, who to ask. Each new hire sends the same questions, and onboarding steps depend on someone remembering to send them.",
    },
    steps: [
      {
        title: "We set up the onboarding checklist",
        body: "Tasks, documents and reminders for each role, released over time so new hires are not buried on day one.",
      },
      {
        title: "We connect your handbook",
        body: "Your policies and documents become the only source the assistant answers from.",
      },
      {
        title: "New hires ask, and get sourced answers",
        body: "Answers point to the exact policy they came from. If the handbook does not cover it, the assistant says so and routes the question to a person instead of guessing.",
      },
      {
        title: "HR sees what is missing",
        body: "Unanswered and repeated questions show where the handbook is unclear.",
      },
    ],
    included: [
      "An onboarding checklist and reminder sequence for each role",
      "A handbook assistant in Slack or Teams, limited to your documents",
      "Answers that cite the policy they came from",
      "A list of questions it could not answer, for HR to review",
      "A runbook and a handover call",
    ],
    notIncluded: [
      "Anything that talks to your customers. This is internal only.",
      "Legal or benefits advice. It repeats what your documents say and points to a person for anything else.",
      "Making policy decisions",
    ],
    example: {
      title: "Example: an answer from the handbook",
      caption:
        "Fictional company and policy, shown only to illustrate the format. Not client data.",
      rows: [
        { label: "Question", value: "How many days do I have to submit an expense report?" },
        { label: "Answer", value: "Within 30 days of the purchase (Expense Policy, section 2).", tone: "ok" },
        { label: "Question", value: "Can I work from another state for a month?" },
        {
          label: "Answer",
          value: "The handbook does not cover this. Sent to HR to answer.",
          tone: "warn",
        },
      ],
    },
    faq: [
      {
        q: "Will it make up answers?",
        a: "It is limited to your documents and cites where each answer came from. When the answer is not there, it says so and hands the question to a person. We test this on your real questions before launch.",
      },
      {
        q: "Does it ever talk to customers?",
        a: "No. This is an internal tool for your employees.",
      },
      {
        q: "Where does our handbook go?",
        a: "We set it up in your own cloud account. If an AI model is used, relevant passages are sent to that provider under data terms we agree with you first.",
      },
      {
        q: "What if our policies are out of date?",
        a: "Then the assistant repeats out-of-date answers. Part of the pilot is flagging where your documents conflict or are unclear.",
      },
    ],
    qualifiers: [
      {
        id: "hires_per_year",
        label: "Roughly how many people do you onboard each year?",
        options: ["Under 5", "5–20", "20–100", "100+", "Not sure"],
      },
      {
        id: "chat_tool",
        label: "Where does your team chat?",
        options: ["Slack", "Microsoft Teams", "Neither"],
      },
    ],
    engagement:
      "A fixed-fee pilot for one team or one onboarding flow, then optional monthly support.",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** Company sizes accepted by the inquiry form. Matches the admin filters. */
export const COMPANY_SIZES = ["1-9", "10-49", "50-200", "200+"] as const;
