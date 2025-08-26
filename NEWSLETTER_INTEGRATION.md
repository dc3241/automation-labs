# Beehiiv Newsletter Integration

This document outlines the implementation of Beehiiv newsletter signup integration for the automation-labs-website.

## Overview

The integration connects two newsletter signup forms to Beehiiv's API:
1. **Homepage Newsletter Signup** - Simple email-only form in the dark section
2. **Newsletter Page Form** - Detailed form with email, company, and role fields

## Implementation Details

### 1. API Route (`/src/app/api/newsletter-signup/route.ts`)

**Features:**
- Handles both simple email and detailed form submissions
- Validates email format and required fields
- Integrates with Beehiiv API using environment variables
- Comprehensive error handling for various scenarios
- TypeScript support with proper type definitions

**API Endpoint:** `POST /api/newsletter-signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "company": "Company Name", // Optional
  "role": "founder" // Optional
}
```

**Response Format:**
```json
{
  "success": true,
  "message": "Thanks for subscribing! Check your email to confirm."
}
```

**Error Handling:**
- 400: Invalid email format or missing required fields
- 409: Email already subscribed
- 429: Rate limiting
- 500: Server errors or configuration issues

### 2. Homepage Integration (`/src/app/page.tsx`)

**Features:**
- Simple email-only signup form
- Loading states with spinner animation
- Success/error message display
- Form validation
- Form clearing on successful submission
- Preserves existing UI design

**Form Location:** Dark section with "Stay Ahead with AI Insights" heading

### 3. Newsletter Page Integration (`/src/app/newsletter/page.tsx`)

**Features:**
- Detailed form with email, company, and role fields
- Loading states with spinner animation
- Success/error message display
- Form validation for all fields
- Form clearing on successful submission
- Preserves existing UI design

**Form Location:** Newsletter page at `/newsletter` route

## Environment Variables

Required environment variables in `.env.local`:

```env
BEEHIIV_API_KEY=your_beehiiv_api_key_here
BEEHIIV_PUBLICATION_ID=your_publication_id_here
```

## Beehiiv API Integration

The implementation uses Beehiiv's v2 API:

**Endpoint:** `https://api.beehiiv.com/v2/publications/{publication_id}/subscriptions`

**Headers:**
```
Authorization: Bearer {BEEHIIV_API_KEY}
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "utm_source": "website",
  "utm_medium": "organic",
  "custom_fields": {
    "company": "Company Name",
    "role": "Job Title"
  }
}
```

## User Experience Features

### Loading States
- Disabled form inputs during submission
- Loading spinner in submit buttons
- "Subscribing..." text during API calls

### Success Handling
- Clear success messages
- Form data cleared after successful submission
- Green success message styling

### Error Handling
- Specific error messages for different scenarios
- Red error message styling
- Form data preserved on error for user convenience

### Validation
- Client-side email format validation
- Required field validation
- Server-side validation as backup

## Testing

### Manual Testing
1. Test homepage form with valid email
2. Test homepage form with invalid email
3. Test newsletter page form with all fields
4. Test newsletter page form with partial data
5. Test network error scenarios
6. Test duplicate email submissions

### API Testing
Use the provided test script:
```bash
node test-newsletter-api.js
```

## Error Scenarios Handled

1. **Missing Environment Variables** - Returns 500 error with generic message
2. **Invalid Email Format** - Returns 400 error with validation message
3. **Missing Email** - Returns 400 error with required field message
4. **Network Errors** - Returns 500 error with connection message
5. **Beehiiv API Errors**:
   - 401: Authentication failed
   - 409: Email already subscribed
   - 429: Rate limiting
   - 500+: Server errors

## Security Considerations

- API keys stored in environment variables
- Server-side validation prevents client-side bypass
- No sensitive data exposed in client-side code
- Proper error handling without information leakage

## Maintenance

### Adding New Custom Fields
To add new custom fields to the Beehiiv integration:

1. Update the `NewsletterSignupRequest` interface in the API route
2. Add the field to the form components
3. Include the field in the Beehiiv API request body

### Updating Error Messages
Error messages are centralized in the API route for consistency across both forms.

### Monitoring
Monitor the following for potential issues:
- API response times
- Error rates
- Duplicate subscription attempts
- Environment variable availability

## Files Modified

1. `/src/app/api/newsletter-signup/route.ts` - New API route
2. `/src/app/page.tsx` - Homepage form integration
3. `/src/app/newsletter/page.tsx` - Newsletter page form integration
4. `test-newsletter-api.js` - Test script (optional)

## Dependencies

No additional dependencies required. Uses existing Next.js and React features.

## Browser Compatibility

- Modern browsers with ES6+ support
- Fetch API support
- React hooks support
