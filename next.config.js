const createNextIntlPlugin = require('next-intl/plugin');

// 参考 qiejingxuan-art-studio-web 项目，使用默认配置路径
// 如果使用 './i18n/request.ts'，需要确保文件存在且格式正确
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// 检测是否为 GitHub Pages 部署
const isGithubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPages ? '/daisei-gakuin-web' : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 静态导出配置（用于 GitHub Pages）
  ...(isGithubPages && {
    output: 'export',
    distDir: 'out',
    basePath: basePath,
    assetPrefix: basePath,
  }),
  images: {
    // GitHub Pages 需要 unoptimized
    ...(isGithubPages && { unoptimized: true }),
    domains: ['localhost', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // 禁用 trailingSlash 以确保路由正确
  trailingSlash: false,
}

module.exports = withNextIntl(nextConfig)

