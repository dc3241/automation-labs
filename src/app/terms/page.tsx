import type { Metadata } from "next";
import Link from "next/link";

/**
 * Fill / confirm before treating as final (lawyer review still required).
 * These were set from site domain + publish date — verify email inbox exists
 * and governing-law jurisdiction matches where the business is actually based.
 */
const EFFECTIVE_DATE = "August 24, 2026";
const CONTACT_EMAIL = "hello@automationlabsai.com";
const GOVERNING_LAW = "the State of California, United States";

export const metadata: Metadata = {
  title: "Terms of Service | Automation Labs",
  description:
    "Terms of Service for automationlabsai.com — site use, newsletter, affiliate disclosure, and how paid engagements are handled.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <header className="mb-10 sm:mb-12 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </header>

        <div className="space-y-10 text-gray-700 text-base leading-relaxed">
          <p>
            Welcome to automationlabsai.com (the &quot;Site&quot;), operated by
            Automation Labs (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;). By
            using the Site, you agree to these terms.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Using the site
            </h2>
            <p>
              The Site provides information about automation tools, workflows,
              and custom build services, plus a newsletter. You agree to use it
              lawfully and not to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Scrape, copy, or republish site content without permission
              </li>
              <li>
                Attempt to disrupt or gain unauthorized access to the Site
              </li>
              <li>
                Misrepresent your identity when submitting the contact form
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              The newsletter
            </h2>
            <p>
              Subscribing is free and opt-in. You can unsubscribe at any time
              via the link in any email. See our{" "}
              <Link
                href="/privacy"
                className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
              >
                Privacy Policy
              </Link>{" "}
              for how we handle your data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Affiliate disclosure
            </h2>
            <p>
              Some tools featured in our newsletter, blog, and social content
              are affiliate partners — if you sign up through our link, we may
              earn a commission at no extra cost to you. Recommendations reflect
              our own evaluation of the tool; affiliate relationships don&apos;t
              change which tools we choose to feature or what we say about them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Paid services (workflow automation and custom builds)
            </h2>
            <p>
              The Site describes our workflow automation and custom build
              services, including general pricing ranges. These are estimates,
              not quotes — actual scope, timeline, and price for any engagement
              are defined in a separate written proposal or agreement signed by
              both parties, which governs that engagement. Nothing on this Site
              is itself an offer to contract.
            </p>
            <p>
              General terms that apply to engagements unless the signed proposal
              says otherwise:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Discovery calls are free and non-binding</li>
              <li>
                Fixed-price proposals are provided before any billable work
                begins
              </li>
              <li>
                Ownership of custom-built deliverables transfers to the client
                upon final payment, unless the proposal states otherwise
              </li>
              <li>
                Support windows (e.g. 30 days for workflow projects, 60 days for
                custom builds) are as described in the applicable proposal
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              No guarantee of results
            </h2>
            <p>
              We build things carefully, but we don&apos;t guarantee specific
              business outcomes (revenue, time saved, etc.) from any tool
              recommendation, workflow, or custom build — results depend on
              factors outside our control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Intellectual property
            </h2>
            <p>
              Site content (copy, design, the Automation Labs name and logo)
              belongs to us and may not be reused without permission. This does
              not apply to deliverables from paid engagements, which are
              governed by the applicable signed agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Limitation of liability
            </h2>
            <p>
              To the extent permitted by law, Automation Labs is not liable for
              indirect, incidental, or consequential damages arising from your
              use of the Site. Our total liability for any claim related to a
              paid engagement is limited to the amount paid for that engagement,
              as further detailed in the applicable signed agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Changes to these terms
            </h2>
            <p>
              We may update these terms as the business evolves. Continued use
              of the Site after changes means you accept the updated terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of {GOVERNING_LAW}, without
              regard to conflict-of-law principles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Contact
            </h2>
            <p>
              Questions about these terms:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
              >
                {CONTACT_EMAIL}
              </a>
              , or use our{" "}
              <Link
                href="/contact"
                className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
              >
                contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
