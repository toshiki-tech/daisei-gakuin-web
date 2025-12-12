export interface CourseCategory {
  id: string
  name: {
    ja: string
    zh: string
  }
  description: {
    ja: string
    zh: string
  }
  icon?: string
  isMainBusiness?: boolean // 标记是否为主业务
  subcategories: CourseSubcategory[]
}

export interface CourseSubcategory {
  id: string
  name: {
    ja: string
    zh: string
  }
  description?: {
    ja: string
    zh: string
  }
  deliveryMethods: DeliveryMethod[]
}

export interface DeliveryMethod {
  id: string
  name: {
    ja: string
    zh: string
  }
  description?: {
    ja: string
    zh: string
  }
}

export const courseStructure: CourseCategory[] = [
  {
    id: 'chinese',
    name: {
      ja: '中国語',
      zh: '中文',
    },
    description: {
      ja: '大成学院の中国語教育。子供から大人、企業まで幅広く対応します。',
      zh: '大成学院的中文教育。从孩子到成人、企业，广泛对应。',
    },
    icon: '📚',
    isMainBusiness: true,
    subcategories: [
      {
        id: 'kids',
        name: {
          ja: '子供向け',
          zh: '面向儿童',
        },
        description: {
          ja: 'お子様の年齢やレベルに合わせた楽しい中国語レッスン。自然な発音と会話力を身につけます。YCT検定対策も対応しています。',
          zh: '根据孩子的年龄和水平量身定制的有趣中文课程。掌握自然的发音和会话能力。也对应YCT考试对策。',
        },
        deliveryMethods: [
          {
            id: 'school',
            name: {
              ja: '対面レッスン',
              zh: '通学课程',
            },
            description: {
              ja: '教室での対面レッスン。少人数制で一人ひとりに丁寧に指導します。',
              zh: '教室面对面课程。小班制，细致指导每个孩子。',
            },
          },
          {
            id: 'online',
            name: {
              ja: 'オンラインレッスン',
              zh: '在线课程',
            },
            description: {
              ja: '自宅から参加できるオンラインレッスン。時間を有効活用できます。',
              zh: '可以从家中参加的在线课程。有效利用时间。',
            },
          },
          {
            id: 'yct',
            name: {
              ja: 'YCT検定対策',
              zh: 'YCT考试对策',
            },
            description: {
              ja: 'YCT（青少年中国語検定）対策コース。お子様のレベルに合わせた効率的な学習で合格をサポートします。',
              zh: 'YCT（青少年中文考试）对策课程。根据孩子的水平提供高效学习，支持合格。',
            },
          },
        ],
      },
      {
        id: 'adults',
        name: {
          ja: '成人向け',
          zh: '面向成人',
        },
        description: {
          ja: '初心者から上級者まで、あなたの目標に合わせた実践的な中国語レッスン。ビジネスから日常会話まで幅広く対応します。HSK検定対策も充実しています。',
          zh: '从初学者到高级者，根据您的目标提供实用的中文课程。从商务到日常会话，广泛对应。HSK考试对策也很充实。',
        },
        deliveryMethods: [
          {
            id: 'school',
            name: {
              ja: '対面レッスン',
              zh: '通学课程',
            },
            description: {
              ja: '教室でのグループレッスンまたはマンツーマンレッスン。ネイティブ講師と直接対話できます。',
              zh: '教室的小组课程或一对一课程。可以与母语讲师直接对话。',
            },
          },
          {
            id: 'online',
            name: {
              ja: 'オンラインレッスン',
              zh: '在线课程',
            },
            description: {
              ja: 'どこからでも参加できるオンラインレッスン。忙しい方にも最適です。',
              zh: '可以从任何地方参加的在线课程。也适合忙碌的人。',
            },
          },
          {
            id: 'private',
            name: {
              ja: '個人レッスン',
              zh: '个人课程',
            },
            description: {
              ja: '完全オーダーメイドの個人レッスン。時間と場所を自由に選べます。',
              zh: '完全定制的个人课程。可以自由选择时间和地点。',
            },
          },
          {
            id: 'hsk',
            name: {
              ja: 'HSK検定対策',
              zh: 'HSK考试对策',
            },
            description: {
              ja: 'HSK（中国語検定）対策コース。過去問題を徹底分析し、効率的な学習方法で目標級合格をサポートします。',
              zh: 'HSK（中文考试）对策课程。彻底分析过去问题，通过高效的学习方法支持目标级别合格。',
            },
          },
        ],
      },
      {
        id: 'corporate',
        name: {
          ja: '企業・法人向け',
          zh: '面向企业・法人',
        },
        description: {
          ja: '企業のニーズに合わせた中国語研修プログラム。語学教師の出向や通訳・翻訳サービスを提供します。',
          zh: '根据企业需求的中文培训项目。提供语言教师派遣和口译・笔译服务。',
        },
        deliveryMethods: [
          {
            id: 'teacher-dispatch',
            name: {
              ja: '語学教師出向',
              zh: '语言教师派遣',
            },
            description: {
              ja: '企業に中国語講師を派遣し、社内研修を実施します。',
              zh: '向企业派遣中文讲师，实施内部培训。',
            },
          },
          {
            id: 'translation',
            name: {
              ja: '通訳・翻訳',
              zh: '口译・笔译',
            },
            description: {
              ja: 'ビジネスシーンでの通訳・翻訳サービスを提供します。',
              zh: '提供商务场景的口译・笔译服务。',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'japanese',
    name: {
      ja: '日本語',
      zh: '日语',
    },
    description: {
      ja: '中国語話者向けの日本語レッスン。ビジネス日本語から日常会話まで対応します。',
      zh: '面向中文使用者的日语课程。从商务日语到日常会话都能对应。',
    },
    icon: '🇯🇵',
    subcategories: [
      {
        id: 'school',
        name: {
          ja: '対面レッスン',
          zh: '通学课程',
        },
        description: {
          ja: '教室での対面レッスン。実践的な日本語力を身につけます。',
          zh: '教室面对面课程。掌握实用的日语能力。',
        },
        deliveryMethods: [
          {
            id: 'group',
            name: {
              ja: 'グループレッスン',
              zh: '小组课程',
            },
          },
          {
            id: 'private',
            name: {
              ja: 'マンツーマン',
              zh: '一对一课程',
            },
          },
        ],
      },
      {
        id: 'online',
        name: {
          ja: 'オンラインレッスン',
          zh: '在线课程',
        },
        description: {
          ja: 'オンラインでの日本語レッスン。時間と場所を選ばず学習できます。',
          zh: '在线日语课程。不受时间和地点限制学习。',
        },
        deliveryMethods: [
          {
            id: 'live',
            name: {
              ja: 'ライブレッスン',
              zh: '直播课程',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'english',
    name: {
      ja: '英語',
      zh: '英语',
    },
    description: {
      ja: '実践的な英語力を身につけるレッスン。ビジネス英語から日常会話まで幅広く対応します。',
      zh: '掌握实用英语能力的课程。从商务英语到日常会话，广泛对应。',
    },
    icon: '🇬🇧',
    subcategories: [
      {
        id: 'school',
        name: {
          ja: '対面レッスン',
          zh: '通学课程',
        },
        description: {
          ja: '教室での対面レッスン。ネイティブ講師と直接対話できます。',
          zh: '教室面对面课程。可以与母语讲师直接对话。',
        },
        deliveryMethods: [
          {
            id: 'group',
            name: {
              ja: 'グループレッスン',
              zh: '小组课程',
            },
          },
          {
            id: 'private',
            name: {
              ja: 'マンツーマン',
              zh: '一对一课程',
            },
          },
        ],
      },
      {
        id: 'online',
        name: {
          ja: 'オンラインレッスン',
          zh: '在线课程',
        },
        description: {
          ja: 'オンラインでの英語レッスン。忙しい方にも最適です。',
          zh: '在线英语课程。也适合忙碌的人。',
        },
        deliveryMethods: [
          {
            id: 'group-online',
            name: {
              ja: 'オンライングループ',
              zh: '在线小组',
            },
          },
          {
            id: 'private-online',
            name: {
              ja: 'オンラインマンツーマン',
              zh: '在线一对一',
            },
          },
        ],
      },
      {
        id: 'private-lesson',
        name: {
          ja: '個人レッスン',
          zh: '个人课程',
        },
        description: {
          ja: '完全オーダーメイドの個人レッスン。あなたの目標に合わせてカスタマイズします。',
          zh: '完全定制的个人课程。根据您的目标定制。',
        },
        deliveryMethods: [
          {
            id: 'flexible',
            name: {
              ja: 'フレキシブル',
              zh: '灵活安排',
            },
          },
        ],
      },
    ],
  },
]

// 料金分类单独处理
export const pricingCategories = [
  {
    id: 'kids-pricing',
    name: {
      ja: '子供料金',
      zh: '儿童费用',
    },
  },
  {
    id: 'group-pricing',
    name: {
      ja: 'グループ料金',
      zh: '小组费用',
    },
  },
  {
    id: 'private-pricing',
    name: {
      ja: '個人料金',
      zh: '个人费用',
    },
  },
]

export function getCourseCategoryById(id: string): CourseCategory | undefined {
  return courseStructure.find((category) => category.id === id)
}

export function getAllCourseCategories(): CourseCategory[] {
  return courseStructure
}
