'use client';

import Link from "next/link";
import { useState } from "react";
import { BuildTeaserCard } from "@/components/builds/BuildCaseStudy";
import { builds } from "@/data/builds";

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter-section');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <p className="text-gray-600 text-lg mb-6">
              Smart tools. Smart workflows. Custom builds.
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto">
              Automate the work, not the thinking.
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We help SMB operators across HR, Sales, Marketing, Operations, Finance,
            and Customer Service automate the repetitive parts of their job â€” so they
            can focus on the work that actually moves the business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToNewsletter}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              Join the Newsletter
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <Link 
              href="/services"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Three ways we help you automate.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Tools</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hand-picked AI and automation tools, organized by department â€” delivered
                to your inbox, not buried in a spreadsheet. One department per week. One
                tool worth trying, plus five more your team should know about.
              </p>
              <Link
                href="/newsletter"
                className="text-gray-900 font-semibold hover:text-gray-700 inline-flex items-center"
              >
                Get the weekly tool picks
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Workflows</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Step-by-step automation walkthroughs you can build yourself. Or hire us
                to wire it up for you.
              </p>
              <Link
                href="/blog"
                className="text-gray-900 font-semibold hover:text-gray-700 inline-flex items-center"
              >
                See the Workflows
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Builds</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Internal tools and dashboards built specifically for how your team works.
                For when off-the-shelf isn&apos;t enough.
              </p>
              <Link
                href="/projects"
                className="text-gray-900 font-semibold hover:text-gray-700 inline-flex items-center"
              >
                See the Builds
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section id="newsletter-section" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
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
                worth building, one custom build worth seeing. Plus the five tools your
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
                className="w-full sm:w-80 px-4 py-3 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-white placeholder-gray-500"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              <div className={`mb-6 p-4 rounded-lg ${
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
          </div>
        </div>
      </section>

      {/* Recent builds — same source as /projects and /services teaser */}
      <section className="py-16 bg-white" aria-label="Recent builds">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent builds
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Live tools we&apos;ve shipped for real teams — not mockups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {builds.slice(0, 2).map((build) => (
              <BuildTeaserCard key={build.id} build={build} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="text-base font-semibold text-gray-900 hover:text-gray-700 inline-flex items-center"
            >
              See all builds
              <span aria-hidden className="ml-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
