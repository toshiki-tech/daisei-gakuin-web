import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async ({ requestLocale }) => {
  // For static export, requestLocale should come from the route params
  // If it's not available, we'll use the default locale
  let locale = await requestLocale
  
  // If locale is not provided (e.g., during static generation), use default
  if (!locale) {
    locale = defaultLocale
  }
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    // During static export, don't call notFound(), just use default locale
    locale = defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})

