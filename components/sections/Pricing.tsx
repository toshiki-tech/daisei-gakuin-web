'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function Pricing() {
  const t = useTranslations('pricing')
  const locale = useLocale()

  const plans = [
    {
      id: 'group',
      color: 'green',
      featureKeys: ['0', '1', '2', '3'],
    },
    {
      id: 'private',
      color: 'blue',
      featureKeys: ['0', '1', '2', '3'],
    },
  ]

  return (
    <section id="pricing" className="pt-8 pb-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                plan.color === 'green'
                  ? 'border-2 border-green-500/20'
                  : 'border-2 border-blue-500/20'
              }`}
            >
              {/* Color accent bar */}
              <div
                className={`h-2 ${
                  plan.color === 'green' ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />

              <div className="p-8">
                {/* Plan name */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {plan.color === 'green' ? '🟢' : '🔵'}
                    </span>
                    <h3 className="text-2xl font-bold text-ink">
                      {t(`${plan.id}.name`)}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-ink">
                      {t(`${plan.id}.price`)}
                    </span>
                    <span className="text-lg text-ink/60">
                      {t('perMonth')}
                    </span>
                  </div>
                  <p className="text-sm text-ink/50 mt-1">
                    {t(`${plan.id}.priceNote`)}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.featureKeys.map((key: string, index: number) => {
                    // Use raw to get array, then access by index
                    const features = t.raw(`${plan.id}.features`) as string[]
                    const feature = features?.[parseInt(key)] || ''
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-base text-ink/80 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                {/* CTA Button */}
                <Link
                  href={`/${locale}#contact`}
                  className={`block w-full text-center py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                    plan.color === 'green'
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                      : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {t('cta')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

