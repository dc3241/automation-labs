import { NextRequest, NextResponse } from 'next/server';

interface NewsletterSignupRequest {
  email: string;
  company?: string;
  role?: string;
}

interface BeehiivResponse {
  data?: any;
  error?: {
    message: string;
    code: string;
  };
}

export async function POST(request: NextRequest) {
  console.log('=== Newsletter Signup API Called ===');
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);
  
  try {
    // Parse request body
    const body: NewsletterSignupRequest = await request.json();
    const { email, company, role } = body;
    
    console.log('Request body:', { email, company, role });

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Check environment variables with detailed debugging
    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    console.log('=== Environment Variables Debug ===');
    console.log('BEEHIIV_API_KEY exists:', !!apiKey);
    console.log('BEEHIIV_API_KEY length:', apiKey ? apiKey.length : 0);
    console.log('BEEHIIV_API_KEY first 10 chars:', apiKey ? apiKey.substring(0, 10) + '...' : 'undefined');
    console.log('BEEHIIV_PUBLICATION_ID exists:', !!publicationId);
    console.log('BEEHIIV_PUBLICATION_ID value:', publicationId);
    console.log('All process.env keys:', Object.keys(process.env).filter(key => key.includes('BEEHIIV')));
    console.log('===================================');

    if (!apiKey || !publicationId) {
      console.error('Missing Beehiiv environment variables:');
      console.error('- BEEHIIV_API_KEY missing:', !apiKey);
      console.error('- BEEHIIV_PUBLICATION_ID missing:', !publicationId);
      return NextResponse.json(
        { 
          error: 'Server configuration error - Missing environment variables',
          debug: {
            apiKeyExists: !!apiKey,
            publicationIdExists: !!publicationId
          }
        },
        { status: 500 }
      );
    }

    // Prepare request body for Beehiiv with correct format
    const beehiivBody: any = {
      email: email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: 'website',
      utm_medium: 'organic',
      utm_campaign: 'newsletter_signup'
    };

    // Add custom fields if provided
    if (company || role) {
      beehiivBody.custom_fields = {};
      if (company) beehiivBody.custom_fields.company = company;
      if (role) beehiivBody.custom_fields.role = role;
    }

    // Make API call to Beehiiv
    console.log('=== Making Beehiiv API Call ===');
    console.log('URL:', `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`);
    console.log('Request body:', beehiivBody);
    
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(beehiivBody),
      }
    );

    console.log('Beehiiv API response status:', response.status);
    console.log('Beehiiv API response headers:', Object.fromEntries(response.headers.entries()));
    
    // Get the full response text for debugging
    const responseText = await response.text();
    console.log('Beehiiv API response body:', responseText);
    
    // Try to parse as JSON, but handle non-JSON responses
    let responseData: BeehiivResponse;
    try {
      responseData = JSON.parse(responseText);
    } catch (error) {
      console.error('Failed to parse Beehiiv response as JSON:', error);
      responseData = { error: { message: responseText, code: 'PARSE_ERROR' } };
    }
    console.log('Beehiiv API response data:', responseData);

    // Handle different response statuses
    if (response.ok) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thanks for subscribing! Check your email to confirm.' 
        },
        { status: 200 }
      );
    }

    // Handle specific error cases
    switch (response.status) {
      case 409:
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter.' },
          { status: 409 }
        );
      case 429:
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      case 401:
        console.error('Beehiiv API authentication failed');
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      case 400:
        // Handle 400 Bad Request with specific error message
        const errorMessage = responseData?.error?.message || responseText || 'Invalid request format';
        console.error('Beehiiv API 400 error:', errorMessage);
        return NextResponse.json(
          { 
            error: `Beehiiv API error: ${errorMessage}`,
            details: responseData
          },
          { status: 400 }
        );
      default:
        console.error('Beehiiv API error:', response.status, responseData);
        const defaultErrorMessage = responseData?.error?.message || responseText || 'Something went wrong. Please try again.';
        return NextResponse.json(
          { 
            error: defaultErrorMessage,
            details: responseData
          },
          { status: 500 }
        );
    }

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
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
