import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async (request?: { locale?: string }) => {
  // 处理静态导出时 request 可能为 undefined、null 或格式不同的情况
  let locale: string = defaultLocale
  
  // 检查 request 是否存在且包含 locale
  if (request && typeof request === 'object' && 'locale' in request) {
    const requestLocale = request.locale
    if (requestLocale && typeof requestLocale === 'string' && locales.includes(requestLocale as Locale)) {
      locale = requestLocale
    }
  }
  
  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})

