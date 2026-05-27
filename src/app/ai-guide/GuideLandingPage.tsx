'use client';

import { useState } from 'react';
import Link from 'next/link';

const DEPARTMENTS = [
  { id: 'hr', label: 'HR' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'operations', label: 'Operations' },
  { id: 'finance', label: 'Finance' },
  { id: 'customer-service', label: 'Customer Service' },
  { id: 'cross-functional', label: 'Cross-Functional / Multi-Department' },
] as const;

const GUIDE_DAYS = [
  {
    day: 1,
    title: 'HR',
    description:
      'The five repetitive HR tasks every SMB still does manually — and the tools that fix each one.',
  },
  {
    day: 2,
    title: 'Sales',
    description:
      'Where your sales team is losing time before the first call, and how to buy it back.',
  },
  {
    day: 3,
    title: 'Marketing',
    description:
      'The repurposing workflow that turns one piece of content into ten.',
  },
  {
    day: 4,
    title: 'Operations',
    description:
      'SOP creation without the SOP project. Internal request handling that actually scales.',
  },
  {
    day: 5,
    title: 'Finance',
    description:
      'Invoice processing, expense management, and reporting on autopilot.',
  },
  {
    day: 6,
    title: 'Customer Service',
    description:
      'AI-assisted support without losing the human touch.',
  },
  {
    day: 7,
    title: 'Putting It Together',
    description:
      'Picking the first three automations to actually ship.',
  },
];

export default function GuideLandingPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !selectedDepartment) {
      setMessage('Please enter your email and select your primary department');
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
      const response = await fetch('/api/guide/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          businessType: selectedDepartment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Welcome to the guide! Check your email to get started.');
        setMessageType('success');
        setEmail('');
        setName('');
        setSelectedDepartment('');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Guide signup error:', error);
      setMessage('Connection error. Please check your internet and try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup-section');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                🔍 Free 7-Day Guide
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
              The automation opportunities are already in your team&apos;s calendar.
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              This guide walks you through one department per day for a week. By Friday,
              you&apos;ll have a list of automation opportunities specific to your business —
              and the tools to start fixing them.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <button
                onClick={scrollToSignup}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                Get Free Access
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <Link
                href="#preview"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
              >
                Preview the Guide
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600">
              <span>7-day email series</span>
              <span className="hidden sm:inline text-gray-300">·</span>
              <span>No coding required</span>
              <span className="hidden sm:inline text-gray-300">·</span>
              <span>One department per day</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              One department per day. Every day, an opportunity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {GUIDE_DAYS.map((item) => (
              <div
                key={item.day}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <span className="text-blue-600 font-bold">{item.day}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Day {item.day} — {item.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup-section" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get the guide.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Tell us which department matters most to you and we&apos;ll start your guide
              there. (You&apos;ll still get all seven days — we&apos;ll just lead with the one
              that&apos;s most useful to you.)
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleEmailCapture} className="space-y-6">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Which department do you spend the most time in?
                </label>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  disabled={isLoading}
                >
                  <option value="">Select a department</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !selectedDepartment}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting Your Guide...
                  </>
                ) : (
                  'Get My Free 7-Day Guide'
                )}
              </button>

              {message && (
                <div
                  className={`p-4 rounded-lg ${
                    messageType === 'success'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  {message}
                </div>
              )}

              <p className="text-sm text-gray-500 text-center">
                Free. One email per day for seven days. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* What's Inside Preview */}
      <section id="preview" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What&apos;s inside
            </h2>
            <p className="text-lg text-gray-600">
              A preview of what lands in your inbox each morning.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-gray-50">
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm text-gray-500 truncate">
                Day 1 — HR Automation Audit
              </span>
            </div>
            <div className="bg-white p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">
                Automation Labs · Day 1 of 7
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                The five HR tasks your team is still doing manually
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Good morning — welcome to Day 1. Today we&apos;re auditing HR: onboarding paperwork,
                PTO requests, offer letters, employee FAQs, and compliance checklists. For each
                task, you&apos;ll get a specific tool recommendation and a 15-minute setup path.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-blue-600 font-bold text-sm shrink-0">01</span>
                  <p className="text-sm text-gray-700">Onboarding paperwork — automate with a form + doc generator</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-blue-600 font-bold text-sm shrink-0">02</span>
                  <p className="text-sm text-gray-700">PTO requests — route approvals without email chains</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-blue-600 font-bold text-sm shrink-0">03</span>
                  <p className="text-sm text-gray-700">Employee FAQs — deflect repeat questions before they hit your inbox</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                Replace this preview with a screenshot of your live Day 1 email when ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to find your automation opportunities?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Seven days. Seven departments. One list of fixes you can actually ship.
          </p>
          <button
            onClick={scrollToSignup}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center mx-auto"
          >
            Get My Free 7-Day Guide
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-sm text-blue-200 mt-4">
            Free · One email per day · Unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}
