import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

interface GuideSubscriptionRequest {
  email: string;
  name?: string;
  businessType: string;
}

interface BeehiivResponse {
  data?: any;
  error?: {
    message: string;
    code: string;
  };
}

export async function POST(request: NextRequest) {
  console.log('=== Guide Subscription API Called ===');
  
  try {
    // Parse request body
    const body: GuideSubscriptionRequest = await request.json();
    const { email, name, businessType } = body;
    
    console.log('Request body:', { email, name, businessType });

    // Validate required fields
    if (!email || !businessType) {
      return NextResponse.json(
        { error: 'Email and business type are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate business type
    const validBusinessTypes = ['ecommerce', 'agency', 'saas', 'influencer', 'other'];
    if (!validBusinessTypes.includes(businessType)) {
      return NextResponse.json(
        { error: 'Invalid business type' },
        { status: 400 }
      );
    }

    // Check if user already exists in guide_users
    const { data: existingUser, error: userCheckError } = await supabase
      .from('guide_users')
      .select('*')
      .eq('email', email)
      .single();

    if (userCheckError && userCheckError.code !== 'PGRST116') {
      console.error('Error checking existing user:', userCheckError);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    let guideUserId: string;
    let beehiivSubscriberId: string | null = null;

    if (existingUser) {
      // User already exists, update their info
      guideUserId = existingUser.id;
      beehiivSubscriberId = existingUser.beehiiv_subscriber_id;
      
      // Update last active timestamp
      await supabase
        .from('guide_users')
        .update({ 
          last_active: new Date().toISOString(),
          business_type: businessType,
          name: name || existingUser.name
        })
        .eq('id', guideUserId);
        
      console.log('Updated existing guide user:', guideUserId);
    } else {
      // Create new guide user
      const { data: newUser, error: insertError } = await supabase
        .from('guide_users')
        .insert({
          email,
          name,
          business_type: businessType,
          current_day: 1,
          completed_days: [false, false, false, false, false, false, false],
          conversion_score: 0
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating guide user:', insertError);
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        );
      }

      guideUserId = newUser.id;
      console.log('Created new guide user:', guideUserId);
    }

    // Subscribe to Beehiiv with guide-specific tags
    const beehiivApiKey = process.env.BEEHIIV_API_KEY;
    const beehiivPublicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (beehiivApiKey && beehiivPublicationId) {
      try {
        // Prepare Beehiiv subscription data with guide-specific fields
        const beehiivBody: any = {
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'ai-guide',
          utm_medium: 'organic',
          utm_campaign: 'guide-signup',
          custom_fields: {
            guide_signup: true,
            business_type: businessType,
            current_day: 1,
            signup_source: 'ai-automation-guide',
            guide_user_id: guideUserId
          },
          tags: [
            'ai-guide-subscriber',
            `business-${businessType}`,
            'guide-day-1'
          ]
        };

        if (name) {
          beehiivBody.custom_fields.name = name;
        }

        console.log('Making Beehiiv API call...');
        
        const beehiivResponse = await fetch(
          `https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${beehiivApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(beehiivBody),
          }
        );

        const beehiivData: BeehiivResponse = await beehiivResponse.json();

        if (beehiivResponse.ok) {
          beehiivSubscriberId = beehiivData.data?.id;
          
          // Update guide user with Beehiiv subscriber ID
          await supabase
            .from('guide_users')
            .update({ beehiiv_subscriber_id: beehiivSubscriberId })
            .eq('id', guideUserId);
            
          console.log('Successfully subscribed to Beehiiv:', beehiivSubscriberId);
        } else {
          console.warn('Beehiiv subscription failed:', beehiivData.error);
          // Don't fail the entire request if Beehiiv fails
        }
      } catch (beehiivError) {
        console.error('Beehiiv API error:', beehiivError);
        // Don't fail the entire request if Beehiiv fails
      }
    } else {
      console.warn('Beehiiv credentials not configured');
    }

    // Track the signup event
    try {
      await supabase
        .from('guide_analytics')
        .insert({
          user_id: guideUserId,
          action_type: 'form_submit',
          page: 'guide-landing',
          metadata: {
            formType: 'guide-signup',
            businessType,
            beehiivSubscribed: !!beehiivSubscriberId
          }
        });
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError);
      // Don't fail the request for analytics errors
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Welcome to the AI Automation Guide! Check your email for Day 1 access.',
        userId: guideUserId,
        redirectUrl: '/ai-guide/day/1'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Guide subscription error:', error);
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Connection error. Please check your internet and try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
