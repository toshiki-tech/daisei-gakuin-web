import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import Access from '@/components/sections/Access'
import Method from '@/components/sections/Method'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <Method />
        <Access />
      </div>
      <Footer />
    </main>
  )
}

