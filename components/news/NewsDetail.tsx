'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { NewsPost } from '@/types/content'
import { urlFor } from '@/lib/sanity/client'

interface NewsDetailProps {
  post: NewsPost
  locale: 'ja' | 'zh'
}

// Portable Text 组件配置
const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null
      const imageUrl = urlFor(value).width(800).height(600).url()
      return (
        <div className="my-8">
          <img
            src={imageUrl}
            alt={value.alt || ''}
            className="w-full h-auto rounded-lg"
          />
          {value.caption && (
            <p className="text-sm text-ink/60 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    // 处理未知类型，避免警告
    unknownType: ({ value }: { value: any }) => {
      console.warn('Unknown PortableText type:', value?._type)
      return null
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-ink mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-ink mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-ink/70">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg text-ink/80 leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        className="text-primary hover:text-primary-dark underline"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-2">{children}</li>,
    number: ({ children }: any) => <li className="ml-2">{children}</li>,
  },
}

export default function NewsDetail({ post, locale }: NewsDetailProps) {
  const tNav = useTranslations('nav')
  const backLabel =
    locale === 'ja'
      ? `${tNav('news')}一覧`
      : `${tNav('news')}列表`

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors"
          >
            ← {backLabel}
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
                {(() => {
                  // 调试信息
                  if (process.env.NODE_ENV === 'development') {
                    console.log('Post content:', post.content)
                    console.log('Locale:', locale)
                    console.log('Content for locale:', post.content[locale])
                    console.log('Content length:', post.content[locale]?.length)
                  }
                  
                  const content = post.content[locale]
                  if (content && Array.isArray(content) && content.length > 0) {
                    return (
                      <PortableText
                        value={content}
                        components={portableTextComponents}
                        onMissingComponent={(message, options) => {
                          console.warn('PortableText missing component:', message, options)
                          return null
                        }}
                      />
                    )
                  }
                  return (
                    <div>
                      <p className="text-lg text-ink/80 leading-relaxed mb-4">
                        内容がありません。
                      </p>
                      {process.env.NODE_ENV === 'development' && (
                        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
                          {JSON.stringify(post.content, null, 2)}
                        </pre>
                      )}
                    </div>
                  )
                })()}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

