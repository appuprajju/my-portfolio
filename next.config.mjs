
const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const repoName = 'my-portfolio';
const basePath = isGithubPages ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  ...(isGithubPages
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),

  trailingSlash: true,

  env: {
    NEXT_PUBLIC_BASE_PATH: isProd && isGithubPages ? basePath : '',
  },

  images: {
    unoptimized: true,
  },

  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  reactStrictMode: true,

  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '192.168.*',
    '10.0.*',
    '172.16.*',
    '*.local',
  ],
};

export default nextConfig;
