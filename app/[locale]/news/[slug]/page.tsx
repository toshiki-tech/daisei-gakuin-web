import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import { getNewsBySlug, getAllNews } from '@/lib/content/news'
import NewsDetail from '@/components/news/NewsDetail'
import StructuredData from '@/components/StructuredData'
import { defaultLocale } from '@/i18n/config'
import { generateArticleSchema } from '@/lib/seo/structured-data'

// 设置重新验证时间为 0，确保新文章能及时显示
export const revalidate = 0

export async function generateStaticParams() {
  const news = await getAllNews()
  return news.map((post) => ({
    slug: post.slug,
  }))
}

export default async function NewsDetailPage({
  params,
}: {
  params?: { locale?: string; slug?: string }
}) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const slug = params?.slug
  const post = slug ? await getNewsBySlug(slug) : null

  if (!post) {
    notFound()
  }

  const localeTyped = locale as 'ja' | 'zh'
  
  // 生成 Article 结构化数据
  const articleSchema = generateArticleSchema(
    post.title[localeTyped],
    post.excerpt?.[localeTyped] || post.title[localeTyped],
    post.featuredImage || '',
    post.publishedAt,
    post.updatedAt,
    post.author,
    localeTyped
  )

  return (
    <main className="min-h-screen">
      <StructuredData data={articleSchema} />
      <Header />
      <div className="pt-20">
        <NewsDetail post={post} locale={locale} />
      </div>
      <Footer />
    </main>
  )
}

