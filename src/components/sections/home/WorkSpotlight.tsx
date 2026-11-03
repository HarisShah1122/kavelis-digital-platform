import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { useI18n } from '@/i18n'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Picture } from '@/components/ui/Picture'

/** Layered Power BI work sample (formerly the hero visual), near the end of the homepage. */
export function WorkSpotlight() {
  const { t } = useI18n()
  const copy = t.home.spotlight

  return (
    <Section className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="section-heading mt-4">{copy.title}</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal-600 sm:text-lg">{copy.description}</p>
            <Link
              to="/work"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-950"
            >
              <span className="link-underline">{copy.link}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-gold-600 rtl:-scale-x-100" />
            </Link>
          </Reveal>

          <Reveal delayMs={100}>
            <figure className="relative">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-950 p-4 shadow-lift sm:p-6">
                <div aria-hidden="true" className="absolute -end-20 -top-24 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-navy-900">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span dir="ltr" className="ms-2 text-[10px] font-medium text-navy-300">
                      Power BI · Regional sales overview
                    </span>
                  </div>
                  <Picture
                    src="/sales-overview.png"
                    alt={copy.visualAlt}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </div>

                <div className="relative mt-4 grid grid-cols-[1.2fr_1fr] gap-4">
                  <div aria-hidden="true" className="overflow-hidden rounded-xl border border-white/10 bg-white">
                    <Picture
                      src="/fleet-cost-maintenance.png"
                      alt=""
                      sizes="(min-width: 1024px) 320px, 55vw"
                      className="h-28 w-full object-cover object-top sm:h-32"
                    />
                  </div>
                  <div className="flex flex-col justify-between rounded-xl border border-gold-500/30 bg-navy-900 p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
                      <BarChart3 aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">{copy.chipLabel}</p>
                      <p dir="ltr" className="mt-1 text-sm font-semibold text-white">
                        {copy.chipValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="float-slow absolute -end-6 -top-6 hidden h-24 w-24 rounded-full border border-gold-500/40 lg:block"
              />
              <figcaption className="mt-4 text-xs text-charcoal-500">{copy.visualCaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
