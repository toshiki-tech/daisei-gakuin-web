'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Course } from '@/types/content'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface CourseDetailProps {
  course: Course
  locale: 'ja' | 'zh'
}

export default function CourseDetail({ course, locale }: CourseDetailProps) {
  const t = useTranslations('courses')

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors"
          >
            ← {t('viewAll')}
          </Link>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-64 md:h-96">
              <Image
                src={`${basePath}${course.photo}`}
                alt={course.name[locale]}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                {course.name[locale]}
              </h1>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg text-ink/80 leading-relaxed">
                  {course.description[locale]}
                </p>
              </div>
              {course.level && (
                <div className="mb-6">
                  <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    {course.level[locale]}
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}#contact`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors"
                >
                  {t('viewDetails')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

