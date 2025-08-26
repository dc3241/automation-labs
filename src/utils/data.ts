import { supabase, BlogPost, AITool, ContactSubmission } from './supabase';

// Blog Posts Data Fetching Functions
export const fetchBlogPosts = async (limit?: number): Promise<BlogPost[]> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const fetchBlogPostsByCategory = async (category: string, limit?: number): Promise<BlogPost[]> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blog posts by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};

// AI Tools Data Fetching Functions
export const fetchAITools = async (limit?: number): Promise<AITool[]> => {
  try {
    let query = supabase
      .from('ai_tools')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching AI tools:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching AI tools:', error);
    return [];
  }
};

export const fetchFeaturedAITools = async (limit?: number): Promise<AITool[]> => {
  try {
    let query = supabase
      .from('ai_tools')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching featured AI tools:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching featured AI tools:', error);
    return [];
  }
};

export const fetchAIToolsByCategory = async (category: string, limit?: number): Promise<AITool[]> => {
  try {
    let query = supabase
      .from('ai_tools')
      .select('*')
      .contains('category', [category])
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching AI tools by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching AI tools by category:', error);
    return [];
  }
};

export const searchAITools = async (searchTerm: string, limit?: number): Promise<AITool[]> => {
  try {
    let query = supabase
      .from('ai_tools')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching AI tools:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching AI tools:', error);
    return [];
  }
};

// Contact Submissions Functions
export const submitContactForm = async (submission: Omit<ContactSubmission, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submission])
      .select()
      .single();

    if (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

export const fetchContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact submissions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }
};

export const updateContactSubmissionStatus = async (id: number, status: ContactSubmission['status']): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating contact submission status:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating contact submission status:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};
