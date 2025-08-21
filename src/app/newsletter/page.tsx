export default function Newsletter() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Stay Ahead with AI Automation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of business leaders who receive our weekly insights on 
              AI automation trends, tools, and strategies.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Join the Newsletter
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Weekly AI automation insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Exclusive tool recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Industry case studies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Early access to new features</span>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your role</option>
                      <option value="founder">Founder/CEO</option>
                      <option value="manager">Manager</option>
                      <option value="developer">Developer</option>
                      <option value="consultant">Consultant</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Join the Newsletter
                  </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  No spam, ever. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Newsletters */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Recent Newsletter Issues
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-600 font-medium">Issue #47</span>
                  <span className="text-sm text-gray-500">Dec 15, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  The Rise of No-Code Automation Platforms
                </h3>
                <p className="text-gray-600 mb-4">
                  This week we explore how no-code platforms are democratizing automation 
                  and making it accessible to non-technical users.
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                  Read Archive →
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-600 font-medium">Issue #46</span>
                  <span className="text-sm text-gray-500">Dec 8, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  AI-Powered Customer Service Revolution
                </h3>
                <p className="text-gray-600 mb-4">
                  Case studies showing how businesses are transforming customer support 
                  with intelligent automation and chatbots.
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                  Read Archive →
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-600 font-medium">Issue #45</span>
                  <span className="text-sm text-gray-500">Dec 1, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Data Pipeline Automation Best Practices
                </h3>
                <p className="text-gray-600 mb-4">
                  Technical deep-dive into building robust, scalable data processing 
                  workflows with modern automation tools.
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                  Read Archive →
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-600 font-medium">Issue #44</span>
                  <span className="text-sm text-gray-500">Nov 24, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  ROI Calculator: Measuring Automation Success
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how to calculate and demonstrate the return on investment 
                  for your automation initiatives.
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                  Read Archive →
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Join Our Growing Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">25,000+</div>
                <div className="text-blue-100">Newsletter Subscribers</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Open Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.9/5</div>
                <div className="text-blue-100">Reader Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
