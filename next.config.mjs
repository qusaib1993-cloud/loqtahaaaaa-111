/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};
export default nextConfig;
