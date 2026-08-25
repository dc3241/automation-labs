import Link from "next/link";
import type { Build } from "@/data/builds";
import { Reveal } from "@/components/Reveal";
import { SignalFlowDiagram } from "@/components/SignalFlowDiagram";

type BuildVisualSlotProps = {
  build: Build;
  priority?: boolean;
};

export function BuildVisualSlot({ build, priority = false }: BuildVisualSlotProps) {
  const { visual } = build;

  if (visual.src) {
    return (
      <figure className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
        <img
          src={visual.src}
          alt={visual.alt}
          className="w-full h-auto object-cover"
          loading={priority ? "eager" : "lazy"}
        />
      </figure>
    );
  }

  return (
    <figure aria-label={`${visual.alt} — placeholder`}>
      <SignalFlowDiagram />
      {visual.placeholderHint ? (
        <p className="mt-2 text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
          {visual.placeholderHint}
        </p>
      ) : null}
    </figure>
  );
}

type BuildCaseStudyProps = {
  build: Build;
  priorityVisual?: boolean;
};

export function BuildCaseStudy({
  build,
  priorityVisual = false,
}: BuildCaseStudyProps) {
  return (
    <Reveal
      as="article"
      id={build.slug}
      className="scroll-mt-24 border-b border-gray-200 last:border-b-0 py-12 sm:py-16 first:pt-0 last:pb-0"
    >
      <div className="space-y-6 sm:space-y-8">
        <header className="space-y-3 sm:space-y-4">
          <p className="text-sm font-semibold text-gray-500">
            {build.department} · {build.engagementType}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {build.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
            {build.hook}
          </p>
          {build.isDemo && build.demoNote ? (
            <p className="text-sm text-gray-500 italic max-w-3xl">
              {build.demoNote}
            </p>
          ) : null}
        </header>

        <BuildVisualSlot build={build} priority={priorityVisual} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              The problem
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {build.problem}
            </p>
          </section>
          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              The build
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {build.build}
            </p>
          </section>
          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              The result
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {build.result}
            </p>
          </section>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {build.stack.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
          <p className="text-sm sm:text-base text-gray-700">
            Want something like this for your team?{" "}
            <Link
              href={build.cta.href}
              className="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-700 arrow-link"
            >
              {build.cta.label}
              <span aria-hidden className="arrow ml-0.5">
                →
              </span>
            </Link>
          </p>
        </div>
      </div>
    </Reveal>
  );
}

type BuildTeaserCardProps = {
  build: Build;
  index?: number;
};

export function BuildTeaserCard({ build, index }: BuildTeaserCardProps) {
  return (
    <Reveal index={index} as="article" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <p className="text-sm font-semibold text-gray-500 mb-2">
        {build.department} · {build.engagementType}
      </p>
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
        {build.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
        {build.hook}
      </p>
      <Link
        href={`/projects#${build.slug}`}
        className="text-sm font-semibold text-gray-900 hover:text-gray-700 inline-flex items-center arrow-link"
      >
        Read the case study
        <span aria-hidden className="arrow ml-1">
          →
        </span>
      </Link>
    </Reveal>
  );
}
