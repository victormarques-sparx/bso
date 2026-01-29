import type { NextConfig } from 'next';
import { BASE_PATH } from './src/constants/basePath.constant';

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
  reactCompiler: true,
  reactStrictMode: true,
};

export default nextConfig;
