'use client';

import Link from 'next/link';
import { guideAnalytics } from '../../lib/guide-analytics';

interface DayNavigationProps {
  currentDay: number;
  totalDays: number;
  userId?: string;
  onDayComplete?: (dayNumber: number) => void;
}

export default function DayNavigation({ 
  currentDay, 
  totalDays, 
  userId,
  onDayComplete 
}: DayNavigationProps) {
  const isFirstDay = currentDay === 1;
  const isLastDay = currentDay === totalDays;

  const handleDayComplete = async () => {
    // Track day completion
    if (userId) {
      guideAnalytics.trackDayComplete(userId, currentDay);
    }

    // Call parent callback
    if (onDayComplete) {
      onDayComplete(currentDay);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        {/* Previous Day */}
        <div className="flex-1">
          {!isFirstDay ? (
            <Link
              href={`/ai-guide/day/${currentDay - 1}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => {
                if (userId) {
                  guideAnalytics.trackPageView(userId, `day-${currentDay - 1}`);
                }
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Day {currentDay - 1}
            </Link>
          ) : (
            <Link
              href="/ai-guide"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Guide Overview
            </Link>
          )}
        </div>

        {/* Current Day Progress */}
        <div className="flex-1 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Day {currentDay} of {totalDays}
          </div>
        </div>

        {/* Next Day / Complete */}
        <div className="flex-1 text-right">
          {!isLastDay ? (
            <Link
              href={`/ai-guide/day/${currentDay + 1}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              onClick={() => {
                if (userId) {
                  guideAnalytics.trackPageView(userId, `day-${currentDay + 1}`);
                }
              }}
            >
              Day {currentDay + 1}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/ai-guide/next-steps"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              onClick={() => {
                if (userId) {
                  guideAnalytics.trackPageView(userId, 'next-steps');
                }
              }}
            >
              Next Steps
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Day Complete Button */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={handleDayComplete}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Mark Day {currentDay} as Complete
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          This will save your progress and unlock the next day
        </p>
      </div>

      {/* Quick Links */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <Link
          href="/ai-guide"
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          Guide Overview
        </Link>
        <span className="text-gray-300">•</span>
        <Link
          href="/ai-guide/tools"
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          All Tools
        </Link>
        <span className="text-gray-300">•</span>
        <Link
          href="/contact"
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          Get Help
        </Link>
      </div>
    </div>
  );
}
