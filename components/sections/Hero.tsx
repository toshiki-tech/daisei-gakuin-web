'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${basePath}/images/hero/image-fan.png`}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-white/90" />
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-20 right-10 w-96 h-96 opacity-5">
          <BrushSwordIllustration />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="max-w-4xl">
          {/* Content */}
          <div className="space-y-8">

            {/* Headings */}
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight">
              {t('title')}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-ink/80 leading-relaxed">
              {t('subtitle')}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-ink/70 leading-relaxed max-w-xl">
              {t('description')}
              <br />
              <span className="text-base text-ink/60">
                {t('descriptionSub')}
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
              >
                {t('ctaPrimary')}
              </Link>
              <Link
                href={`/${locale}/courses`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-colors bg-white/80 backdrop-blur-sm"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Brush + Sword Abstract Illustration Component
function BrushSwordIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brush stroke */}
      <path
        d="M50 200 Q150 100 250 150 T400 200"
        stroke="#BB3A2E"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Sword abstract */}
      <line
        x1="200"
        y1="50"
        x2="200"
        y2="350"
        stroke="#1A1A1A"
        strokeWidth="4"
        opacity="0.3"
      />
      <path
        d="M180 50 L200 30 L220 50"
        stroke="#1A1A1A"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />
      {/* Decorative circles */}
      <circle cx="100" cy="150" r="20" fill="#BB3A2E" opacity="0.2" />
      <circle cx="300" cy="250" r="15" fill="#CE3B32" opacity="0.2" />
    </svg>
  )
}

