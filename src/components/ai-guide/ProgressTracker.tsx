'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProgressTrackerProps {
  currentDay: number;
  completedDays: boolean[];
  userId?: string;
  businessType?: string;
}

export default function ProgressTracker({ 
  currentDay, 
  completedDays, 
  userId, 
  businessType 
}: ProgressTrackerProps) {
  const [progress, setProgress] = useState({
    currentDay,
    completedDays
  });

  useEffect(() => {
    setProgress({ currentDay, completedDays });
  }, [currentDay, completedDays]);

  const totalDays = 7;
  const completedCount = progress.completedDays.filter(Boolean).length;
  const progressPercentage = (completedCount / totalDays) * 100;

  const getDayStatus = (dayNumber: number) => {
    if (progress.completedDays[dayNumber - 1]) return 'completed';
    if (dayNumber === progress.currentDay) return 'current';
    if (dayNumber < progress.currentDay) return 'available';
    return 'locked';
  };

  const getDayIcon = (dayNumber: number) => {
    const status = getDayStatus(dayNumber);
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'current':
        return (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <span className="text-sm font-medium">{dayNumber}</span>
        );
    }
  };

  const getDayClasses = (dayNumber: number) => {
    const status = getDayStatus(dayNumber);
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-500 text-white hover:bg-green-600`;
      case 'current':
        return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600 animate-pulse`;
      case 'available':
        return `${baseClasses} bg-gray-300 text-gray-700 hover:bg-gray-400`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Your Progress
          </h3>
          <p className="text-sm text-gray-600">
            {completedCount} of {totalDays} days completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(progressPercentage)}%
          </div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Day Navigation */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, index) => {
          const dayNumber = index + 1;
          const status = getDayStatus(dayNumber);
          const isClickable = status !== 'locked';

          const DayContent = (
            <div className="text-center">
              <div className={getDayClasses(dayNumber)}>
                {getDayIcon(dayNumber)}
              </div>
              <div className="mt-2">
                <div className={`text-xs font-medium ${
                  status === 'completed' ? 'text-green-600' :
                  status === 'current' ? 'text-blue-600' :
                  status === 'available' ? 'text-gray-600' :
                  'text-gray-400'
                }`}>
                  Day {dayNumber}
                </div>
                {status === 'completed' && (
                  <div className="text-xs text-green-500">✓</div>
                )}
              </div>
            </div>
          );

          if (isClickable) {
            return (
              <Link
                key={dayNumber}
                href={`/ai-guide/day/${dayNumber}`}
                className="transition-transform duration-200 hover:scale-105"
              >
                {DayContent}
              </Link>
            );
          }

          return (
            <div key={dayNumber} className="cursor-not-allowed">
              {DayContent}
            </div>
          );
        })}
      </div>

      {/* Progress Message */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        {completedCount === 0 && (
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-800">
              Ready to start your AI automation journey? Begin with Day 1!
            </p>
          </div>
        )}
        
        {completedCount > 0 && completedCount < 7 && (
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-green-800">
              Great progress! You're {Math.round(progressPercentage)}% complete. Keep going!
            </p>
          </div>
        )}

        {completedCount === 7 && (
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-sm text-yellow-800">
              🎉 Congratulations! You've completed the guide! Ready for the next steps?
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        {completedCount < 7 && (
          <Link
            href={`/ai-guide/day/${progress.currentDay}`}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
          >
            Continue to Day {progress.currentDay}
          </Link>
        )}
        
        {completedCount === 7 && (
          <Link
            href="/ai-guide/next-steps"
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center"
          >
            View Next Steps
          </Link>
        )}

        <Link
          href="/ai-guide/tools"
          className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-center"
        >
          Browse All Tools
        </Link>
      </div>
    </div>
  );
}
