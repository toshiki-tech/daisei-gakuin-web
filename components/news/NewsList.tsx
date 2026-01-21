'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
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
              className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* 缩略图 */}
                {post.featuredImage ? (
                  <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                    <Image
                      src={post.featuredImage}
                      alt={post.title[locale]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </div>
                ) : (
                  <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-primary/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                )}
                
                {/* 内容区域 */}
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <time className="text-sm text-ink/60">
                      {new Date(post.publishedAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'zh-CN')}
                    </time>
                    {post.author && (
                      <span className="text-sm text-ink/60">{post.author}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-ink mb-2 line-clamp-2">
                    {post.title[locale]}
                  </h2>
                  {post.excerpt && (
                    <p className="text-base text-ink/70 leading-relaxed line-clamp-2">
                      {post.excerpt[locale]}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

