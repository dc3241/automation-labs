import type { Metadata } from "next";
import HomePage from "./HomePage";
import { siteUrl } from "@/lib/site";

const description =
  "Useful AI and Claude tricks you can use tonight, new tools with honest prices, and free prompt packs. Lab Notes: one email a week.";

export const metadata: Metadata = {
  title: { absolute: "Automation Labs | Useful AI and Claude tricks, one email a week" },
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
