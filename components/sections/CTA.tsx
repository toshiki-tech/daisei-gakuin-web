'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function CTA() {
  const t = useTranslations('cta')
  const locale = useLocale()
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {t('badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                {t('title')}
              </h2>
              <p className="text-lg md:text-xl text-ink/70 mb-2 leading-relaxed">
                {t('description')}
              </p>
              <p className="text-base text-ink/60 mb-8">
                {t('descriptionSub')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}#contact`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-lg font-bold text-xl hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
              >
                {t('buttonPrimary')}
              </Link>
              <Link
                href={`/${locale}#contact`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary/5 transition-colors"
              >
                {t('buttonSecondary')}
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-ink/10">
              <p className="text-sm text-ink/60 text-center">
                {t('note')}
                <br />
                {t('noteSub')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

