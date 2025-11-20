import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async (request) => {
  // 处理静态导出时 request 可能为 undefined、null 或格式不同的情况
  let locale: string = defaultLocale
  
  try {
    // 检查 request 是否存在且为对象
    if (request != null && typeof request === 'object') {
      // 尝试从 request 中获取 locale
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

