'use client'

import { useTranslations, useLocale } from 'next-intl'

export default function Access() {
  const t = useTranslations('access')
  const locale = useLocale()
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="access" className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
          {t('title')}
        </h2>
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <div className="bg-background rounded-xl overflow-hidden shadow-md">
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps?q=中野区中央+3-34-3+メイヒル新中野+201&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('access')}
              />
            </div>
          </div>

          {/* Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-ink mb-4">{t('access')}</h3>
              <div className="space-y-3 text-base text-ink/80 leading-relaxed">
                <p>
                  <span className="font-semibold">{t('address')}</span>
                  <br />
                  {t('addressValue')}
                </p>
                <p>
                  <span className="font-semibold">{t('accessInfo')}</span>
                  <br />
                  <span className="whitespace-pre-line">{t('accessValue')}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-ink mb-4">{t('hours')}</h3>
              <div className="text-base text-ink/80 leading-relaxed">
                <p>{t('weekday')}</p>
                <p>{t('saturday')}</p>
                <p>{t('sunday')}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-ink mb-4">{t('contact')}</h3>
              <div className="space-y-2 text-base text-ink/80 leading-relaxed">
                <p>
                  <span className="font-semibold">{t('phone')}</span>
                  <a href="tel:03-5328-5626" className="text-primary hover:underline">
                    03-5328-5626
                  </a>
                </p>
                <p>
                  <span className="font-semibold">{t('email')}</span>
                  <a href="mailto:iken_kai@yahoo.co.jp" className="text-primary hover:underline">
                    iken_kai@yahoo.co.jp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

