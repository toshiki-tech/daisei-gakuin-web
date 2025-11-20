import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // 处理静态导出时参数可能为 undefined 的情况
  let resolvedLocale: string = defaultLocale
  
  // 优先使用显式传入的 locale
  if (locale && locales.includes(locale as Locale)) {
    resolvedLocale = locale
  } else {
    // 否则从 requestLocale Promise 中获取
    try {
      const localeFromRequest = await requestLocale
      if (localeFromRequest && locales.includes(localeFromRequest as Locale)) {
        resolvedLocale = localeFromRequest
      }
    } catch (error) {
      // 如果获取失败，使用默认语言
      // 在静态导出时，这可能是正常的
    }
  }
  
  // Ensure that a valid locale is used
  if (!resolvedLocale || !locales.includes(resolvedLocale as Locale)) {
    resolvedLocale = defaultLocale
  }

  return {
    locale: resolvedLocale as string,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  }
})

