import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailCapture } from "@/components/EmailCapture";
import { getPack } from "@/content/packs";
import { formatDate, getPlay, plays } from "@/content/plays";
import { NEWSLETTER } from "@/lib/newsletter";
import { siteUrl } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return plays.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const play = getPlay(params.slug);
  if (!play) return { title: "Play not found" };
  return {
    title: play.title,
    description: play.summary,
    alternates: { canonical: `/plays/${play.slug}` },
    openGraph: { type: "article", title: play.title, description: play.summary },
  };
}

export default function PlayPage({ params }: Props) {
  const play = getPlay(params.slug);
  if (!play) notFound();
  const pack = play.pack ? getPack(play.pack) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: play.title,
    description: play.summary,
    datePublished: play.publishedOn,
    url: `${siteUrl}/plays/${play.slug}`,
    step: play.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <article className="bg-white py-14 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-3xl px-4">
        <Link href="/plays" className="mb-8 inline-block text-sm font-semibold text-gray-500 hover:text-gray-900">
          ← All plays
        </Link>
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-gray-500">
          {play.topic} · {formatDate(play.publishedOn)}
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-gray-900 sm:text-5xl">
          {play.title}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-gray-700 sm:text-xl">{play.intro}</p>

        {play.videoUrl && (
          <p className="mb-10">
            <a href={play.videoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Watch the video
            </a>
          </p>
        )}

        <ol className="mb-12 space-y-8">
          {play.steps.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black font-mono text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">{step.title}</h2>
                <p className="leading-relaxed text-gray-700">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mb-12 border-l-4 border-gray-900 bg-gray-50 p-6">
          <p className="mb-2 font-bold text-gray-900">The honest part</p>
          <p className="text-gray-700">{play.honest}</p>
        </div>

        {pack ? (
          <div className="rounded-xl bg-black p-8 text-white">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-400">
              Free pack · {pack.prompts.length} prompts
            </p>
            <h2 className="mb-3 text-2xl font-bold">Get every prompt for this play</h2>
            <p className="mb-6 text-gray-300">{pack.teaser}</p>
            <Link
              href={`/get/${pack.keyword}`}
              className="btn-press inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
            >
              Get the free pack
            </Link>
          </div>
        ) : (
          <div className="rounded-xl bg-black p-8 text-white">
            <h2 className="mb-3 text-2xl font-bold">Get {NEWSLETTER.name}</h2>
            <p className="mb-6 text-gray-300">{NEWSLETTER.promise}</p>
            <EmailCapture source={`play-${play.slug}`.slice(0, 40)} tone="dark" />
          </div>
        )}
      </div>
    </article>
  );
}
