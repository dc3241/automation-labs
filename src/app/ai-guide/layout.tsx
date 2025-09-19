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
  title: "7-Day AI Automation Quick Start Guide | Automation Labs",
  description: "Transform your business with our comprehensive 7-day AI automation guide. Learn to automate processes, increase efficiency, and scale your business with proven AI tools and strategies.",
  keywords: "AI automation, business automation, AI tools, automation guide, productivity, business efficiency",
  openGraph: {
    title: "7-Day AI Automation Quick Start Guide",
    description: "Transform your business with AI automation in just 7 days",
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
