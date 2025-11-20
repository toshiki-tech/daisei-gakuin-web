import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import { getAllNews } from '@/lib/content/news'
import NewsList from '@/components/news/NewsList'
import { defaultLocale } from '@/i18n/config'

export default async function NewsPage({ params }: { params?: { locale?: string } }) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const news = getAllNews()

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <NewsList news={news} locale={locale} />
      </div>
      <Footer />
    </main>
  )
}
	
