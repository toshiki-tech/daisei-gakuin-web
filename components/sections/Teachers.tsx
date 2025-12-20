'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

type TeachersProps = {
  showHeader?: boolean
  showMoreLink?: boolean
  compact?: boolean // 紧凑模式：用于About页面，只显示每个分类的第一位讲师
}

export default function Teachers({ showHeader = true, showMoreLink = true, compact = false }: TeachersProps) {
  const t = useTranslations('teachers')
  const locale = useLocale()

  const categories = ['chinese', 'japanese', 'english'] as const

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              {t('title')}
            </h2>
            <p className="text-base md:text-lg text-ink/70">
              {t('subtitle')}
            </p>
          </div>
        )}

        {compact ? (
          // 紧凑模式：所有讲师一行展示，使用小头像
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryData = t.raw(`categories.${category}`) as {
                title: string
                items: Array<{
                  name: string
                  role: string
                  bio: string
                  image?: string
                  gender?: 'male' | 'female'
                }>
              }

              if (!categoryData || !categoryData.items || categoryData.items.length === 0) return null

              const teacher = categoryData.items[0]
              return (
                <div
                  key={category}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
                >
                  <div className="flex flex-col gap-2 flex-1 w-full">
                    <div>
                      <div className="text-xs text-primary font-semibold mb-1">
                        {teacher.role}
                      </div>
                      <div className="text-lg font-semibold text-ink">
                        {teacher.name}
                      </div>
                    </div>
                    <p className="text-sm text-ink/70 leading-relaxed">
                      {teacher.bio}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // 完整模式：按分类展示，使用小头像
          <div className="space-y-16">
            {categories.map((category) => {
              const categoryData = t.raw(`categories.${category}`) as {
                title: string
                items: Array<{
                  name: string
                  role: string
                  bio: string
                  image?: string
                  gender?: 'male' | 'female'
                }>
              }

              if (!categoryData || !categoryData.items) return null

              return (
                <div key={category} className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-ink border-b-2 border-primary/20 pb-3">
                    {categoryData.title}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryData.items.map((teacher, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
                      >
                        <div className="flex flex-col gap-2 flex-1 w-full">
                          <div>
                            <div className="text-xs text-primary font-semibold mb-1">
                              {teacher.role}
                            </div>
                            <div className="text-lg font-semibold text-ink">
                              {teacher.name}
                            </div>
                          </div>
                          <p className="text-sm text-ink/70 leading-relaxed">
                            {teacher.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {showMoreLink && (
          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/teachers`}
              className="inline-flex items-center justify-center px-6 py-3 text-primary font-semibold hover:text-primary-dark hover:underline"
            >
              {t('moreLink')}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
