const createNextIntlPlugin = require('next-intl/plugin');

// 参考 qiejingxuan-art-studio-web 项目，使用默认配置路径
// 如果使用 './i18n/request.ts'，需要确保文件存在且格式正确
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// 获取仓库名（从环境变量或默认值）
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'daisei-gakuin-web';
const isProduction = process.env.NODE_ENV === 'production';
// 在 Vercel 上不使用 basePath，只在 GitHub Pages 静态导出时使用
const isVercel = !!process.env.VERCEL;
const isGitHubPages = isProduction && !isVercel;
const basePath = isGitHubPages ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 只在 GitHub Pages 的构建中启用静态导出
  ...(isGitHubPages && { output: 'export' }),
  basePath, // 配置基础路径
  assetPrefix: basePath, // 确保静态资源也使用 basePath
  images: {
    unoptimized: true, // GitHub Pages 不支持 Next.js Image 优化
    domains: ['localhost', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath, // 在客户端也可以访问 basePath
  },
  // 禁用 trailingSlash 以确保路由正确
  trailingSlash: false,
}

module.exports = withNextIntl(nextConfig)

