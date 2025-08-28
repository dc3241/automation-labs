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
    'Automation'
  ];

  const tools = [
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
      id: 12,
      name: 'Zendesk Answer Bot',
      featured: false,
      rating: 4.1,
      description: 'AI-powered customer service bot that automatically resolves common support issues and escalates complex queries.',
      categories: ['Customer Support', 'Automation'],
      pricing: 'Paid $49+/mo',
      icon: '🤖'
    },
    {
      id: 16,
      name: 'Tidio',
      featured: false,
      rating: 4.4,
      description: 'AI-powered chatbots and live chat solution designed specifically for ecommerce websites to boost conversions.',
      categories: ['Customer Support', 'Automation'],
      pricing: 'Paid $18+/mo',
      icon: '💬'
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
      categories: ['Email Marketing', 'Automation'],
      pricing: 'Paid $29+/mo',
      icon: '📧'
    },
    {
      id: 32,
      name: 'ActiveCampaign',
      featured: true,
      rating: 4.5,
      description: 'Marketing automation platform with AI-powered email personalization and customer journey optimization.',
      categories: ['Email Marketing', 'Marketing', 'Automation'],
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
      name: 'Describely',
      featured: false,
      rating: 4.2,
      description: 'AI-powered product description generator that creates compelling and SEO-optimized content for ecommerce products.',
      categories: ['Content Creation'],
      pricing: 'Paid $19+/mo',
      icon: '📝'
    },
    {
      id: 35,
      name: 'Rytr',
      featured: false,
      rating: 4.3,
      description: 'AI writing assistant that helps create high-quality content for blogs, emails, social media, and marketing materials.',
      categories: ['Content Creation'],
      pricing: 'Freemium $9+/mo',
      icon: '✍️',
      url: 'https://rytr.me/?via=ai-comparison'
    },
    {
      id: 36,
      name: 'Pictory',
      featured: false,
      rating: 4.4,
      description: 'AI video creation platform that automatically generates engaging videos from long-form content and blog posts.',
      categories: ['Content Creation', 'Design & Creative'],
      pricing: 'Paid $23+/mo',
      icon: '🎬',
      url: 'https://pictory.ai?ref=dominic20'
    },
    {
      id: 37,
      name: 'Synthesia',
      featured: false,
      rating: 4.6,
      description: 'AI video generation platform that creates professional videos with virtual presenters and customizable avatars.',
      categories: ['Content Creation', 'Design & Creative'],
      pricing: 'Paid $30+/mo',
      icon: '🎭',
      url: 'https://www.synthesia.io/?via=ai-comparison'
    },
    {
      id: 38,
      name: 'Creatify',
      featured: false,
      rating: 4.1,
      description: 'AI-powered creative design platform that generates visual content, graphics, and marketing materials.',
      categories: ['Content Creation', 'Design & Creative'],
      pricing: 'Paid $15+/mo',
      icon: '🎨',
      url: 'https://creatify.ai/?via=autolabs'
    },
    {
      id: 39,
      name: 'Blaze',
      featured: false,
      rating: 4.3,
      description: 'AI-powered social media management platform that automates content creation, scheduling, and analytics.',
      categories: ['Marketing', 'Social Media', 'Content Creation'],
      pricing: 'Paid $25+/mo',
      icon: '🔥',
      url: 'https://blaze.ai?ref=thz3j'
    },
    {
      id: 40,
      name: 'Scalenut',
      featured: false,
      rating: 4.2,
      description: 'AI-powered SEO content optimization platform that helps create search-engine friendly content and improve rankings.',
      categories: ['Website & SEO'],
      pricing: 'Paid $39+/mo',
      icon: '🔍',
      url: 'https://scalenut.com/?fpr=ai-comparison'
    },
    {
      id: 41,
      name: 'Koala AI',
      featured: false,
      rating: 4.4,
      description: 'AI content writer that creates SEO-optimized articles and blog posts with advanced keyword research.',
      categories: ['Website & SEO'],
      pricing: 'Paid $9+/mo',
      icon: '🐨',
      url: 'https://koala.sh/?via=innovativeai'
    },
    {
      id: 42,
      name: 'Neuron Writer',
      featured: false,
      rating: 4.1,
      description: 'AI-powered content optimization tool that provides SEO recommendations and helps improve content rankings.',
      categories: ['Website & SEO'],
      pricing: 'Paid $19+/mo',
      icon: '🧠',
      url: 'https://app.neuronwriter.com/ar/93a253c123916e18fa3e3d603ec3c8b4'
    },
    {
      id: 43,
      name: 'Frase',
      featured: false,
      rating: 4.3,
      description: 'AI content optimization platform that helps create SEO-friendly content and answer user search intent.',
      categories: ['Website & SEO'],
      pricing: 'Paid $44+/mo',
      icon: '📊',
      url: 'https://www.frase.io/?via=innovativeai'
    },
    {
      id: 44,
      name: 'Tely',
      featured: false,
      rating: 4.0,
      description: 'AI-powered SEO tool that provides keyword research, content optimization, and competitive analysis.',
      categories: ['Website & SEO'],
      pricing: 'Paid $29+/mo',
      icon: '🎯',
      url: 'https://www.tely.ai/?via=autolabs'
    },
    {
      id: 45,
      name: 'ChatBase',
      featured: false,
      rating: 4.2,
      description: 'AI chatbot platform that creates custom chatbots for websites using your own knowledge base and documents.',
      categories: ['Customer Support'],
      pricing: 'Paid $20+/mo',
      icon: '💬',
      url: 'https://www.chatbase.co/?via=autolabs'
    },
    {
      id: 46,
      name: 'DocsBot',
      featured: false,
      rating: 4.1,
      description: 'AI-powered documentation chatbot that answers questions based on your documentation and knowledge base.',
      categories: ['Customer Support'],
      pricing: 'Paid $15+/mo',
      icon: '📚',
      url: 'https://docsbot.ai?via=autolabs'
    },
    {
      id: 47,
      name: 'SiteSpeak',
      featured: false,
      rating: 4.3,
      description: 'AI website chatbot that provides instant customer support and answers based on your website content.',
      categories: ['Customer Support'],
      pricing: 'Paid $25+/mo',
      icon: '🌐',
      url: 'https://sitespeak.ai/?via=ai-comparison'
    },
    {
      id: 48,
      name: 'Create.xyz',
      featured: false,
      rating: 4.2,
      description: 'AI-powered website builder that creates professional websites with SEO optimization and modern design.',
      categories: ['Website & SEO'],
      pricing: 'Paid $12+/mo',
      icon: '🏗️',
      url: 'https://www.createanything.com/?via=iab'
    },
    {
      id: 49,
      name: 'Predis AI',
      featured: false,
      rating: 4.4,
      description: 'AI social media content generator that creates engaging posts, captions, and visual content for multiple platforms.',
      categories: ['Social Media', 'Marketing'],
      pricing: 'Paid $18+/mo',
      icon: '📱',
      url: 'https://predis.ai?ref=dominic51'
    },
    {
      id: 50,
      name: 'Taskade',
      featured: false,
      rating: 4.5,
      description: 'AI-powered project management and collaboration platform that automates workflows and team coordination.',
      categories: ['Automation'],
      pricing: 'Freemium $20+/mo',
      icon: '✅',
      url: 'https://taskade.com/?via=8pbsp'
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
                    {tool.url ? (
                      <a 
                        href={tool.url}
                        target="_blank"
                        rel="noopener"
                        className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>Visit</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2">
                        <span>Visit</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    )}
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
