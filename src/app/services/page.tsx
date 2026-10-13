import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services | Automation Labs",
  description:
    "A $250 working session, workflow automation, and custom internal tools for SMB teams.",
  openGraph: {
    title: "Services | Automation Labs",
    description:
      "A $250 working session, workflow automation, and custom internal tools for SMB teams.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function Services() {
  return <ServicesPage />;
}
