import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services | Automation Labs",
  description:
    "Workflow automation and custom internal tool builds for SMB teams. We wire your tools together, or build new ones when off-the-shelf isn't enough.",
  openGraph: {
    title: "Services | Automation Labs",
    description: "Workflow automation and custom internal tool builds for SMB teams.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function Services() {
  return <ServicesPage />;
}
