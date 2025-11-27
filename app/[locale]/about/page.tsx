import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import Access from '@/components/sections/Access'
import History from '@/components/sections/History'
import Teachers from '@/components/sections/Teachers'
import { defaultLocale } from '@/i18n/config'
import { generateSeoMetadata, getAbsoluteUrl } from '@/lib/seo'

export async function generateMetadata({ params }: { params?: { locale?: string } }) {
  try {
    const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
    const t = await getTranslations({ locale, namespace: 'about' })

    const title = t('pageTitle') || '私たちについて'
    const description = t('pageSubtitle') || '大成学院の歴史、教育理念、そして講師陣をご紹介します。'
    const currentPath = `/${locale}/about`
    const absoluteUrl = getAbsoluteUrl(currentPath)

    return {
      ...generateSeoMetadata({
        title,
        description,
        url: absoluteUrl,
        locale: locale === 'ja' ? 'ja_JP' : 'zh_CN',
      }),
      title,
      description,
    }
  } catch (error) {
    const fallbackUrl = getAbsoluteUrl(`/${defaultLocale}/about`)
    return {
      ...generateSeoMetadata({
        title: '私たちについて',
        description: '大成学院の歴史、教育理念、そして講師陣をご紹介します。',
        url: fallbackUrl,
      }),
      title: '私たちについて',
    }
  }
}

export default async function AboutPage({ params }: { params?: { locale?: string } }) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        {/* 关于我们页面标题和副标题 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              {t('pageTitle')}
            </h1>
            <p className="text-base md:text-lg text-ink/70">
              {t('pageSubtitle')}
            </p>
          </div>
        </section>
        
        <History />
        
        {/* 讲师介绍板块 */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-8">
              {t('teachersTitle')}
            </h2>
            <Teachers showHeader={false} showMoreLink={true} compact={true} />
          </div>
        </section>
        
        <Access />
      </div>
      <Footer />
    </main>
  )
}

