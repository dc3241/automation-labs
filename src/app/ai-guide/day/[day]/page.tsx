'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getDayContent, getPersonalizedRecommendations } from '@/lib/guide-content';
import { guideAnalytics } from '@/lib/guide-analytics';
import ProgressTracker from '@/components/ai-guide/ProgressTracker';
import DayNavigation from '@/components/ai-guide/DayNavigation';
import ToolRecommendationCard from '@/components/ai-guide/ToolRecommendationCard';
import ImplementationChecklist from '@/components/ai-guide/ImplementationChecklist';
import UpsellCTA from '@/components/ai-guide/UpsellCTA';

export default function DayPage() {
  const params = useParams();
  const dayNumber = parseInt(params.day as string);
  
  const [userProgress, setUserProgress] = useState({
    currentDay: 1,
    completedDays: [false, false, false, false, false, false, false],
    userId: '',
    businessType: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [dayContent, setDayContent] = useState<any>(null);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<any>(null);

  useEffect(() => {
    // Get day content
    const content = getDayContent(dayNumber);
    if (!content) {
      console.error('Day content not found for day:', dayNumber);
      return;
    }
    
    setDayContent(content);

    // Simulate getting user progress (in a real app, this would come from your auth system)
    // For now, we'll use localStorage to simulate user state
    const savedProgress = localStorage.getItem('guide-user-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
      
      // Get personalized recommendations
      const recommendations = getPersonalizedRecommendations(progress.businessType, dayNumber);
      setPersonalizedRecommendations(recommendations);
      
      // Track page view
      if (progress.userId) {
        guideAnalytics.trackPageView(progress.userId, `day-${dayNumber}`);
      }
    }
    
    setIsLoading(false);
  }, [dayNumber]);

  const handleDayComplete = async (completedDay: number) => {
    if (!userProgress.userId) return;

    try {
      // Update progress via API
      const response = await fetch('/api/guide/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userProgress.userId,
          dayNumber: completedDay,
          completed: true
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserProgress(prev => ({
          ...prev,
          currentDay: data.progress.currentDay,
          completedDays: data.progress.completedDays
        }));

        // Update localStorage
        localStorage.setItem('guide-user-progress', JSON.stringify({
          ...userProgress,
          currentDay: data.progress.currentDay,
          completedDays: data.progress.completedDays
        }));

        // Track completion
        guideAnalytics.trackDayComplete(userProgress.userId, completedDay);
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading day content...</p>
        </div>
      </div>
    );
  }

  if (!dayContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Day Not Found</h1>
          <p className="text-gray-600 mb-6">The requested day doesn't exist.</p>
          <Link 
            href="/ai-guide"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Guide
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Day Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mr-4">
                      Day {dayContent.id}
                    </span>
                    <span className="text-sm text-gray-500">
                      {dayContent.timeEstimate} • {dayContent.difficulty}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {dayContent.title}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {dayContent.subtitle}
                  </p>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {dayContent.overview}
                </p>
              </div>
            </div>

            {/* Day Sections */}
            {dayContent.sections.map((section: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
                
                {/* Implementation Checklist */}
                <ImplementationChecklist
                  checklist={section.checklist}
                  dayNumber={dayNumber}
                  userId={userProgress.userId}
                />
              </div>
            ))}

            {/* Tool Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Recommended Tools
                  </h2>
                  {personalizedRecommendations && (
                    <p className="text-gray-600">
                      {personalizedRecommendations.personalizedMessage}
                    </p>
                  )}
                </div>
                <Link
                  href="/ai-guide/tools"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  View All Tools →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dayContent.tools.map((tool: any, index: number) => {
                  const isPersonalized = personalizedRecommendations?.tools.some((recTool: any) => 
                    recTool.name === tool.name
                  );
                  
                  return (
                    <ToolRecommendationCard
                      key={index}
                      tool={tool}
                      dayNumber={dayNumber}
                      userId={userProgress.userId}
                      isPersonalized={isPersonalized}
                      businessType={userProgress.businessType}
                    />
                  );
                })}
              </div>
            </div>

            {/* Upsell CTA */}
            <UpsellCTA
              upsell={dayContent.upsell}
              dayNumber={dayNumber}
              userId={userProgress.userId}
              businessType={userProgress.businessType}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Progress Tracker */}
            <ProgressTracker
              currentDay={userProgress.currentDay}
              completedDays={userProgress.completedDays}
              userId={userProgress.userId}
              businessType={userProgress.businessType}
            />

            {/* Day Navigation */}
            <DayNavigation
              currentDay={dayNumber}
              totalDays={7}
              userId={userProgress.userId}
              onDayComplete={handleDayComplete}
            />

            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Take your time with each step - quality over speed
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Test each automation before moving to the next
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Document your processes as you build them
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Don't hesitate to ask for help if you get stuck
                </li>
              </ul>
            </div>

            {/* Need Help? */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-blue-800 mb-4">
                Stuck on a step? Our automation experts are here to help you succeed.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Get Support
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
