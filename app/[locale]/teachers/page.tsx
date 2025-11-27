import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import Teachers from '@/components/sections/Teachers'
import { defaultLocale } from '@/i18n/config'

export async function generateMetadata({ params }: { params?: { locale?: string } }) {
  try {
    const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
    const t = await getTranslations({ locale, namespace: 'teachers' })

    return {
      title: t('title') || '講師紹介',
      description: t('subtitle') || '大成学院の講師紹介',
    }
  } catch (error) {
    return {
      title: '講師紹介',
      description: '大成学院の講師紹介',
    }
  }
}

export default async function TeachersPage({ params }: { params?: { locale?: string } }) {
  try {
    const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
    const t = await getTranslations({ locale, namespace: 'teachers' })

    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          {/* Hero / Intro */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                {t('title')}
              </h1>
              <p className="text-lg md:text-xl text-ink/70 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
          </section>

          {/* Teachers grid */}
          <Teachers showHeader={false} showMoreLink={false} />
        </div>
        <Footer />
      </main>
    )
  } catch (error) {
    console.error('Teachers page error:', error)
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-ink mb-4">エラーが発生しました</h1>
              <p className="text-ink/70">ページの読み込み中にエラーが発生しました。</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }
}


