import { useSeo } from '@/hooks/useSeo'
import { Hero } from '@/components/sections/home/Hero'
import { IntroStrip } from '@/components/sections/home/IntroStrip'
import { ServicesOverview } from '@/components/sections/home/ServicesOverview'
import { ProductsSolutions } from '@/components/sections/home/ProductsSolutions'
import { PortfolioPreview } from '@/components/sections/home/PortfolioPreview'
import { BiShowcase } from '@/components/sections/home/BiShowcase'
import { ProcessSection } from '@/components/sections/home/ProcessSection'
import { PricingPreview } from '@/components/sections/home/PricingPreview'
import { TrustSection } from '@/components/sections/home/TrustSection'
import { FaqSection } from '@/components/sections/home/FaqSection'
import { CtaBand } from '@/components/ui/CtaBand'
import { siteConfig } from '@/lib/site'

export default function Home() {
  useSeo({
    title: 'Custom Software, Automation & E-commerce',
    description:
      'Kavelis builds custom software, business automation, e-commerce experiences, and data-driven solutions that help businesses work more efficiently.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      url: 'https://kavelis.llc/',
      description: siteConfig.description,
    },
  })

  return (
    <>
      <Hero />
      <IntroStrip />
      <ServicesOverview />
      <ProductsSolutions />
      <PortfolioPreview />
      <BiShowcase />
      <ProcessSection />
      <PricingPreview />
      <TrustSection />
      <FaqSection />
      <CtaBand
        title="Have a project in mind?"
        description="Tell us what you are trying to build or fix. We will respond with honest scoping questions, realistic options, and a clear next step — or tell you plainly if we are not the right fit."
        primaryLabel="Discuss Your Project"
        primaryTo="/contact"
        secondaryLabel={`Email ${siteConfig.businessEmail}`}
        secondaryHref={`mailto:${siteConfig.businessEmail}`}
      />
    </>
  )
}
