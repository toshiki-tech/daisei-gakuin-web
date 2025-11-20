'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { getAllCourseCategories } from '@/lib/content/courseStructure'

export default function Courses() {
  const t = useTranslations('courses')
  const locale = useLocale() as 'ja' | 'zh'
  
  // Get Chinese course category (main business) and its first 3 subcategories
  const allCategories = getAllCourseCategories()
  const mainBusiness = allCategories.find((cat) => cat.isMainBusiness)
  const displaySubcategories = mainBusiness?.subcategories.slice(0, 3) || []

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
          {t('title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {displaySubcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-ink/5"
            >
              <h3 className="text-xl font-bold text-ink mb-4 text-center">
                {subcategory.name[locale]}
              </h3>
              {subcategory.description && (
                <p className="text-sm text-ink/70 leading-relaxed mb-6 text-center min-h-[3.5rem]">
                  {subcategory.description[locale]}
                </p>
              )}
              <div className="flex flex-wrap gap-2 justify-center">
                {subcategory.deliveryMethods.map((method) => (
                  <span
                    key={method.id}
                    className="inline-block px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {method.name[locale]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href={`/${locale}/courses/index`}
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}


