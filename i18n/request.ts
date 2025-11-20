import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async (request) => {
  // 处理静态导出时 request 可能为 undefined、null 或格式不同的情况
  let locale: string = defaultLocale
  
  // 安全地检查 request 是否存在且包含 locale
  try {
    if (request != null && typeof request === 'object') {
      // 使用可选链和类型断言安全地访问 locale
      const requestLocale = (request as any)?.locale
      if (requestLocale && typeof requestLocale === 'string' && locales.includes(requestLocale as Locale)) {
        locale = requestLocale
      }
    }
  } catch (error) {
    // 如果解析失败，使用默认语言
    // 在静态导出时，这可能是正常的
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

