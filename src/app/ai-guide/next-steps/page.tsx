'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { guideAnalytics } from '../../../../lib/guide-analytics';

export default function NextStepsPage() {
  const [userProgress, setUserProgress] = useState({
    userId: '',
    completedDays: 0,
    businessType: '',
    conversionScore: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user progress from localStorage (in a real app, this would come from your auth system)
    const savedProgress = localStorage.getItem('guide-user-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      const completedDays = progress.completedDays.filter(Boolean).length;
      
      setUserProgress({
        userId: progress.userId,
        completedDays,
        businessType: progress.businessType,
        conversionScore: progress.conversionScore || 0
      });
      
      // Track page view
      guideAnalytics.trackPageView(progress.userId, 'next-steps');
    }
    
    setIsLoading(false);
  }, []);

  const handleUpsellClick = (upsellType: string) => {
    if (userProgress.userId) {
      guideAnalytics.trackUpsellClick(userProgress.userId, upsellType, 'next-steps');
    }
  };

  const upsellServices = [
    {
      id: 'strategy-call',
      title: 'Custom Automation Strategy Call',
      description: 'Get a personalized 60-minute consultation with our automation experts to create your custom roadmap.',
      price: '$497',
      features: [
        '60-minute strategy consultation',
        'Custom automation roadmap',
        'Tool recommendations',
        'Implementation timeline',
        'Priority framework',
        'Follow-up action plan'
      ],
      cta: 'Book Strategy Call',
      popular: true
    },
    {
      id: 'done-for-you',
      title: 'Done-for-You Automation Setup',
      description: 'Let our experts implement your complete automation system while you focus on running your business.',
      price: 'Starting at $2,997',
      features: [
        'Complete automation setup',
        'All recommended tools configured',
        'Team training and documentation',
        '30 days of support',
        'Performance optimization',
        'Monthly check-ins'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      id: 'monthly-support',
      title: 'Ongoing Automation Support',
      description: 'Get ongoing support and optimization for your automation systems with monthly strategy sessions.',
      price: '$997/month',
      features: [
        'Monthly strategy sessions',
        'Ongoing optimization',
        'New automation opportunities',
        'Priority support',
        'Performance monitoring',
        'Team training updates'
      ],
      cta: 'Start Support Plan',
      popular: false
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your next steps...</p>
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
              🎉 Congratulations!
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              You've completed {userProgress.completedDays} of 7 days in the AI Automation Guide!
            </p>

            {userProgress.completedDays === 7 ? (
              <div className="bg-green-100 border border-green-200 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Guide Complete! 🚀
                </h2>
                <p className="text-green-700">
                  You've successfully completed all 7 days of the AI Automation Guide. 
                  You now have the knowledge and tools to transform your business with automation.
                </p>
              </div>
            ) : (
              <div className="bg-blue-100 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-2">
                  Keep Going! 💪
                </h2>
                <p className="text-blue-700">
                  You're making great progress! Complete the remaining {7 - userProgress.completedDays} days 
                  to unlock the full potential of AI automation for your business.
                </p>
                <div className="mt-4">
                  <Link
                    href="/ai-guide/day/1"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
                  >
                    Continue Guide
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            <div className="text-lg text-gray-700 max-w-2xl mx-auto">
              <p className="mb-4">
                You've learned the fundamentals of AI automation and have the tools to get started. 
                Now it's time to take your automation to the next level.
              </p>
              <p>
                Whether you want to accelerate your implementation or need expert guidance, 
                we're here to help you achieve maximum results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What's Next?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              You have three options to continue your automation journey. 
              Choose the path that best fits your needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upsellServices.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-lg shadow-lg border-2 overflow-hidden relative ${
                  service.popular 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200'
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {service.price}
                    </div>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleUpsellClick(service.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                      service.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    {service.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See how other business owners have transformed their operations with our help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Success Story 1 */}
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
                "The strategy call was worth every penny. They helped me identify $50K in annual savings 
                opportunities I never knew existed. Implementation was seamless."
              </p>
              <div className="text-sm text-gray-500">
                ROI: 1,000% in first 6 months
              </div>
            </div>

            {/* Success Story 2 */}
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
                "The done-for-you service saved me months of trial and error. They set up everything 
                perfectly and my team productivity increased by 300%."
              </p>
              <div className="text-sm text-gray-500">
                Time Saved: 40 hours/week
              </div>
            </div>

            {/* Success Story 3 */}
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
                "The ongoing support has been invaluable. They continuously optimize our systems 
                and find new automation opportunities. Revenue is up 200%."
              </p>
              <div className="text-sm text-gray-500">
                Revenue Growth: 200% YoY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our automation services.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How quickly can I see results?
              </h3>
              <p className="text-gray-700">
                Most clients see immediate improvements within the first week of implementation. 
                Full ROI is typically achieved within 3-6 months depending on the complexity of your systems.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you work with businesses of all sizes?
              </h3>
              <p className="text-gray-700">
                Yes! We work with solo entrepreneurs, small businesses, and large enterprises. 
                Our approach scales to fit your specific needs and budget.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What if I'm not satisfied with the results?
              </h3>
              <p className="text-gray-700">
                We offer a 30-day money-back guarantee on all services. If you're not completely satisfied, 
                we'll refund your investment, no questions asked.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can you work with my existing tools and systems?
              </h3>
              <p className="text-gray-700">
                Absolutely! We specialize in integrating with existing systems and can work with 
                virtually any tool or platform you're currently using.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Your Automation to the Next Level?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Don't let your momentum fade. Choose your next step and start seeing results today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleUpsellClick('strategy-call')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Book Strategy Call
            </button>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Ask Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
