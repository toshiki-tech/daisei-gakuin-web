'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getAllFAQs } from '@/lib/content/faq'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const t = useTranslations('faq')
  const locale = useLocale() as 'ja' | 'zh'
  const faqs = getAllFAQs()

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
          {t('title')}
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="border border-ink/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between bg-background hover:bg-background/80 transition-colors"
                  >
                    <span className="font-semibold text-lg text-ink pr-8">
                      {faq.question[locale]}
                    </span>
                    <svg
                      className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-5 bg-white border-t border-ink/10">
                      <p className="text-base text-ink/70 leading-relaxed">
                        {faq.answer[locale]}
                      </p>
                    </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

