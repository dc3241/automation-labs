import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/content/Cards";
import { EmailCapture } from "@/components/EmailCapture";
import { tools } from "@/content/tools";
import { NEWSLETTER } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "Tools worth trying",
  description:
    "AI and productivity tools worth trying, with prices checked on each official pricing page.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <div className="bg-white py-14 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <p className="hm-eyebrow mb-6">Tools</p>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Tools worth trying.</h1>
        <p className="mb-3 max-w-2xl text-lg text-gray-600">
          What each one does, who it&apos;s for, and what it costs. Every price is checked on the
          tool&apos;s official pricing page, and the date is on the card.
        </p>
        <p className="mb-12 max-w-2xl text-sm text-gray-500">
          Some links are affiliate links: if you sign up, we may earn a commission at no extra cost
          to you. It never decides what we list. See our{" "}
          <Link href="/terms" className="underline">
            terms
          </Link>
          .
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-xl border border-gray-200 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">One new tool every week</h2>
          <p className="mb-6 text-gray-600">
            {NEWSLETTER.name} covers one new tool in every issue, price checked.
          </p>
          <EmailCapture source="tools" />
        </div>
      </div>
    </div>
  );
}
