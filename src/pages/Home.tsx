import { useSeo } from '@/hooks/useSeo'
import { Hero } from '@/components/sections/home/Hero'
import { ServicesOverview } from '@/components/sections/home/ServicesOverview'
import { ProductsPreview } from '@/components/sections/home/ProductsPreview'
import { CapabilitiesBand } from '@/components/sections/home/CapabilitiesBand'
import { ProcessSection } from '@/components/sections/home/ProcessSection'
import { Differentiators } from '@/components/sections/home/Differentiators'
import { FaqSection } from '@/components/sections/home/FaqSection'
import { CtaBand } from '@/components/ui/CtaBand'

export default function Home() {
  useSeo({
    title: 'SaaS, automation, and custom software',
    description:
      'Kavelis designs, builds, and maintains SaaS products, custom web applications, automation systems, and digital commerce platforms for growing businesses.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <ServicesOverview />
      <ProductsPreview />
      <CapabilitiesBand />
      <ProcessSection />
      <Differentiators />
      <FaqSection />
      <CtaBand />
    </>
  )
}
