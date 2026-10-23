import type { Metadata } from "next";
import NewsletterPage from "./NewsletterPage";

export const metadata: Metadata = {
  title: "Newsletter for SMB Operators: Smart Tools and Workflows",
  description:
    "One email per week. One department in focus. One tool, one workflow, and one custom solution — every Monday. For SMB operators who want to automate the work.",
};

export default function Newsletter() {
  return <NewsletterPage />;
}
