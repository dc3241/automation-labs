export default function Projects() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore sample automation builds we ship for ecommerce brands — from data pipelines to always-on ops workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Order & Fulfillment Control Tower</h3>
              <p className="text-gray-600 mb-4">
                A daily digest that pulls Shopify, 3PL, and returns signals into one place so ops teams catch delays before customers do.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Shopify</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">3PL</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Automation</span>
              </div>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">SKU Profitability Engine</h3>
              <p className="text-gray-600 mb-4">
                Connects sales, ad spend, and fulfillment costs to calculate true margin per SKU and email a weekly profitability snapshot.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Finance</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Ads</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Inventory</span>
              </div>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Review Intelligence Pipeline</h3>
              <p className="text-gray-600 mb-4">
                Ingests product reviews, classifies issues, routes fixes to the right team, and drafts on-brand responses for support to send.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">NLP</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">CX</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Automation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
