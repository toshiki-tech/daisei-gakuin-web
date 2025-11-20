import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import Image from 'next/image'
import { defaultLocale } from '@/i18n/config'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export async function generateMetadata({ params }: { params?: { locale?: string } }) {
  try {
    const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
    const t = await getTranslations({ locale, namespace: 'method' })

    return {
      title: t('pageTitle') || '大成メソッド®',
      description: t('pageDescription') || '大成学院独自の教育メソッド',
    }
  } catch (error) {
    return {
      title: '大成メソッド®',
      description: '大成学院独自の教育メソッド',
    }
  }
}

export default async function MethodPage({ params }: { params?: { locale?: string } }) {
  try {
    const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
    const t = await getTranslations({ locale, namespace: 'method' })

    const pointKeys = ['literature', 'martial', 'emotion', 'output', 'timeline']

    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-background via-white to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6 whitespace-pre-line">
                  {t('title')}
                </h1>
                <p className="text-xl md:text-2xl text-ink/70 leading-relaxed max-w-3xl mx-auto">
                  {t('subtitle')}
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20">
                {/* Left Content */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">
                    {t('overviewTitle')}
                  </h2>
                  <p className="text-lg text-ink/70 leading-relaxed mb-8">
                    {t('overview')}
                  </p>
                  <ul className="space-y-6">
                    {pointKeys.map((key, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-0.5">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-ink/80 leading-relaxed font-medium">
                            {t(`points.${key}`)}
                          </p>
                          <p className="text-base text-ink/60 leading-relaxed mt-2">
                            {t(`points.${key}Description`)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '1280/1378' }}>
                  <Image
                    src={`${basePath}/images/method/method-teaching.jpg`}
                    alt={t('imageAlt')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                </div>
              </div>

              {/* Additional Sections */}
              <div className="max-w-4xl mx-auto mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-12 text-center">
                  {t('benefitsTitle')}
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((num) => {
                    try {
                      const benefitTitle = t(`benefits.${num}.title`)
                      const benefitDesc = t(`benefits.${num}.description`)
                      if (!benefitTitle) return null
                      return (
                        <div key={num} className="bg-background rounded-xl p-6 text-center">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">{num}</span>
                          </div>
                          <h3 className="text-xl font-bold text-ink mb-3">
                            {benefitTitle}
                          </h3>
                          {benefitDesc && (
                            <p className="text-base text-ink/70 leading-relaxed">
                              {benefitDesc}
                            </p>
                          )}
                        </div>
                      )
                    } catch (e) {
                      return null
                    }
                  })}
                </div>
              </div>

              {/* CTA Section */}
              <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                  {t('ctaTitle')}
                </h2>
                <p className="text-lg text-ink/70 mb-8 leading-relaxed">
                  {t('ctaDescription')}
                </p>
                <a
                  href={`/${locale}#contact`}
                  className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-lg font-bold text-xl hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('ctaButton')}
                </a>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    )
  } catch (error) {
    console.error('Method page error:', error)
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
