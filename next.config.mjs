/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  images: {
    unoptimized: true,
  },
  // Add this to handle trailing slashes and make GitHub Pages work properly
  trailingSlash: true,
  // Disable ESLint during builds
  eslint: {
    // Don't run ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 