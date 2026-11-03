import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useWork } from '@/i18n/data/work'
import { usePageCopy } from '@/i18n/localize'
import { workCopy } from '@/i18n/pages/work'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/utils'

const arrow = 'h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'

export default function Work() {
  const copy = usePageCopy(workCopy)
  const { studies } = useWork()

  useSeo({ title: copy.workSeoTitle, description: copy.workSeoDescription, path: '/work' })

  const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-6']

  return (
    <>
      <PageHero eyebrow={copy.workEyebrow} title={copy.workTitle} description={copy.workDescription}>
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" className="group">
            {copy.discussSimilar}
            <ArrowRight aria-hidden="true" className={arrow} />
          </Button>
          <Button to="/portfolio" variant="secondary">
            {copy.ecommercePortfolio}
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-6">
            {studies.map((study, index) => {
              const wide = index === 2
              return (
                <Reveal key={study.id} delayMs={index * 80} className={cn('h-full', spans[index] ?? 'lg:col-span-6')}>
                  <Link
                    to={`/work/${study.id}`}
                    className={cn('card card-hover group flex h-full flex-col overflow-hidden p-0', wide && 'lg:flex-row')}
                  >
                    {study.image ? (
                      <div
                        className={cn(
                          'overflow-hidden rounded-t-2xl bg-navy-950',
                          wide && 'lg:w-1/3 lg:shrink-0 lg:rounded-none lg:rounded-s-2xl',
                        )}
                      >
                        <Picture
                          src={study.image}
                          alt={copy.dashboardPreview(study.title)}
                          sizes="(min-width: 1024px) 640px, 100vw"
                          className="h-52 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] lg:h-full"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">{study.category}</p>
                        {study.isPlaceholder ? <Badge tone="warning">{copy.template}</Badge> : null}
                      </div>
                      <h2 className="mt-3 font-sans text-xl font-bold tracking-tight text-navy-950 sm:text-2xl">{study.title}</h2>
                      <p className="mt-1 text-xs text-charcoal-400">{study.clientLabel}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-600">{study.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-2" dir="ltr">
                        {study.technologies.slice(0, 4).map((tech) => (
                          <li key={tech} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                        {copy.readCase}
                        <ArrowRight aria-hidden="true" className={arrow} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={copy.workCtaTitle}
        description={copy.workCtaDescription}
        secondaryLabel={copy.workCtaSecondary}
        secondaryTo="/about"
      />
    </>
  )
}
