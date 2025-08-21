# Supabase Integration

This directory contains the Supabase client configuration and data fetching utilities for the Automation Labs website.

## Files

### `supabase.ts`
- Supabase client configuration
- TypeScript interfaces for database tables
- Environment variable setup

### `data.ts`
- Data fetching functions for blog posts and AI tools
- Error handling and logging
- Type-safe database queries

## Environment Variables

Make sure you have the following environment variables in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Tables

### blog_posts
- `id` (int, primary key)
- `title` (text)
- `description` (text)
- `content` (text)
- `category` (text)
- `published_at` (timestamp)
- `image_url` (text, optional)
- `slug` (text, unique)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### ai_tools
- `id` (int, primary key)
- `name` (text)
- `description` (text)
- `category` (text array)
- `pricing` (text)
- `rating` (numeric)
- `featured` (boolean)
- `icon` (text)
- `url` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Usage

```typescript
import { fetchBlogPosts, fetchFeaturedAITools } from '@/utils/data';

// Fetch latest blog posts
const blogPosts = await fetchBlogPosts(6);

// Fetch featured AI tools
const featuredTools = await fetchFeaturedAITools(3);
```

## Available Functions

### Blog Posts
- `fetchBlogPosts(limit?)` - Fetch all blog posts
- `fetchBlogPostBySlug(slug)` - Fetch single blog post by slug
- `fetchBlogPostsByCategory(category, limit?)` - Fetch posts by category

### AI Tools
- `fetchAITools(limit?)` - Fetch all AI tools
- `fetchFeaturedAITools(limit?)` - Fetch featured tools only
- `fetchAIToolsByCategory(category, limit?)` - Fetch tools by category
- `searchAITools(searchTerm, limit?)` - Search tools by name/description
