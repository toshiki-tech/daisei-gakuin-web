'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { NewsPost } from '@/types/content'

interface NewsDetailProps {
  post: NewsPost
  locale: 'ja' | 'zh'
}

export default function NewsDetail({ post, locale }: NewsDetailProps) {
  const currentLocale = useLocale()

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors"
          >
            ← お知らせ一覧
          </Link>

          <article className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-6 text-sm text-ink/60">
                <time>
                  {new Date(post.publishedAt).toLocaleDateString(
                    locale === 'ja' ? 'ja-JP' : 'zh-CN'
                  )}
                </time>
                {post.author && <span>{post.author}</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                {post.title[locale]}
              </h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-ink/80 leading-relaxed whitespace-pre-line">
                  {post.content[locale]}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

