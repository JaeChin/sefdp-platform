import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { TrustBar } from '@/components/landing/trust-bar'
import { Stats } from '@/components/landing/stats'
import { AboutProgramme } from '@/components/landing/about-programme'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <AboutProgramme />
      <CTASection />
      <Footer />
    </main>
  )
}
