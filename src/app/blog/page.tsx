import { supabase, BlogPost, testSupabaseConnection } from '../../../utils/supabase';

function getCategoryColor(category: string): { bg: string; text: string; accent: string } {
  const colors = {
    'AI Automation': { bg: 'from-blue-400 to-blue-600', text: 'bg-blue-100 text-blue-800', accent: 'text-blue-600 hover:text-blue-700' },
    'Best Practices': { bg: 'from-green-400 to-green-600', text: 'bg-green-100 text-green-800', accent: 'text-green-600 hover:text-green-700' },
    'Case Study': { bg: 'from-purple-400 to-purple-600', text: 'bg-purple-100 text-purple-800', accent: 'text-purple-600 hover:text-purple-700' },
    'Technology': { bg: 'from-orange-400 to-orange-600', text: 'bg-orange-100 text-orange-800', accent: 'text-orange-600 hover:text-orange-700' },
    'Tutorial': { bg: 'from-red-400 to-red-600', text: 'bg-red-100 text-red-800', accent: 'text-red-600 hover:text-red-700' },
    'Industry News': { bg: 'from-indigo-400 to-indigo-600', text: 'bg-indigo-100 text-indigo-800', accent: 'text-indigo-600 hover:text-indigo-700' },
  };
  return colors[category as keyof typeof colors] || { bg: 'from-gray-400 to-gray-600', text: 'bg-gray-100 text-gray-800', accent: 'text-gray-600 hover:text-gray-700' };
}

async function getBlogPosts(): Promise<{ posts: BlogPost[]; error?: string; debug?: any }> {
  console.log('🔄 Starting blog posts fetch...');
  
  try {
    // First, test the connection
    const connectionTest = await testSupabaseConnection();
    if (!connectionTest.success) {
      console.error('❌ Connection test failed:', connectionTest.error);
      return { 
        posts: [], 
        error: 'Database connection failed. Please check your Supabase configuration.',
        debug: connectionTest
      };
    }

    console.log('✅ Connection test passed, fetching blog posts...');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('❌ Error fetching blog posts:', error);
      return { 
        posts: [], 
        error: `Database query failed: ${error.message}`,
        debug: { error, data }
      };
    }
    
    console.log('✅ Blog posts fetched successfully:', data?.length || 0, 'posts');
    return { posts: data || [] };
    
  } catch (error) {
    console.error('❌ Unexpected error in getBlogPosts:', error);
    return { 
      posts: [], 
      error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      debug: { error }
    };
  }
}

export default async function Blog() {
  console.log('🚀 Blog page component rendering...');
  
  const { posts: blogPosts, error, debug } = await getBlogPosts();

  // Debug information (only in development)
  if (process.env.NODE_ENV === 'development' && debug) {
    console.log('🔍 Debug information:', debug);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Automation Insights Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and insights in AI and business automation.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Database Connection Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  {process.env.NODE_ENV === 'development' && debug && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-red-600 hover:text-red-800">
                        Show debug information
                      </summary>
                      <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
                        {JSON.stringify(debug, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const colors = getCategoryColor(post.category);
            const publishedDate = new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            return (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="h-48 w-full object-cover" />
                ) : (
                  <div className={`h-48 bg-gradient-to-br ${colors.bg}`}></div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 ${colors.text} text-sm rounded-full`}>
                      {post.category}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">{publishedDate}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.description}
                  </p>
                  <button className={`${colors.accent} font-medium transition-colors duration-200`}>
                    Read More →
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* No Posts Message */}
        {blogPosts.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    No Blog Posts Found
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>The database connection is working, but no blog posts were found. Please add some posts to your Supabase database.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {blogPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
