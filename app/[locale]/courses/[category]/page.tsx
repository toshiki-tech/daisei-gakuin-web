import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import { getCourseCategoryById, getAllCourseCategories } from '@/lib/content/courseStructure'
import Link from 'next/link'
import { defaultLocale } from '@/i18n/config'

export async function generateStaticParams() {
  const categories = getAllCourseCategories()
  return categories.map((category) => ({
    category: category.id,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params?: { locale?: string; category?: string } 
}) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const categoryId = params?.category
  const category = categoryId ? getCourseCategoryById(categoryId) : null
  
  if (!category) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: category.name[locale],
    description: category.description[locale],
  }
}

export default async function CategoryPage({ 
  params 
}: { 
  params?: { locale?: string; category?: string } 
}) {
  const locale = (params?.locale as 'ja' | 'zh') ?? defaultLocale
  const categoryId = params?.category
  const localeTyped = locale as 'ja' | 'zh'
  const category = categoryId ? getCourseCategoryById(categoryId) : null

  if (!category) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-ink/60">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href={`/${locale}`} className="hover:text-primary transition-colors">
                    {localeTyped === 'ja' ? 'ホーム' : '首页'}
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={`/${locale}/courses`} className="hover:text-primary transition-colors">
                    {localeTyped === 'ja' ? 'コース' : '课程'}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-ink">{category.name[localeTyped]}</li>
              </ol>
            </nav>

            {/* Hero Section */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                {category.icon && (
                  <span className="text-5xl">{category.icon}</span>
                )}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
                    {category.name[localeTyped]}
                  </h1>
                  <p className="text-xl text-ink/70 max-w-3xl leading-relaxed">
                    {category.description[localeTyped]}
                  </p>
                </div>
              </div>
            </div>

            {/* Subcategories */}
            <div className="space-y-12">
              {category.subcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="bg-background rounded-2xl p-8 md:p-12 shadow-md"
                >
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-ink mb-3">
                      {subcategory.name[localeTyped]}
                    </h2>
                    {subcategory.description && (
                      <p className="text-lg text-ink/70 leading-relaxed">
                        {subcategory.description[localeTyped]}
                      </p>
                    )}
                  </div>

                  {/* Delivery Methods */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategory.deliveryMethods.map((method) => (
                      <div
                        key={method.id}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-xl font-semibold text-ink mb-2">
                          {method.name[localeTyped]}
                        </h3>
                        {method.description && (
                          <p className="text-base text-ink/70 leading-relaxed">
                            {method.description[localeTyped]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-ink mb-4">
                  {localeTyped === 'ja' ? '無料体験レッスンに申し込む' : '申请免费体验课程'}
                </h2>
                <p className="text-lg text-ink/70 mb-8 max-w-2xl mx-auto">
                  {localeTyped === 'ja'
                    ? 'まずは無料体験レッスンで、あなたに最適なコースを見つけましょう。'
                    : '首先通过免费体验课程，找到最适合您的课程。'
                  }
                </p>
                <Link
                  href={`/${locale}#contact`}
                  className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                >
                  {localeTyped === 'ja' ? '無料体験を申し込む' : '申请免费体验'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

