'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function pathMatchesHref(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const desktopLinkClass = (href: string) => {
    const active = pathMatchesHref(pathname, href);
    return [
      'nav-link',
      active
        ? 'text-gray-900 font-semibold'
        : 'text-gray-700 hover:text-gray-900 font-medium',
    ].join(' ');
  };

  const mobileLinkClass = (href: string) =>
    pathMatchesHref(pathname, href)
      ? 'block px-3 py-2 text-gray-900 bg-gray-50 rounded-md font-semibold transition-colors duration-200'
      : 'block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200';

  return (
    <header
      className={`header-shadow bg-white fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/images/logo.png"
                alt="Automation Labs Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={desktopLinkClass(href)}
                aria-current={pathMatchesHref(pathname, href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex-shrink-0 md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="relative block w-6 h-6">
                <svg
                  className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
                    isMobileMenuOpen
                      ? 'opacity-0 rotate-90 scale-75'
                      : 'opacity-100 rotate-0 scale-100'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
                    isMobileMenuOpen
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-75'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="mobile-menu__inner border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={mobileLinkClass(href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
