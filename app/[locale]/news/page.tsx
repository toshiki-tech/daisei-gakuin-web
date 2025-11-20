import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import { getAllNews } from '@/lib/content/news'
import NewsList from '@/components/news/NewsList'

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const news = getAllNews()

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <NewsList news={news} locale={locale as 'ja' | 'zh'} />
      </div>
      <Footer />
    </main>
  )
}

