import { getAbsoluteUrl } from '@/lib/seo'

/**
 * 生成 Organization 结构化数据
 */
export function generateOrganizationSchema(locale: 'ja' | 'zh') {
  const siteUrl = getAbsoluteUrl('')
  
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: locale === 'ja' ? '大成学院' : '大成学院',
    alternateName: 'Daisei Gakuin',
    url: siteUrl,
    logo: getAbsoluteUrl('/images/logo/logo.png'),
    description: locale === 'ja' 
      ? '本格中国語学院。子供から大人、企業まで幅広く対応する中国語教室。'
      : '专业中文学院。从孩子到成人、企业，广泛对应的中文教室。',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: '東京都',
      addressLocality: '中野区',
      streetAddress: '中野区中央3-34-3 メイヒル新中野201',
      postalCode: '164-0011',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-3-5328-5626',
      contactType: 'customer service',
      areaServed: 'JP',
      availableLanguage: ['Japanese', 'Chinese'],
    },
    sameAs: [
      // 如果有社交媒体链接，可以添加 here
    ],
  }
}

/**
 * 生成 LocalBusiness 结构化数据（用于 Google Business Profile）
 */
export function generateLocalBusinessSchema(locale: 'ja' | 'zh') {
  const siteUrl = getAbsoluteUrl('')
  
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteUrl}#organization`,
    name: locale === 'ja' ? '大成学院' : '大成学院',
    image: getAbsoluteUrl('/images/logo/logo.png'),
    url: siteUrl,
    telephone: '+81-3-5328-5626',
    email: 'iken_kai@yahoo.co.jp',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: '東京都',
      addressLocality: '中野区',
      streetAddress: '中野区中央3-34-3 メイヒル新中野201',
      postalCode: '164-0011',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.6906, // 需要根据实际位置更新
      longitude: 139.6656, // 需要根据实际位置更新
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    priceRange: '¥',
    servesCuisine: undefined, // 教育机构不需要
    areaServed: {
      '@type': 'City',
      name: 'Tokyo',
    },
  }
}

/**
 * 生成 Course 结构化数据
 */
export function generateCourseSchema(
  courseName: string,
  description: string,
  provider: string,
  locale: 'ja' | 'zh'
) {
  const siteUrl = getAbsoluteUrl('')
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description,
    provider: {
      '@type': 'EducationalOrganization',
      name: provider,
      url: siteUrl,
    },
    inLanguage: locale === 'ja' ? 'ja' : 'zh',
    courseCode: undefined,
    educationalLevel: 'All',
  }
}

/**
 * 生成 FAQPage 结构化数据
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * 生成 BreadcrumbList 结构化数据
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * 生成 Article 结构化数据（用于新闻文章）
 */
export function generateArticleSchema(
  headline: string,
  description: string,
  imageUrl: string,
  publishedDate: string,
  modifiedDate?: string,
  author?: string,
  locale: 'ja' | 'zh' = 'ja'
) {
  const siteUrl = getAbsoluteUrl('')
  
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    description,
    image: imageUrl ? getAbsoluteUrl(imageUrl) : getAbsoluteUrl('/images/og/og.png'),
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: author
      ? {
          '@type': 'Person',
          name: author,
        }
      : {
          '@type': 'Organization',
          name: locale === 'ja' ? '大成学院' : '大成学院',
        },
    publisher: {
      '@type': 'Organization',
      name: locale === 'ja' ? '大成学院' : '大成学院',
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/images/logo/logo.png'),
      },
    },
    inLanguage: locale === 'ja' ? 'ja' : 'zh',
  }
}
