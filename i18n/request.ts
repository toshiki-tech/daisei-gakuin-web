import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async (request: any) => {
  // 处理静态导出时 request 可能为 undefined、null 或格式不同的情况
  let locale: string = defaultLocale
  
  // 安全地检查 request 是否存在且包含 locale
  // 在静态导出时，request 可能是 undefined 或格式不同
  if (request && typeof request === 'object' && request.locale) {
    const requestLocale = request.locale
    if (typeof requestLocale === 'string' && locales.includes(requestLocale as Locale)) {
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

