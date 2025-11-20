'use client'

import { useTranslations } from 'next-intl'

export default function Stats() {
  const t = useTranslations('stats')
  
  const stats = [
    {
      key: 'satisfaction',
    },
    {
      key: 'conversation',
    },
    {
      key: 'graduates',
    },
    {
      key: 'hsk',
    },
  ]

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {t(`${stat.key}.number`)}
              </div>
              <div className="text-lg font-semibold text-ink mb-1">
                {t(`${stat.key}.label`)}
              </div>
              <div className="text-sm text-ink/60">
                {t(`${stat.key}.description`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

