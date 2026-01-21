'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import type { NewsPost } from '@/types/content'

interface HomeNewsSectionClientProps {
  news: NewsPost[]
}

export default function HomeNewsSectionClient({
  news,
}: HomeNewsSectionClientProps) {
  const locale = useLocale() as 'ja' | 'zh'

  if (!news.length) return null

  const sectionTitle = locale === 'ja' ? '活動・ニュース' : '活动与新闻'
  const seeAllLabel = locale === 'ja' ? 'もっと見る' : '查看全部'

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题居中 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ink">
            {sectionTitle}
          </h2>
        </div>

        {/* 新闻卡片列表：三条时居中展示，卡片相对紧凑 */}
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {news.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/news/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* 缩略图 */}
              {post.featuredImage ? (
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title[locale]}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="relative w-full h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-primary/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}

              {/* 文本内容 */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3 text-xs text-ink/60">
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString(
                      locale === 'ja' ? 'ja-JP' : 'zh-CN',
                    )}
                  </time>
                  {post.author && (
                    <span className="truncate max-w-[8rem]">
                      {post.author}
                    </span>
                  )}
                </div>

                <h3 className="text-base md:text-lg font-semibold text-ink mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title[locale]}
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-ink/70 leading-relaxed line-clamp-2">
                    {post.excerpt[locale]}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* 查看全部：放在列表下方，整体居中 */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/news`}
            className="text-primary hover:text-primary-dark text-sm font-semibold inline-flex items-center gap-1 transition-colors"
          >
            {seeAllLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

