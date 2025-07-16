/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export with Image component
  },
  // Add other Next.js configurations as needed
};

module.exports = nextConfig;