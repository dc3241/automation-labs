-- AI Automation Guide Database Migration
-- Run this in your Supabase SQL editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Guide user tracking (separate from general newsletter)
CREATE TABLE IF NOT EXISTS guide_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  business_type TEXT CHECK (business_type IN ('ecommerce', 'agency', 'saas', 'influencer', 'other')),
  beehiiv_subscriber_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  current_day INTEGER DEFAULT 1 CHECK (current_day >= 1 AND current_day <= 7),
  completed_days BOOLEAN[] DEFAULT ARRAY[false,false,false,false,false,false,false],
  last_active TIMESTAMP DEFAULT NOW(),
  conversion_score INTEGER DEFAULT 0 CHECK (conversion_score >= 0 AND conversion_score <= 100)
);

-- Enhanced analytics for guide engagement
CREATE TABLE IF NOT EXISTS guide_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES guide_users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  page TEXT,
  tool_name TEXT,
  affiliate_url TEXT,
  time_spent_seconds INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tool recommendations with performance tracking
CREATE TABLE IF NOT EXISTS guide_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  affiliate_url TEXT,
  logo_url TEXT,
  pricing TEXT,
  best_for_business_types TEXT[],
  day_featured INTEGER CHECK (day_featured >= 1 AND day_featured <= 7),
  click_count INTEGER DEFAULT 0,
  conversion_rating DECIMAL(2,1) DEFAULT 0.0 CHECK (conversion_rating >= 0.0 AND conversion_rating <= 5.0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_guide_users_email ON guide_users(email);
CREATE INDEX IF NOT EXISTS idx_guide_users_business_type ON guide_users(business_type);
CREATE INDEX IF NOT EXISTS idx_guide_analytics_user_id ON guide_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_guide_analytics_action_type ON guide_analytics(action_type);
CREATE INDEX IF NOT EXISTS idx_guide_analytics_created_at ON guide_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_guide_tools_category ON guide_tools(category);
CREATE INDEX IF NOT EXISTS idx_guide_tools_day_featured ON guide_tools(day_featured);
CREATE INDEX IF NOT EXISTS idx_guide_tools_business_types ON guide_tools USING GIN(best_for_business_types);

-- Insert sample guide tools
INSERT INTO guide_tools (name, category, description, affiliate_url, pricing, best_for_business_types, day_featured, conversion_rating) VALUES
-- Day 1: Process Mapping & Assessment
('Process Street', 'Process Management', 'Create and track business processes with AI-powered workflow automation', 'https://www.process.st/?via=autolabs', 'Paid $25+/mo', ARRAY['ecommerce', 'agency', 'saas'], 1, 4.2),
('Zapier', 'Workflow Automation', 'Connect 5,000+ apps with automated workflows', 'https://zapier.com/?via=autolabs', 'Freemium $20+/mo', ARRAY['ecommerce', 'agency', 'saas', 'influencer'], 1, 4.8),
('Toggl Track', 'Time Tracking', 'AI-powered time tracking and productivity insights', 'https://toggl.com/track/?via=autolabs', 'Freemium $10+/mo', ARRAY['agency', 'saas'], 1, 4.1),

-- Day 2: Content Creation
('Copy.ai', 'Content Creation', 'AI writing assistant for marketing copy, blog posts, and social media', 'https://copy.ai/?via=autolabs', 'Freemium $36+/mo', ARRAY['ecommerce', 'agency', 'influencer'], 2, 4.3),
('Jasper', 'Content Creation', 'Advanced AI writing tool for long-form content and marketing materials', 'https://jasper.ai/?via=autolabs', 'Paid $49+/mo', ARRAY['agency', 'saas'], 2, 4.5),
('Buffer', 'Social Media', 'Social media scheduling and analytics with AI insights', 'https://buffer.com/?via=autolabs', 'Freemium $6+/mo', ARRAY['ecommerce', 'agency', 'influencer'], 2, 4.2),
('Later', 'Social Media', 'Visual content calendar and Instagram automation', 'https://later.com/?via=autolabs', 'Freemium $18+/mo', ARRAY['ecommerce', 'influencer'], 2, 4.0),

-- Day 3: Social Media Management
('Hootsuite', 'Social Media', 'Complete social media management platform with AI analytics', 'https://hootsuite.com/?via=autolabs', 'Paid $49+/mo', ARRAY['ecommerce', 'agency'], 3, 4.4),
('Sprout Social', 'Social Media', 'Enterprise social media management with advanced automation', 'https://sproutsocial.com/?via=autolabs', 'Paid $249+/mo', ARRAY['agency', 'saas'], 3, 4.6),
('ManyChat', 'Chat Automation', 'Build chatbots and automated conversations for social media', 'https://manychat.com/?via=autolabs', 'Freemium $15+/mo', ARRAY['ecommerce', 'agency'], 3, 4.1),

-- Day 4: Customer Communication
('ActiveCampaign', 'Email Marketing', 'Marketing automation with AI-powered personalization', 'https://activecampaign.com/?via=autolabs', 'Paid $29+/mo', ARRAY['ecommerce', 'agency', 'saas'], 4, 4.5),
('Intercom', 'Customer Support', 'AI-powered customer service and communication platform', 'https://intercom.com/?via=autolabs', 'Paid $39+/mo', ARRAY['saas', 'ecommerce'], 4, 4.7),
('Tidio', 'Live Chat', 'AI chatbots and live chat for ecommerce websites', 'https://tidio.com/?via=autolabs', 'Paid $18+/mo', ARRAY['ecommerce', 'agency'], 4, 4.4),
('Trustpilot', 'Review Management', 'Automated review collection and reputation management', 'https://trustpilot.com/?via=autolabs', 'Paid $199+/mo', ARRAY['ecommerce', 'agency'], 4, 4.3),

-- Day 5: Sales & Lead Generation
('Pipedrive', 'CRM', 'Sales CRM with AI-powered lead scoring and automation', 'https://pipedrive.com/?via=autolabs', 'Paid $15+/mo', ARRAY['agency', 'saas'], 5, 4.2),
('HubSpot', 'Marketing Hub', 'Complete inbound marketing platform with automation', 'https://hubspot.com/?via=autolabs', 'Freemium $45+/mo', ARRAY['saas', 'agency'], 5, 4.7),
('PandaDoc', 'Document Automation', 'Automated proposal and contract generation', 'https://pandadoc.com/?via=autolabs', 'Paid $19+/mo', ARRAY['agency', 'saas'], 5, 4.1),

-- Day 6: Operations & Admin
('QuickBooks', 'Accounting', 'Automated invoicing and financial management', 'https://quickbooks.intuit.com/?via=autolabs', 'Paid $30+/mo', ARRAY['ecommerce', 'agency', 'saas'], 6, 4.5),
('Asana', 'Project Management', 'Work management platform with AI-powered insights', 'https://asana.com/?via=autolabs', 'Freemium $11+/mo', ARRAY['agency', 'saas'], 6, 4.3),
('Slack', 'Team Communication', 'Team collaboration with automated workflows', 'https://slack.com/?via=autolabs', 'Freemium $7+/mo', ARRAY['agency', 'saas'], 6, 4.4),

-- Day 7: Analytics & Optimization
('Google Analytics 4', 'Analytics', 'Advanced web analytics with AI insights', 'https://analytics.google.com/', 'Free', ARRAY['ecommerce', 'agency', 'saas', 'influencer'], 7, 4.6),
('Mixpanel', 'Product Analytics', 'AI-powered product analytics and user behavior tracking', 'https://mixpanel.com/?via=autolabs', 'Paid $25+/mo', ARRAY['saas', 'ecommerce'], 7, 4.5),
('Hotjar', 'User Experience', 'Heatmaps and user behavior analytics', 'https://hotjar.com/?via=autolabs', 'Freemium $39+/mo', ARRAY['ecommerce', 'saas'], 7, 4.2);

-- Enable Row Level Security (RLS)
ALTER TABLE guide_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_tools ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Guide users can read their own data
CREATE POLICY "Users can view own guide data" ON guide_users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own guide data" ON guide_users
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can insert guide users" ON guide_users
  FOR INSERT WITH CHECK (true);

-- Analytics are read-only for users, writable for the application
CREATE POLICY "Anyone can insert analytics" ON guide_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own analytics" ON guide_analytics
  FOR SELECT USING (true);

-- Tools are publicly readable
CREATE POLICY "Anyone can view guide tools" ON guide_tools
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update tool click counts" ON guide_tools
  FOR UPDATE USING (true);

-- Create function to update tool click counts
CREATE OR REPLACE FUNCTION increment_tool_clicks(tool_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE guide_tools 
  SET click_count = click_count + 1, updated_at = NOW()
  WHERE id = tool_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to track user progress
CREATE OR REPLACE FUNCTION update_guide_progress(
  user_email TEXT,
  day_number INTEGER,
  is_completed BOOLEAN
)
RETURNS void AS $$
DECLARE
  user_record RECORD;
BEGIN
  -- Get user record
  SELECT * INTO user_record FROM guide_users WHERE email = user_email;
  
  IF user_record IS NULL THEN
    RAISE EXCEPTION 'User not found: %', user_email;
  END IF;
  
  -- Update completed days array
  UPDATE guide_users 
  SET 
    completed_days[day_number] = is_completed,
    current_day = CASE 
      WHEN is_completed AND day_number = current_day THEN LEAST(current_day + 1, 7)
      ELSE current_day
    END,
    last_active = NOW()
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
