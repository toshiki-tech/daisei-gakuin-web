'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { supabase } from '@/lib/supabase'

interface FormData {
  name: string
  email: string
  phone: string
  preferred_time_1: string
  preferred_time_2: string
  interested_courses: string[]
  chinese_experience: boolean | null
  learning_period: string
  visited_china: boolean | null
  china_visit_count: string
  learning_purpose: string
  privacy_agreed: boolean
}

export default function FreeTrialForm() {
  const t = useTranslations('freeTrialForm')
  const locale = useLocale()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    preferred_time_1: '',
    preferred_time_2: '',
    interested_courses: [],
    chinese_experience: null,
    learning_period: '',
    visited_china: null,
    china_visit_count: '',
    learning_purpose: '',
    privacy_agreed: false,
  })

  // 根据营业时间生成时间选项
  const getTimeSlots = () => {
    const slots = []
    // 平日和周六都有的时间：10:00-18:00
    for (let hour = 10; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
    }
    // 只有平日有的时间：19:00-21:00
    for (let hour = 19; hour <= 21; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
    }
    return slots
  }

  const timeSlots = getTimeSlots()

  // 判断是否选择了中文相关课程
  const chineseRelatedCourses = ['chineseKids', 'chineseAdults', 'chineseCorporate', 'hsk', 'yct', 'businessChinese']
  const hasChineseRelatedCourse = formData.interested_courses.some(course => 
    chineseRelatedCourses.includes(course)
  )

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('fields.nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('fields.emailRequired')
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = t('fields.emailInvalid')
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('fields.phoneRequired')
    }

    if (!formData.preferred_time_1 && !formData.preferred_time_2) {
      newErrors.preferred_time = t('fields.preferredTimeRequired')
    }

    if (!formData.privacy_agreed) {
      newErrors.privacy_agreed = t('fields.privacyAgreedRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // 准备提交数据
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        preferred_time_1: formData.preferred_time_1 || null,
        preferred_time_2: formData.preferred_time_2 || null,
        interested_courses: formData.interested_courses.length > 0 ? formData.interested_courses : null,
        chinese_experience: formData.chinese_experience ?? null,
        learning_period: formData.learning_period || null,
        visited_china: formData.visited_china ?? null,
        china_visit_count: formData.china_visit_count || null,
        learning_purpose: formData.learning_purpose || null,
        privacy_agreed: formData.privacy_agreed,
        status: 'pending',
      }

      console.log('Submitting payload to Supabase:', payload)

      const { data, error } = await supabase
        .from('dcxy_free_trial_applications')
        .insert([payload])

      if (error) {
        console.error('Supabase insert error:', error)
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      console.log('Supabase insert result:', data)

      // 提交成功
      setSubmitStatus('success')
      // 重置表单
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferred_time_1: '',
        preferred_time_2: '',
        interested_courses: [],
        chinese_experience: null,
        learning_period: '',
        visited_china: null,
        china_visit_count: '',
        learning_purpose: '',
        privacy_agreed: false,
      })
      setErrors({})
      // 滚动到顶部显示成功消息
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCourseChange = (course: string) => {
    setFormData((prev) => {
      const newCourses = prev.interested_courses.includes(course)
        ? prev.interested_courses.filter((c) => c !== course)
        : [...prev.interested_courses, course]
      
      // 检查是否还有中文相关课程
      const stillHasChineseCourse = newCourses.some(c => 
        chineseRelatedCourses.includes(c)
      )
      
      // 如果没有中文相关课程了，重置相关字段
      if (!stillHasChineseCourse) {
        return {
          ...prev,
          interested_courses: newCourses,
          chinese_experience: null,
          learning_period: '',
          visited_china: null,
          china_visit_count: '',
        }
      }
      
      return {
        ...prev,
        interested_courses: newCourses,
      }
    })
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="text-center">
          <div className="inline-block w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-ink mb-4">{t('successTitle')}</h3>
          <p className="text-lg text-ink/70 mb-6">{t('successMessage')}</p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            {locale === 'ja' ? '新しい申請を送信' : '提交新申请'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">{t('title')}</h2>
        <p className="text-base md:text-lg text-ink/70 leading-relaxed">{t('subtitle')}</p>
      </div>

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">{t('errorTitle')}</h3>
          <p className="text-red-700">{t('errorMessage')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 姓名 */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink mb-2">
            {t('fields.name')} <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500' : 'border-ink/20'
            }`}
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* 邮箱 */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">
            {t('fields.email')} <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? 'border-red-500' : 'border-ink/20'
            }`}
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* 电话 */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-ink mb-2">
            {t('fields.phone')} <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.phone ? 'border-red-500' : 'border-ink/20'
            }`}
            required
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        {/* 希望时间 */}
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            {t('fields.preferredTime')} <span className="text-primary">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferred_time_1" className="block text-xs text-ink/70 mb-2">
                {t('fields.preferredTime1')}
              </label>
              <select
                id="preferred_time_1"
                value={formData.preferred_time_1}
                onChange={(e) => setFormData({ ...formData, preferred_time_1: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.preferred_time ? 'border-red-500' : 'border-ink/20'
                }`}
              >
                <option value="">{locale === 'ja' ? '選択してください' : '请选择'}</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="preferred_time_2" className="block text-xs text-ink/70 mb-2">
                {t('fields.preferredTime2')}
              </label>
              <select
                id="preferred_time_2"
                value={formData.preferred_time_2}
                onChange={(e) => setFormData({ ...formData, preferred_time_2: e.target.value })}
                className="w-full px-4 py-3 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">{locale === 'ja' ? '選択してください' : '请选择'}</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.preferred_time && (
            <p className="mt-1 text-sm text-red-600">{errors.preferred_time}</p>
          )}
          <p className="mt-2 text-xs text-ink/60">{t('hoursNote')}</p>
          <p className="text-xs text-ink/60">{t('hoursNoteSub')}</p>
        </div>

        {/* 考虑的课程 */}
        <div>
          <label className="block text-sm font-semibold text-ink mb-3">
            {t('fields.interestedCourses')}
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'chineseKids',
              'chineseAdults',
              'chineseCorporate',
              'hsk',
              'yct',
              'businessChinese',
              'japanese',
              'english',
              'groupLesson',
              'privateLesson',
              'onlineLesson',
            ].map((key) => (
              <label key={key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.interested_courses.includes(key)}
                  onChange={() => handleCourseChange(key)}
                  className="w-4 h-4 text-primary border-ink/20 rounded focus:ring-primary"
                />
                <span className="text-sm text-ink/80">{t(`courseOptions.${key}`)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 中文学习经历 - 仅在选择中文相关课程时显示 */}
        {hasChineseRelatedCourse && (
          <>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                {t('fields.chineseExperience')}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="chinese_experience"
                    checked={formData.chinese_experience === true}
                    onChange={() => setFormData({ ...formData, chinese_experience: true })}
                    className="w-4 h-4 text-primary border-ink/20 focus:ring-primary"
                  />
                  <span className="text-sm text-ink/80">{t('fields.chineseExperienceYes')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="chinese_experience"
                    checked={formData.chinese_experience === false}
                    onChange={() => setFormData({ ...formData, chinese_experience: false })}
                    className="w-4 h-4 text-primary border-ink/20 focus:ring-primary"
                  />
                  <span className="text-sm text-ink/80">{t('fields.chineseExperienceNo')}</span>
                </label>
              </div>
            </div>

            {/* 学习期间 */}
            {formData.chinese_experience === true && (
              <div>
                <label htmlFor="learning_period" className="block text-sm font-semibold text-ink mb-2">
                  {t('fields.learningPeriod')}
                </label>
                <select
                  id="learning_period"
                  value={formData.learning_period}
                  onChange={(e) => setFormData({ ...formData, learning_period: e.target.value })}
                  className="w-full px-4 py-3 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">{locale === 'ja' ? '選択してください' : '请选择'}</option>
                  <option value="none">{t('fields.learningPeriodNone')}</option>
                  <option value="3months">{t('fields.learningPeriod3Months')}</option>
                  <option value="6months">{t('fields.learningPeriod6Months')}</option>
                  <option value="1year">{t('fields.learningPeriod1Year')}</option>
                  <option value="2years">{t('fields.learningPeriod2Years')}</option>
                  <option value="3years">{t('fields.learningPeriod3Years')}</option>
                </select>
              </div>
            )}

            {/* 是否去过中国 - 仅在选择中文相关课程时显示 */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                {t('fields.visitedChina')}
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visited_china"
                    checked={formData.visited_china === true}
                    onChange={() => setFormData({ ...formData, visited_china: true })}
                    className="w-4 h-4 text-primary border-ink/20 focus:ring-primary"
                  />
                  <span className="text-sm text-ink/80">{t('fields.visitedChinaYes')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visited_china"
                    checked={formData.visited_china === false}
                    onChange={() => setFormData({ ...formData, visited_china: false })}
                    className="w-4 h-4 text-primary border-ink/20 focus:ring-primary"
                  />
                  <span className="text-sm text-ink/80">{t('fields.visitedChinaNo')}</span>
                </label>
              </div>
              {formData.visited_china === true && (
                <select
                  value={formData.china_visit_count}
                  onChange={(e) => setFormData({ ...formData, china_visit_count: e.target.value })}
                  className="w-full px-4 py-3 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">{locale === 'ja' ? '選択してください' : '请选择'}</option>
                  <option value="none">{t('fields.chinaVisitCountNone')}</option>
                  <option value="1">{t('fields.chinaVisitCount1')}</option>
                  <option value="2">{t('fields.chinaVisitCount2')}</option>
                  <option value="3">{t('fields.chinaVisitCount3')}</option>
                  <option value="4">{t('fields.chinaVisitCount4')}</option>
                  <option value="5+">{t('fields.chinaVisitCount5')}</option>
                </select>
              )}
            </div>
          </>
        )}

        {/* 学习目的 */}
        <div>
          <label htmlFor="learning_purpose" className="block text-sm font-semibold text-ink mb-2">
            {t('fields.learningPurpose')}
          </label>
          <textarea
            id="learning_purpose"
            value={formData.learning_purpose}
            onChange={(e) => setFormData({ ...formData, learning_purpose: e.target.value })}
            rows={4}
            placeholder={t('fields.learningPurposePlaceholder')}
            className="w-full px-4 py-3 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* 隐私同意 */}
        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
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
              {t('fields.privacyAgreed')} <span className="text-primary">*</span>
            </span>
          </label>
          {errors.privacy_agreed && (
            <p className="mt-1 text-sm text-red-600">{errors.privacy_agreed}</p>
          )}
        </div>

        {/* 提交按钮 */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? t('submitting') : t('submitButton')}
          </button>
        </div>
      </form>
    </div>
  )
}

