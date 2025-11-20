import { getAllCourseCategories } from '@/lib/content/courseStructure'

export interface NavItem {
  id: string
  name: {
    ja: string
    zh: string
  }
  href: string
  children?: NavItem[]
}

export function getCourseNavigation(locale: 'ja' | 'zh'): NavItem[] {
  const categories = getAllCourseCategories()
  
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    href: `/courses/${category.id}`,
    children: category.subcategories.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.name,
      href: `/courses/${category.id}#${subcategory.id}`,
    })),
  }))
}

// 简化的导航结构（用于 Header）
export const courseNavItems = [
  {
    id: 'kids',
    name: { ja: '子供向け', zh: '儿童课程' },
    href: '/courses/kids',
  },
  {
    id: 'adults-chinese',
    name: { ja: '成人中国語', zh: '成人中文' },
    href: '/courses/adults-chinese',
  },
  {
    id: 'certification',
    name: { ja: '検定対策', zh: '考试对策' },
    href: '/courses/certification',
  },
  {
    id: 'japanese',
    name: { ja: '日本語', zh: '日语' },
    href: '/courses/japanese',
  },
  {
    id: 'english',
    name: { ja: '英語', zh: '英语' },
    href: '/courses/english',
  },
  {
    id: 'pricing',
    name: { ja: '料金', zh: '费用' },
    href: '/courses/pricing',
  },
]

