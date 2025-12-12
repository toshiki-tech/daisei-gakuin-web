import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, defaultLocale } from '@/i18n/config'
import type { Metadata } from 'next'
import LocaleHtml from '@/components/LocaleHtml'
import { generateSeoMetadata, getAbsoluteUrl } from '@/lib/seo'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params?: { locale?: string }
}): Promise<Metadata> {
  try {
    const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
    const t = await getTranslations({ locale, namespace: 'common' })

    const siteName = t('siteName') || '大成学院'
    const description = t('tagline') || '本格中国語学院'
    const currentPath = `/${locale}`
    const absoluteUrl = getAbsoluteUrl(currentPath)

    // 生成基础 metadata
    const baseMetadata: Metadata = {
      title: {
        default: siteName,
        template: `%s - ${siteName}`,
      },
      description,
      alternates: {
        languages: {
          ja: '/ja',
          zh: '/zh',
        },
        canonical: absoluteUrl,
      },
    }

    // 合并 SEO metadata（包含 OG 和 Twitter 标签）
    const seoMetadata = generateSeoMetadata({
      title: siteName,
      description,
      url: absoluteUrl,
      locale: locale === 'ja' ? 'ja_JP' : 'zh_CN',
    })

    // 合并 metadata，确保 title 和 description 不被覆盖
    return {
      ...baseMetadata,
      ...seoMetadata,
      // 确保 title 模板保留
      title: baseMetadata.title,
    }
  } catch (error) {
    console.error('Metadata error:', error)
    const fallbackUrl = getAbsoluteUrl(`/${defaultLocale}`)
    return {
      ...generateSeoMetadata({
        title: '大成学院',
        description: '本格中国語学院',
        url: fallbackUrl,
      }),
      title: '大成学院',
    }
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: { locale?: string }
}) {
  try {
    const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale

    // ミドルウェア側で locale を検証しているため、ここでは
    // 不正な locale の場合でも 404 シグナルをのみ込まないようにする

    // Safely get messages with error handling
    let messages
    try {
      messages = await getMessages({ locale })
    } catch (error) {
      // If getMessages fails, try to load messages directly
      console.error('getMessages error:', error)
      messages = (await import(`../../messages/${locale}.json`)).default
    }

    return (
      <NextIntlClientProvider messages={messages} locale={locale}>
        <LocaleHtml />
        {children}
      </NextIntlClientProvider>
    )
  } catch (error) {
    // Next.js の 404 シグナル (NEXT_NOT_FOUND) はキャッチしてはいけないので即座に再スローする
    if (
      error &&
      typeof error === 'object' &&
      'digest' in error &&
      (error as { digest?: string }).digest === 'NEXT_NOT_FOUND'
    ) {
      throw error
    }

    console.error('Layout error:', error)
    // Fallback to default locale
    const fallbackLocale = defaultLocale
    const fallbackMessages = (await import(`../../messages/${fallbackLocale}.json`)).default
    return (
      <NextIntlClientProvider messages={fallbackMessages} locale={fallbackLocale}>
        <LocaleHtml />
        {children}
      </NextIntlClientProvider>
    )
  }
}

