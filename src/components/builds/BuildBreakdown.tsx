import Link from "next/link";
import {
  buildKicker,
  type Build,
} from "@/data/builds";
import type { BuildBreakdown as BuildBreakdownCopy } from "@/data/build-breakdowns";
import { BuildBeatBlock, BuildVisualSlot } from "@/components/builds/BuildCaseStudy";

type BuildBreakdownProps = {
  build: Build;
  breakdown: BuildBreakdownCopy;
  related: Build[];
};

export function BuildBreakdown({
  build,
  breakdown,
  related,
}: BuildBreakdownProps) {
  return (
    <div className="bg-white">
      <article className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/projects" className="hover:text-gray-900">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium">{build.title}</li>
            </ol>
          </nav>

          <header className="max-w-3xl space-y-3 sm:space-y-4">
            <p className="text-sm font-semibold text-gray-500">
              {buildKicker(build)}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {breakdown.headline}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {build.hook}
            </p>
            {build.isDemo && build.demoNote ? (
              <p className="text-sm text-gray-500 italic">{build.demoNote}</p>
            ) : null}
          </header>

          <div className="mt-8 sm:mt-10">
            <BuildVisualSlot build={build} priority />
          </div>

          <div className="max-w-3xl mt-10 sm:mt-12 space-y-10">
            <BuildBeatBlock label="The problem" beat={build.problem} />
            <BuildBeatBlock label="The build" beat={build.build} />
            <BuildBeatBlock label="The result" beat={build.result} />

            <section className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Who it&apos;s for
              </h2>
              <p className="text-lg sm:text-xl text-gray-900 leading-snug">
                {breakdown.audience.claim}
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {breakdown.audience.body}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                What it replaces
              </h2>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed list-disc pl-5">
                {breakdown.replaces.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                How it works
              </h2>
              <ol className="space-y-6">
                {breakdown.howItWorks.map((step, index) => (
                  <li key={step.title} className="space-y-1">
                    <h3 className="text-lg sm:text-xl text-gray-900 leading-snug">
                      <span className="text-gray-400 font-semibold mr-2">
                        {index + 1}.
                      </span>
                      {` ${step.title}`}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-7">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Stack
              </h2>
              <ul className="flex flex-wrap gap-2">
                {build.stack.map((tool) => (
                  <li
                    key={tool}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Questions teams ask
              </h2>
              <div className="space-y-6">
                {breakdown.faqs.map((faq) => (
                  <div key={faq.question} className="space-y-2">
                    <h3 className="text-lg text-gray-900 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Want something like this for your team?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Every build starts from a written scope and a fixed quote. Not sure
            this is the right shape? A{" "}
            <Link
              href="/consulting"
              className="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-700"
            >
              consultation
            </Link>{" "}
            is how we decide, and{" "}
            <Link
              href="/services"
              className="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-700"
            >
              services
            </Link>{" "}
            lists how custom solutions and workflow projects are priced.
          </p>
          <Link
            href={build.cta.href}
            className="btn-press bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-flex items-center justify-center"
          >
            {build.cta.label}
          </Link>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="py-12 sm:py-16 bg-white" aria-label="Related builds">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Other builds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/${item.slug}`}
                  className="surface-card block rounded-lg border border-gray-200 bg-white shadow-sm p-6"
                >
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    {buildKicker(item)}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.hook}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
