import { ArrowRight, Check } from 'lucide-react'
import { useIndustries } from '@/i18n/data/careers'
import { usePageCopy } from '@/i18n/localize'
import { miscCopy } from '@/i18n/pages/misc'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-700">
          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function Solutions() {
  const copy = usePageCopy(miscCopy).solutions
  const industries = useIndustries()

  useSeo({ title: copy.seoTitle, description: copy.seoDescription, path: '/solutions' })

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <Button to="/contact" className="group">
          {copy.talk}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          />
        </Button>
      </PageHero>

      <Section>
        <Container>
          <Reveal className="mb-12 max-w-3xl">
            <p className="text-sm leading-relaxed text-charcoal-500">{copy.note}</p>
          </Reveal>
          <div className="space-y-6">
            {industries.map((industry, index) => (
              <Reveal key={industry.id} delayMs={index * 60}>
                <article id={industry.id} className="card grid gap-8 p-7 sm:p-9 lg:grid-cols-3 lg:gap-10">
                  <div>
                    <h2 className="font-sans text-xl font-bold tracking-tight text-navy-950">{industry.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{industry.description}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">{copy.needs}</h3>
                    <CheckList items={industry.needs} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">{copy.engage}</h3>
                    <CheckList items={industry.approaches} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title={copy.ctaTitle} description={copy.ctaDescription} />
    </>
  )
}
