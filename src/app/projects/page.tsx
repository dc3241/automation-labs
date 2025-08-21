export default function Projects() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our latest automation projects and innovative solutions that are transforming industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Smart Manufacturing</h3>
              <p className="text-gray-600 mb-4">
                Automated production line optimization with real-time monitoring and predictive maintenance.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">IoT</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">ML</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Automation</span>
              </div>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Data Pipeline</h3>
              <p className="text-gray-600 mb-4">
                End-to-end data processing automation with ETL workflows and quality validation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">ETL</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Data</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Pipeline</span>
              </div>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Testing Framework</h3>
              <p className="text-gray-600 mb-4">
                Automated testing suite with continuous integration and deployment capabilities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">CI/CD</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Testing</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Automation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
