import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // For static export, prefer explicit locale parameter if provided
  let resolvedLocale: string = defaultLocale
  
  // If explicit locale is provided, use it
  if (locale && locales.includes(locale as Locale)) {
    resolvedLocale = locale
  } else {
    // Otherwise, try to get from requestLocale
    try {
      const localeFromRequest = await requestLocale
      if (localeFromRequest && locales.includes(localeFromRequest as Locale)) {
        resolvedLocale = localeFromRequest
      }
    } catch (error) {
      // During static export, requestLocale might fail if it tries to access headers
      // In this case, we'll use the default locale
      // The actual locale will be determined from the route params during static generation
      resolvedLocale = defaultLocale
    }
  }
  
  // Ensure that a valid locale is used
  if (!resolvedLocale || !locales.includes(resolvedLocale as Locale)) {
    resolvedLocale = defaultLocale
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  }
})

