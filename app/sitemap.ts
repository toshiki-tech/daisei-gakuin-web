import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
import { getAllNews } from '@/lib/content/news'
import { getAllCourseCategories } from '@/lib/content/courseStructure'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dcxy.jp'
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  // 静态页面路由
  const staticRoutes = [
    '', // 首页
    '/about',
    '/contact',
    '/courses',
    '/courses/index',
    '/method',
    '/teachers',
    '/privacy',
    '/news',
  ]

  // 生成所有静态页面的 sitemap 条目
  const staticPages: MetadataRoute.Sitemap = []
  
  for (const locale of locales) {
    // 静态页面
    for (const route of staticRoutes) {
      staticPages.push({
        url: `${siteUrl}${basePath}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/courses' || route === '/courses/index' ? 0.9 : 0.8,
        alternates: {
          languages: {
            ja: `${siteUrl}${basePath}/ja${route}`,
            zh: `${siteUrl}${basePath}/zh${route}`,
          },
        },
      })
    }

    // 课程分类页面
    try {
      const categories = getAllCourseCategories()
      for (const category of categories) {
        staticPages.push({
          url: `${siteUrl}${basePath}/${locale}/courses/${category.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              ja: `${siteUrl}${basePath}/ja/courses/${category.id}`,
              zh: `${siteUrl}${basePath}/zh/courses/${category.id}`,
            },
          },
        })
      }
    } catch (error) {
      console.error('Error fetching course categories for sitemap:', error)
    }
  }

  // 动态新闻页面
  const newsPages: MetadataRoute.Sitemap = []
  try {
    const allNews = await getAllNews()
    for (const news of allNews) {
      for (const locale of locales) {
        newsPages.push({
          url: `${siteUrl}${basePath}/${locale}/news/${news.slug}`,
          lastModified: news.updatedAt ? new Date(news.updatedAt) : new Date(news.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              ja: `${siteUrl}${basePath}/ja/news/${news.slug}`,
              zh: `${siteUrl}${basePath}/zh/news/${news.slug}`,
            },
          },
        })
      }
    }
  } catch (error) {
    console.error('Error fetching news for sitemap:', error)
  }

  return [...staticPages, ...newsPages]
}
