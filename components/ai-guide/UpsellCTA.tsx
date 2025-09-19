'use client';

import { useState } from 'react';
import { guideAnalytics } from '../../lib/guide-analytics';

interface UpsellCTAProps {
  upsell: {
    title: string;
    description: string;
    cta: string;
    price?: string;
  };
  dayNumber: number;
  userId?: string;
  businessType?: string;
}

export default function UpsellCTA({ upsell, dayNumber, userId, businessType }: UpsellCTAProps) {
  const [isViewing, setIsViewing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleView = () => {
    setIsViewing(true);
    
    if (userId) {
      guideAnalytics.trackUpsellView(userId, upsell.title, `day-${dayNumber}`);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    
    if (userId) {
      guideAnalytics.trackUpsellClick(userId, upsell.title, `day-${dayNumber}`);
    }

    // Here you would typically redirect to a contact form or booking page
    // For now, we'll just show a success message
    setTimeout(() => {
      alert(`Thank you for your interest in "${upsell.title}". Our team will contact you shortly to discuss your custom automation needs.`);
      setIsClicked(false);
    }, 1000);
  };

  const getUpsellIcon = (title: string) => {
    if (title.toLowerCase().includes('audit')) return '🔍';
    if (title.toLowerCase().includes('content')) return '✍️';
    if (title.toLowerCase().includes('social')) return '📱';
    if (title.toLowerCase().includes('communication')) return '💬';
    if (title.toLowerCase().includes('sales')) return '📊';
    if (title.toLowerCase().includes('operations')) return '⚙️';
    if (title.toLowerCase().includes('strategy')) return '🎯';
    return '🚀';
  };

  const getUpsellColor = (title: string) => {
    if (title.toLowerCase().includes('audit')) return 'from-purple-500 to-purple-600';
    if (title.toLowerCase().includes('content')) return 'from-blue-500 to-blue-600';
    if (title.toLowerCase().includes('social')) return 'from-pink-500 to-pink-600';
    if (title.toLowerCase().includes('communication')) return 'from-green-500 to-green-600';
    if (title.toLowerCase().includes('sales')) return 'from-orange-500 to-orange-600';
    if (title.toLowerCase().includes('operations')) return 'from-indigo-500 to-indigo-600';
    if (title.toLowerCase().includes('strategy')) return 'from-teal-500 to-teal-600';
    return 'from-gray-500 to-gray-600';
  };

  if (!isViewing) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">{getUpsellIcon(upsell.title)}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Want to Skip the DIY?
          </h3>
          <p className="text-gray-600 mb-4">
            Our experts can implement everything for you while you focus on running your business.
          </p>
          <button
            onClick={handleView}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            See What's Included
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getUpsellColor(upsell.title)} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">{getUpsellIcon(upsell.title)}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{upsell.title}</h3>
              {upsell.price && (
                <p className="text-white text-opacity-90">Starting at {upsell.price}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Done-for-You</div>
            <div className="text-sm opacity-90">Service</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 leading-relaxed">
          {upsell.description}
        </p>

        {/* What's Included */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
          <div className="space-y-2">
            {getIncludedItems(upsell.title).map((item, index) => (
              <div key={index} className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Type Specific Benefits */}
        {businessType && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              Perfect for {businessType} businesses
            </h4>
            <p className="text-sm text-blue-800">
              {getBusinessTypeBenefit(businessType, upsell.title)}
            </p>
          </div>
        )}

        {/* Timeline */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Timeline:</h4>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {getTimeline(upsell.title)}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          disabled={isClicked}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center ${
            isClicked
              ? 'bg-green-600 text-white'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
          }`}
        >
          {isClicked ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting You...
            </>
          ) : (
            <>
              <span>{upsell.cta}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>

        {/* Trust Signals */}
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure & Confidential
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Money-Back Guarantee
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions for dynamic content
function getIncludedItems(title: string): string[] {
  const items: Record<string, string[]> = {
    'audit': [
      'Complete business process analysis',
      'Time and cost audit report',
      'ROI calculation for each opportunity',
      'Prioritized automation roadmap',
      'Implementation timeline',
      'Follow-up consultation'
    ],
    'content': [
      'AI tool setup and configuration',
      'Brand voice training for AI',
      'Content calendar automation',
      'Template creation and optimization',
      'Quality control processes',
      'Team training and handoff'
    ],
    'social': [
      'Cross-platform posting automation',
      'Engagement automation setup',
      'Analytics dashboard creation',
      'Content scheduling optimization',
      'Performance monitoring setup',
      'Monthly optimization reports'
    ],
    'communication': [
      'Email sequence design and setup',
      'Chatbot configuration',
      'Review collection automation',
      'Customer journey mapping',
      'Response template creation',
      'Ongoing monitoring and optimization'
    ],
    'sales': [
      'CRM setup and configuration',
      'Lead scoring system implementation',
      'Proposal automation setup',
      'Follow-up sequence creation',
      'Sales analytics dashboard',
      'Team training and support'
    ],
    'operations': [
      'Complete workflow analysis',
      'Automation implementation',
      'System integrations setup',
      'Team training and documentation',
      'Performance monitoring',
      'Ongoing optimization support'
    ],
    'strategy': [
      '60-minute strategy consultation',
      'Custom automation roadmap',
      'Tool recommendations',
      'Implementation timeline',
      'Priority framework',
      'Follow-up action plan'
    ]
  };

  const key = Object.keys(items).find(k => title.toLowerCase().includes(k));
  return key ? items[key] : [
    'Complete setup and configuration',
    'Custom implementation',
    'Team training and documentation',
    'Ongoing support and optimization'
  ];
}

function getTimeline(title: string): string {
  const timelines: Record<string, string> = {
    'audit': '3-5 business days',
    'content': '1-2 weeks',
    'social': '1-2 weeks',
    'communication': '1-2 weeks',
    'sales': '2-3 weeks',
    'operations': '2-4 weeks',
    'strategy': '1-2 business days'
  };

  const key = Object.keys(timelines).find(k => title.toLowerCase().includes(k));
  return key ? timelines[key] : '1-2 weeks';
}

function getBusinessTypeBenefit(businessType: string, title: string): string {
  const benefits: Record<string, Record<string, string>> = {
    'ecommerce': {
      'communication': 'Automate order confirmations, shipping updates, and customer support to reduce manual work by 70%',
      'social': 'Increase social media engagement and drive more traffic to your online store',
      'operations': 'Streamline inventory management and order processing for faster fulfillment'
    },
    'agency': {
      'content': 'Scale your content creation for multiple clients without hiring additional writers',
      'sales': 'Automate proposal generation and follow-up sequences to close more deals',
      'operations': 'Streamline client reporting and project management workflows'
    },
    'saas': {
      'communication': 'Improve user onboarding and reduce churn with automated email sequences',
      'operations': 'Automate user analytics and feature adoption tracking',
      'sales': 'Implement lead scoring and automated nurturing for better conversion rates'
    },
    'influencer': {
      'content': 'Maintain consistent posting schedule across all platforms with minimal effort',
      'social': 'Increase engagement and build stronger relationships with your audience',
      'operations': 'Automate brand partnership management and content scheduling'
    }
  };

  const titleKey = Object.keys(benefits[businessType] || {}).find(k => title.toLowerCase().includes(k));
  return titleKey ? benefits[businessType][titleKey] : `Specifically designed for ${businessType} businesses to maximize ROI and efficiency`;
}
