'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Features() {
  const t = useTranslations('features')
  
  const features = [
    {
      icon: '🎯',
      key: 'pronunciation',
      image: `${basePath}/images/features/feature-1.jpg`,
    },
    {
      icon: '⚔️',
      key: 'method',
      image: `${basePath}/images/features/feature-2.jpg`,
    },
    {
      icon: '📚',
      key: 'levels',
      image: `${basePath}/images/features/feature-3.jpg`,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t('badge')}
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
          {t('title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={feature.image}
                  alt={t(`items.${feature.key}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                <div className="absolute top-4 right-4 text-4xl">{feature.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ink mb-4 text-center">
                  {t(`items.${feature.key}.title`)}
                </h3>
                <p className="text-base text-ink/70 leading-relaxed text-center">
                  {t(`items.${feature.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

