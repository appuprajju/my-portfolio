const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */

const repoName = 'my-portfolio';
const nextConfig = {
  ...(isGithubPages ? {
    output: 'export',
    basePath: `/my-portfolio`,
    assetPrefix: `/my-portfolio`,
  } : {}),
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: (isProd && isGithubPages) ? `/my-portfolio` : '',
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