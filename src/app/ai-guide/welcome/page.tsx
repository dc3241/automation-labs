'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BUSINESS_TYPES, GUIDE_CONTENT } from '@/lib/guide-content';
import { guideAnalytics } from '@/lib/guide-analytics';

export default function WelcomePage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    businessType: '',
    email: '',
    userId: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user info from localStorage (in a real app, this would come from your auth system)
    const savedUser = localStorage.getItem('guide-user-info');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserInfo(user);
      
      // Track welcome page view
      if (user.userId) {
        guideAnalytics.trackPageView(user.userId, 'welcome');
      }
    }
    
    setIsLoading(false);
  }, []);

  const businessTypeInfo = userInfo.businessType ? 
    BUSINESS_TYPES.find(type => type.id === userInfo.businessType) : null;

  const firstDayContent = GUIDE_CONTENT[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized guide...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Your AI Automation Journey!
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {userInfo.name ? `Hi ${userInfo.name}! ` : ''}You're about to transform your {businessTypeInfo?.name.toLowerCase() || 'business'} with AI automation.
            </p>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Over the next 7 days, you'll learn proven strategies and implement powerful tools 
              that will save you hours every week and help your business scale.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-guide/day/1"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              Start Day 1 Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/ai-guide"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              Review Guide Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Your Personalized Plan */}
      {businessTypeInfo && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Personalized Automation Plan
              </h2>
              <p className="text-lg text-gray-600">
                Based on your {businessTypeInfo.name} business, here's what you'll focus on:
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-6">
                  <span className="text-3xl">{businessTypeInfo.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {businessTypeInfo.name} Business
                  </h3>
                  <p className="text-gray-600">
                    {businessTypeInfo.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Your Main Challenges:</h4>
                  <ul className="space-y-2">
                    {businessTypeInfo.painPoints.map((painPoint, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {painPoint}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Wins You'll Implement:</h4>
                  <ul className="space-y-2">
                    {businessTypeInfo.quickWins.map((quickWin, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {quickWin}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Day 1 Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Start with Day 1
            </h2>
            <p className="text-lg text-gray-600">
              Your first step: assess your current business processes and identify automation opportunities.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mr-4">
                    Day 1
                  </span>
                  <span className="text-sm text-gray-500">
                    {firstDayContent.timeEstimate} • {firstDayContent.difficulty}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {firstDayContent.title}
                </h3>
                
                <p className="text-gray-700 mb-6">
                  {firstDayContent.overview}
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">What you'll accomplish:</h4>
                  <ul className="space-y-2">
                    {firstDayContent.sections.slice(0, 2).map((section: any, index: number) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {section.title}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/ai-guide/day/1"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
                  >
                    Start Day 1
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/3 bg-gradient-to-br from-blue-100 to-indigo-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tools You'll Use</h4>
                  <div className="space-y-2">
                    {firstDayContent.tools.slice(0, 3).map((tool: any, index: number) => (
                      <div key={index} className="text-sm text-gray-700 bg-white rounded px-3 py-1">
                        {tool.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tips for Success
            </h2>
            <p className="text-lg text-gray-600">
              Follow these tips to get the most out of your 7-day journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Your Time</h3>
              <p className="text-gray-600">
                Don't rush through the steps. Quality implementation is more important than speed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Everything</h3>
              <p className="text-gray-600">
                Always test your automations before considering them complete. Small bugs can cause big problems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ask Questions</h3>
              <p className="text-gray-600">
                If you get stuck, don't hesitate to reach out for help. We're here to support you.
              </p>
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
            Let's start your AI automation journey today. Your future self will thank you.
          </p>
          <Link
            href="/ai-guide/day/1"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
          >
            Begin Day 1 Now
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
