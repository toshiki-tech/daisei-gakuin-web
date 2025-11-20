import Header from '@/components/Header'
import Footer from '@/components/sections/Footer'
import CTA from '@/components/sections/CTA'
import Access from '@/components/sections/Access'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <CTA />
        <Access />
      </div>
      <Footer />
    </main>
  )
}

