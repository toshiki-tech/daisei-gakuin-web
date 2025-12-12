'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, localeNames, type Locale } from '@/i18n/config'

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop: Dropdown */}
      <div className="hidden md:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 lg:px-2.5 py-1.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors whitespace-nowrap flex items-center gap-1 text-xs lg:text-sm"
          aria-label="Select language"
        >
          <span>{localeNames[locale]}</span>
          <svg
            className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-ink/10 overflow-hidden z-[60]">
            {locales.map((loc) => {
              const href = `/${loc}${path}${hashFragment}`
              const isActive = locale === loc
              
              return (
                <Link
                  key={loc}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-1.5 text-sm font-medium transition-colors text-center ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-ink hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {localeNames[loc]}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Mobile: Original button style */}
      <div className="md:hidden flex items-center gap-1.5">
        {locales.map((loc) => {
          const href = `/${loc}${path}${hashFragment}`
          const isActive = locale === loc
          
          return (
            <Link
              key={loc}
              href={href}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
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
    </div>
  )
}

