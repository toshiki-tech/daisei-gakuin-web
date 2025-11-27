import { Metadata } from 'next'

// 获取网站 URL
const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // GitHub Pages 默认 URL
  return 'https://toshiki-tech.github.io'
}

const siteUrl = getSiteUrl()

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// 默认 OG 信息
const defaultOgTitle = '大成学院'
const defaultOgDescription = '日本人のための本格中国語教室'
// OG 图片路径（1200x630 PNG）
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
          width: 1200,
          height: 630,
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

