import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // The chat flow reads src/content/knowledge/*.md and prompts/*.prompt from
  // disk at runtime; make sure Next traces those files into the server output.
  outputFileTracingIncludes: {
    '/**': ['./src/content/knowledge/**/*.md', './prompts/**/*.prompt'],
  },
  // "Workshop" was renamed to "Side projects".
  async redirects() {
    return [
      { source: '/workshop', destination: '/side-projects', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
