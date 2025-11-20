'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const locale = useLocale() as 'ja' | 'zh'
  
  const testimonialKeys = ['1', '2', '3', '4']

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
          {t('title')}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonialKeys.map((key, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={`/images/testimonials/student-${key}.jpg`}
                    alt={t(`items.${key}.name`)}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-ink">{t(`items.${key}.name`)}</p>
                  <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded">
                    {t(`items.${key}.course`)}
                  </span>
                </div>
              </div>
              <p className="text-base text-ink/70 leading-relaxed">
                「{t(`items.${key}.comment`)}」
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

