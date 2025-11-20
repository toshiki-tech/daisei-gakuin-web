'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Method() {
  const t = useTranslations('method')
  
  const pointKeys = ['literature', 'martial', 'emotion', 'output', 'timeline']

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div>
            <h2 id="method" className="text-3xl md:text-4xl font-bold text-ink mb-8 whitespace-pre-line">
              {t('title')}
            </h2>
            <ul className="space-y-4">
              {pointKeys.map((key, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <p className="text-lg text-ink/80 leading-relaxed flex-1">
                    {t(`points.${key}`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={`${basePath}/images/method/method-teaching.jpg`}
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
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

