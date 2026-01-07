import { client } from './client'
import { NewsPost } from '@/types/content'
import { urlFor } from './client'

/**
 * 将 Sanity 返回的数据转换为 NewsPost 格式
 */
function transformNewsPost(data: any): NewsPost {
  return {
    id: data._id || '',
    slug: data.slug?.current || data.slug || '',
    title: data.title || { ja: '', zh: '' },
    content: data.content || { ja: '', zh: '' },
    excerpt: data.excerpt,
    publishedAt: data.publishedAt || '',
    author: data.author || '大成学院',
    featuredImage: data.featuredImage
      ? urlFor(data.featuredImage).url()
      : undefined,
    updatedAt: data._updatedAt ? new Date(data._updatedAt).toISOString().split('T')[0] : undefined,
  }
}

/**
 * 获取所有新闻，按发布日期降序排列
 */
export async function getAllNews(): Promise<NewsPost[]> {
  try {
    const query = `*[_type == "newsPost"] | order(publishedAt desc) {
      _id,
      _updatedAt,
      slug,
      title,
      excerpt,
      content,
      publishedAt,
      author,
      featuredImage
    }`

    const data = await client.fetch(query)
    
    if (!data || data.length === 0) {
      return []
    }

    return data.map(transformNewsPost)
  } catch (error) {
    console.error('Error fetching news from Sanity:', error)
    return []
  }
}

/**
 * 根据 slug 获取单条新闻
 */
export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const query = `*[_type == "newsPost" && slug.current == $slug][0]`
    const params = { slug }

    const data = await client.fetch(query, params)

    if (!data) {
      return null
    }

    return transformNewsPost(data)
  } catch (error) {
    console.error(`Error fetching news by slug "${slug}" from Sanity:`, error)
    return null
  }
}

