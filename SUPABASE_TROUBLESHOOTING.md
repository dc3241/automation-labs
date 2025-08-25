# Supabase Integration Troubleshooting Guide

## Quick Fix Checklist

### 1. Environment Variables Setup
**Problem**: Missing or incorrect environment variables
**Solution**: 
1. Create a `.env.local` file in your project root
2. Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
3. Restart your development server: `npm run dev`

### 2. Finding Your Supabase Credentials
1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon public** key
5. Paste them in your `.env.local` file

### 3. Database Table Setup
**Problem**: Missing `blog_posts` table
**Solution**: Run this SQL in your Supabase SQL Editor:

```sql
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    image_url TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO blog_posts (title, description, content, category, slug, image_url) VALUES
('Getting Started with AI Automation', 'Learn the basics of implementing AI automation in your business processes.', 'Full content here...', 'AI Automation', 'getting-started-ai-automation', 'https://images.unsplash.com/photo-1677442136019-21780ecad995'),
('Best Practices for Business Process Automation', 'Discover proven strategies for successful business process automation.', 'Full content here...', 'Best Practices', 'best-practices-business-automation', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71');
```

### 4. Row Level Security (RLS)
**Problem**: RLS blocking access
**Solution**: Disable RLS or add policies:

```sql
-- Option 1: Disable RLS (for public read access)
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- Option 2: Enable RLS with public read policy
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON blog_posts FOR SELECT USING (true);
```

## Debugging Steps

### Step 1: Check Environment Variables
Open your browser's developer console and look for these debug messages:
- ✅ "Supabase Configuration Debug:" - Shows if variables are loaded
- ❌ "Environment variables are missing" - Variables not set
- ❌ "Invalid Supabase URL format" - URL format issue
- ❌ "Invalid Supabase anon key format" - Key format issue

### Step 2: Test Connection
The enhanced blog page now includes automatic connection testing. Check the console for:
- 🧪 "Testing Supabase connection..."
- ✅ "Supabase connection successful!"
- ❌ "Supabase connection test failed:" - Connection issue

### Step 3: Check Network Requests
1. Open browser DevTools → Network tab
2. Refresh the blog page
3. Look for requests to `supabase.co`
4. Check for any failed requests or CORS errors

## Common Error Messages & Solutions

### "TypeError: fetch failed"
**Cause**: Network connectivity or CORS issues
**Solutions**:
1. Check your internet connection
2. Verify Supabase project is active
3. Ensure environment variables are correct
4. Check if Supabase service is down

### "JWT expired" or "Invalid JWT"
**Cause**: Invalid or expired API key
**Solution**: 
1. Get a fresh anon key from Supabase dashboard
2. Update your `.env.local` file
3. Restart the development server

### "relation 'blog_posts' does not exist"
**Cause**: Table not created
**Solution**: Run the SQL migration script in Supabase SQL Editor

### "permission denied for table blog_posts"
**Cause**: RLS policies blocking access
**Solution**: Disable RLS or add appropriate policies

## Testing Your Setup

### 1. Environment Variables Test
```javascript
// Add this to your browser console
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
```

### 2. Manual Connection Test
```javascript
// Test in browser console
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('YOUR_URL', 'YOUR_KEY');
const { data, error } = await supabase.from('blog_posts').select('*');
console.log('Data:', data, 'Error:', error);
```

## Still Having Issues?

1. **Check Supabase Status**: Visit [status.supabase.com](https://status.supabase.com)
2. **Verify Project Settings**: Ensure your project is active and not paused
3. **Check API Limits**: Free tier has rate limits
4. **Review Network Tab**: Look for specific error codes
5. **Try Different Browser**: Rule out browser-specific issues

## Getting Help

If you're still experiencing issues:
1. Check the browser console for detailed error messages
2. Look at the debug information displayed on the blog page
3. Verify all steps in this troubleshooting guide
4. Check the Supabase documentation: [supabase.com/docs](https://supabase.com/docs)

## Environment Variables Template

Create a `.env.local` file with this template:
```env
# Supabase Configuration
# Replace with your actual values from Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: 
- Never commit `.env.local` to version control
- Restart your dev server after changing environment variables
- The `NEXT_PUBLIC_` prefix is required for client-side access
