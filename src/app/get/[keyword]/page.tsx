import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import { EmailCapture } from "@/components/EmailCapture";
import { getPack } from "@/content/packs";
import { NEWSLETTER, SUBSCRIBER_COOKIE } from "@/lib/newsletter";

type Props = { params: { keyword: string } };

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: Props): Metadata {
  const pack = getPack(params.keyword);
  if (!pack) return { title: "Pack not found" };
  return {
    title: pack.title,
    description: pack.teaser,
    alternates: { canonical: `/get/${pack.keyword}` },
  };
}

export default function PackPage({ params }: Props) {
  const pack = getPack(params.keyword);
  if (!pack) notFound();

  const unlocked = cookies().get(SUBSCRIBER_COOKIE)?.value === "1";

  return (
    <div className="bg-white">
      <section className="hero-atmosphere border-b border-gray-200 py-14 lg:py-20">
        <div className="hm-grid" aria-hidden />
        <div className="hero-atmosphere__content container mx-auto max-w-3xl px-4">
          <p className="hm-eyebrow mb-6">Free pack · {pack.prompts.length} prompts</p>
          <h1 className="mb-5 text-4xl font-bold leading-[1.1] text-gray-900 sm:text-5xl">
            {pack.title}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">{pack.teaser}</p>

          {!unlocked && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="mb-4 font-semibold text-gray-900">
                Enter your email and the full pack unlocks right here.
              </p>
              <EmailCapture
                source={pack.keyword}
                buttonLabel="Unlock the pack"
                refreshOnSuccess
                note={`You'll also get ${NEWSLETTER.name}: ${NEWSLETTER.cadence.toLowerCase()}, unsubscribe anytime.`}
              />
            </div>
          )}
        </div>
      </section>

      {!unlocked ? (
        <section className="py-14">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">What's inside</h2>
            <ol className="space-y-3">
              {pack.outline.map((item, i) => (
                <li key={item} className="flex gap-4 rounded-lg border border-gray-200 p-4">
                  <span className="font-mono text-sm font-semibold text-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-800">{item}</span>
                  <span className="ml-auto text-gray-300" aria-label="Locked">
                    <LockIcon />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : (
        <section className="py-14">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-10 rounded-xl bg-gray-50 p-6">
              <h2 className="mb-3 text-lg font-bold text-gray-900">Before you start</h2>
              <ul className="list-disc space-y-2 pl-5 text-gray-700">
                {pack.beforeYouStart.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              {pack.prompts.map((p) => (
                <article key={p.title} className="rounded-xl border border-gray-200 shadow-sm">
                  <header className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 p-5">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{p.when}</p>
                    </div>
                    <CopyButton text={p.prompt} />
                  </header>
                  <pre className="whitespace-pre-wrap break-words p-5 font-mono text-sm leading-relaxed text-gray-800">
                    {p.prompt}
                  </pre>
                </article>
              ))}
            </div>

            {pack.play && (
              <p className="mt-10 text-gray-600">
                Want the walkthrough?{" "}
                <Link href={`/plays/${pack.play}`} className="font-semibold text-gray-900 underline">
                  Read the full play
                </Link>
                .
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth={2} />
      <path d="M8 11V7a4 4 0 118 0v4" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
