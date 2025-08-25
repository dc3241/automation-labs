#!/usr/bin/env node

/**
 * Supabase Connection Test Script
 * 
 * This script helps diagnose Supabase configuration issues.
 * Run with: node scripts/test-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Supabase Connection Test\n');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment Variables Check:');
console.log('✅ URL exists:', !!supabaseUrl);
console.log('✅ Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ Missing environment variables!');
  console.error('Please create a .env.local file with:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here');
  process.exit(1);
}

// Validate format
if (!supabaseUrl.startsWith('https://')) {
  console.error('\n❌ Invalid Supabase URL format. Should start with https://');
  process.exit(1);
}

if (!supabaseAnonKey.startsWith('eyJ')) {
  console.error('\n❌ Invalid Supabase anon key format. Should start with eyJ');
  process.exit(1);
}

console.log('✅ URL format: Valid');
console.log('✅ Key format: Valid');

// Create client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection
async function testConnection() {
  console.log('\n🧪 Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Connection failed:', error.message);
      
      if (error.message.includes('relation "blog_posts" does not exist')) {
        console.error('\n💡 Solution: Create the blog_posts table in your Supabase database');
        console.error('   Run the SQL from SUPABASE_SETUP.md in your Supabase SQL Editor');
      } else if (error.message.includes('permission denied')) {
        console.error('\n💡 Solution: Disable RLS or add public read policy');
        console.error('   Run: ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;');
      } else if (error.message.includes('JWT')) {
        console.error('\n💡 Solution: Check your anon key in Supabase Dashboard → Settings → API');
      }
      
      process.exit(1);
    }

    console.log('✅ Connection successful!');
    
    // Test actual data fetch
    console.log('\n📊 Testing data fetch...');
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (postsError) {
      console.error('❌ Data fetch failed:', postsError.message);
      process.exit(1);
    }

    console.log(`✅ Found ${posts.length} blog posts`);
    
    if (posts.length > 0) {
      console.log('\n📝 Sample post:');
      console.log(`   Title: ${posts[0].title}`);
      console.log(`   Category: ${posts[0].category}`);
      console.log(`   Published: ${posts[0].published_at}`);
    } else {
      console.log('\n⚠️  No blog posts found. Add some posts to test the integration.');
    }

    console.log('\n🎉 All tests passed! Your Supabase integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.error('\n💡 Check your internet connection and Supabase project status');
    process.exit(1);
  }
}

testConnection();
