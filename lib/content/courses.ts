import { Course } from '@/types/content'

export const courses: Course[] = [
  {
    id: 'group',
    slug: 'group',
    name: {
      ja: 'グループレッスン（少人数制 最大3名）',
      zh: '小组课程（小班制 最多3人）',
    },
    description: {
      ja: '少人数グループでのレッスン。固定制（月4回）で無理なく続けられます。',
      zh: '小班小组课程。固定制（每月4次），轻松持续学习。',
    },
    image: 'group',
    photo: '/images/courses/beginner.jpg',
    format: {
      ja: '少人数グループ',
      zh: '小班小组',
    },
    schedule: {
      ja: '固定制（月4回）',
      zh: '固定制（每月4次）',
    },
    price: {
      ja: '月額 10,000 円（税込 11,000 円）〜',
      zh: '月费 10,000 日元（含税 11,000 日元）起',
    },
  },
  {
    id: 'private',
    slug: 'private',
    name: {
      ja: 'マンツーマンレッスン',
      zh: '一对一课程',
    },
    description: {
      ja: '完全マンツーマンのレッスン。固定制（月4回）で一人ひとりのペースに合わせて学習できます。',
      zh: '完全一对一的课程。固定制（每月4次），可以根据每个人的节奏学习。',
    },
    image: 'private',
    photo: '/images/courses/private.jpg',
    format: {
      ja: 'マンツーマン',
      zh: '一对一',
    },
    schedule: {
      ja: '固定制（月4回）',
      zh: '固定制（每月4次）',
    },
    price: {
      ja: '月額 22,000 円（税込 24,200 円）〜',
      zh: '月费 22,000 日元（含税 24,200 日元）起',
    },
  },
  {
    id: 'kids',
    slug: 'kids',
    name: {
      ja: '子供向けクラス',
      zh: '儿童课程',
    },
    description: {
      ja: 'お子様向けの中国語レッスン。通学クラスとオンラインクラスから選べます。',
      zh: '面向儿童的中文课程。可选择通学课程和在线课程。',
    },
    image: 'kids',
    photo: '/images/courses/beginner.jpg',
    scheduleDetails: {
      ja: '通学クラス：平日 / 土曜日 / 日曜日\nオンライン：平日 / 夜',
      zh: '通学课程：平日 / 周六 / 周日\n在线课程：平日 / 晚上',
    },
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

export function getAllCourses(): Course[] {
  return courses
}

