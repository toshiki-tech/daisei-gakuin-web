'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Method() {
  const t = useTranslations('method')
  const locale = useLocale()
  
  const pointKeys = ['literature', 'martial', 'emotion', 'output', 'timeline']

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start max-w-6xl mx-auto w-full">
          {/* Left Content */}
          <div className="flex flex-col min-w-0 w-full">
            <h2 id="method" className="text-3xl md:text-4xl font-bold text-ink mb-6 whitespace-pre-line leading-tight break-words">
              {t('title')}
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-6 break-words">
              {t('overview')}
            </p>
            <ul className="space-y-5 flex-1 min-w-0">
              {pointKeys.map((key, index) => (
                <li key={index} className="flex items-start gap-4 min-w-0">
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
                  <div className="flex-1 min-w-0">
                    <p className="text-lg text-ink/80 leading-normal font-medium break-words">
                      {t(`points.${key}`)}
                    </p>
                    <p className="text-base text-ink/60 leading-normal mt-1.5 break-words">
                      {t(`points.${key}Description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image with Description */}
          <div className="flex flex-col pt-20 lg:pt-28 min-w-0 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white mb-5 w-full max-w-full box-border" style={{ minHeight: '600px', aspectRatio: '1280/1378', width: '100%' }}>
              <Image
                src={`${basePath}/images/method/method-teaching.jpg`}
                alt={t('imageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            </div>
            <p className="text-sm md:text-base text-ink/70 leading-relaxed text-center px-4">
              {locale === 'ja' ? '文と武を融合した多彩な活動' : '文武结合的丰富多彩活动'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Oriental Pattern Illustration
function OrientalPatternIllustration() {
  return (
    <div className="relative w-full h-96">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brush stroke patterns */}
        <path
          d="M50 100 Q150 50 250 100 T400 150"
          stroke="#BB3A2E"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M50 250 Q150 200 250 250 T400 300"
          stroke="#CE3B32"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
        {/* Abstract sword/brush shape */}
        <line
          x1="200"
          y1="50"
          x2="200"
          y2="350"
          stroke="#1A1A1A"
          strokeWidth="3"
          opacity="0.2"
        />
        <path
          d="M180 50 L200 30 L220 50"
          stroke="#1A1A1A"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        {/* Decorative elements */}
        <circle cx="100" cy="150" r="25" fill="#BB3A2E" opacity="0.15" />
        <circle cx="300" cy="250" r="20" fill="#CE3B32" opacity="0.15" />
        {/* Ink splashes */}
        <ellipse cx="150" cy="200" rx="30" ry="20" fill="#1A1A1A" opacity="0.1" />
        <ellipse cx="250" cy="180" rx="25" ry="15" fill="#BB3A2E" opacity="0.1" />
      </svg>
    </div>
  )
}

