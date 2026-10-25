'use client';

import Link from "next/link";
import { useState } from "react";
import { BuildTeaserCard } from "@/components/builds/BuildCaseStudy";
import { CountUp } from "@/components/home/CountUp";
import { ExampleCard } from "@/components/home/ExampleCard";
import { HeroDemo } from "@/components/home/HeroDemo";
import { StepsRail } from "@/components/home/StepsRail";
import "@/components/home/home-motion.css";
import { Reveal } from "@/components/Reveal";
import { builds, getBuildBySlug, type Build } from "@/data/builds";
import {
  CONSULTING_DURATION_LABEL,
  CONSULTING_PRICE_LABEL,
} from "@/lib/consulting";

const DEPARTMENTS = [
  "HR",
  "Sales",
  "Marketing",
  "Operations",
  "Finance",
  "Customer Service",
] as const;

/** Example builds shown under "Everyday work we automate". Order matters. */
const EXAMPLE_SLUGS = ["invoice-intake", "resume-intake", "lead-briefs"] as const;
const exampleBuilds = EXAMPLE_SLUGS.map((slug) => getBuildBySlug(slug)).filter(
  (build): build is Build => Boolean(build)
);

const HOW_IT_WORKS = [
  {
    title: "Describe the problem",
    body: "Tell us what the work is, who does it, and how often. A written note or a short Loom is enough.",
  },
  {
    title: "Get a fixed quote",
    body: "We reply with a written scope and a fixed price before any work begins.",
  },
  {
    title: "We build it and hand it off",
    body: "Tested on your real data, documented, and backed by support after launch.",
  },
] as const;

const PRICING = [
  {
    name: "Consultation",
    price: `${CONSULTING_PRICE_LABEL}`,
    detail: `${CONSULTING_DURATION_LABEL} on one problem. You leave with a recommended route.`,
  },
  {
    name: "Workflow automation",
    price: "From $1,500",
    detail: "We wire your existing tools together. Most projects land between $1,500 and $4,500.",
  },
  {
    name: "Custom solution",
    price: "$5,000 to $25,000",
    detail: "An internal tool built around how your team works, scoped individually.",
  },
] as const;

const GOOD_FIRST_AUTOMATIONS = [
  "The work arrives as documents or text: invoices, applications, emails, forms.",
  "Someone owns it and would notice a mistake.",
  "It happens every week, not once a quarter.",
  "It starts internal, where a mistake is cheap to fix.",
] as const;

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Thanks for subscribing! Check your email to confirm.');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setMessage('Connection error. Please check your internet and try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="hero-atmosphere bg-white py-16 lg:py-20">
        <div className="hero-atmosphere__wash" aria-hidden />
        <div className="hm-grid" aria-hidden />
        <div className="hero-atmosphere__content container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div>
              <p className="hm-eyebrow mb-6">Automation for small business teams</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-[1.08]">
                Tell us what&apos;s eating your team&apos;s week. We&apos;ll <span className="hm-mark">automate it.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
                We build the repetitive work small business teams do every day
                into automations: invoices filed, applications sorted, leads
                researched before the call. A person stays in charge of every
                decision.
              </p>
              <ul className="hero-depts" aria-label="Departments we work with">
                {DEPARTMENTS.map((dept) => (
                  <li key={dept} className="hero-dept">
                    {dept}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="btn-press bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 flex items-center justify-center"
                >
                  Tell us the problem
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/projects"
                  className="btn-press border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center"
                >
                  See what we build
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Fixed quote before any work begins. Projects start at $1,500.
              </p>
            </div>
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* Everyday work we automate */}
      <section className="py-16 bg-gray-50" aria-label="Everyday work we automate">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <p className="hm-eyebrow mb-4">Examples</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everyday work we automate.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Illustrative examples with fictional data, so you can see what a
              finished workflow looks like.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {exampleBuilds.map((build, i) => (
              <Reveal key={build.id} index={i} className="h-full">
                <ExampleCard build={build} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative numbers */}
      <section className="py-14 bg-white" aria-label="What a finished automation can look like">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal>
            <div className="hm-stats">
              <div className="hm-stat">
                <p className="hm-stat__num"><CountUp to={40} /></p>
                <p className="hm-stat__label">invoices read, checked and filed every week without retyping</p>
              </div>
              <div className="hm-stat">
                <p className="hm-stat__num"><CountUp to={6} /></p>
                <p className="hm-stat__label">hours of manual data entry handed back to the team</p>
              </div>
              <div className="hm-stat">
                <p className="hm-stat__num"><CountUp to={100} suffix="%" /></p>
                <p className="hm-stat__label">approved by a person before anything is final</p>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-gray-500">
              Illustrative example for a small finance team. Your numbers depend on your volume and your process.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works + pricing */}
      <section className="py-16 bg-white" aria-label="How it works">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              You bring the problem. We bring the fix.
            </h2>
          </Reveal>

          <StepsRail steps={HOW_IT_WORKS} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-14">
            {PRICING.map((tier, i) => (
              <Reveal key={tier.name} index={i} className="h-full">
                <div className="surface-card bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full">
                  <p className="text-sm font-semibold text-gray-500 mb-2">{tier.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-3">{tier.price}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{tier.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={120} className="text-center mt-8">
            <Link
              href="/services"
              className="text-base font-semibold text-gray-900 hover:text-gray-700 inline-flex items-center arrow-link"
            >
              See services and full pricing
              <span aria-hidden className="arrow ml-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* What automates well */}
      <section className="py-16 bg-gray-50" aria-label="What automates well">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                What makes a good first automation?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The best candidates are boring, frequent, and easy to check.
                If most of these are true for your work, it is worth a look:
              </p>
            </Reveal>
            <ul className="space-y-3 text-gray-700 text-lg leading-relaxed list-disc pl-6">
              {GOOD_FIRST_AUTOMATIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Reveal delayMs={120} className="mt-8">
              <Link
                href="/contact"
                className="text-base font-semibold text-gray-900 hover:text-gray-700 inline-flex items-center arrow-link"
              >
                Not sure yours qualifies? Tell us the problem
                <span aria-hidden className="arrow ml-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projects snippet — same source as /projects */}
      <section className="py-16 bg-white" aria-label="Projects">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Projects
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What we&apos;ve actually built.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Live tools we&apos;ve shipped for real teams — not mockups.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {builds.slice(0, 2).map((build, i) => (
              <BuildTeaserCard key={build.id} build={build} index={i} />
            ))}
          </div>

          <Reveal delayMs={120} className="text-center mt-10">
            <Link
              href="/projects"
              className="text-base font-semibold text-gray-900 hover:text-gray-700 inline-flex items-center arrow-link"
            >
              See all projects
              <span aria-hidden className="arrow ml-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section id="newsletter-section" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              The newsletter operators actually read.
            </h2>

            <div className="text-lg text-white mb-8 leading-relaxed space-y-4">
              <p>
                Every week, we cover one department. One tool worth trying, one workflow
                worth building, one custom solution worth seeing. Plus the five tools your
                team should know about.
              </p>
              <p>
                No fluff. No &quot;10 ways AI will transform your business.&quot; Just specific,
                useful automation ideas you can act on.
              </p>
            </div>

            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-focus w-full sm:w-80 px-4 py-3 border border-transparent rounded-lg text-gray-900 bg-white placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn-press w-full sm:w-auto bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {message && (
              <div className={`fade-in mb-6 p-4 rounded-lg ${
                messageType === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <p className="text-sm text-gray-400">
              Free. One email per week. Unsubscribe anytime.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
