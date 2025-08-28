'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
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

  const scrollToToolsDirectory = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
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
        setEmail(''); // Clear form on success
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
            <p className="text-gray-600 text-lg mb-6">Transform Your Business with AI</p>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              Automate Your Business.
            </h1>
            <h2 className="text-6xl font-bold text-gray-500 mb-8">
              Amplify Your Results.
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Helping online businesses learn how to navigate and implement AI and automations.
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
            <button 
              onClick={scrollToToolsDirectory}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              View Tools Directory
            </button>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section id="tools-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            AI Tools for Online Businesses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Mixpanel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mixpanel</h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">4.5</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                AI-powered product analytics platform that helps businesses understand user behavior and optimize conversions.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Analytics & Data</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Paid $25+/mo</span>
                <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2">
                  <span>Visit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ActiveCampaign */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ActiveCampaign</h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">4.5</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Marketing automation platform with AI-powered email personalization and customer journey optimization.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Email Marketing</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Marketing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Paid $29+/mo</span>
                <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2">
                  <span>Visit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Intercom */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Intercom</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">4.7</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                AI-powered customer service and communication platform.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Customer Support</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Paid $39/mo</span>
                <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2">
                  <span>Visit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* View Full Directory Button */}
          <div className="text-center mt-12">
            <Link href="/ai-tools">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2 mx-auto">
                <span>View Full Directory</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section id="newsletter-section" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Envelope Icon */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl font-bold text-white mb-6">
              Stay Ahead with AI Insights
            </h2>

            {/* Description */}
            <p className="text-lg text-white mb-8 leading-relaxed">
              Join our weekly newsletter and receive curated automation ideas, AI business news, and expert insights every Monday. Be the first to know about emerging trends and practical applications.
            </p>

            {/* Email Signup Form */}
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
                  'Subscribe Now'
                )}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Privacy Notice */}
            <p className="text-sm text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends and insights in business automation and AI technology.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Blog Post 1 */}
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
                  10 Ways AI is Transforming Small Businesses
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Discover how artificial intelligence is making small businesses more competitive and efficient than ever before.
                </p>
              </div>
            </article>

            {/* Blog Post 2 */}
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
                  Explore how automation is reshaping workplace dynamics and what it means for your business.
                </p>
              </div>
            </article>

            {/* Blog Post 3 */}
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
                  Building a Digital-First Business Strategy
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Learn how to transform your traditional business model into a digital powerhouse.
                </p>
              </div>
            </article>

            {/* Blog Post 4 */}
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

            {/* Blog Post 5 */}
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

            {/* Blog Post 6 */}
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
                  How AI is revolutionizing business analytics and decision-making processes.
                </p>
              </div>
            </article>
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2 mx-auto">
              <span>View More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
