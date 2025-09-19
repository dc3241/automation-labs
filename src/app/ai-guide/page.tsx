'use client';

import { useState } from 'react';
import Link from 'next/link';
// Simple business types for email series
const BUSINESS_TYPES = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store or marketplace',
    icon: '🛒'
  },
  {
    id: 'agency',
    name: 'Marketing Agency',
    description: 'Client-based marketing services',
    icon: '🎯'
  },
  {
    id: 'saas',
    name: 'SaaS/Software',
    description: 'Software as a service product',
    icon: '💻'
  },
  {
    id: 'influencer',
    name: 'Creator/Influencer',
    description: 'Content creator or influencer',
    icon: '📱'
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Different type of business',
    icon: '🏢'
  }
];

export default function GuideLanding() {
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !selectedBusinessType) {
      setMessage('Please enter your email and select your business type');
      setMessageType('error');
      return;
    }

    // Basic email validation
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
          businessType: selectedBusinessType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Welcome to the guide! Check your email to get started.');
        setMessageType('success');
        
        // Email signup successful
        
        // Clear form
        setEmail('');
        setName('');
        setSelectedBusinessType('');
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
                🚀 Free 7-Day Guide
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Business with
              <span className="block text-blue-600">AI Automation</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of business owners who've automated their operations and 
              increased efficiency by 300%+ in just 7 days. No technical experience required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={scrollToSignup}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                Get Free Access Now
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

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 from 2,500+ users</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>7-day implementation</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No coding required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Learn in 7 Days
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Daily emails with actionable steps and proven tools to automate your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Opportunity Assessment</h3>
                  <p className="text-sm text-gray-500">Day 1</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">Identify automation opportunities in your business</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Beginner
                </span>
                <span className="text-xs text-gray-500">
                  3 tools
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Content Creation Automation</h3>
                  <p className="text-sm text-gray-500">Day 2</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">Automate your content creation workflow</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Beginner
                </span>
                <span className="text-xs text-gray-500">
                  4 tools
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Social Media Management</h3>
                  <p className="text-sm text-gray-500">Day 3</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">Streamline social media posting and engagement</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Beginner
                </span>
                <span className="text-xs text-gray-500">
                  3 tools
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">4-7</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Advanced Automation</h3>
                  <p className="text-sm text-gray-500">Days 4-7</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">Customer communication, sales, operations & analytics</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Intermediate
                </span>
                <span className="text-xs text-gray-500">
                  8+ tools
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Type Selector */}
      <section id="signup-section" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Your Personalized Guide
            </h2>
            <p className="text-lg text-gray-600">
              Tell us about your business and we'll customize the guide with the most relevant tools and strategies.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Business Type Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                What type of business do you run?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUSINESS_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedBusinessType(type.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      selectedBusinessType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{type.icon}</span>
                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Capture Form */}
            <form onSubmit={handleEmailCapture} className="space-y-6">
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
                disabled={isLoading || !selectedBusinessType}
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

              {/* Message Display */}
              {message && (
                <div className={`p-4 rounded-lg ${
                  messageType === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {message}
                </div>
              )}

              <p className="text-sm text-gray-500 text-center">
                Join 25,000+ business owners. No spam, unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section id="preview" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Here's What You Get
            </h2>
            <p className="text-lg text-gray-600">
              Daily emails with actionable steps, tools, and templates delivered straight to your inbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Email Series</h3>
              <p className="text-gray-600">7 days of actionable automation strategies delivered to your inbox</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready-to-Use Tools</h3>
              <p className="text-gray-600">Curated list of AI tools with setup guides and best practices</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Templates & Checklists</h3>
              <p className="text-gray-600">Downloadable templates to implement automation in your business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Thousands of Successful Business Owners
            </h2>
            <p className="text-lg text-gray-600">
              See how others have transformed their businesses with AI automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-lg">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Martinez</h4>
                  <p className="text-sm text-gray-600">E-commerce Owner</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "This guide saved me 15 hours per week. I automated my customer service and order processing in just 3 days. Revenue is up 40%!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold text-lg">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">James Davis</h4>
                  <p className="text-sm text-gray-600">Marketing Agency</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The ROI calculation framework alone was worth the price. I identified $50K in annual savings opportunities I never knew existed."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold text-lg">AC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alex Chen</h4>
                  <p className="text-sm text-gray-600">SaaS Founder</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Finally, a guide that actually works. I automated my entire customer onboarding process and reduced churn by 30% in the first month."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 25,000+ business owners who've automated their operations and increased efficiency by 300%+.
          </p>
          <button 
            onClick={scrollToSignup}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center mx-auto"
          >
            Get Your Free Guide Now
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-sm text-blue-200 mt-4">
            Free forever • No credit card required • Instant access
          </p>
        </div>
      </section>
    </div>
  );
}
