import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Stats from '@/components/sections/Stats'
import Pricing from '@/components/sections/Pricing'
import Courses from '@/components/sections/Courses'
import Method from '@/components/sections/Method'
import Testimonials from '@/components/sections/Testimonials'
import Access from '@/components/sections/Access'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'
import HomeNewsSection from '@/components/sections/HomeNewsSection'
import StructuredData from '@/components/StructuredData'
import { defaultLocale } from '@/i18n/config'
import { getAllFAQs } from '@/lib/content/faq'
import { generateFAQPageSchema } from '@/lib/seo/structured-data'

// 首页需要实时反映最新新闻，关闭静态缓存
export const revalidate = 0

export default function Home({ params }: { params?: { locale?: string } }) {
  try {
    const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
    const localeTyped = locale as 'ja' | 'zh'
    
    // 生成 FAQ 结构化数据
    const faqs = getAllFAQs()
    const faqSchema = generateFAQPageSchema(
      faqs.map((faq) => ({
        question: faq.question[localeTyped],
        answer: faq.answer[localeTyped],
      }))
    )

    return (
      <main className="min-h-screen">
        <StructuredData data={faqSchema} />
        <Header />
        <Hero />
        {/* 首页新闻区：紧跟 Hero，下方模块化展示 */}
        <HomeNewsSection />
        <Features />
        <Stats />
        <Courses />
        <Pricing />
        <Method />
        <Testimonials />
        <Access />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    )
  } catch (error) {
    console.error('Home page error:', error)
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-ink mb-4">エラーが発生しました</h1>
          <p className="text-ink/70">ページの読み込み中にエラーが発生しました。</p>
          <pre className="mt-4 text-sm">{String(error)}</pre>
        </div>
      </main>
    )
  }
}
