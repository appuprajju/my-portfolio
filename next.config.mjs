const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/my-portfolio' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: [
      "localhost:3000",
      "127.0.0.1:3000",
      "192.168.*",
      "10.0.*",
      "172.16.*",
      "*.local",
      "*"
    ],
  },
};

export default nextConfig;