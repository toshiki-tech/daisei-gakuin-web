'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

export default function LocaleHtml() {
  const locale = useLocale()

  useEffect(() => {
    // 动态设置 html lang 属性
    document.documentElement.lang = locale
  }, [locale])

  return null
}

