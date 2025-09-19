// AI Automation Guide Analytics Utilities
// Track user engagement and conversion metrics

import { supabase } from '@/utils/supabase';

export interface AnalyticsEvent {
  userId: string;
  actionType: 'page_view' | 'tool_click' | 'form_submit' | 'time_spent' | 'day_complete' | 'upsell_view' | 'upsell_click';
  page: string;
  toolName?: string;
  affiliateUrl?: string;
  timeSpentSeconds?: number;
  metadata?: Record<string, any>;
}

export interface GuideProgress {
  currentDay: number;
  completedDays: boolean[];
  conversionScore: number;
  lastActive: string;
}

export class GuideAnalytics {
  private static instance: GuideAnalytics;
  private sessionStartTime: number = Date.now();

  public static getInstance(): GuideAnalytics {
    if (!GuideAnalytics.instance) {
      GuideAnalytics.instance = new GuideAnalytics();
    }
    return GuideAnalytics.instance;
  }

  // Track page views
  async trackPageView(userId: string, page: string, metadata?: Record<string, any>) {
    await this.trackEvent({
      userId,
      actionType: 'page_view',
      page,
      metadata
    });
  }

  // Track tool clicks
  async trackToolClick(
    userId: string, 
    toolName: string, 
    affiliateUrl: string, 
    page: string
  ) {
    await this.trackEvent({
      userId,
      actionType: 'tool_click',
      page,
      toolName,
      affiliateUrl
    });

    // Also increment click count in guide_tools table
    await this.incrementToolClicks(toolName);
  }

  // Track form submissions
  async trackFormSubmit(userId: string, page: string, formType: string) {
    await this.trackEvent({
      userId,
      actionType: 'form_submit',
      page,
      metadata: { formType }
    });
  }

  // Track time spent on page
  async trackTimeSpent(userId: string, page: string, timeSpentSeconds: number) {
    await this.trackEvent({
      userId,
      actionType: 'time_spent',
      page,
      timeSpentSeconds
    });
  }

  // Track day completion
  async trackDayComplete(userId: string, dayNumber: number) {
    await this.trackEvent({
      userId,
      actionType: 'day_complete',
      page: `day-${dayNumber}`,
      metadata: { dayNumber }
    });

    // Update user progress
    await this.updateUserProgress(userId, dayNumber, true);
  }

  // Track upsell views
  async trackUpsellView(userId: string, upsellType: string, page: string) {
    await this.trackEvent({
      userId,
      actionType: 'upsell_view',
      page,
      metadata: { upsellType }
    });
  }

  // Track upsell clicks
  async trackUpsellClick(userId: string, upsellType: string, page: string) {
    await this.trackEvent({
      userId,
      actionType: 'upsell_click',
      page,
      metadata: { upsellType }
    });

    // Increase conversion score
    await this.increaseConversionScore(userId, 10);
  }

  // Private method to track any event
  private async trackEvent(event: AnalyticsEvent) {
    try {
      const { error } = await supabase
        .from('guide_analytics')
        .insert({
          user_id: event.userId,
          action_type: event.actionType,
          page: event.page,
          tool_name: event.toolName,
          affiliate_url: event.affiliateUrl,
          time_spent_seconds: event.timeSpentSeconds,
          metadata: event.metadata || {}
        });

      if (error) {
        console.error('Analytics tracking error:', error);
      }
    } catch (error) {
      console.error('Failed to track analytics event:', error);
    }
  }

  // Update user progress
  private async updateUserProgress(userId: string, dayNumber: number, isCompleted: boolean) {
    try {
      const { error } = await supabase.rpc('update_guide_progress', {
        user_email: userId, // This should be email, not UUID - need to fix
        day_number: dayNumber,
        is_completed: isCompleted
      });

      if (error) {
        console.error('Progress update error:', error);
      }
    } catch (error) {
      console.error('Failed to update user progress:', error);
    }
  }

  // Increase conversion score
  private async increaseConversionScore(userId: string, points: number) {
    try {
      const { error } = await supabase
        .from('guide_users')
        .update({ 
          conversion_score: supabase.raw(`conversion_score + ${points}`),
          last_active: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('Conversion score update error:', error);
      }
    } catch (error) {
      console.error('Failed to update conversion score:', error);
    }
  }

  // Increment tool click count
  private async incrementToolClicks(toolName: string) {
    try {
      const { error } = await supabase
        .from('guide_tools')
        .update({ 
          click_count: supabase.raw('click_count + 1'),
          updated_at: new Date().toISOString()
        })
        .eq('name', toolName);

      if (error) {
        console.error('Tool click increment error:', error);
      }
    } catch (error) {
      console.error('Failed to increment tool clicks:', error);
    }
  }

  // Get user analytics summary
  async getUserAnalytics(userId: string) {
    try {
      const { data, error } = await supabase
        .from('guide_analytics')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get user analytics error:', error);
        return null;
      }

      return this.processAnalyticsData(data || []);
    } catch (error) {
      console.error('Failed to get user analytics:', error);
      return null;
    }
  }

  // Process analytics data into summary
  private processAnalyticsData(events: any[]) {
    const summary = {
      totalEvents: events.length,
      pageViews: 0,
      toolClicks: 0,
      timeSpent: 0,
      daysCompleted: 0,
      upsellViews: 0,
      upsellClicks: 0,
      mostClickedTools: {} as Record<string, number>,
      pageEngagement: {} as Record<string, number>
    };

    events.forEach(event => {
      switch (event.action_type) {
        case 'page_view':
          summary.pageViews++;
          summary.pageEngagement[event.page] = (summary.pageEngagement[event.page] || 0) + 1;
          break;
        case 'tool_click':
          summary.toolClicks++;
          if (event.tool_name) {
            summary.mostClickedTools[event.tool_name] = (summary.mostClickedTools[event.tool_name] || 0) + 1;
          }
          break;
        case 'time_spent':
          summary.timeSpent += event.time_spent_seconds || 0;
          break;
        case 'day_complete':
          summary.daysCompleted++;
          break;
        case 'upsell_view':
          summary.upsellViews++;
          break;
        case 'upsell_click':
          summary.upsellClicks++;
          break;
      }
    });

    return summary;
  }

  // Get guide performance metrics
  async getGuideMetrics() {
    try {
      const [
        { data: users, error: usersError },
        { data: analytics, error: analyticsError },
        { data: tools, error: toolsError }
      ] = await Promise.all([
        supabase.from('guide_users').select('business_type, conversion_score, current_day'),
        supabase.from('guide_analytics').select('action_type, tool_name, page'),
        supabase.from('guide_tools').select('name, click_count, conversion_rating')
      ]);

      if (usersError || analyticsError || toolsError) {
        console.error('Guide metrics error:', { usersError, analyticsError, toolsError });
        return null;
      }

      return this.processGuideMetrics(users || [], analytics || [], tools || []);
    } catch (error) {
      console.error('Failed to get guide metrics:', error);
      return null;
    }
  }

  // Process guide metrics
  private processGuideMetrics(users: any[], analytics: any[], tools: any[]) {
    const metrics = {
      totalUsers: users.length,
      businessTypeBreakdown: {} as Record<string, number>,
      averageConversionScore: 0,
      totalToolClicks: 0,
      topPerformingTools: [] as Array<{ name: string; clicks: number; rating: number }>,
      completionRates: {} as Record<number, number>,
      engagementByDay: {} as Record<number, number>
    };

    // Business type breakdown
    users.forEach(user => {
      metrics.businessTypeBreakdown[user.business_type] = (metrics.businessTypeBreakdown[user.business_type] || 0) + 1;
      metrics.averageConversionScore += user.conversion_score || 0;
    });
    metrics.averageConversionScore = metrics.averageConversionScore / users.length;

    // Tool performance
    const toolClickMap = {} as Record<string, number>;
    analytics.forEach(event => {
      if (event.action_type === 'tool_click' && event.tool_name) {
        toolClickMap[event.tool_name] = (toolClickMap[event.tool_name] || 0) + 1;
        metrics.totalToolClicks++;
      }
    });

    // Top performing tools
    tools.forEach(tool => {
      metrics.topPerformingTools.push({
        name: tool.name,
        clicks: tool.click_count || 0,
        rating: tool.conversion_rating || 0
      });
    });

    metrics.topPerformingTools.sort((a, b) => b.clicks - a.clicks);

    // Completion rates and engagement by day
    users.forEach(user => {
      for (let day = 1; day <= 7; day++) {
        if (user.current_day > day) {
          metrics.completionRates[day] = (metrics.completionRates[day] || 0) + 1;
        }
      }
    });

    analytics.forEach(event => {
      if (event.page?.startsWith('day-')) {
        const day = parseInt(event.page.split('-')[1]);
        if (day >= 1 && day <= 7) {
          metrics.engagementByDay[day] = (metrics.engagementByDay[day] || 0) + 1;
        }
      }
    });

    return metrics;
  }

  // Session management
  startSession() {
    this.sessionStartTime = Date.now();
  }

  getSessionDuration(): number {
    return Math.floor((Date.now() - this.sessionStartTime) / 1000);
  }

  // Client-side tracking helpers
  trackPageViewClient(userId: string, page: string) {
    if (typeof window !== 'undefined') {
      // Track page view
      this.trackPageView(userId, page);
      
      // Set up time tracking
      const startTime = Date.now();
      
      // Track time when user leaves page
      const handleBeforeUnload = () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        this.trackTimeSpent(userId, page, timeSpent);
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      
      // Clean up listener after 5 minutes to prevent memory leaks
      setTimeout(() => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }, 5 * 60 * 1000);
    }
  }

  trackToolClickClient(userId: string, toolName: string, affiliateUrl: string, page: string) {
    if (typeof window !== 'undefined') {
      this.trackToolClick(userId, toolName, affiliateUrl, page);
      
      // Open affiliate link in new tab
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  }
}

// Export singleton instance
export const guideAnalytics = GuideAnalytics.getInstance();

// Utility functions for common tracking scenarios
export function trackGuideStart(userId: string) {
  guideAnalytics.trackPageView(userId, 'guide-landing');
}

export function trackDayStart(userId: string, dayNumber: number) {
  guideAnalytics.trackPageView(userId, `day-${dayNumber}`);
}

export function trackToolRecommendationClick(
  userId: string, 
  toolName: string, 
  affiliateUrl: string, 
  dayNumber: number
) {
  guideAnalytics.trackToolClick(userId, toolName, affiliateUrl, `day-${dayNumber}`);
}

export function trackUpsellEngagement(userId: string, upsellType: string, dayNumber: number, action: 'view' | 'click') {
  if (action === 'view') {
    guideAnalytics.trackUpsellView(userId, upsellType, `day-${dayNumber}`);
  } else {
    guideAnalytics.trackUpsellClick(userId, upsellType, `day-${dayNumber}`);
  }
}
