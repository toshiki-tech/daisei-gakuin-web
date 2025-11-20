import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'
import type { Metadata } from 'next'
import LocaleHtml from '@/components/LocaleHtml'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  try {
    const { locale } = await params
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
  params: Promise<{ locale: string }>
}) {
  try {
    const { locale } = await params

    if (!locale || !locales.includes(locale as any)) {
      notFound()
    }

    const messages = await getMessages({ locale })

    return (
      <NextIntlClientProvider messages={messages} locale={locale}>
        <LocaleHtml />
        {children}
      </NextIntlClientProvider>
    )
  } catch (error) {
    console.error('Layout error:', error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">エラーが発生しました</h1>
          <p className="text-gray-600">レイアウトの読み込み中にエラーが発生しました。</p>
          <pre className="mt-4 text-sm text-left">{String(error)}</pre>
        </div>
      </div>
    )
  }
}

