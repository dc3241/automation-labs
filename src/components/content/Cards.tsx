import Link from "next/link";
import { formatDate, type Play } from "@/content/plays";
import { toolHref, type Tool } from "@/content/tools";

export function PlayCard({ play }: { play: Play }) {
  return (
    <Link
      href={`/plays/${play.slug}`}
      className="surface-card group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-400"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-500">
        {play.topic} · {formatDate(play.publishedOn)}
      </p>
      <h3 className="mb-2 text-xl font-bold leading-snug text-gray-900">{play.title}</h3>
      <p className="mb-5 flex-1 text-gray-600">{play.summary}</p>
      <span className="arrow-link text-sm font-semibold text-gray-900">
        Read the play <span className="arrow">→</span>
      </span>
    </Link>
  );
}

export function PackCard({
  pack,
}: {
  pack: { keyword: string; title: string; teaser: string; count: number };
}) {
  return (
    <Link
      href={`/get/${pack.keyword}`}
      className="group flex h-full flex-col rounded-xl border border-gray-800 bg-gray-950 p-6 text-white transition hover:border-gray-500"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-400">
        Free pack · {pack.count} prompts
      </p>
      <h3 className="mb-2 text-xl font-bold leading-snug">{pack.title}</h3>
      <p className="mb-5 flex-1 text-gray-400">{pack.teaser}</p>
      <span className="arrow-link text-sm font-semibold">
        Get it free <span className="arrow">→</span>
      </span>
    </Link>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  const sponsored = Boolean(tool.affiliateUrl);
  return (
    <article className="surface-card flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-wider text-gray-500">{tool.category}</p>
        {tool.hasFreePlan && (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
            Free plan
          </span>
        )}
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{tool.name}</h3>
      <p className="mb-3 text-gray-600">{tool.blurb}</p>
      <p className="mb-4 text-sm text-gray-600">
        <span className="font-semibold text-gray-900">Best for:</span> {tool.bestFor}
      </p>
      <div className="mt-auto border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-800">{tool.pricing}</p>
        <p className="mt-1 text-xs text-gray-500">
          Price checked {formatDate(tool.priceCheckedOn)} on the official pricing page.
        </p>
        <a
          href={toolHref(tool)}
          target="_blank"
          rel={sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"}
          className="arrow-link mt-4 inline-flex text-sm font-semibold text-gray-900"
        >
          Try {tool.name} <span className="arrow ml-1">→</span>
        </a>
      </div>
    </article>
  );
}
