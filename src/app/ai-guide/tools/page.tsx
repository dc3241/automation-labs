'use client';

import { useState, useEffect } from 'react';
import { guideAnalytics } from '@/lib/guide-analytics';
import ToolRecommendationCard from '@/components/ai-guide/ToolRecommendationCard';

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  pricing: string;
  bestFor: string[];
  affiliateUrl?: string;
  diyTime: string;
  doneForYou?: boolean;
  clickCount: number;
  conversionRating: number;
  dayFeatured?: number;
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'rating'>('popularity');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'all',
    'Process Management',
    'Workflow Automation',
    'Time Tracking',
    'Content Creation',
    'Social Media',
    'Chat Automation',
    'Email Marketing',
    'Customer Support',
    'Live Chat',
    'Review Management',
    'CRM',
    'Marketing Hub',
    'Document Automation',
    'Accounting',
    'Project Management',
    'Team Communication',
    'Analytics',
    'Product Analytics',
    'User Experience'
  ];

  const businessTypes = [
    'all',
    'ecommerce',
    'agency',
    'saas',
    'influencer',
    'other'
  ];

  useEffect(() => {
    // Simulate loading tools (in a real app, this would come from your API)
    const loadTools = async () => {
      // Mock data - in production, fetch from your database
      const mockTools: Tool[] = [
        {
          id: '1',
          name: 'Zapier',
          category: 'Workflow Automation',
          description: 'Connect 5,000+ apps with automated workflows',
          pricing: 'Freemium $20+/mo',
          bestFor: ['ecommerce', 'agency', 'saas', 'influencer'],
          affiliateUrl: 'https://zapier.com/?via=autolabs',
          diyTime: '1-2 hours',
          clickCount: 1250,
          conversionRating: 4.8,
          dayFeatured: 1
        },
        {
          id: '2',
          name: 'Copy.ai',
          category: 'Content Creation',
          description: 'AI writing assistant for marketing copy, blog posts, and social media',
          pricing: 'Freemium $36+/mo',
          bestFor: ['ecommerce', 'agency', 'influencer'],
          affiliateUrl: 'https://copy.ai/?via=autolabs',
          diyTime: '1-2 hours',
          clickCount: 890,
          conversionRating: 4.3,
          dayFeatured: 2
        },
        {
          id: '3',
          name: 'ActiveCampaign',
          category: 'Email Marketing',
          description: 'Marketing automation with AI-powered personalization',
          pricing: 'Paid $29+/mo',
          bestFor: ['ecommerce', 'agency', 'saas'],
          affiliateUrl: 'https://activecampaign.com/?via=autolabs',
          diyTime: '3-4 hours',
          clickCount: 750,
          conversionRating: 4.5,
          dayFeatured: 4
        },
        {
          id: '4',
          name: 'Hootsuite',
          category: 'Social Media',
          description: 'Complete social media management platform with AI analytics',
          pricing: 'Paid $49+/mo',
          bestFor: ['ecommerce', 'agency'],
          affiliateUrl: 'https://hootsuite.com/?via=autolabs',
          diyTime: '2-3 hours',
          clickCount: 650,
          conversionRating: 4.4,
          dayFeatured: 3
        },
        {
          id: '5',
          name: 'Intercom',
          category: 'Customer Support',
          description: 'AI-powered customer service and communication platform',
          pricing: 'Paid $39+/mo',
          bestFor: ['saas', 'ecommerce'],
          affiliateUrl: 'https://intercom.com/?via=autolabs',
          diyTime: '2-3 hours',
          clickCount: 580,
          conversionRating: 4.7,
          dayFeatured: 4
        },
        {
          id: '6',
          name: 'Mixpanel',
          category: 'Product Analytics',
          description: 'AI-powered product analytics and user behavior tracking',
          pricing: 'Paid $25+/mo',
          bestFor: ['saas', 'ecommerce'],
          affiliateUrl: 'https://mixpanel.com/?via=autolabs',
          diyTime: '2-3 hours',
          clickCount: 520,
          conversionRating: 4.5,
          dayFeatured: 7
        }
      ];

      setTools(mockTools);
      setFilteredTools(mockTools);
      setIsLoading(false);

      // Track page view
      const userId = localStorage.getItem('guide-user-id');
      if (userId) {
        guideAnalytics.trackPageView(userId, 'tools-directory');
      }
    };

    loadTools();
  }, []);

  useEffect(() => {
    // Filter and sort tools
    let filtered = tools.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesBusinessType = selectedBusinessType === 'all' || tool.bestFor.includes(selectedBusinessType);
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesBusinessType && matchesSearch;
    });

    // Sort tools
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
          return b.clickCount - a.clickCount;
        case 'rating':
          return b.conversionRating - a.conversionRating;
        default:
          return 0;
      }
    });

    setFilteredTools(filtered);
  }, [tools, selectedCategory, selectedBusinessType, searchTerm, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Automation Tools Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and compare the best AI automation tools for your business. 
            Each tool has been tested and recommended by our automation experts.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Tools
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Business Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                value={selectedBusinessType}
                onChange={(e) => setSelectedBusinessType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {businessTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Business Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'popularity' | 'rating')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredTools.length} of {tools.length} tools
            </p>
            
            {(selectedCategory !== 'all' || selectedBusinessType !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBusinessType('all');
                  setSearchTerm('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Tool Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {getCategoryIcon(tool.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                      <span className="text-sm text-gray-500">{tool.category}</span>
                    </div>
                  </div>
                  
                  {tool.dayFeatured && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Day {tool.dayFeatured}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {tool.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{tool.conversionRating}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{tool.clickCount} clicks</span>
                  </div>
                </div>

                {/* Best For */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.bestFor.map((businessType) => (
                    <span key={businessType} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {businessType}
                    </span>
                  ))}
                </div>

                {/* Pricing and Action */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{tool.pricing}</span>
                  {tool.affiliateUrl ? (
                    <a
                      href={tool.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        const userId = localStorage.getItem('guide-user-id');
                        if (userId) {
                          guideAnalytics.trackToolClick(userId, tool.name, tool.affiliateUrl, 'tools-directory');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>Try Tool</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <button className="px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed">
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBusinessType('all');
                setSearchTerm('');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get category icons
function getCategoryIcon(category: string): string {
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
}
