'use client';

import { useState, useEffect } from 'react';
import { guideAnalytics } from '@/lib/guide-analytics';

interface ImplementationChecklistProps {
  checklist: string[];
  dayNumber: number;
  userId?: string;
  initialCompleted?: boolean[];
}

export default function ImplementationChecklist({
  checklist,
  dayNumber,
  userId,
  initialCompleted = []
}: ImplementationChecklistProps) {
  const [completedItems, setCompletedItems] = useState<boolean[]>(
    initialCompleted.length === checklist.length 
      ? initialCompleted 
      : new Array(checklist.length).fill(false)
  );

  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    const completed = completedItems.filter(Boolean).length;
    setAllCompleted(completed === checklist.length);
  }, [completedItems, checklist.length]);

  const handleItemToggle = async (index: number) => {
    const newCompleted = [...completedItems];
    newCompleted[index] = !newCompleted[index];
    setCompletedItems(newCompleted);

    // Track checklist interaction
    if (userId) {
      guideAnalytics.trackEvent({
        userId,
        actionType: 'checklist_item_toggle',
        page: `day-${dayNumber}`,
        metadata: {
          itemIndex: index,
          itemText: checklist[index],
          isCompleted: newCompleted[index],
          totalCompleted: newCompleted.filter(Boolean).length,
          totalItems: checklist.length
        }
      });
    }

    // Auto-save progress (you might want to implement this with your backend)
    await saveProgress(newCompleted);
  };

  const saveProgress = async (completed: boolean[]) => {
    try {
      // This would typically save to your backend
      localStorage.setItem(`guide-day-${dayNumber}-checklist`, JSON.stringify(completed));
    } catch (error) {
      console.error('Failed to save checklist progress:', error);
    }
  };

  const resetChecklist = () => {
    setCompletedItems(new Array(checklist.length).fill(false));
    localStorage.removeItem(`guide-day-${dayNumber}-checklist`);
  };

  const completedCount = completedItems.filter(Boolean).length;
  const progressPercentage = (completedCount / checklist.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Implementation Checklist
          </h3>
          <p className="text-sm text-gray-600">
            Track your progress as you complete each step
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {completedCount}/{checklist.length}
          </div>
          <div className="text-sm text-gray-600">
            {Math.round(progressPercentage)}% Complete
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {checklist.map((item, index) => (
          <div
            key={index}
            className={`flex items-start p-3 rounded-lg border transition-all duration-200 ${
              completedItems[index]
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <button
              onClick={() => handleItemToggle(index)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 transition-all duration-200 ${
                completedItems[index]
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {completedItems[index] && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <span
              className={`flex-1 text-sm ${
                completedItems[index]
                  ? 'text-green-800 line-through'
                  : 'text-gray-700'
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {allCompleted && (
        <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-green-800">
                🎉 Excellent work!
              </h4>
              <p className="text-sm text-green-700 mt-1">
                You've completed all the implementation steps for Day {dayNumber}. 
                You're ready to move on to the next day!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        {allCompleted ? (
          <button
            onClick={() => {
              if (userId) {
                guideAnalytics.trackDayComplete(userId, dayNumber);
              }
            }}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Mark Day as Complete
          </button>
        ) : (
          <button
            disabled
            className="flex-1 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
          >
            Complete all items to finish this day
          </button>
        )}

        <button
          onClick={resetChecklist}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          Reset Checklist
        </button>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              Pro Tip
            </h4>
            <p className="text-sm text-blue-800">
              Don't feel pressured to complete everything in one day. Take your time to implement each step properly. 
              You can always come back to continue your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
