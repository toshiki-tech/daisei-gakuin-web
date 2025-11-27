import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, defaultLocale } from '@/i18n/config'
import type { Metadata } from 'next'
import LocaleHtml from '@/components/LocaleHtml'

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

    return {
      title: {
        default: t('siteName') || '大成学院',
        template: `%s - ${t('siteName') || '大成学院'}`,
      },
      description: t('tagline') || '日本人のための本格中国語教室',
      alternates: {
        languages: {
          ja: '/ja',
          zh: '/zh',
        },
      },
    }
  } catch (error) {
    console.error('Metadata error:', error)
    return {
      title: '大成学院',
      description: '日本人のための本格中国語教室',
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
      // @ts-expect-error: digest は Next.js が内部的に付与するプロパティ
      error.digest === 'NEXT_NOT_FOUND'
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

