export type Locale = 'ja' | 'zh'

export interface LocalizedString {
  ja: string
  zh: string
}

export interface Course {
  id: string
  slug: string
  name: LocalizedString
  description: LocalizedString
  image: string
  photo: string
  price?: LocalizedString
  duration?: LocalizedString
  level?: LocalizedString
  format?: LocalizedString // レッスン形式
  schedule?: LocalizedString // 通い方
  scheduleDetails?: LocalizedString // 詳細スケジュール（子供向けクラス用）
}

export interface NewsPost {
  id: string
  slug: string
  title: LocalizedString
  content: LocalizedString
  excerpt?: LocalizedString
  featuredImage?: string
  publishedAt: string
  updatedAt?: string
  author?: string
}

export interface FAQ {
  id: string
  question: LocalizedString
  answer: LocalizedString
}

export interface Testimonial {
  id: string
  name: string
  course: LocalizedString
  comment: LocalizedString
  avatar: string
}

