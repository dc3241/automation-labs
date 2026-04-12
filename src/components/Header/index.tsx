'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function pathMatchesHref(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const desktopLinkClass = (href: string) =>
    pathMatchesHref(pathname, href)
      ? 'text-gray-900 font-semibold transition-colors duration-200'
      : 'text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200';

  const mobileLinkClass = (href: string) =>
    pathMatchesHref(pathname, href)
      ? 'block px-3 py-2 text-gray-900 bg-gray-50 rounded-md font-semibold transition-colors duration-200'
      : 'block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200';

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Left side */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="Automation Labs Logo" 
                className="h-10 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <Link href="/" className={desktopLinkClass('/')}>
              Home
            </Link>
            <Link href="/services" className={desktopLinkClass('/services')}>
              Services
            </Link>
            <Link href="/ai-guide" className={desktopLinkClass('/ai-guide')}>
              AI Guide
            </Link>
            <Link href="/ai-tools" className={desktopLinkClass('/ai-tools')}>
              AI Tools
            </Link>
            <Link href="/blog" className={desktopLinkClass('/blog')}>
              Blog
            </Link>

            <Link href="/newsletter" className={desktopLinkClass('/newsletter')}>
              Newsletter
            </Link>
            <Link href="/contact" className={desktopLinkClass('/contact')}>
              Contact
            </Link>
          </nav>

          {/* Mobile menu button - Right side */}
          <div className="flex-shrink-0 md:hidden">
            <button 
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link
                href="/"
                className={mobileLinkClass('/')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={mobileLinkClass('/services')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/ai-guide"
                className={mobileLinkClass('/ai-guide')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Guide
              </Link>
              <Link
                href="/ai-tools"
                className={mobileLinkClass('/ai-tools')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Tools
              </Link>
              <Link
                href="/blog"
                className={mobileLinkClass('/blog')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link
                href="/newsletter"
                className={mobileLinkClass('/newsletter')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Newsletter
              </Link>
              <Link
                href="/contact"
                className={mobileLinkClass('/contact')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
