import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The 7-Day Automation Audit | Automation Labs",
  description:
    "Find the automation opportunities hiding in your team's work. A free 7-day guide covering one department per day — HR, Sales, Marketing, Operations, Finance, Customer Service.",
  keywords:
    "automation audit, SMB automation, HR automation, sales automation, marketing automation, operations automation, finance automation, customer service automation",
  openGraph: {
    title: "The 7-Day Automation Audit | Automation Labs",
    description:
      "Find the automation opportunities hiding in your team's work. One department per day for seven days.",
    type: "website",
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} antialiased min-h-screen bg-white font-sans`}>
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}
