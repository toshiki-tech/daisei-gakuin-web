import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import { getNewsBySlug, getAllNews } from '@/lib/content/news'
import NewsDetail from '@/components/news/NewsDetail'

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }) {
  const news = getAllNews()
  return news.map((post) => ({
    slug: post.slug,
  }))
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getNewsBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <NewsDetail post={post} locale={locale as 'ja' | 'zh'} />
      </div>
      <Footer />
    </main>
  )
}

