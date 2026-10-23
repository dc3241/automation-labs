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

export type BuildSection = {
  /** Visible H2. Written as a phrase a buyer would search. */
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Optional internal link rendered under the section. */
  link?: { text: string; href: string };
};

export type BuildBreakdown = {
  /** Document title. The root layout appends "| Automation Labs". */
  seoTitle: string;
  seoDescription: string;
  /** Visible H1. Sentence case, includes the product and the audience. */
  headline: string;
  /** ISO date (YYYY-MM-DD). Feeds Article datePublished in JSON-LD. */
  published?: string;
  audience: BuildBeat;
  replaces: string[];
  howItWorks: BuildStep[];
  /** Optional long-form, keyword-led sections rendered after "How it works". */
  sections?: BuildSection[];
  faqs: BuildFaq[];
};

const breakdowns: Record<string, BuildBreakdown> = {
  "resume-intake": {
    seoTitle: "AI Resume Screening for Small Business",
    seoDescription:
      "Automate resume screening for small business. Applications are read, matched to your job criteria, and logged in a tracker. A person makes every decision.",
    headline: "AI resume screening for small business hiring teams",
    published: "2026-10-23",
    audience: {
      claim: "For whoever opens every application and retypes it into a tracker.",
      body: "Owners, office managers, and HR leads at companies with roughly 10 to 200 people who hire a few times a year and get applications by email and a form. There is a clear owner, a written job description, and a pile that grows faster than anyone can read it.",
    },
    replaces: [
      "Opening every emailed resume just to find the basics",
      "Retyping names, experience, and contact details into a tracker",
      "Reviewing applicants in the order they arrived instead of by fit",
      "Losing track of who still needs a reply or a second copy of a resume",
    ],
    howItWorks: [
      {
        title: "The application arrives where it already does",
        body: "Candidates keep applying by email or through your form. A rule picks up each application so nobody changes how they apply.",
      },
      {
        title: "The details are read and structured",
        body: "Contact details, experience, skills, and availability are pulled from the resume and the message into one candidate record.",
      },
      {
        title: "The record is compared to the job",
        body: "Your must-haves for the role, written down once, are checked against each record. Only job criteria are compared. Names, photos, and personal details are not scored.",
      },
      {
        title: "Everyone is logged and sorted",
        body: "Each applicant gets one tracker row, with the strongest matches first and a plain note on what was and wasn’t found.",
      },
      {
        title: "A person reviews and decides",
        body: "Someone opens the list, shortlists, and follows up. Unreadable or incomplete applications are flagged for a person to chase. Nobody is rejected automatically.",
      },
    ],
    sections: [
      {
        heading: "What AI resume screening does",
        paragraphs: [
          "AI resume screening reads each application, pulls out the details a person would otherwise retype, and compares them to the requirements you wrote for the job. It turns a pile of PDFs into a sorted list with notes.",
          "It is a first-reader tool for the front of the hiring process. It does not interview, rank people on anything but the written job criteria, or make hiring decisions.",
        ],
      },
      {
        heading: "What gets extracted from each resume",
        paragraphs: [
          "Every application becomes one record with the same fields, whatever the resume’s layout looks like. This is the part people often call resume parsing:",
        ],
        bullets: [
          "Name and contact details",
          "The role applied for",
          "Years and type of experience",
          "Skills and tools mentioned",
          "Availability and start date, when stated",
          "Which of the job’s must-haves were found and which were not",
        ],
      },
      {
        heading: "Where a person stays in the loop",
        paragraphs: [
          "The workflow sorts and notes. People decide. It never rejects an applicant, and a lower match stays on the list for anyone who wants to look. Anything missing or unreadable is flagged so a person can ask for another copy.",
          "Some places regulate automated tools used in hiring, so it is worth checking the rules that apply to you before you start. Keeping a person in charge of every decision, and scoring only against written job criteria, is the safer design either way.",
        ],
      },
      {
        heading: "Which tools it connects to",
        paragraphs: [
          "A project like this is scoped around what you already use: usually a shared jobs inbox such as Gmail or Outlook, an application form such as Google Forms, and a tracker such as Google Sheets. The example on this page uses Gmail, Google Forms, Google Sheets, the Anthropic API, and Slack.",
        ],
        link: { text: "See how workflow projects are scoped and priced", href: "/services" },
      },
      {
        heading: "Is resume screening automation right for your business?",
        paragraphs: [
          "A short checklist tells you whether this is worth building:",
        ],
        bullets: [
          "Applications arrive as emailed documents or form submissions",
          "Someone clearly owns hiring and will review the output",
          "You hire often enough that the pile keeps coming back",
          "The job’s must-haves are written down before the posting goes live",
        ],
        link: { text: "Book a consultation to check your hiring process", href: "/consulting" },
      },
    ],
    faqs: [
      {
        question: "How do I automate resume screening?",
        answer:
          "Route applications to one inbox or form, then use a workflow that reads each resume, extracts the details, compares them to the job’s written must-haves, and logs one row per applicant in a tracker. A person reviews the sorted list and makes every decision.",
      },
      {
        question: "Is this just resume parsing?",
        answer:
          "Parsing is the first step: turning a resume into structured fields. This workflow also compares those fields to your job criteria, flags anything missing or unreadable, and logs and sorts every applicant so the review can start from a list.",
      },
      {
        question: "Does it reject candidates automatically?",
        answer:
          "No. It sorts and adds notes. Every shortlist and every rejection is a person’s decision, and lower matches stay on the list.",
      },
      {
        question: "Are there rules about using AI to screen applicants?",
        answer:
          "Some places regulate automated tools used in hiring decisions. We are not lawyers, so check the rules that apply to you. This workflow is designed to keep a person in charge of every decision and to compare only against written job criteria.",
      },
      {
        question: "Can it work with our applicant tracking system?",
        answer:
          "It can be scoped around the system you use. Many small teams start with a shared Google Sheet and connect an applicant tracking system later.",
      },
      {
        question: "Does it read resumes from both email and application forms?",
        answer:
          "Yes. Emailed attachments and form submissions can feed the same tracker so every applicant is logged the same way.",
      },
      {
        question: "Is this a real client project?",
        answer:
          "This is an example build with a fictional company and candidates. It shows the kind of hiring workflow we scope for small business HR and operations teams, not a named client project.",
      },
    ],
  },
  "invoice-intake": {
    seoTitle: "AI Invoice Processing for Small Business",
    seoDescription:
      "Automate invoice data entry with AI invoice processing. Emailed invoices are read, checked, and filed to your sheet or accounting tool; odd ones wait for you.",
    headline: "AI invoice processing for small business finance teams",
    published: "2026-10-23",
    audience: {
      claim: "For whoever keeps retyping invoices into a spreadsheet.",
      body: "Owners, office managers, and finance leads at companies with roughly 10 to 200 people, where vendor invoices land in a shared inbox and one person copies the vendor, number, date, and amount into a sheet or accounting tool. It is steady, repetitive work with a clear owner, which is the kind that automates well.",
    },
    replaces: [
      "Opening each emailed PDF just to retype the vendor, number, date, and amount",
      "Invoices sitting in a shared inbox until someone has time to enter them",
      "Paying late because a due date never made it into the sheet",
      "Entering the same invoice twice because nobody could tell it was already in",
    ],
    howItWorks: [
      {
        title: "The invoice arrives where it already does",
        body: "Vendors keep emailing the same address. A rule picks up messages with an invoice attached, so nobody has to change how they send them.",
      },
      {
        title: "The fields are read and structured",
        body: "Vendor, invoice number, invoice date, due date, amount, and a suggested category are pulled from the PDF or the email body into one clean record.",
      },
      {
        title: "The record is checked against your rules",
        body: "Is this a known vendor? Is the amount in its usual range? Has this invoice number been seen before? Is a due date present? The rules are yours, written down once.",
      },
      {
        title: "Clean invoices file themselves",
        body: "A passing record is added to your Google Sheet or accounting tool without anyone touching it. A weekly digest shows what was filed.",
      },
      {
        title: "Anything unusual waits for a person",
        body: "A failed check goes to Slack or email with the reason attached. Someone approves or edits it, and it files like the rest.",
      },
    ],
    sections: [
      {
        heading: "What AI invoice processing does for accounts payable",
        paragraphs: [
          "AI invoice processing reads the invoices that arrive by email, pulls out the fields someone would otherwise retype, and puts them where you track bills. That makes it invoice data entry automation for the first step of accounts payable: open the document, find the details, record them.",
          "It does not decide what gets paid. The automation handles the reading and the filing. A person still owns approval and payment.",
        ],
      },
      {
        heading: "What gets extracted from each invoice",
        paragraphs: [
          "Every invoice becomes one structured record with the same fields, whatever the vendor’s layout looks like:",
        ],
        bullets: [
          "Vendor name",
          "Invoice number",
          "Invoice date and due date",
          "Total amount",
          "A suggested spending category you can accept or change",
          "The result of each check: known vendor, usual amount, not a duplicate",
        ],
      },
      {
        heading: "Where a person stays in the loop",
        paragraphs: [
          "The workflow is built so that routine invoices pass quietly and unusual ones stop. A new vendor, an amount well outside the usual range, a missing due date, or a possible duplicate each pause the invoice and send it to a person with the reason.",
          "That keeps the work where it belongs: software does the repetitive reading, and a person makes the judgment calls. It also means a wrong read is caught at the review step instead of surfacing later in your books.",
        ],
      },
      {
        heading: "Which tools it connects to",
        paragraphs: [
          "A project like this is scoped around what you already use: usually a shared inbox such as Gmail or Outlook, a destination such as Google Sheets or QuickBooks Online, and Slack or email for the review step. The example on this page uses Gmail, the Anthropic API, Google Sheets, QuickBooks Online, and Slack.",
        ],
        link: { text: "See how workflow projects are scoped and priced", href: "/services" },
      },
      {
        heading: "Is invoice automation right for your business?",
        paragraphs: [
          "A short checklist tells you whether this is worth building:",
        ],
        bullets: [
          "Invoices arrive as emailed documents or text, not only through a portal",
          "Someone clearly owns accounts payable and would notice a mistake",
          "Invoices come in every week, not once a quarter",
          "The data goes to an internal sheet or accounting tool first, where a mistake is cheap to fix",
        ],
        link: { text: "Book a consultation to check your invoice process", href: "/consulting" },
      },
    ],
    faqs: [
      {
        question: "How do I automate invoice data entry?",
        answer:
          "Route vendor invoices to one inbox, then use a workflow that reads each emailed invoice, extracts the vendor, number, dates, and amount, checks them against your rules, and writes the record to your sheet or accounting tool. Invoices that fail a check go to a person for approval.",
      },
      {
        question:
          "Can invoices be pulled from email into Google Sheets or QuickBooks automatically?",
        answer:
          "Yes. A workflow can watch an inbox, read the attached invoice, and add a row to Google Sheets or create a bill in QuickBooks Online. The setup depends on your inbox, your chart of accounts, and which checks you want before anything is filed.",
      },
      {
        question: "Does the automation approve or pay invoices?",
        answer:
          "No. It reads and files. Approval and payment stay with a person. The review step exists so that unusual invoices are looked at before they reach your books.",
      },
      {
        question: "What happens when an invoice is unusual or read wrong?",
        answer:
          "It stops. An unknown vendor, an out-of-range amount, a possible duplicate, or a missing field sends the invoice to Slack or email with the reason. Someone approves or edits it, and only then does it file.",
      },
      {
        question: "Is this just invoice OCR?",
        answer:
          "No. OCR turns a scanned page into text. This workflow also finds the right fields, checks them against your rules, and routes anything unusual to a person, so the output is a filed record rather than a block of text.",
      },
      {
        question: "Can it catch duplicate invoices?",
        answer:
          "Yes. Each invoice number and vendor pair is compared against what has already been filed. A possible duplicate is held for review instead of being entered a second time.",
      },
      {
        question: "Do I need accounts payable software for this?",
        answer:
          "Not necessarily. Many small teams start by filing to a shared Google Sheet and add an accounting-tool connection later. The workflow is scoped around the tools you already use.",
      },
      {
        question: "Is this a real client project?",
        answer:
          "This is an example build with fictional vendors and data. It shows the kind of invoice workflow we scope for small business finance and operations teams, not a named client project.",
      },
    ],
  },
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
