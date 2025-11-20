'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { NewsPost } from '@/types/content'

interface NewsListProps {
  news: NewsPost[]
  locale: 'ja' | 'zh'
}

export default function NewsList({ news, locale }: NewsListProps) {
  const t = useTranslations('common')

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
          お知らせ
        </h1>
        <div className="max-w-4xl mx-auto space-y-6">
          {news.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/news/${post.slug}`}
              className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <time className="text-sm text-ink/60">
                    {new Date(post.publishedAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'zh-CN')}
                  </time>
                  {post.author && (
                    <span className="text-sm text-ink/60">{post.author}</span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-ink mb-2">
                  {post.title[locale]}
                </h2>
                {post.excerpt && (
                  <p className="text-base text-ink/70 leading-relaxed">
                    {post.excerpt[locale]}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

