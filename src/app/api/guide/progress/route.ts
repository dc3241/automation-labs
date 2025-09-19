import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabase';

interface ProgressUpdateRequest {
  userId: string;
  dayNumber: number;
  completed: boolean;
  checklistProgress?: boolean[];
}

interface ProgressGetRequest {
  userId: string;
}

export async function POST(request: NextRequest) {
  console.log('=== Guide Progress API Called ===');
  
  try {
    const body: ProgressUpdateRequest = await request.json();
    const { userId, dayNumber, completed, checklistProgress } = body;
    
    console.log('Progress update:', { userId, dayNumber, completed, checklistProgress });

    // Validate input
    if (!userId || !dayNumber || dayNumber < 1 || dayNumber > 7) {
      return NextResponse.json(
        { error: 'Invalid user ID or day number' },
        { status: 400 }
      );
    }

    // Get current user progress
    const { data: user, error: userError } = await supabase
      .from('guide_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update completed days array
    const updatedCompletedDays = [...user.completed_days];
    updatedCompletedDays[dayNumber - 1] = completed;

    // Calculate new current day
    let newCurrentDay = user.current_day;
    if (completed && dayNumber === user.current_day) {
      newCurrentDay = Math.min(user.current_day + 1, 7);
    }

    // Update user progress
    const { data: updatedUser, error: updateError } = await supabase
      .from('guide_users')
      .update({
        completed_days: updatedCompletedDays,
        current_day: newCurrentDay,
        last_active: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating progress:', updateError);
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      );
    }

    // Track analytics event
    try {
      await supabase
        .from('guide_analytics')
        .insert({
          user_id: userId,
          action_type: completed ? 'day_complete' : 'day_progress',
          page: `day-${dayNumber}`,
          metadata: {
            dayNumber,
            completed,
            newCurrentDay,
            checklistProgress,
            totalCompleted: updatedCompletedDays.filter(Boolean).length
          }
        });
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError);
      // Don't fail the request for analytics errors
    }

    return NextResponse.json(
      {
        success: true,
        progress: {
          currentDay: updatedUser.current_day,
          completedDays: updatedUser.completed_days,
          totalCompleted: updatedUser.completed_days.filter(Boolean).length
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log('=== Guide Progress Get API Called ===');
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user progress
    const { data: user, error: userError } = await supabase
      .from('guide_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user analytics summary
    const { data: analytics, error: analyticsError } = await supabase
      .from('guide_analytics')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (analyticsError) {
      console.error('Error fetching analytics:', analyticsError);
    }

    // Process analytics data
    const analyticsSummary = {
      totalEvents: analytics?.length || 0,
      pageViews: analytics?.filter(a => a.action_type === 'page_view').length || 0,
      toolClicks: analytics?.filter(a => a.action_type === 'tool_click').length || 0,
      timeSpent: analytics?.reduce((total, a) => total + (a.time_spent_seconds || 0), 0) || 0,
      daysCompleted: analytics?.filter(a => a.action_type === 'day_complete').length || 0,
      upsellViews: analytics?.filter(a => a.action_type === 'upsell_view').length || 0,
      upsellClicks: analytics?.filter(a => a.action_type === 'upsell_click').length || 0
    };

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          businessType: user.business_type,
          currentDay: user.current_day,
          completedDays: user.completed_days,
          conversionScore: user.conversion_score,
          lastActive: user.last_active,
          createdAt: user.created_at
        },
        analytics: analyticsSummary
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Progress get error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
