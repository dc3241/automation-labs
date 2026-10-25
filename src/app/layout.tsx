import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Automation Labs",
    template: "%s | Automation Labs",
  },
  description:
    "Automation Labs helps SMB operators automate their work with smart tools, smart workflows, and custom solutions — across HR, Sales, Marketing, Ops, Finance, and Customer Service.",
  // Resolves to each page's own URL; pages with their own canonical override it.
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Automation Labs",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
