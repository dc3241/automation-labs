import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { NEWSLETTER } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: `${NEWSLETTER.name}: the useful AI stuff, once a week`,
  description: NEWSLETTER.promise,
  alternates: { canonical: "/newsletter" },
};

export default function Newsletter() {
  return (
    <div className="bg-white">
      <section className="hero-atmosphere py-16 lg:py-24">
        <div className="hm-grid" aria-hidden />
        <div className="hero-atmosphere__content container mx-auto max-w-2xl px-4 text-center">
          <p className="hm-eyebrow mb-6">{NEWSLETTER.cadence}</p>
          <h1 className="mb-5 text-4xl font-bold leading-[1.1] text-gray-900 sm:text-5xl">
            {NEWSLETTER.name}
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-gray-600 sm:text-xl">
            {NEWSLETTER.promise}
          </p>
          <div className="mx-auto max-w-lg text-left">
            <EmailCapture source="newsletter" buttonLabel={`Get ${NEWSLETTER.name}`} />
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            What&apos;s in every issue
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {NEWSLETTER.contents.map((item, i) => (
              <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="mb-3 font-mono text-sm font-semibold text-gray-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Short enough to read in two minutes. Unsubscribe in one click.
          </p>
        </div>
      </section>
    </div>
  );
}
