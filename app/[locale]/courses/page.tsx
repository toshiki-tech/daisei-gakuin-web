import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n/config'

export default async function CoursesPage({ params }: { params?: { locale?: string } }) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  // Redirect to courses index page
  redirect(`/${locale}/courses/index`)
}

