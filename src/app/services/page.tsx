import type { Metadata } from "next";
import { CONSULTING_PRICE_LABEL } from "@/lib/consulting";
import ServicesPage from "./ServicesPage";

const description = `A ${CONSULTING_PRICE_LABEL} consultation, workflow automation, and custom internal tools for SMB teams.`;

export const metadata: Metadata = {
  title: "Services | Automation Labs",
  description,
  openGraph: {
    title: "Services | Automation Labs",
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function Services() {
  return <ServicesPage />;
}
