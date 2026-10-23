import Link from 'next/link';

const linkClass =
  'text-gray-400 hover:text-white transition-colors duration-200';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* EXPLORE Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">
              EXPLORE
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className={linkClass}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className={linkClass}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/consulting" className={linkClass}>
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className={linkClass}>
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">
              LEGAL
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className={linkClass}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* FOLLOW US Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">
              FOLLOW US
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/@automationlabs.business"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automation Labs on YouTube"
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Automation Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
