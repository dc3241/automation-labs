/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/ai-tools",
        destination: "/services",
        permanent: false,
      },
      {
        source: "/ai-tools/:path*",
        destination: "/services",
        permanent: false,
      },
      {
        source: "/ai-guide",
        destination: "/services",
        permanent: false,
      },
      {
        source: "/ai-guide/:path*",
        destination: "/services",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
