'use client';

import Link from "next/link";
import { useState } from "react";

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
            and Customer Service automate the repetitive parts of their job — so they
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
              href="/ai-tools"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              See the Tools Directory
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
                Hand-picked AI and automation tools, organized by department. Read the
                reviews, pick what fits, get back to work.
              </p>
              <Link
                href="/ai-tools"
                className="text-gray-900 font-semibold hover:text-gray-700 inline-flex items-center"
              >
                Browse the Tools Directory
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

      {/* Latest Insights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Practical automation thinking for operators across every department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">AI Technology</span>
                  <span className="text-sm text-gray-500">March 15, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  10 Ways AI is Transforming Ecommerce Brands
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Discover how artificial intelligence is helping ecommerce brands run leaner ops and convert more profitably.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Automation</span>
                  <span className="text-sm text-gray-500">March 12, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  The Future of Work Automation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Explore how automation is reshaping ecommerce ops teams and what it means for your brand.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Strategy</span>
                  <span className="text-sm text-gray-500">March 10, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Building a Digital-First Ecommerce Strategy
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Learn how to tighten merchandising, fulfillment, and retention systems so your ecommerce brand scales with less manual work.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">ROI</span>
                  <span className="text-sm text-gray-500">March 8, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Maximizing ROI with AI Automation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A comprehensive guide to measuring and optimizing your automation investments.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Customer Service</span>
                  <span className="text-sm text-gray-500">March 5, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Customer Service Automation Best Practices
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tips and strategies for automating customer service without losing the human touch.
                </p>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Analytics</span>
                  <span className="text-sm text-gray-500">March 3, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  The Rise of AI-Powered Analytics
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  How AI is revolutionizing ecommerce analytics and decision-making across merchandising, ads, and inventory.
                </p>
              </div>
            </article>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>View More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
