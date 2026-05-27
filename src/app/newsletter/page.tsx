import type { Metadata } from "next";
import NewsletterPage from "./NewsletterPage";

export const metadata: Metadata = {
  title: "The Automation Labs Newsletter | Smart Tools, Workflows, and Custom Builds",
  description:
    "One email per week. One department in focus. One tool, one workflow, and one custom build — every Monday. For SMB operators who want to automate the work.",
};

export default function Newsletter() {
  return <NewsletterPage />;
}
