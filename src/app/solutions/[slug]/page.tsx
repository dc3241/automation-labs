import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SolutionInquiryForm from "@/components/solutions/SolutionInquiryForm";
import { COMPANY_SIZES, getSolution, solutions, type ExampleTone } from "@/content/solutions";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getSolution(params.slug);
  if (!s) return {};
  const path = `/solutions/${s.slug}`;
  return {
    title: s.name,
    description: s.summary,
    alternates: { canonical: path },
    openGraph: { title: s.name, description: s.summary, url: path, type: "website" },
  };
}

const toneClass: Record<ExampleTone, string> = {
  ok: "text-green-700",
  warn: "text-amber-700",
  error: "text-red-700",
};

function embedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("youtube.com") && u.searchParams.get("v"))
      return `https://www.youtube-nocookie.com/embed/${u.searchParams.get("v")}`;
    if (u.hostname === "youtu.be") return `https://www.youtube-nocookie.com/embed${u.pathname}`;
    if (u.hostname.endsWith("vimeo.com")) return `https://player.vimeo.com/video${u.pathname}`;
  } catch {
    /* fall through */
  }
  return null;
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const s = getSolution(params.slug);
  if (!s) notFound();
  const embed = s.demoVideoUrl ? embedUrl(s.demoVideoUrl) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.summary,
    url: absoluteUrl(`/solutions/${s.slug}`),
    provider: { "@type": "Organization", name: "Automation Labs" },
  };

  return (
    <div className="bg-white py-14 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container mx-auto max-w-4xl px-4">
        <Link href="/solutions" className="text-sm text-gray-500 hover:underline">
          ← All solutions
        </Link>
        <p className="hm-eyebrow mb-6 mt-6">{s.department}</p>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">{s.name}</h1>
        <p className="mb-6 max-w-2xl text-lg text-gray-600">{s.tagline}</p>
        {s.startingAt && <p className="mb-6 text-sm font-medium text-gray-700">{s.startingAt}</p>}
        <a
          href="#inquire"
          className="inline-flex rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
        >
          Ask about this
        </a>

        <section className="mt-14">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Who it&apos;s for</h2>
          <ul className="list-disc space-y-2 pl-5 text-gray-700">
            {s.forWho.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{s.problem.heading}</h2>
          <p className="max-w-3xl text-gray-700">{s.problem.body}</p>
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">How it works</h2>
          <ol className="space-y-5">
            {s.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-700">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {embed && (
          <section className="mt-14">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Watch it work</h2>
            <div className="aspect-video overflow-hidden rounded-xl border border-gray-200">
              <iframe
                src={embed}
                title={`${s.name} demo`}
                className="h-full w-full"
                loading="lazy"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <section className="mt-14">
          <h2 className="mb-1 text-2xl font-bold text-gray-900">{s.example.title}</h2>
          <p className="mb-4 text-sm text-gray-500">{s.example.caption}</p>
          <dl className="divide-y divide-gray-200 rounded-xl border border-gray-200">
            {s.example.rows.map((r) => (
              <div key={r.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="font-medium text-gray-900">{r.label}</dt>
                <dd className={`sm:text-right ${toneClass[r.tone ?? "ok"]}`}>{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">What&apos;s included</h2>
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              {s.included.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">What it doesn&apos;t do</h2>
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              {s.notIncluded.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How we work</h2>
          <p className="max-w-3xl text-gray-700">{s.engagement}</p>
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Questions</h2>
          <div className="space-y-6">
            {s.faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                <p className="mt-1 text-gray-700">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="inquire" className="mt-16 scroll-mt-24 rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Ask about this</h2>
          <p className="mb-6 text-gray-600">
            Tell us a little about your setup. We reply within 24 hours.
          </p>
          <SolutionInquiryForm
            slug={s.slug}
            solutionName={s.name}
            qualifiers={s.qualifiers}
            companySizes={COMPANY_SIZES}
          />
        </section>
      </div>
    </div>
  );
}
