export default function Blog() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post 1 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">AI Automation</span>
                <span className="ml-3 text-sm text-gray-500">Dec 15, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Getting Started with AI-Powered Business Automation
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how to implement your first automation workflow and transform your business processes.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                Read More →
              </button>
            </div>
          </article>

          {/* Blog Post 2 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Best Practices</span>
                <span className="ml-3 text-sm text-gray-500">Dec 12, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                5 Common Automation Mistakes to Avoid
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the pitfalls that can derail your automation projects and how to avoid them.
              </p>
              <button className="text-green-600 font-medium hover:text-green-700 transition-colors duration-200">
                Read More →
              </button>
            </div>
          </article>

          {/* Blog Post 3 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Case Study</span>
                <span className="ml-3 text-sm text-gray-500">Dec 10, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                How Company X Saved 40% on Operations with AI
              </h3>
              <p className="text-gray-600 mb-4">
                Real-world case study showing dramatic cost savings through intelligent automation.
              </p>
              <button className="text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200">
                Read More →
              </button>
            </div>
          </article>

          {/* Blog Post 4 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Technology</span>
                <span className="ml-3 text-sm text-gray-500">Dec 8, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                The Future of No-Code Automation Platforms
              </h3>
              <p className="text-gray-600 mb-4">
                Exploring the latest trends in no-code solutions and their impact on business automation.
              </p>
              <button className="text-orange-600 font-medium hover:text-orange-700 transition-colors duration-200">
                Read More →
              </button>
            </div>
          </article>

          {/* Blog Post 5 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-br from-red-400 to-red-600"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Tutorial</span>
                <span className="ml-3 text-sm text-gray-500">Dec 5, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Building Your First API Automation Workflow
              </h3>
              <p className="text-gray-600 mb-4">
                Step-by-step guide to creating automated workflows using APIs and webhooks.
              </p>
              <button className="text-red-600 font-medium hover:text-red-700 transition-colors duration-200">
                Read More →
              </button>
            </div>
          </article>

          {/* Blog Post 6 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-br from-indigo-400 to-indigo-600"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">Industry News</span>
                <span className="ml-3 text-sm text-gray-500">Dec 3, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                AI Regulation Updates: What Businesses Need to Know
              </h3>
              <p className="text-gray-600 mb-4">
                Latest regulatory developments in AI and their implications for business automation.
              </p>
              <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-200">
                Read More →
              </button>
            </div>
          </article>
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}
