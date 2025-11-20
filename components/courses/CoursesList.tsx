'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Course } from '@/types/content'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface CoursesListProps {
  courses: Course[]
  locale: 'ja' | 'zh'
}

export default function CoursesList({ courses, locale }: CoursesListProps) {
  const t = useTranslations('courses')

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
          {t('title')}
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`${basePath}${course.photo}`}
                  alt={course.name[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ink mb-3">
                  {course.name[locale]}
                </h3>
                <p className="text-base text-ink/70 leading-relaxed mb-4 line-clamp-3">
                  {course.description[locale]}
                </p>
                <Link
                  href={`/${locale}/courses/${course.slug}`}
                  className="inline-block text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  {t('viewDetails')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

