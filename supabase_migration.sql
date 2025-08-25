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

-- Create an index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create an index on published_at for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- Insert sample blog posts
INSERT INTO blog_posts (title, description, content, category, published_at, slug) VALUES
(
    'Getting Started with AI-Powered Business Automation',
    'Learn how to implement your first automation workflow and transform your business processes.',
    'In today''s fast-paced business environment, automation has become essential for staying competitive. This comprehensive guide will walk you through the fundamentals of AI-powered business automation...',
    'AI Automation',
    '2024-12-15T10:00:00Z',
    'getting-started-with-ai-powered-business-automation'
),
(
    '5 Common Automation Mistakes to Avoid',
    'Discover the pitfalls that can derail your automation projects and how to avoid them.',
    'While automation can dramatically improve efficiency, many organizations fall into common traps that limit their success. Here are the five most critical mistakes to avoid...',
    'Best Practices',
    '2024-12-12T14:30:00Z',
    '5-common-automation-mistakes-to-avoid'
),
(
    'How Company X Saved 40% on Operations with AI',
    'Real-world case study showing dramatic cost savings through intelligent automation.',
    'Company X faced rising operational costs and decided to implement AI-driven automation across their business processes. The results were remarkable...',
    'Case Study',
    '2024-12-10T09:15:00Z',
    'company-x-saved-40-percent-operations-ai'
),
(
    'The Future of No-Code Automation Platforms',
    'Exploring the latest trends in no-code solutions and their impact on business automation.',
    'No-code platforms are revolutionizing how businesses approach automation. These tools are making sophisticated automation accessible to non-technical users...',
    'Technology',
    '2024-12-08T16:45:00Z',
    'future-of-no-code-automation-platforms'
),
(
    'Building Your First API Automation Workflow',
    'Step-by-step guide to creating automated workflows using APIs and webhooks.',
    'APIs are the backbone of modern automation workflows. In this tutorial, we''ll build a complete automation workflow from scratch using popular APIs...',
    'Tutorial',
    '2024-12-05T11:20:00Z',
    'building-first-api-automation-workflow'
),
(
    'AI Regulation Updates: What Businesses Need to Know',
    'Latest regulatory developments in AI and their implications for business automation.',
    'As AI becomes more prevalent in business operations, regulatory frameworks are evolving rapidly. Here''s what every business leader needs to know about compliance...',
    'Industry News',
    '2024-12-03T13:00:00Z',
    'ai-regulation-updates-businesses-need-to-know'
);

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read blog posts
CREATE POLICY "Blog posts are publicly readable" 
ON blog_posts FOR SELECT 
TO public 
USING (true);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for contact_submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Enable Row Level Security for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_submissions
-- Allow public to insert new submissions
CREATE POLICY "Anyone can insert contact submissions" 
ON contact_submissions FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public to read their own submissions (optional - for future features)
CREATE POLICY "Users can read their own submissions" 
ON contact_submissions FOR SELECT 
TO public 
USING (true);

-- Insert sample contact submission for testing
INSERT INTO contact_submissions (first_name, last_name, email, company, message, status) VALUES
(
    'John',
    'Doe',
    'john.doe@example.com',
    'Tech Corp',
    'I would like to discuss automation opportunities for our company. We are looking to streamline our customer service processes.',
    'new'
);