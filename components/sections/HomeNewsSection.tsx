import { getAllNews } from '@/lib/content/news'
import type { NewsPost } from '@/types/content'
import HomeNewsSectionClient from './HomeNewsSectionClient'

interface HomeNewsSectionProps {
  limit?: number
}

export default async function HomeNewsSection({
  limit = 3,
}: HomeNewsSectionProps) {
  const allNews = await getAllNews()
  const latestNews = allNews.slice(0, limit)

  if (!latestNews.length) return null

  return (
    <HomeNewsSectionClient news={latestNews as NewsPost[]} />
  )
}

