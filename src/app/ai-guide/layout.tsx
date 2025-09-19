import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "7-Day AI Automation Quick Start Guide | Automation Labs",
  description: "Transform your business with our comprehensive 7-day AI automation guide. Learn to automate processes, increase efficiency, and scale your business with proven AI tools and strategies.",
  keywords: "AI automation, business automation, AI tools, automation guide, productivity, business efficiency",
  openGraph: {
    title: "7-Day AI Automation Quick Start Guide",
    description: "Transform your business with AI automation in just 7 days",
    type: "website",
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} antialiased min-h-screen bg-white font-sans`}>
      {/* Guide Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <img 
                  src="/images/logo.png" 
                  alt="Automation Labs Logo" 
                  className="h-8 w-auto" 
                />
                <span className="text-lg font-semibold text-gray-900">
                  AI Automation Guide
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/ai-guide" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Guide Overview
              </Link>
              <Link 
                href="/ai-guide/tools" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                All Tools
              </Link>
              <Link 
                href="/ai-guide/next-steps" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Next Steps
              </Link>
              <Link 
                href="/" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Back to Main Site
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Guide Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Guide Info */}
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-gray-900">
                AI Automation Guide
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Transform your business with AI automation in just 7 days. 
                Learn proven strategies and tools to increase efficiency and scale your operations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/ai-guide" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    Guide Overview
                  </Link>
                </li>
                <li>
                  <Link href="/ai-guide/tools" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    All Tools
                  </Link>
                </li>
                <li>
                  <Link href="/ai-guide/next-steps" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    Next Steps
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    Get Help
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-gray-900">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Stuck on a step? Our automation experts are here to help you succeed.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Get Support
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
