import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import { getNewsBySlug, getAllNews } from '@/lib/content/news'
import NewsDetail from '@/components/news/NewsDetail'
import { defaultLocale } from '@/i18n/config'

export async function generateStaticParams() {
  const news = getAllNews()
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
  const post = slug ? getNewsBySlug(slug) : null

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <NewsDetail post={post} locale={locale} />
      </div>
      <Footer />
    </main>
  )
}

