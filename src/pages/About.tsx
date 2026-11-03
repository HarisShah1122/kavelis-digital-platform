import { ArrowRight } from 'lucide-react'
import { processOrder } from '@/data/home'
import { useSeo } from '@/hooks/useSeo'
import { useI18n } from '@/i18n'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { FounderMessage } from '@/components/sections/FounderMessage'

export default function About() {
  const { t } = useI18n()
  const copy = t.about

  useSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Kavelis Solutions',
      url: 'https://kavelis.llc/about',
      description:
        'Kavelis Solutions is a focused software studio building custom software, automation, dashboards, and e-commerce for growing businesses.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Kavelis Solutions',
        url: 'https://kavelis.llc/',
        email: 'info@kavelis.llc',
        telephone: ['+971507221495', '+966559645341'],
        founder: {
          '@type': 'Person',
          name: 'Asad Ullah Khan',
          jobTitle: 'Founder & CEO',
          image: 'https://kavelis.llc/CEO.jpg',
        },
      },
    },
  })

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">{copy.missionEyebrow}</p>
              <h2 className="section-heading mt-3">{copy.missionTitle}</h2>
            </Reveal>
            <Reveal delayMs={80} className="space-y-5">
              {copy.mission.map((paragraph) => (
                <p key={paragraph} className="prose-measure text-base leading-relaxed text-charcoal-700 sm:text-lg">
                  {paragraph}
                </p>
              ))}
              <Button to="/contact" className="group mt-2">
                {copy.workWithUs}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                />
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FounderMessage />

      <Section className="border-b border-navy-100 bg-white">
        <Container>
          <SectionHeader eyebrow={copy.teamEyebrow} title={copy.teamTitle} description={copy.teamDescription} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.team.map((member, index) => (
              <Reveal key={member.name} delayMs={index * 70} className="h-full">
                <div className="card flex h-full items-start gap-5 p-6">
                  <span
                    aria-hidden="true"
                    dir="ltr"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-950 font-display text-xl text-gold-400"
                  >
                    {member.initials}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy-950">{member.name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-gold-700">{member.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow={copy.principlesEyebrow}
            title={copy.principlesTitle}
            description={copy.principlesDescription}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {copy.principles.map((principle, index) => (
              <Reveal key={principle.title} delayMs={index * 60}>
                <div className="card h-full p-6">
                  <h3 className="text-lg font-semibold text-navy-950">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{principle.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="process" className="border-t border-navy-100 bg-white">
        <Container>
          <SectionHeader
            eyebrow={copy.deliveryEyebrow}
            title={copy.deliveryTitle}
            description={copy.deliveryDescription}
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {processOrder.map((stepId, index) => {
              const step = t.home.process.steps[stepId]
              return (
                <Reveal key={stepId} as="li" delayMs={index * 50} className="h-full">
                  <div className="border-t-2 border-gold-500 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">0{index + 1}</p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-navy-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{step.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primaryLabel={t.common.startProject}
        secondaryLabel={copy.ctaSecondary}
        secondaryTo="/portfolio"
      />
    </>
  )
}
