# Supabase Blog Integration Setup

This project has been configured to use Supabase for the blog functionality. Follow these steps to complete the setup:

## 1. Set up Supabase Environment Variables

1. Copy the `.env.example` file to `.env.local`
2. Replace the placeholder values with your actual Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 2. Create the Database Table

Run the SQL migration script in your Supabase SQL editor:

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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- Insert sample blog posts (or use the provided supabase_migration.sql file)
```

## 3. Configure Row Level Security (Optional but Recommended)

The migration includes RLS policies that allow public read access to blog posts.

## 4. Test the Integration

1. Start the development server: `npm run dev`
2. Navigate to `/blog` to see the dynamic blog posts
3. If no posts appear, check the browser console for any Supabase connection errors

## Database Schema

The `blog_posts` table includes:
- `id`: Primary key
- `title`: Blog post title
- `description`: Short description/excerpt
- `content`: Full blog post content (Markdown supported)
- `category`: Post category for filtering
- `published_at`: Publication timestamp
- `image_url`: Optional featured image URL
- `slug`: URL-friendly identifier
- `created_at`/`updated_at`: Timestamps

## Adding New Blog Posts

You can add new blog posts by:
1. Using the Supabase dashboard's table editor
2. Creating an admin interface (not included in this setup)
3. Inserting directly via SQL

## Features Implemented

✅ Dynamic blog post fetching from Supabase
✅ Category-based color coding
✅ Responsive grid layout
✅ Error handling for missing data
✅ TypeScript support with proper interfaces
✅ SEO-friendly slugs
✅ Date formatting
✅ Image support with fallback gradients