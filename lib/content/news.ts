import { NewsPost } from '@/types/content'

export const newsPosts: NewsPost[] = [
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
      ja: '2026年春期コースの受付を開始いたしました。新年度に向けて、初心者から上級者まで、様々なコースをご用意しています。',
      zh: '2026年春季课程开始接受报名。面向新年度，从初学者到高级者，准备了各种课程。',
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
      ja: '2024年度のHSK試験において、当学院の受講生の合格率は95%を達成しました。多くの受講生が目標級に合格しています。',
      zh: '在2024年度的HSK考试中，本学院学员的合格率达到95%。很多学员都通过了目标级别。',
    },
    publishedAt: '2025-01-10',
    author: '大成学院',
  },
]

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug)
}

export function getAllNews(): NewsPost[] {
  return newsPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

