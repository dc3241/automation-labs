import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
