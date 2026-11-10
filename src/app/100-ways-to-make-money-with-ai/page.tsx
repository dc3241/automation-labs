import type { Metadata } from 'next';
import Image from 'next/image';
import LeadForm from './LeadForm';
import { WAYS_CATEGORIES } from './categories';
import { FAQ } from './faq';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://automationlabsai.com';
const URL_PATH = '/100-ways-to-make-money-with-ai';
const PAGE_URL = `${SITE}${URL_PATH}`;
const TITLE = '100 Ways to Make Money with AI (Free PDF) | Automation Labs';
const DESCRIPTION =
  'Free PDF: 100 AI business ideas in 10 categories, each with who it is for and how to start. Enter your email for an instant download.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'ways to make money with AI',
    'AI business ideas',
    'make money with AI',
    'AI side business ideas',
    'AI services to sell',
    'AI agency ideas',
    'free AI guide PDF',
  ],
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'Automation Labs',
    title: '100 Ways to Make Money with AI (Free PDF Guide)',
    description: DESCRIPTION,
    images: [{ url: `${SITE}/images/100-ways-og.png`, width: 1200, height: 630, alt: '100 Ways to Make Money with AI, a free PDF guide from Automation Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '100 Ways to Make Money with AI (Free PDF Guide)',
    description: DESCRIPTION,
    images: [`${SITE}/images/100-ways-og.png`],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: '100 Ways to Make Money with AI (Free PDF Guide)',
      description: DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: 'Automation Labs', url: SITE },
      primaryImageOfPage: `${SITE}/images/100-ways-og.png`,
      about: ['AI business ideas', 'Making money with AI', 'AI automation services'],
      publisher: { '@type': 'Organization', name: 'Automation Labs', url: SITE },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: '100 Ways to Make Money with AI', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

const STEPS = [
  { n: '1', t: 'Enter your email', d: 'One field. No credit card, no account.' },
  { n: '2', t: 'The PDF downloads instantly', d: 'It starts the moment you submit. Nothing to wait for.' },
  { n: '3', t: 'Pick an idea and start', d: 'Each one tells you who to sell to and what to do first.' },
];

export default function HundredWaysPage() {
  return (
    <div className="bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gray-950 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">Free PDF guide</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              100 Ways to Make Money with AI
            </h1>
            <p className="mt-5 text-lg text-gray-300">
              A curated list of real AI business ideas across 10 categories, picked for demand, low startup cost and
              repeat revenue. Every idea says who it is for and how to start.
            </p>
            <ul className="mt-6 space-y-2 text-gray-200">
              <li>✓ 100 specific, plain-English business ideas</li>
              <li>✓ Services you can sell and products you can sell again</li>
              <li>✓ Instant PDF download, free</li>
            </ul>
          </div>
          <div className="grid items-center gap-6 sm:grid-cols-[180px_1fr] md:grid-cols-1 lg:grid-cols-[200px_1fr]">
            <Image
              src="/images/100-ways-cover.webp"
              alt="Cover of the 100 Ways to Make Money with AI PDF guide"
              width={640}
              height={828}
              priority
              className="mx-auto w-40 rounded-lg shadow-2xl sm:w-full md:w-44 lg:w-full"
            />
            <div className="rounded-2xl bg-white p-5 text-gray-900 shadow-xl">
              <LeadForm source="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="how">
        <h2 id="how" className="text-2xl font-bold sm:text-3xl">How to get your copy</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-xl border border-gray-200 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{s.n}</span>
              <h3 className="mt-4 font-semibold">{s.t}</h3>
              <p className="mt-1 text-gray-600">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* What's inside */}
      <section className="bg-gray-50" aria-labelledby="inside">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="inside" className="text-2xl font-bold sm:text-3xl">What&apos;s inside: 10 categories, 100 ideas</h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Each category holds 10 ideas. A sample of what you&apos;ll find in the guide:
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WAYS_CATEGORIES.map((c) => (
              <article key={c.title} className="rounded-xl border border-gray-200 bg-white p-5" style={{ borderTop: `4px solid ${c.color}` }}>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-sm text-gray-500">{c.tagline}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {c.examples.slice(0, 3).map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs font-medium text-gray-500">+ {c.count - 3} more in the PDF</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="who">
        <h2 id="who" className="text-2xl font-bold sm:text-3xl">Who this guide is for</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">Operators and founders</h3>
            <p className="mt-1 text-gray-600">Adding an AI service line to an existing business, or looking for the next offer to sell.</p>
          </div>
          <div>
            <h3 className="font-semibold">Freelancers and agencies</h3>
            <p className="mt-1 text-gray-600">Turning skills in writing, video, design, sales or support into higher-value, AI-assisted work.</p>
          </div>
          <div>
            <h3 className="font-semibold">First-time builders</h3>
            <p className="mt-1 text-gray-600">Anyone who wants a clear starting point instead of another endless list of AI tools.</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Results depend on your market, effort and execution. The guide contains ideas, not income promises.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50" aria-labelledby="faq">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="faq" className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    {f.q}
                    <span className="text-gray-400 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-gray-950 text-white" aria-labelledby="cta">
        <div className="mx-auto max-w-xl px-4 py-14 text-center sm:px-6">
          <h2 id="cta" className="text-2xl font-bold sm:text-3xl">Get all 100 ideas, free</h2>
          <p className="mt-3 text-gray-300">Enter your email and the PDF downloads right away.</p>
          <div className="mt-6 rounded-2xl bg-white p-5 text-left text-gray-900">
            <LeadForm source="footer" />
          </div>
        </div>
      </section>
    </div>
  );
}
