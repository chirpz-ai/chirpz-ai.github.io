/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  images: {
    unoptimized: true,
  },
  // Add this to handle trailing slashes and make GitHub Pages work properly
  trailingSlash: true,
};

export default nextConfig; 