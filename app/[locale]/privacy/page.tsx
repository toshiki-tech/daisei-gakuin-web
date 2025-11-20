import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import { defaultLocale } from '@/i18n/config'

export async function generateMetadata({ params }: { params?: { locale?: string } }) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const t = await getTranslations({ locale, namespace: 'privacy' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function PrivacyPage({ params }: { params?: { locale?: string } }) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const t = await getTranslations({ locale, namespace: 'privacy' })

  const sections = [
    'introduction',
    'dataCollection',
    'useOfData',
    'dataProtection',
    'dataSharing',
    'userRights',
    'cookies',
    'thirdPartyServices',
    'dataRetention',
    'children',
    'changes',
    // 'contact' is handled separately below
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Title */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                  {t('title')}
                </h1>
                <p className="text-lg text-ink/70">
                  {t('lastUpdated')}: {t('lastUpdatedDate')}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {sections.map((section) => (
                  <div key={section} className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">
                      {t(`${section}.title`)}
                    </h2>
                    <div className="text-base text-ink/80 leading-relaxed space-y-4">
                      {(() => {
                        const content = t.raw(`${section}.content`)
                        if (Array.isArray(content)) {
                          return content.map((paragraph: string, index: number) => (
                            <p key={index}>{paragraph}</p>
                          ))
                        } else {
                          return <p>{content as string}</p>
                        }
                      })()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="mt-16 p-8 bg-background rounded-xl">
                <h2 className="text-2xl font-bold text-ink mb-4">
                  {t('contact.title')}
                </h2>
                <div className="space-y-2 text-base text-ink/80">
                  <p>
                    <span className="font-semibold">{t('contact.organization')}:</span> 大成学院
                  </p>
                  <p>
                    <span className="font-semibold">{t('contact.address')}:</span> 〒164-0011 東京都中野区中央 3-34-3 メイヒル新中野 201
                  </p>
                  <p>
                    <span className="font-semibold">{t('contact.phone')}:</span>{' '}
                    <a href="tel:03-5328-5626" className="text-primary hover:underline">
                      03-5328-5626
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">{t('contact.email')}:</span>{' '}
                    <a href="mailto:iken_kai@yahoo.co.jp" className="text-primary hover:underline">
                      iken_kai@yahoo.co.jp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

