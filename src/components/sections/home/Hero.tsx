import type { CSSProperties } from 'react'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'
import { Picture } from '@/components/ui/Picture'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export function Hero() {
  const { t } = useI18n()
  const hero = t.home.hero

  return (
    <section className="relative overflow-hidden bg-canvas">
      {/* Fine grid backdrop, faded toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(17,22,41,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,22,41,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />

      <Container className="relative pb-20 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="eyebrow fade-up" style={delay(0)}>
              {hero.eyebrow}
            </p>
            <h1 className="display-heading mt-6 text-[2.75rem] sm:text-6xl xl:text-7xl rtl:text-[2.4rem] rtl:sm:text-5xl rtl:xl:text-6xl">
              {hero.lines.map((line, index) => (
                <span key={line} className="line-mask">
                  <span
                    style={{ '--line': index } as CSSProperties}
                    className={cn(index === hero.accentLine && 'italic text-gold-700')}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="lead fade-up mt-7 max-w-xl" style={delay(420)}>
              {hero.lead}
            </p>

            <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={delay(540)}>
              <Button to="/portfolio" className="group">
                {t.common.exploreWork}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                />
              </Button>
              <Button to={siteConfig.startPath} variant="secondary">
                {t.common.startProject}
              </Button>
            </div>

            <ul className="fade-up mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-navy-100 pt-6" style={delay(660)}>
              {hero.points.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-semibold text-navy-950">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Layered real work: Power BI reports built by Kavelis */}
          <figure className="fade-up relative" style={delay(260)}>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-950 p-4 shadow-lift sm:p-6">
              <div
                aria-hidden="true"
                className="absolute -end-20 -top-24 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl"
              />
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
                  alt={hero.visualAlt}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </div>

              <div className="relative mt-4 grid grid-cols-[1.2fr_1fr] gap-4">
                <div aria-hidden="true" className="overflow-hidden rounded-xl border border-white/10 bg-white">
                  <Picture
                    src="/fleet-cost-maintenance.png"
                    alt=""
                    sizes="(min-width: 1024px) 300px, 55vw"
                    className="h-28 w-full object-cover object-top sm:h-32"
                  />
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-gold-500/30 bg-navy-900 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
                    <BarChart3 aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
                      {hero.chipLabel}
                    </p>
                    <p dir="ltr" className="mt-1 text-sm font-semibold text-white">
                      {hero.chipValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="float-slow absolute -end-6 -top-6 hidden h-24 w-24 rounded-full border border-gold-500/40 lg:block"
            />

            <figcaption className="mt-4 flex items-start justify-between gap-4 text-xs text-charcoal-500">
              <span>{hero.visualCaption}</span>
              <Link to="/work" className="shrink-0 font-semibold text-gold-700 hover:text-gold-800">
                {t.home.work.viewCase}
              </Link>
            </figcaption>
          </figure>
        </div>

        <div aria-hidden="true" className="mt-10 hidden items-center gap-3 text-xs font-medium text-charcoal-500 lg:flex">
          <span className="relative h-10 w-px overflow-hidden bg-navy-200">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/3 bg-gold-500" />
          </span>
          {hero.scroll}
        </div>
      </Container>
    </section>
  )
}
