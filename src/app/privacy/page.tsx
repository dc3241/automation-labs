import type { Metadata } from "next";
import Link from "next/link";

/**
 * Fill / confirm before treating as final (lawyer review still required).
 * Aligned with Terms placeholders and how this site actually handles data
 * (newsletter via Beehiiv, contact/guide forms via Supabase).
 */
const EFFECTIVE_DATE = "August 24, 2026";
const CONTACT_EMAIL = "hello@automationlabsai.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Automation Labs",
  description:
    "How Automation Labs collects, uses, and protects information on automationlabsai.com — including newsletter, contact, and guide signups.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <header className="mb-10 sm:mb-12 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </header>

        <div className="space-y-10 text-gray-700 text-base leading-relaxed">
          <p>
            This Privacy Policy explains how Automation Labs (&quot;we,&quot;
            &quot;us,&quot; &quot;our&quot;) collects, uses, and shares information
            when you use automationlabsai.com (the &quot;Site&quot;). By using
            the Site, you agree to this policy.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Information we collect
            </h2>
            <p>We collect information you choose to give us, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-gray-900">Newsletter signup</strong> —
                email address, and optionally company and role
              </li>
              <li>
                <strong className="text-gray-900">Contact and intake forms</strong>{" "}
                — name, email, company, company size, inquiry type, and your
                message
              </li>
              <li>
                <strong className="text-gray-900">AI Guide signup</strong> —
                email, optional name, and business type
              </li>
            </ul>
            <p>
              We may also receive standard technical data when you visit the Site
              (such as IP address, browser type, and pages viewed) through our
              hosting provider and any analytics tools we use.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              How we use information
            </h2>
            <p>We use the information above to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Send the newsletter and related email series you opt into</li>
              <li>Respond to inquiries and evaluate potential project work</li>
              <li>Deliver the AI Automation Guide and related onboarding emails</li>
              <li>Operate, secure, and improve the Site</li>
              <li>Comply with legal obligations when required</li>
            </ul>
            <p>
              We do not sell your personal information. We do not use contact-form
              submissions for unrelated marketing without your consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Newsletter and email
            </h2>
            <p>
              Newsletter and guide emails are sent through Beehiiv (or a
              successor email provider). Subscribing is opt-in. You can unsubscribe
              at any time using the link in any email we send. Unsubscribing stops
              marketing emails; it does not delete records we may need to keep for
              operational or legal reasons (for example, a prior project inquiry).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Service providers
            </h2>
            <p>
              We use third-party services to run the Site. Depending on which
              features you use, that may include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-gray-900">Hosting</strong> — Vercel
                (Site hosting and delivery)
              </li>
              <li>
                <strong className="text-gray-900">Database / forms</strong> —
                Supabase (storing contact and guide-related records)
              </li>
              <li>
                <strong className="text-gray-900">Email</strong> — Beehiiv
                (newsletter and guide delivery)
              </li>
            </ul>
            <p>
              These providers process data on our behalf under their own privacy
              terms. We only share what is needed for them to provide the
              service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Affiliate links
            </h2>
            <p>
              Some tool recommendations on the Site, in the newsletter, or in
              social content use affiliate links. If you click those links and
              later purchase or sign up, we may earn a commission. Affiliate
              partners may set their own cookies or tracking when you visit their
              sites. That activity is governed by their privacy policies, not
              ours. See also our{" "}
              <Link
                href="/terms"
                className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
              >
                Terms of Service
              </Link>{" "}
              affiliate disclosure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Cookies and similar technologies
            </h2>
            <p>
              The Site and our providers may use cookies or similar technologies
              that are necessary for hosting, security, and basic functionality.
              We do not run a separate advertising cookie network on the Site. If
              we add analytics or additional tracking later, we will update this
              policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Data retention
            </h2>
            <p>
              We keep newsletter subscription data until you unsubscribe or ask
              us to delete it. Contact and project inquiries are kept as long as
              needed to respond, run the business relationship, and meet legal or
              accounting requirements. You can ask us to delete or correct your
              information using the contact details below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Your choices
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Unsubscribe from emails via the link in any message</li>
              <li>
                Request access, correction, or deletion of personal information
                you provided by emailing us
              </li>
              <li>
                Stop submitting forms or browsing the Site if you prefer not to
                share information
              </li>
            </ul>
            <p>
              Depending on where you live, you may have additional rights under
              applicable privacy laws. Contact us to exercise them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Children
            </h2>
            <p>
              The Site is intended for business and professional use. We do not
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy as the Site or our practices
              change. The effective date at the top will be updated when we do.
              Continued use of the Site after changes means you accept the
              updated policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Contact
            </h2>
            <p>
              Questions about privacy:{" "}
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
