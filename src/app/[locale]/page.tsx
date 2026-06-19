import { Hero } from '@/sections/Hero'
import { TrustStats } from '@/sections/TrustStats'
import { ProblemSolution } from '@/sections/ProblemSolution'
import { ServicesSection } from '@/sections/ServicesSection'
import { IVFProcessSection } from '@/sections/IVFProcessSection'
import { Doctors } from '@/sections/Doctors'
import { SuccessResults } from '@/sections/SuccessResults'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { FAQSection } from '@/sections/FAQSection'
import { ContactSection } from '@/sections/ContactSection'

export default function LandingPage() {
  return (
    <main id="main-content">
      <Hero />
      <TrustStats />
      <ProblemSolution />
      <ServicesSection />
      <IVFProcessSection />
      <Doctors />
      <SuccessResults />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
  )
}
