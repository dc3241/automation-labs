import type { Metadata } from "next";
import Link from "next/link";
import ConsultingBooking from "@/components/ConsultingBooking";
import {
  CONSULTING_DURATION_ADJECTIVE,
  CONSULTING_DURATION_LABEL,
  CONSULTING_EMAIL,
  CONSULTING_PRICE_LABEL,
  getCalLink,
} from "@/lib/consulting";

const description = `A ${CONSULTING_DURATION_LABEL} working session on one workflow. ${CONSULTING_PRICE_LABEL}, paid when you book. You leave with a next step, not a pitch.`;

export const metadata: Metadata = {
  title: "Working Session",
  description,
  openGraph: {
    title: "Working Session | Automation Labs",
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

const INCLUDED = [
  "One workflow, talked through live on a screen share",
  "A decision: automate it, leave it alone, or commission a build",
  "A short written recap of that next step after the call",
];

export default function ConsultingPage() {
  const calLink = getCalLink();

  return (
    <div className="bg-white">
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Consulting
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            One problem. One session. A next step you can use.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            A flat-rate working session for teams who want the advice before they
            commission a build. {CONSULTING_PRICE_LABEL} for {CONSULTING_DURATION_LABEL}.
            You pay when you book, and that payment confirms the time.
          </p>
          <a
            href="#book"
            className="btn-press inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            Book a session
          </a>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What you leave with.
              </h2>
              <ul className="space-y-3 text-gray-600 list-disc pl-5 leading-relaxed">
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-10 bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                  Working session
                </p>
                <p className="text-xl font-semibold text-gray-900 mb-2">
                  {CONSULTING_PRICE_LABEL}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {CONSULTING_DURATION_LABEL}, one problem, flat rate. We stay on it
                  until the next step is clear, inside that window. This is the
                  session. It is not a build, a proposal, or ongoing support.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                How booking works.
              </h2>
              <ol className="space-y-6">
                {[
                  {
                    title: "Pick a time and pay",
                    body: `${CONSULTING_PRICE_LABEL} is collected when you book. The slot is yours when payment clears.`,
                  },
                  {
                    title: "Tell us what you want to leave with",
                    body: "The booking form asks for your company, the outcome you want from the session, and an optional Loom of the workflow so we can prep.",
                  },
                  {
                    title: `Show up for ${CONSULTING_DURATION_LABEL}`,
                    body: "Screen share. One workflow. You get a short written recap afterward.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Is a session the right move?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-100 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Book this if you...
              </h3>
              <ul className="space-y-3 text-gray-700 list-disc pl-5 leading-relaxed">
                <li>Have one workflow that is eating the week and want a plan for it</li>
                <li>Want the advice itself, before you decide whether to hire anyone</li>
                <li>Can show the process on a call — a Loom ahead of time helps</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Use the project form if you...
              </h3>
              <ul className="space-y-3 text-gray-700 list-disc pl-5 leading-relaxed">
                <li>
                  Already know you want a workflow built or a custom tool — those
                  start with a free discovery call
                </li>
                <li>Need someone to run your tools for you after the call</li>
                <li>Want a fixed-price build quote as the outcome of this page</li>
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center text-gray-900 font-semibold hover:text-gray-700 arrow-link"
              >
                Start a project inquiry
                <span aria-hidden className="arrow ml-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Book a session.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {CONSULTING_PRICE_LABEL} for {CONSULTING_DURATION_LABEL}. Rescheduling
              and cancellation follow the policy shown on the booking page.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
            {calLink ? (
              <ConsultingBooking calLink={calLink} />
            ) : (
              <div className="px-4 py-16 text-center">
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  The calendar is not connected yet.
                </p>
                <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                  Email{" "}
                  <a
                    href={`mailto:${CONSULTING_EMAIL}`}
                    className="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-700"
                  >
                    {CONSULTING_EMAIL}
                  </a>{" "}
                  and we will send a booking link for a {CONSULTING_DURATION_ADJECTIVE}{" "}
                  session.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
