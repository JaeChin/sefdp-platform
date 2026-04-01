/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sefdp/ui', '@sefdp/shared'],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
