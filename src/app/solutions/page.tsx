import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions: back-office automation for HR and finance",
  description:
    "Invoice processing, hiring pipeline and onboarding automations we build for your team. A person approves every decision.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <div className="bg-white py-14 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <p className="hm-eyebrow mb-6">Solutions</p>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          Back-office automation, built for your team.
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-gray-600">
          Internal tools for finance and HR. They do the repetitive work and flag what needs
          attention. A person makes every decision.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group flex flex-col rounded-xl border border-gray-200 p-6 transition hover:border-gray-400"
            >
              <span className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                {s.department}
              </span>
              <h2 className="mb-2 text-xl font-bold text-gray-900">{s.name}</h2>
              <p className="mb-4 flex-1 text-gray-600">{s.tagline}</p>
              {s.startingAt && <p className="mb-3 text-sm text-gray-500">{s.startingAt}</p>}
              <span className="font-semibold text-gray-900 group-hover:underline">
                See how it works →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
