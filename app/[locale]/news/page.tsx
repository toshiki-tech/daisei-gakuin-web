import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import { getAllNews } from '@/lib/content/news'
import NewsList from '@/components/news/NewsList'
import { defaultLocale } from '@/i18n/config'

// 设置重新验证时间为 0，确保新文章能及时显示（每次请求都重新获取）
export const revalidate = 0

export default async function NewsPage({ params }: { params?: { locale?: string } }) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const news = await getAllNews()

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
	
