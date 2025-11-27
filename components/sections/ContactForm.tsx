'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

interface ContactFormProps {
  onBack: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  privacy_agreed: boolean
}

export default function ContactForm({ onBack }: ContactFormProps) {
  const t = useTranslations('contactModal')
  const locale = useLocale()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy_agreed: false,
  })

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = t('fields.nameRequired')
    }
    if (!formData.email.trim()) {
      newErrors.email = t('fields.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('fields.emailInvalid')
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('fields.phoneRequired')
    }
    if (!formData.message.trim()) {
      newErrors.message = t('fields.messageRequired')
    }
    if (!formData.privacy_agreed) {
      newErrors.privacy_agreed = t('fields.privacyAgreedRequired')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      // 准备提交数据
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        privacy_agreed: formData.privacy_agreed,
        locale: locale,
      }

      console.log('Submitting payload to /api/contact:', payload)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        let errorBody: any = null
        try {
          errorBody = await response.json()
        } catch {
          // ignore JSON parse error
        }
        console.error('API error:', response.status, errorBody)
        throw new Error(errorBody?.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('API success:', result)

      setSubmitStatus('success')
      setTimeout(() => {
        onBack()
        setSubmitStatus('idle')
        setFormData({ name: '', email: '', phone: '', message: '', privacy_agreed: false })
      }, 2000)
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-ink mb-2">{t('successTitle')}</h3>
          <p className="text-ink/70 mb-6">{t('successMessage')}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            {t('back')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-ink/60 hover:text-ink transition-colors mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('back')}
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">
          {t('title')}
        </h2>
        <p className="text-base text-ink/60">
          {t('subtitle')}
        </p>
      </div>

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-red-600">{t('errorMessage')}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            {t('fields.name')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500' : 'border-ink/20'
            }`}
            placeholder={t('fields.namePlaceholder')}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            {t('fields.email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? 'border-red-500' : 'border-ink/20'
            }`}
            placeholder={t('fields.emailPlaceholder')}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            {t('fields.phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.phone ? 'border-red-500' : 'border-ink/20'
            }`}
            placeholder={t('fields.phonePlaceholder')}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            {t('fields.message')} <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
              errors.message ? 'border-red-500' : 'border-ink/20'
            }`}
            placeholder={t('fields.messagePlaceholder')}
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>

        {/* 个人信息处理同意 */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacy_agreed}
              onChange={(e) => setFormData({ ...formData, privacy_agreed: e.target.checked })}
              className={`mt-1 w-4 h-4 text-primary border-ink/20 rounded focus:ring-primary ${
                errors.privacy_agreed ? 'border-red-500' : ''
              }`}
              required
            />
            <span className={`text-sm text-ink/80 ${errors.privacy_agreed ? 'text-red-600' : ''}`}>
              {t('fields.privacyAgreed')} <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.privacy_agreed && (
            <p className="mt-1 text-sm text-red-500">{errors.privacy_agreed}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-ink/20 text-ink rounded-lg font-semibold hover:bg-ink/5 transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

