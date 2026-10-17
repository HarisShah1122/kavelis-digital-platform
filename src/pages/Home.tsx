import { useSeo } from '@/hooks/useSeo'
import { Hero } from '@/components/sections/home/Hero'
import { IntroStrip } from '@/components/sections/home/IntroStrip'
import { ServicesOverview } from '@/components/sections/home/ServicesOverview'
import { ProductsPreview } from '@/components/sections/home/ProductsPreview'
import { BiShowcase } from '@/components/sections/home/BiShowcase'
import { WorkPreview } from '@/components/sections/home/WorkPreview'
import { ProcessSection } from '@/components/sections/home/ProcessSection'
import { PricingPreview } from '@/components/sections/home/PricingPreview'
import { TrustSection } from '@/components/sections/home/TrustSection'
import { FaqSection } from '@/components/sections/home/FaqSection'
import { CtaBand } from '@/components/ui/CtaBand'

export default function Home() {
  useSeo({
    title: 'SaaS, automation, and custom software',
    description:
      'Kavelis designs, builds, and maintains SaaS products, custom web applications, automation systems, BI dashboards, and digital products for growing businesses.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <IntroStrip />
      <ServicesOverview />
      <ProductsPreview />
      <BiShowcase />
      <WorkPreview />
      <ProcessSection />
      <PricingPreview />
      <TrustSection />
      <FaqSection />
      <CtaBand />
    </>
  )
}
