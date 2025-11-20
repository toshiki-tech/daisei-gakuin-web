import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@/i18n/config'

export default async function NotFound({ params }: { params?: { locale?: string } }) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const t = await getTranslations({ locale, namespace: 'common' })

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-ink mb-4">404</h2>
        <p className="text-xl text-ink/70 mb-6">
          {locale === 'ja' ? 'ページが見つかりません' : '页面未找到'}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          {locale === 'ja' ? 'ホームに戻る' : '返回首页'}
        </Link>
      </div>
    </div>
  )
}
	
