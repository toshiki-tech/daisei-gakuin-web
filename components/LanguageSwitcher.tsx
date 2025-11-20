'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, localeNames } from '@/i18n/config'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  // Get path without locale prefix
  const getPathWithoutLocale = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    
    // Remove locale if it's the first segment
    if (pathSegments.length > 0 && locales.includes(pathSegments[0] as any)) {
      pathSegments.shift()
    }
    
    // Rebuild path
    const pathWithoutLocale = pathSegments.length > 0 
      ? '/' + pathSegments.join('/')
      : ''
    
    // Handle hash fragments (e.g., #method, #contact)
    const [path, hash] = pathWithoutLocale.split('#')
    return { path, hash }
  }

  const { path, hash } = getPathWithoutLocale()
  const hashFragment = hash ? `#${hash}` : ''

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => {
        const href = `/${loc}${path}${hashFragment}`
        const isActive = locale === loc
        
        return (
          <Link
            key={loc}
            href={href}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'text-ink hover:text-primary hover:bg-primary/10'
            }`}
          >
            {localeNames[loc]}
          </Link>
        )
      })}
    </div>
  )
}

