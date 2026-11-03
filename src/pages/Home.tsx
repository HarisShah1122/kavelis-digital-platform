import { useSeo } from '@/hooks/useSeo'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/lib/site'
import { Hero } from '@/components/sections/home/Hero'
import { CapabilitiesBand } from '@/components/sections/home/CapabilitiesBand'
import { WhatWeDo } from '@/components/sections/home/WhatWeDo'
import { FeaturedWork } from '@/components/sections/home/FeaturedWork'
import { TechStack } from '@/components/sections/home/TechStack'
import { ProcessTimeline } from '@/components/sections/home/ProcessTimeline'
import { ProductShowcase } from '@/components/sections/home/ProductShowcase'
import { WhyKavelis } from '@/components/sections/home/WhyKavelis'
import { FounderMessage } from '@/components/sections/FounderMessage'
import { ImpactFacts } from '@/components/sections/home/ImpactFacts'
import { HomeFaq } from '@/components/sections/home/HomeFaq'
import { HomeContact } from '@/components/sections/home/HomeContact'

export default function Home() {
  const { t } = useI18n()

  useSeo({
    title: t.home.seoTitle,
    description: t.home.seoDescription,
    path: '/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Kavelis Solutions',
        url: 'https://kavelis.llc/',
        description: siteConfig.description,
        inLanguage: ['en', 'ar'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: t.home.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  })

  return (
    <>
      <Hero />
      <CapabilitiesBand />
      <WhatWeDo />
      <FeaturedWork />
      <TechStack />
      <ProcessTimeline />
      <ProductShowcase />
      <WhyKavelis />
      <FounderMessage />
      <ImpactFacts />
      <HomeFaq />
      <HomeContact />
    </>
  )
}
