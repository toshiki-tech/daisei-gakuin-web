'use client'

import { useTranslations } from 'next-intl'

export default function History() {
  const t = useTranslations('history')
  
  const timelineItems = [
    {
      year: '1997',
      key: 'adultChinese',
    },
    {
      year: '2010',
      key: 'childrenClasses',
    },
    {
      year: '2010',
      key: 'languageClasses',
    },
    {
      year: 'present',
      key: 'culturalCourses',
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-ink mb-12">
            {t('title')}
          </h2>
          
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line - hidden on mobile, visible on desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2" />
            {/* Vertical line for mobile */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />
            
            {/* Timeline items */}
            <div className="space-y-6 md:space-y-8">
              {timelineItems.map((item, index) => {
                const isEven = index % 2 === 0
                const is2010 = item.year === '2010'
                const prevIs2010 = index > 0 && timelineItems[index - 1].year === '2010'
                
                return (
                  <div
                    key={index}
                    className="relative flex flex-col md:flex-row items-start md:items-center"
                  >
                    {/* Left content (even index) */}
                    {isEven && (
                      <div className="w-full md:w-[calc(50%-2.5rem)] md:pr-4 md:text-right order-2 md:order-1">
                        <div className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-ink/5 hover:shadow-lg transition-shadow">
                          <p className="text-base md:text-lg text-ink/80 leading-relaxed">
                            {t(`items.${item.key}`)}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Timeline dot - always centered */}
                    <div className={`relative z-10 flex-shrink-0 order-1 md:order-2 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center ${
                      is2010 && prevIs2010 ? 'md:mt-10' : ''
                    }`}>
                      <div className="w-full h-full rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-background">
                        <span className="text-white font-bold text-xs md:text-sm text-center px-1">
                          {item.year === 'present' ? t('present') : item.year}
                        </span>
                      </div>
                    </div>
                    
                    {/* Right content (odd index) */}
                    {!isEven && (
                      <div className="w-full md:w-[calc(50%-2.5rem)] md:pl-4 order-3">
                        <div className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-ink/5 hover:shadow-lg transition-shadow">
                          <p className="text-base md:text-lg text-ink/80 leading-relaxed">
                            {t(`items.${item.key}`)}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Spacer for desktop - left side */}
                    {!isEven && <div className="hidden md:block w-[calc(50%-2.5rem)] order-1" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

