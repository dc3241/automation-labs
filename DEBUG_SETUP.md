# Debug Setup for Supabase Integration

## What I've Added

### 1. Enhanced Supabase Configuration (`utils/supabase.ts`)
- ✅ Comprehensive environment variable validation
- ✅ Detailed console logging for debugging
- ✅ Connection testing function
- ✅ Better error messages with specific solutions

### 2. Improved Blog Page (`src/app/blog/page.tsx`)
- ✅ Automatic connection testing before data fetch
- ✅ Detailed error display with debug information
- ✅ Better user feedback for different scenarios
- ✅ Development-only debug information

### 3. Troubleshooting Tools
- ✅ `SUPABASE_TROUBLESHOOTING.md` - Complete troubleshooting guide
- ✅ `scripts/test-supabase.js` - Standalone connection test script
- ✅ Enhanced error handling and logging

## How to Use the Debug Features

### Step 1: Create Environment File
Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Test Connection (Optional)
```bash
node scripts/test-supabase.js
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Check Browser Console
Open your browser's developer console and look for:
- 🔍 Supabase Configuration Debug messages
- 🧪 Connection testing results
- ✅ Success messages or ❌ error details

## What You'll See

### In Browser Console:
```
🔍 Supabase Configuration Debug:
URL exists: true
URL length: 45
Key exists: true
Key length: 151
URL starts with https://: true
Key starts with eyJ: true
🧪 Testing Supabase connection...
✅ Supabase connection successful!
✅ Blog posts fetched successfully: 2 posts
```

### On the Blog Page:
- **If working**: Blog posts will display normally
- **If connection fails**: Red error box with detailed information
- **If no posts**: Yellow warning box explaining the situation
- **In development**: Expandable debug information

## Common Issues & Quick Fixes

### "Environment variables are missing"
**Fix**: Create `.env.local` file with your Supabase credentials

### "Invalid Supabase URL format"
**Fix**: Ensure URL starts with `https://`

### "Invalid Supabase anon key format"
**Fix**: Ensure key starts with `eyJ`

### "relation 'blog_posts' does not exist"
**Fix**: Run the SQL from `SUPABASE_SETUP.md` in your Supabase SQL Editor

### "permission denied for table blog_posts"
**Fix**: Disable RLS: `ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;`

## Next Steps

1. **Get your Supabase credentials** from your project dashboard
2. **Create the `.env.local` file** with your credentials
3. **Restart your dev server** to load the environment variables
4. **Check the browser console** for debug information
5. **If issues persist**, check the detailed troubleshooting guide

The enhanced debugging will help you identify exactly what's wrong and provide specific solutions for each issue.
