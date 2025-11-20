import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Stats from '@/components/sections/Stats'
import Pricing from '@/components/sections/Pricing'
import Courses from '@/components/sections/Courses'
import Method from '@/components/sections/Method'
import Testimonials from '@/components/sections/Testimonials'
import Access from '@/components/sections/Access'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  try {
    return (
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Features />
        <Stats />
        <Courses />
        <Pricing />
        <Method />
        <Testimonials />
        <Access />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    )
  } catch (error) {
    console.error('Home page error:', error)
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-ink mb-4">エラーが発生しました</h1>
          <p className="text-ink/70">ページの読み込み中にエラーが発生しました。</p>
          <pre className="mt-4 text-sm">{String(error)}</pre>
        </div>
      </main>
    )
  }
}
