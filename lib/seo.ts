import { Metadata } from 'next'

// 获取网站 URL
const getSiteUrl = () => {
  // 优先使用明确设置的环境变量
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  // 在 Vercel 环境中
  if (process.env.VERCEL) {
    // 检查是否是预览部署（包含 vercel.app）
    const isPreview = process.env.VERCEL_URL?.includes('vercel.app')
    
    if (isPreview) {
      // 预览部署：使用生产域名，确保 metadata 使用正确的域名
      // 这样即使是在预览环境中，OG 标签和 canonical 链接也指向生产域名
      return 'https://dcxy.jp'
    } else {
      // 生产部署：如果有自定义域名，VERCEL_URL 应该是自定义域名
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
      }
      // 如果没有 VERCEL_URL，使用生产域名
      return 'https://dcxy.jp'
    }
  }
  
  // 本地开发环境
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  
  // 默认生产域名
  return 'https://dcxy.jp'
}

const siteUrl = getSiteUrl()

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// 默认 OG 信息
const defaultOgTitle = '大成学院'
const defaultOgDescription = '本格中国語学院'
// OG 图片路径（1024x1024 PNG）
const defaultOgImage = `${siteUrl}${basePath}/images/og/og.png`

interface SeoOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  locale?: string
}

/**
 * 生成完整的 SEO Metadata，包含 OG 和 Twitter 标签
 */
export function generateSeoMetadata(options: SeoOptions = {}): Metadata {
  const {
    title = defaultOgTitle,
    description = defaultOgDescription,
    image = defaultOgImage,
    url,
    locale = 'ja_JP',
  } = options

  // 构建完整的 URL（如果是相对路径，则拼接 siteUrl）
  const fullUrl = url 
    ? (url.startsWith('http') ? url : `${siteUrl}${basePath}${url}`)
    : `${siteUrl}${basePath}`

  return {
    title: title || defaultOgTitle,
    description,
    openGraph: {
      title: title || defaultOgTitle,
      description,
      url: fullUrl,
      siteName: defaultOgTitle,
      images: [
        {
          url: image,
          width: 1024,
          height: 1024,
          alt: title || defaultOgTitle,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || defaultOgTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

/**
 * 获取当前页面的绝对 URL
 */
export function getAbsoluteUrl(path: string = ''): string {
  const url = path.startsWith('http') 
    ? path 
    : `${siteUrl}${basePath}${path.startsWith('/') ? path : `/${path}`}`
  return url
}

