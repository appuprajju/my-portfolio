const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */


const repoName = 'my-portfolio'
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: true,
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "192.168.*",
    "10.0.*",
    "172.16.*",
    "*.local",
    "*"
  ],
};

export default nextConfig;