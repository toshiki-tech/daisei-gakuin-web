import { NewsPost } from '@/types/content'
import { getAllNews as getSanityNews, getNewsBySlug as getSanityNewsBySlug } from '@/lib/sanity/queries'

// 硬编码数据作为后备
const fallbackNewsPosts: NewsPost[] = [
  {
    id: '1',
    slug: 'spring-course-2026',
    title: {
      ja: '2026年春期コース受付開始',
      zh: '2026年春季课程开始接受报名',
    },
    excerpt: {
      ja: '新年度に向けて、春期コースの受付を開始いたしました。',
      zh: '面向新年度，春季课程开始接受报名。',
    },
    content: {
      ja: [
        {
          _type: 'block',
          _key: 'fallback-1-ja',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'fallback-1-ja-span',
              text: '2026年春期コースの受付を開始いたしました。新年度に向けて、初心者から上級者まで、様々なコースをご用意しています。',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
      zh: [
        {
          _type: 'block',
          _key: 'fallback-1-zh',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'fallback-1-zh-span',
              text: '2026年春季课程开始接受报名。面向新年度，从初学者到高级者，准备了各种课程。',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    },
    publishedAt: '2025-11-20',
    author: '大成学院',
  },
  {
    id: '2',
    slug: 'hsk-results-2024',
    title: {
      ja: '2024年度HSK合格実績',
      zh: '2024年度HSK合格实绩',
    },
    excerpt: {
      ja: '2024年度のHSK合格率は95%を達成しました。',
      zh: '2024年度的HSK合格率达到95%。',
    },
    content: {
      ja: [
        {
          _type: 'block',
          _key: 'fallback-2-ja',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'fallback-2-ja-span',
              text: '2024年度のHSK試験において、当学院の受講生の合格率は95%を達成しました。多くの受講生が目標級に合格しています。',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
      zh: [
        {
          _type: 'block',
          _key: 'fallback-2-zh',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'fallback-2-zh-span',
              text: '在2024年度的HSK考试中，本学院学员的合格率达到95%。很多学员都通过了目标级别。',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    },
    publishedAt: '2025-01-10',
    author: '大成学院',
  },
]

/**
 * 获取所有新闻
 * 优先从 Sanity 获取，失败时回退到硬编码数据
 */
export async function getAllNews(): Promise<NewsPost[]> {
  try {
    const sanityNews = await getSanityNews()
    // 如果 Sanity 返回了数据，使用 Sanity 数据
    if (sanityNews && sanityNews.length > 0) {
      return sanityNews
    }
  } catch (error) {
    console.warn('Failed to fetch news from Sanity, using fallback data:', error)
  }
  
  // 回退到硬编码数据
  return fallbackNewsPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * 根据 slug 获取单条新闻
 * 优先从 Sanity 获取，失败时回退到硬编码数据
 */
export async function getNewsBySlug(slug: string): Promise<NewsPost | undefined> {
  try {
    const sanityNews = await getSanityNewsBySlug(slug)
    if (sanityNews) {
      return sanityNews
    }
  } catch (error) {
    console.warn(`Failed to fetch news "${slug}" from Sanity, using fallback data:`, error)
  }
  
  // 回退到硬编码数据
  return fallbackNewsPosts.find((post) => post.slug === slug)
}

