import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import Pricing from '@/components/sections/Pricing'
import { getAllCourseCategories } from '@/lib/content/courseStructure'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'courses' })

  return {
    title: t('title'),
    description: t('title'),
  }
}

export default async function CoursesIndexPage({ params }: { params: { locale: string } }) {
  const { locale } = params as { locale: 'ja' | 'zh' }
  const allCategories = getAllCourseCategories()
  
  // 分离中文课程和其他课程
  const mainBusiness = allCategories.find((cat) => cat.isMainBusiness)
  const otherCategories = allCategories.filter((cat) => !cat.isMainBusiness)

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                {locale === 'ja' ? 'コース一覧' : '课程一览'}
              </h1>
              <p className="text-xl text-ink/70 max-w-3xl mx-auto leading-relaxed">
                {locale === 'ja' 
                  ? 'あなたの目標とライフスタイルに合わせた最適なコースをお選びください。初心者から上級者まで、幅広いニーズに対応しています。'
                  : '请选择最适合您目标和生活方式的课程。从初学者到高级者，广泛对应各种需求。'
                }
              </p>
            </div>

            {/* 中国語 */}
            {mainBusiness && (
              <div className="mb-24">
                <div className="text-center mb-12">
                  {mainBusiness.icon && (
                    <span className="text-5xl block mb-5">{mainBusiness.icon}</span>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold text-ink mb-5">
                    {mainBusiness.name[locale]}
                  </h2>
                  <p className="text-lg text-ink/70 max-w-3xl mx-auto leading-relaxed">
                    {mainBusiness.description[locale]}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {mainBusiness.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-ink/5"
                    >
                      <h3 className="text-xl font-bold text-ink mb-4 text-center">
                        {subcategory.name[locale]}
                      </h3>
                      {subcategory.description && (
                        <p className="text-sm text-ink/70 leading-relaxed mb-6 text-center min-h-[3.5rem]">
                          {subcategory.description[locale]}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {subcategory.deliveryMethods.map((method) => (
                          <span
                            key={method.id}
                            className="inline-block px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            {method.name[locale]}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 其他课程分类 */}
            {otherCategories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-10 text-center">
                  {locale === 'ja' ? 'その他のコース' : '其他课程'}
                </h2>
                <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                  {otherCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/${locale}/courses/${category.id}`}
                      className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20"
                    >
                      <div className="text-center">
                        {category.icon && (
                          <span className="text-5xl block mb-5">{category.icon}</span>
                        )}
                        <h2 className="text-2xl font-bold text-ink mb-4 group-hover:text-primary transition-colors">
                          {category.name[locale]}
                        </h2>
                        <p className="text-base text-ink/70 leading-relaxed mb-6 min-h-[3.5rem]">
                          {category.description[locale]}
                        </p>

                        {/* Subcategories Preview */}
                        <div className="pt-6 border-t border-ink/10">
                          <div className="flex flex-wrap gap-2 justify-center mb-6">
                            {category.subcategories.slice(0, 3).map((subcategory) => (
                              <span
                                key={subcategory.id}
                                className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                              >
                                {subcategory.name[locale]}
                              </span>
                            ))}
                            {category.subcategories.length > 3 && (
                              <span className="inline-block px-4 py-1.5 bg-ink/5 text-ink/60 rounded-full text-sm">
                                +{category.subcategories.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Arrow */}
                          <div className="flex items-center justify-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                            <span className="text-sm">
                              {locale === 'ja' ? '詳しく見る' : '了解更多'}
                            </span>
                            <svg
                              className="w-5 h-5 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Pricing Section */}
        <Pricing />
      </div>
      <Footer />
    </main>
  )
}

