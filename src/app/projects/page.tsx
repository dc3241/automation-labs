import type { Metadata } from "next";
import Link from "next/link";
import { BuildCaseStudy } from "@/components/builds/BuildCaseStudy";
import { builds } from "@/data/builds";

export const metadata: Metadata = {
  title: "Builds | Automation Labs",
  description:
    "Real internal tools and dashboards we've built for SMB teams — across marketing, finance, operations, and more. No mockups, no ecommerce placeholders. What's live, what it replaced, and how it works.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-white">
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3 sm:mb-4">
            Case studies
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            What we&apos;ve actually built.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            No mockups, no &quot;coming soon.&quot; Every build below is live, in
            use, and built for a real team.
          </p>
        </div>
      </section>

      <section
        className="pb-12 sm:pb-16 lg:pb-20 bg-white"
        aria-label="Build case studies"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            Department filter pills: every Build has a `department` field.
            Use shouldShowDepartmentFilters() from @/data/builds once the
            gallery hits DEPARTMENT_FILTER_THRESHOLD (~5–6). Not worth UI yet.
          */}
          <div className="max-w-5xl mx-auto">
            {builds.map((build, index) => (
              <BuildCaseStudy
                key={build.id}
                build={build}
                priorityVisual={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            See how the process works.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Every build here started with a 30-45 minute discovery call and a
            fixed quote before any work began.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/services"
              className="btn-press bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-flex items-center justify-center"
            >
              View services &amp; pricing
            </Link>
            <Link
              href="/contact"
              className="btn-press border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-white inline-flex items-center justify-center"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
