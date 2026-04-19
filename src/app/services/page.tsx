import type { Metadata } from "next";
import ServicesHero from "@/components/ServicesHero";
import ServicesIntakeForm from "@/components/ServicesIntakeForm";

export const metadata: Metadata = {
  title: "Ecommerce Automation Services | Automation Labs",
  description:
    "Custom-coded automation systems built specifically for ecommerce brands. Order intelligence, review pipelines, SKU profitability tracking — deployed and running in 2-3 weeks. You own the code.",
  openGraph: {
    title: "Ecommerce Automation Services | Automation Labs",
    description:
      "Custom-coded automation systems built specifically for ecommerce brands. Order intelligence, review pipelines, SKU profitability tracking — deployed and running in 2-3 weeks. You own the code.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <ServicesHero />
      <section
        className="w-full py-12 sm:py-16 lg:py-20 bg-gray-50"
        aria-label="Why shortcut-heavy automation builds fail ecommerce teams"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 text-lg sm:text-xl font-bold text-gray-900 leading-relaxed px-1 sm:px-0">
            <p>
              Most ecommerce brands are running their operations across four or
              five disconnected tools — and nobody&apos;s talking to each other.
              Orders live in Shopify. Fulfillment lives in a 3PL portal. Ad spend
              lives in Meta and Google. Returns live somewhere else entirely.
            </p>
            <p>
              We build custom Python automations that connect your actual stack,
              surface the insights you need daily, and run on their own in the
              background. No Make.com. No Zapier. No middleware subscription. Just
              clean code that works.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 px-2">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <p className="text-sm font-semibold text-gray-500 mb-2">Step 1</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Apply</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fill out a short intake form telling us about your ecommerce brand, your
                ops, and where you&apos;re losing the most time.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <p className="text-sm font-semibold text-gray-500 mb-2">Step 2</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Discovery call
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We spend 30 minutes mapping out your exact workflow, pain points,
                and what a successful automation looks like for you.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <p className="text-sm font-semibold text-gray-500 mb-2">Step 3</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Build and deploy
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                You get a fully deployed, custom automation within 2–3 weeks. We
                walk you through it, hand over the code, and you own it forever.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-1 sm:px-0">
            Three productized packages. Fixed scope. Fixed price. No surprises.
          </p>
          <div className="flex flex-col gap-8 sm:gap-10 max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Package 01 — For ecommerce brands
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Order Intelligence Dashboard
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Stop logging into four tools every morning to figure out what&apos;s
                on fire. Get one automated daily digest — delivered to Slack and
                your inbox — that surfaces delayed shipments, return spikes, low
                inventory, and flagged orders before your team even starts their
                day. Pulls from Shopify, your 3PL, and your returns platform.
                Runs on its own. Nothing to babysit.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-lg font-semibold text-gray-900">
                  $2,500 – $3,500
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  + optional $350/mo maintenance
                </p>
              </div>
            </article>
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Package 02 — For ecommerce brands
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Review Intelligence Pipeline
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Your customers are telling you exactly what&apos;s broken — in
                your reviews. Most brands never read them at scale. We build a
                system that ingests every review, classifies the root cause using
                AI, routes product issues to your team, and drafts responses for
                your support staff automatically. Turn your review inbox into an
                R&amp;D system.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-lg font-semibold text-gray-900">
                  $2,000 – $3,000
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  + optional $300/mo maintenance
                </p>
              </div>
            </article>
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Package 03 — For ecommerce brands
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                SKU Profitability Engine
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Most ecommerce brands are making inventory and ad spend decisions
                based on revenue numbers that don&apos;t tell the full story. We
                build a system that pulls your Shopify sales data, ad spend
                across Meta and Google, and your fulfillment costs — and
                calculates your true margin per SKU automatically. A clean weekly
                report lands in your inbox showing exactly which products are
                making money and which ones are quietly bleeding it.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-lg font-semibold text-gray-900">
                  $3,000 – $4,500
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  + optional $400/mo maintenance
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-900 px-2">
              You own the code. We don&apos;t hold it hostage.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-1 sm:px-0">
              Every automation we build is yours. Full source code,
              documentation, and a walkthrough video. If you want to take it to
              another developer to maintain or extend it — go ahead. No lock-in,
              no platform dependency, no monthly fee to us unless you want it.
              Most automation tools disappear when you cancel your subscription.
              Ours don&apos;t.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-stretch mb-10 sm:mb-12">
              <div className="flex-1 min-w-0 sm:min-w-[200px] max-w-sm w-full sm:max-w-sm mx-auto sm:mx-0 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-center">
                <p className="text-sm font-semibold text-gray-900">
                  Custom Python code
                </p>
                <p className="text-xs text-gray-600 mt-1.5 leading-snug">
                  not no-code workflows
                </p>
              </div>
              <div className="flex-1 min-w-0 sm:min-w-[200px] max-w-sm w-full sm:max-w-sm mx-auto sm:mx-0 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-center">
                <p className="text-sm font-semibold text-gray-900">
                  Deployed and running
                </p>
                <p className="text-xs text-gray-600 mt-1.5 leading-snug">
                  not just a blueprint
                </p>
              </div>
              <div className="flex-1 min-w-0 sm:min-w-[200px] max-w-sm w-full sm:max-w-sm mx-auto sm:mx-0 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-center">
                <p className="text-sm font-semibold text-gray-900">
                  You own it forever
                </p>
                <p className="text-xs text-gray-600 mt-1.5 leading-snug">
                  no platform lock-in
                </p>
              </div>
            </div>
            <aside className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
              <p className="text-sm text-gray-700 leading-relaxed">
                Built by an operator who ships systems, not slide decks. Automation Labs is run by
                someone who has spent years inside ecommerce and tech operations
                — building QA systems, Python automations, and multi-channel
                workflows from scratch. We build what we&apos;d want running our
                own ecommerce brand.
              </p>
            </aside>
          </div>
        </div>
      </section>
      <ServicesIntakeForm />
    </div>
  );
}
