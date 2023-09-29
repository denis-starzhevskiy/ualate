/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ualate.com',
      },
    ],
  },
  // images: {
  //   domains: ['ualate.com/api/'],
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
