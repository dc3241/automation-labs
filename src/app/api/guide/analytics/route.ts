import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabase';

interface AnalyticsEvent {
  userId: string;
  actionType: 'page_view' | 'tool_click' | 'form_submit' | 'time_spent' | 'day_complete' | 'upsell_view' | 'upsell_click' | 'checklist_item_toggle';
  page: string;
  toolName?: string;
  affiliateUrl?: string;
  timeSpentSeconds?: number;
  metadata?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  console.log('=== Guide Analytics API Called ===');
  
  try {
    const body: AnalyticsEvent = await request.json();
    const { userId, actionType, page, toolName, affiliateUrl, timeSpentSeconds, metadata } = body;
    
    console.log('Analytics event:', { userId, actionType, page, toolName, timeSpentSeconds });

    // Validate required fields
    if (!userId || !actionType || !page) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate action type
    const validActionTypes = [
      'page_view', 'tool_click', 'form_submit', 'time_spent', 
      'day_complete', 'upsell_view', 'upsell_click', 'checklist_item_toggle'
    ];
    
    if (!validActionTypes.includes(actionType)) {
      return NextResponse.json(
        { error: 'Invalid action type' },
        { status: 400 }
      );
    }

    // Insert analytics event
    const { data: analyticsEvent, error: insertError } = await supabase
      .from('guide_analytics')
      .insert({
        user_id: userId,
        action_type: actionType,
        page,
        tool_name: toolName,
        affiliate_url: affiliateUrl,
        time_spent_seconds: timeSpentSeconds,
        metadata: metadata || {}
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting analytics event:', insertError);
      return NextResponse.json(
        { error: 'Failed to track analytics event' },
        { status: 500 }
      );
    }

    // Handle specific action types with additional logic
    if (actionType === 'tool_click' && toolName) {
      // Increment tool click count
      try {
        await supabase.rpc('increment_tool_clicks', { tool_id: toolName });
      } catch (error) {
        console.error('Error incrementing tool clicks:', error);
        // Don't fail the request for this
      }
    }

    if (actionType === 'upsell_click') {
      // Increase conversion score
      try {
        await supabase
          .from('guide_users')
          .update({ 
            conversion_score: supabase.raw('conversion_score + 10'),
            last_active: new Date().toISOString()
          })
          .eq('id', userId);
      } catch (error) {
        console.error('Error updating conversion score:', error);
        // Don't fail the request for this
      }
    }

    return NextResponse.json(
      {
        success: true,
        eventId: analyticsEvent.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log('=== Guide Analytics Get API Called ===');
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const actionType = searchParams.get('actionType');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Build query
    let query = supabase
      .from('guide_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (actionType) {
      query = query.eq('action_type', actionType);
    }

    const { data: analytics, error: analyticsError } = await query;

    if (analyticsError) {
      console.error('Error fetching analytics:', analyticsError);
      return NextResponse.json(
        { error: 'Failed to fetch analytics data' },
        { status: 500 }
      );
    }

    // Get guide metrics if no specific user requested
    let guideMetrics = null;
    if (!userId) {
      try {
        const [
          { data: users, error: usersError },
          { data: tools, error: toolsError }
        ] = await Promise.all([
          supabase.from('guide_users').select('business_type, conversion_score, current_day, completed_days'),
          supabase.from('guide_tools').select('name, click_count, conversion_rating')
        ]);

        if (!usersError && !toolsError) {
          guideMetrics = {
            totalUsers: users?.length || 0,
            businessTypeBreakdown: users?.reduce((acc: any, user) => {
              acc[user.business_type] = (acc[user.business_type] || 0) + 1;
              return acc;
            }, {}) || {},
            averageConversionScore: users?.reduce((sum, user) => sum + (user.conversion_score || 0), 0) / (users?.length || 1),
            topPerformingTools: tools?.sort((a, b) => (b.click_count || 0) - (a.click_count || 0)).slice(0, 10) || [],
            completionRates: users?.reduce((acc: any, user) => {
              const completedDays = user.completed_days?.filter(Boolean).length || 0;
              for (let day = 1; day <= 7; day++) {
                if (user.current_day > day) {
                  acc[day] = (acc[day] || 0) + 1;
                }
              }
              return acc;
            }, {}) || {}
          };
        }
      } catch (error) {
        console.error('Error calculating guide metrics:', error);
      }
    }

    return NextResponse.json(
      {
        success: true,
        analytics: analytics || [],
        guideMetrics
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Analytics get error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
