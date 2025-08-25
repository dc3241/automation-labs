import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Enhanced debugging for environment variables
console.log('🔍 Supabase Configuration Debug:');
console.log('URL exists:', !!supabaseUrl);
console.log('URL length:', supabaseUrl.length);
console.log('Key exists:', !!supabaseAnonKey);
console.log('Key length:', supabaseAnonKey.length);
console.log('URL starts with https://:', supabaseUrl.startsWith('https://'));
console.log('Key starts with eyJ:', supabaseAnonKey.startsWith('eyJ'));

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are missing or invalid!');
  console.error('Please create a .env.local file with:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here');
  console.error('Then restart your development server.');
}

if (supabaseUrl && !supabaseUrl.startsWith('https://')) {
  console.error('❌ Invalid Supabase URL format. Should start with https://');
}

if (supabaseAnonKey && !supabaseAnonKey.startsWith('eyJ')) {
  console.error('❌ Invalid Supabase anon key format. Should start with eyJ');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection
export async function testSupabaseConnection() {
  try {
    console.log('🧪 Testing Supabase connection...');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Environment variables not configured');
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Supabase connection test failed:', error);
      return { success: false, error };
    }

    console.log('✅ Supabase connection successful!');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Supabase connection test failed:', error);
    return { success: false, error };
  }
}

// Database types for better TypeScript support
export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  published_at: string;
  image_url?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface AITool {
  id: number;
  name: string;
  description: string;
  category: string[];
  pricing: string;
  rating: number;
  featured: boolean;
  icon: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  created_at: string;
  updated_at: string;
}
