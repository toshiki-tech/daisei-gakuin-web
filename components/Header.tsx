'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Logo variant="header" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className="text-base font-medium text-ink hover:text-primary transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/news`}
              className="text-base font-medium text-ink hover:text-primary transition-colors"
            >
              {t('news')}
            </Link>
            <Link
              href={`/${locale}/courses/index`}
              className="text-base font-medium text-ink hover:text-primary transition-colors"
            >
              {t('courses')}
            </Link>
            <Link
              href={`/${locale}/method`}
              className="text-base font-medium text-ink hover:text-primary transition-colors"
            >
              {t('method')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-base font-medium text-ink hover:text-primary transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              {t('freeTrial')}
            </Link>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t('menu')}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 border-t border-ink/10 mt-4">
            <nav className="flex flex-col gap-4 pt-4">
              <Link
                href={`/${locale}`}
                className="text-base font-medium text-ink hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                href={`/${locale}/news`}
                className="text-base font-medium text-ink hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('news')}
              </Link>
              <Link
                href={`/${locale}/courses`}
                className="text-base font-medium text-ink hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('courses')}
              </Link>
              <Link
                href={`/${locale}/method`}
                className="text-base font-medium text-ink hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('method')}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-base font-medium text-ink hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about')}
              </Link>
              <Link
                href={`/${locale}#contact`}
                className="px-6 py-2 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary-dark transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('freeTrial')}
              </Link>
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

