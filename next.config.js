/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/100-ways': ['./private-assets/**/*'],
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // Temporary (307) so the agency pages can come back later.
    // /projects and /contact stay reachable by direct link but are noindex.
    return [
      { source: "/services", destination: "/", permanent: false },
      { source: "/services/:path*", destination: "/", permanent: false },
      { source: "/consulting", destination: "/", permanent: false },
      { source: "/consulting/:path*", destination: "/", permanent: false },
      { source: "/blog", destination: "/plays", permanent: false },
      { source: "/blog/:path*", destination: "/plays", permanent: false },
      { source: "/ai-tools", destination: "/tools", permanent: false },
      { source: "/ai-tools/:path*", destination: "/tools", permanent: false },
      { source: "/ai-guide", destination: "/", permanent: false },
      { source: "/ai-guide/:path*", destination: "/", permanent: false },
    ];
  },
};

module.exports = nextConfig;
