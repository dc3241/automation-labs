'use client';

import { useState } from 'react';
import { guideAnalytics } from '../../lib/guide-analytics';

interface ToolRecommendationCardProps {
  tool: {
    name: string;
    category: string;
    description: string;
    pricing: string;
    bestFor: string[];
    affiliateUrl?: string;
    diyTime: string;
    doneForYou?: boolean;
  };
  dayNumber: number;
  userId?: string;
  isPersonalized?: boolean;
  businessType?: string;
}

export default function ToolRecommendationCard({
  tool,
  dayNumber,
  userId,
  isPersonalized = false,
  businessType
}: ToolRecommendationCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleToolClick = async () => {
    if (!tool.affiliateUrl) return;

    setIsClicked(true);
    
    // Track the click
    if (userId) {
      guideAnalytics.trackToolClick(userId, tool.name, tool.affiliateUrl, `day-${dayNumber}`);
    }

    // Open affiliate link in new tab
    window.open(tool.affiliateUrl, '_blank', 'noopener,noreferrer');

    // Reset click state after delay
    setTimeout(() => setIsClicked(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Process Management': '⚙️',
      'Workflow Automation': '🔄',
      'Time Tracking': '⏱️',
      'Content Creation': '✍️',
      'Social Media': '📱',
      'Chat Automation': '💬',
      'Email Marketing': '📧',
      'Customer Support': '🎧',
      'Live Chat': '💬',
      'Review Management': '⭐',
      'CRM': '📊',
      'Marketing Hub': '🎯',
      'Document Automation': '📄',
      'Accounting': '💰',
      'Project Management': '📋',
      'Team Communication': '💬',
      'Analytics': '📈',
      'Product Analytics': '📊',
      'User Experience': '👥'
    };
    return icons[category] || '🔧';
  };

  const getDifficultyColor = (time: string) => {
    const minutes = parseInt(time.split(' ')[0]);
    if (minutes <= 60) return 'text-green-600 bg-green-100';
    if (minutes <= 180) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const isBestForCurrentBusiness = businessType && tool.bestFor.includes(businessType);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${
      isPersonalized ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
    } ${isBestForCurrentBusiness ? 'bg-blue-50 border-blue-200' : ''}`}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
            {getCategoryIcon(tool.category)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center">
              {tool.name}
              {isPersonalized && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Recommended
                </span>
              )}
            </h3>
            <span className="text-sm text-gray-500">{tool.category}</span>
          </div>
        </div>
        
        {tool.doneForYou && (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
            Done-for-You
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {tool.description}
      </p>

      {/* Best For Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tool.bestFor.map((businessTypeName) => (
          <span 
            key={businessTypeName}
            className={`px-2 py-1 text-xs rounded-full ${
              businessTypeName === businessType
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {businessTypeName}
          </span>
        ))}
      </div>

      {/* Implementation Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">DIY Time</div>
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getDifficultyColor(tool.diyTime)}`}>
            {tool.diyTime}
          </span>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Pricing</div>
          <span className="text-sm font-medium text-gray-900">{tool.pricing}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {tool.affiliateUrl ? (
          <button
            onClick={handleToolClick}
            disabled={isClicked}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${
              isClicked
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isClicked ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Opening Tool...
              </>
            ) : (
              <>
                <span>Try {tool.name}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </>
            )}
          </button>
        ) : (
          <button
            disabled
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}

        {tool.doneForYou && (
          <button className="px-4 py-2 border border-green-300 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200 flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Done-for-You
          </button>
        )}
      </div>

      {/* Personalization Message */}
      {isPersonalized && businessType && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium">
                Perfect for {businessType} businesses
              </p>
              <p className="text-xs text-blue-700 mt-1">
                This tool is specifically recommended for your business type based on proven results.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
