import { client } from './client'
import { NewsPost } from '@/types/content'
import { urlFor } from './client'

/**
 * 将 Sanity 返回的数据转换为 NewsPost 格式
 */
function transformNewsPost(data: any): NewsPost {
  // 清理 content 数据，过滤掉无效的块
  const cleanContent = (content: any) => {
    if (!Array.isArray(content)) return []
    return content.filter((block: any) => block && block._type)
  }

  // 调试：打印原始数据
  if (process.env.NODE_ENV === 'development') {
    console.log('Raw Sanity data:', JSON.stringify(data, null, 2))
    console.log('Content structure:', data.content)
  }

  return {
    id: data._id || '',
    slug: data.slug?.current || data.slug || '',
    title: data.title || { ja: '', zh: '' },
    content: {
      ja: cleanContent(data.content?.ja) || [],
      zh: cleanContent(data.content?.zh) || [],
    },
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
    // 获取所有已发布的新闻（排除草稿）
    const query = `*[_type == "newsPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
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
    
    // 调试信息
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetched news count:', data?.length || 0)
      console.log('News titles:', data?.map((n: any) => n.title?.ja || n.title?.zh || 'No title'))
      console.log('News dates:', data?.map((n: any) => n.publishedAt))
    }
    
    if (!data || data.length === 0) {
      return []
    }

    const transformed = data.map(transformNewsPost)
    
    // 调试：打印转换后的数据
    if (process.env.NODE_ENV === 'development') {
      console.log('Transformed news count:', transformed.length)
      console.log('Transformed news:', transformed.map((n: NewsPost) => ({
        id: n.id,
        slug: n.slug,
        title: n.title,
        publishedAt: n.publishedAt
      })))
    }
    
    return transformed
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
    const query = `*[_type == "newsPost" && slug.current == $slug][0] {
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




