import Link from "next/link";
import { buildKicker, type Build, type BuildBeat } from "@/data/builds";
import { Reveal } from "@/components/Reveal";
import { SignalFlowDiagram } from "@/components/SignalFlowDiagram";

type BuildVisualSlotProps = {
  build: Build;
  priority?: boolean;
};

function BuildScreenshot({
  visual,
  priority = false,
}: {
  visual: Build["visual"];
  priority?: boolean;
}) {
  if (!visual.src) return null;

  return (
    <figure className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
      <img
        src={visual.src}
        alt={visual.alt}
        className="w-full h-auto object-cover"
        loading={priority ? "eager" : "lazy"}
      />
      {visual.caption ? (
        <figcaption className="px-3 py-2 text-xs sm:text-sm text-gray-500 leading-relaxed bg-white border-t border-gray-200">
          {visual.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function BuildVisualSlot({ build, priority = false }: BuildVisualSlotProps) {
  const shots = [build.visual, ...(build.gallery ?? [])].filter(
    (shot) => Boolean(shot.src)
  );

  if (shots.length === 0) {
    const { visual } = build;
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

  const [hero, ...rest] = shots;

  return (
    <div className="space-y-3">
      <BuildScreenshot visual={hero} priority={priority} />
      {rest.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rest.map((shot) => (
            <BuildScreenshot key={shot.src} visual={shot} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function BuildBeatBlock({ label, beat }: { label: string; beat: BuildBeat }) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </h2>
      <p className="text-lg sm:text-xl text-gray-900 leading-snug">{beat.claim}</p>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{beat.body}</p>
    </section>
  );
}

type BuildIndexCardProps = {
  build: Build;
  priorityVisual?: boolean;
  index?: number;
};

export function BuildIndexCard({
  build,
  priorityVisual = false,
  index,
}: BuildIndexCardProps) {
  const href = `/projects/${build.slug}`;

  return (
    <Reveal
      as="article"
      id={build.slug}
      index={index}
      className="scroll-mt-24 border-b border-gray-200 last:border-b-0 py-12 sm:py-16 first:pt-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className={build.visual.src ? "lg:col-span-6" : "lg:col-span-12"}>
          <p className="text-sm font-semibold text-gray-500">
            {buildKicker(build)}
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
            <Link href={href} className="hover:text-gray-700">
              {build.title}
            </Link>
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">{build.hook}</p>
          {build.isDemo && build.demoNote ? (
            <p className="mt-3 text-sm text-gray-500 italic">{build.demoNote}</p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            {build.stack.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
          <Link
            href={href}
            className="mt-6 inline-flex items-center text-sm sm:text-base font-semibold text-gray-900 hover:text-gray-700 arrow-link"
          >
            Read the breakdown
            <span aria-hidden className="arrow ml-1">
              →
            </span>
          </Link>
        </div>
        {build.visual.src ? (
          <Link href={href} className="lg:col-span-6 block">
            <figure className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <img
                src={build.visual.src}
                alt={build.visual.alt}
                className="w-full h-auto object-cover"
                loading={priorityVisual ? "eager" : "lazy"}
              />
            </figure>
          </Link>
        ) : null}
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
        {buildKicker(build)}
      </p>
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
        {build.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
        {build.hook}
      </p>
      <Link
        href={`/projects/${build.slug}`}
        className="text-sm font-semibold text-gray-900 hover:text-gray-700 inline-flex items-center arrow-link"
      >
        Read the breakdown
        <span aria-hidden className="arrow ml-1">
          →
        </span>
      </Link>
    </Reveal>
  );
}
