'use client';

import { useState } from 'react';

export default function AITools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    'Marketing',
    'Customer Support', 
    'Content Creation',
    'Social Media',
    'Analytics & Data',
    'Design & Creative',
    'Email Marketing',
    'Website & SEO',
    'HR & Team Management'
  ];

  const tools = [
    {
      id: 1,
      name: 'ChatGPT',
      featured: true,
      rating: 4.9,
      description: 'Advanced AI language model for content creation, coding assistance, and creative writing.',
      categories: ['Content Creation', 'Ecommerce'],
      pricing: 'Freemium $20/mo',
      icon: '🤖'
    },
    {
      id: 2,
      name: 'Jasper AI',
      featured: true,
      rating: 4.7,
      description: 'AI writing assistant that helps create marketing copy, blog posts, and social media content.',
      categories: ['Content Creation', 'Marketing', 'Ecommerce'],
      pricing: 'Paid $49/mo',
      icon: '✨'
    },
    {
      id: 3,
      name: 'Copy.ai',
      featured: false,
      rating: 4.6,
      description: 'AI-powered copywriting tool for marketing teams and content creators.',
      categories: ['Marketing', 'Content Creation', 'Ecommerce'],
      pricing: 'Freemium $36/mo',
      icon: '📝'
    },
    {
      id: 4,
      name: 'Midjourney',
      featured: true,
      rating: 4.8,
      description: 'AI art generation tool for creating unique visuals and creative content.',
      categories: ['Design & Creative'],
      pricing: 'Paid $30/mo',
      icon: '🎨'
    },
    {
      id: 5,
      name: 'Hootsuite',
      featured: false,
      rating: 4.5,
      description: 'Social media management platform for scheduling and analytics.',
      categories: ['Social Media'],
      pricing: 'Freemium $29/mo',
      icon: '🦉'
    },
    {
      id: 6,
      name: 'Intercom',
      featured: false,
      rating: 4.7,
      description: 'AI-powered customer service and communication platform.',
      categories: ['Customer Support'],
      pricing: 'Paid $39/mo',
      icon: '💬'
    },
    {
      id: 7,
      name: 'Klaviyo',
      featured: true,
      rating: 4.6,
      description: 'AI-powered email marketing platform designed specifically for ecommerce businesses with advanced segmentation and automation.',
      categories: ['Marketing', 'Email Marketing'],
      pricing: 'Paid $20+/mo',
      icon: '📧'
    },
    {
      id: 8,
      name: 'HubSpot Marketing Hub',
      featured: false,
      rating: 4.5,
      description: 'Comprehensive inbound marketing platform with AI-driven lead scoring and marketing automation for B2B companies.',
      categories: ['Marketing', 'Analytics & Data'],
      pricing: 'Paid $45+/mo',
      icon: '🎯'
    },
    {
      id: 9,
      name: 'Mailchimp',
      featured: false,
      rating: 4.3,
      description: 'Popular email marketing platform with AI-powered content optimization and audience insights for small businesses.',
      categories: ['Email Marketing', 'Marketing'],
      pricing: 'Freemium $10+/mo',
      icon: '📬'
    },
    {
      id: 10,
      name: 'Drift',
      featured: true,
      rating: 4.4,
      description: 'Conversational marketing platform with AI chatbots that qualify leads and drive sales conversations in real-time.',
      categories: ['Marketing', 'Customer Support'],
      pricing: 'Paid $50+/mo',
      icon: '💬'
    },
    {
      id: 11,
      name: 'Salesforce Marketing Cloud',
      featured: false,
      rating: 4.2,
      description: 'Enterprise-level marketing automation platform with AI-driven customer journey orchestration and analytics.',
      categories: ['Marketing', 'Analytics & Data'],
      pricing: 'Contact pricing',
      icon: '☁️'
    },
    {
      id: 12,
      name: 'Zendesk Answer Bot',
      featured: false,
      rating: 4.1,
      description: 'AI-powered customer service bot that automatically resolves common support issues and escalates complex queries.',
      categories: ['Customer Support'],
      pricing: 'Paid $49+/mo',
      icon: '🤖'
    },
    {
      id: 13,
      name: 'Freshworks Freddy AI',
      featured: false,
      rating: 4.3,
      description: 'Intelligent customer support platform with AI-powered ticket routing and automated response suggestions.',
      categories: ['Customer Support'],
      pricing: 'Paid $15+/mo',
      icon: '🦊'
    },
    {
      id: 14,
      name: 'Ada',
      featured: true,
      rating: 4.5,
      description: 'No-code AI chatbot platform that helps businesses automate customer support and improve response times.',
      categories: ['Customer Support'],
      pricing: 'Paid $99+/mo',
      icon: '👩'
    },
    {
      id: 15,
      name: 'LivePerson',
      featured: false,
      rating: 4.0,
      description: 'Enterprise conversational AI platform for customer service automation and messaging across multiple channels.',
      categories: ['Customer Support'],
      pricing: 'Contact pricing',
      icon: '💬'
    },
    {
      id: 16,
      name: 'Tidio',
      featured: false,
      rating: 4.4,
      description: 'AI-powered chatbots and live chat solution designed specifically for ecommerce websites to boost conversions.',
      categories: ['Customer Support'],
      pricing: 'Paid $18+/mo',
      icon: '💬'
    },
    {
      id: 17,
      name: 'Writesonic',
      featured: false,
      rating: 4.3,
      description: 'AI content creation platform specializing in ecommerce product descriptions, ads, and marketing copy.',
      categories: ['Content Creation', 'Marketing'],
      pricing: 'Paid $12+/mo',
      icon: '✍️'
    },
    {
      id: 18,
      name: 'Phrasee',
      featured: false,
      rating: 4.2,
      description: 'AI-powered email subject line and copy optimization tool that improves open rates and click-through rates.',
      categories: ['Content Creation', 'Email Marketing'],
      pricing: 'Contact pricing',
      icon: '📝'
    },
    {
      id: 19,
      name: 'Persado',
      featured: false,
      rating: 4.1,
      description: 'Marketing language optimization platform that uses AI to create emotionally resonant marketing messages.',
      categories: ['Content Creation', 'Marketing'],
      pricing: 'Contact pricing',
      icon: '🧠'
    },
    {
      id: 20,
      name: 'MarketMuse',
      featured: false,
      rating: 4.0,
      description: 'AI content planning and optimization platform that helps create comprehensive content strategies for SEO.',
      categories: ['Content Creation', 'Website & SEO'],
      pricing: 'Paid $99+/mo',
      icon: '📊'
    },
    {
      id: 21,
      name: 'Surfer SEO',
      featured: true,
      rating: 4.4,
      description: 'AI-powered content optimization tool that provides real-time SEO recommendations and keyword analysis.',
      categories: ['Content Creation', 'Website & SEO'],
      pricing: 'Paid $59+/mo',
      icon: '🏄'
    },
    {
      id: 22,
      name: 'Sprout Social',
      featured: false,
      rating: 4.3,
      description: 'Social media management platform with AI-powered analytics and content optimization for brand engagement.',
      categories: ['Social Media', 'Analytics & Data'],
      pricing: 'Paid $99+/mo',
      icon: '🌱'
    },
    {
      id: 23,
      name: 'Later',
      featured: false,
      rating: 4.2,
      description: 'AI-powered social media scheduling platform with visual content planning and automated posting.',
      categories: ['Social Media'],
      pricing: 'Paid $15+/mo',
      icon: '⏰'
    },
    {
      id: 24,
      name: 'Buffer',
      featured: false,
      rating: 4.1,
      description: 'Social media automation platform with AI-driven content suggestions and optimal posting time recommendations.',
      categories: ['Social Media'],
      pricing: 'Paid $6+/mo',
      icon: '📱'
    },
    {
      id: 25,
      name: 'Socialbakers',
      featured: false,
      rating: 4.0,
      description: 'Social media intelligence platform with AI-powered competitor analysis and content performance insights.',
      categories: ['Social Media', 'Analytics & Data'],
      pricing: 'Contact pricing',
      icon: '📈'
    },
    {
      id: 26,
      name: 'Mixpanel',
      featured: true,
      rating: 4.5,
      description: 'AI-powered product analytics platform that helps businesses understand user behavior and optimize conversions.',
      categories: ['Analytics & Data'],
      pricing: 'Paid $25+/mo',
      icon: '📊'
    },
    {
      id: 27,
      name: 'Hotjar',
      featured: false,
      rating: 4.3,
      description: 'Website optimization platform with AI-powered heatmaps and user behavior analysis to improve conversion rates.',
      categories: ['Analytics & Data', 'Website & SEO'],
      pricing: 'Paid $32+/mo',
      icon: '🔥'
    },
    {
      id: 28,
      name: 'Google Analytics Intelligence',
      featured: false,
      rating: 4.2,
      description: 'AI-powered web analytics with automated insights and anomaly detection for website performance monitoring.',
      categories: ['Analytics & Data'],
      pricing: 'Free',
      icon: '📈'
    },
    {
      id: 29,
      name: 'Segment',
      featured: false,
      rating: 4.1,
      description: 'Customer data platform with AI-powered data collection and integration for unified customer analytics.',
      categories: ['Analytics & Data'],
      pricing: 'Paid $120+/mo',
      icon: '🔗'
    },
    {
      id: 30,
      name: 'Amplitude',
      featured: false,
      rating: 4.4,
      description: 'Behavioral analytics platform with AI-driven user journey analysis and product optimization insights.',
      categories: ['Analytics & Data'],
      pricing: 'Paid $61+/mo',
      icon: '📊'
    },
    {
      id: 31,
      name: 'ConvertKit',
      featured: false,
      rating: 4.3,
      description: 'AI-powered email automation platform designed for creators and small businesses with advanced segmentation.',
      categories: ['Email Marketing'],
      pricing: 'Paid $29+/mo',
      icon: '📧'
    },
    {
      id: 32,
      name: 'ActiveCampaign',
      featured: true,
      rating: 4.5,
      description: 'Marketing automation platform with AI-powered email personalization and customer journey optimization.',
      categories: ['Email Marketing', 'Marketing'],
      pricing: 'Paid $29+/mo',
      icon: '🎯'
    },
    {
      id: 33,
      name: 'Constant Contact',
      featured: false,
      rating: 4.0,
      description: 'Email marketing platform for small businesses with AI-powered templates and automation workflows.',
      categories: ['Email Marketing'],
      pricing: 'Paid $20+/mo',
      icon: '📬'
    },
    {
      id: 34,
      name: 'Clearscope',
      featured: false,
      rating: 4.2,
      description: 'AI-powered content optimization platform for SEO that provides comprehensive keyword research and content grading.',
      categories: ['Website & SEO', 'Content Creation'],
      pricing: 'Paid $170+/mo',
      icon: '🔍'
    },
    {
      id: 35,
      name: 'BrightEdge',
      featured: false,
      rating: 4.1,
      description: 'Enterprise SEO platform with AI-driven content optimization and competitive intelligence for large organizations.',
      categories: ['Website & SEO'],
      pricing: 'Contact pricing',
      icon: '💡'
    },
    {
      id: 36,
      name: 'Screaming Frog',
      featured: false,
      rating: 4.3,
      description: 'AI-powered SEO site auditing tool that crawls websites and identifies technical SEO issues and opportunities.',
      categories: ['Website & SEO'],
      pricing: 'Paid $259/year',
      icon: '🐸'
    }
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || 
                           tool.categories.some(cat => selectedCategories.includes(cat));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Tools for Online Businesses
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>
              
              {/* Search Bar */}
              <div className="mb-6">
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

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Pricing</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-gray-700">Free</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-gray-700">Freemium</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-gray-700">Paid</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area - Tools Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  {/* Tool Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                        {tool.featured && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">{tool.rating}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.categories.map((category) => (
                      <span key={category} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Visit Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{tool.pricing}</span>
                    <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2">
                      <span>Visit</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No tools found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
