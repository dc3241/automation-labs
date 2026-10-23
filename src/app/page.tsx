import type { Metadata } from "next";
import HomePage from "./HomePage";
import { siteUrl } from "@/lib/site";

const description =
  "Tell us the repetitive work eating your team's week. We build the automation: invoices, applications, lead research. Fixed quotes from $1,500.";

export const metadata: Metadata = {
  title: { absolute: "Automation Labs | Business Automation for Small Teams" },
  description,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Automation Labs",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      description,
      sameAs: ["https://www.youtube.com/@automationlabs.business"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Automation Labs",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
