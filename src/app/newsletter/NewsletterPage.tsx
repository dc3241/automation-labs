'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';

const DEPARTMENTS = [
  { id: 'hr', label: 'HR' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'operations', label: 'Operations' },
  { id: 'finance', label: 'Finance' },
  { id: 'customer-service', label: 'Customer Service' },
  { id: 'cross-functional', label: 'Cross-Functional / Multi-Department' },
] as const;

const ISSUE_BENEFITS = [
  'The Tool of the Week — a single AI or automation tool worth trying',
  'The Workflow of the Week — a step-by-step you can build yourself',
  'A Custom Build Spotlight — a real internal tool we\'ve shipped',
  '5 Tools Your [Department] Team Should Know',
  'Reader Q&A — your questions, answered',
];

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    if (!department) {
      setMessage('Please select your primary department');
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
        body: JSON.stringify({
          email: email.trim(),
          department,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Thanks for subscribing! Check your email to confirm.');
        setMessageType('success');
        setEmail('');
        setDepartment('');
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
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Hero + Form */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              One email per week. One department in focus.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Every Monday, we go deep on one department — HR, Sales, Marketing,
              Operations, Finance, or Customer Service. You get one tool worth trying,
              one workflow you can build, and one custom tool we&apos;ve shipped. Plus five
              more tools your team should know about.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field-focus w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="your@email.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Which department matters most to you?
                </label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="field-focus w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
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
              <button
                type="submit"
                disabled={isLoading || !department}
                className="btn-press w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              <div
                className={`fade-in mt-5 p-4 rounded-lg ${
                  messageType === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                {message}
              </div>
            )}

            <p className="text-sm text-gray-500 mt-5 text-center">
              Free. No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* What you get */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What&apos;s in every issue.
            </h2>
            <ul className="space-y-4 max-w-xl mx-auto">
              {ISSUE_BENEFITS.map((benefit, i) => (
                <Reveal key={benefit} index={i} as="li" className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
