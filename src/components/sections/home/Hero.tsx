import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const capabilities = [
  'Custom software',
  'Business automation',
  'E-commerce',
  'Data & reporting',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-navy-100 bg-canvas">
      <Container className="section">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Software studio</p>
            <h1 className="display-heading mt-6">
              Turn complex business challenges into{' '}
              <span className="italic text-gold-700">smarter digital solutions.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Kavelis builds custom software, business automation, e-commerce experiences, and
              data-driven solutions that help businesses work more efficiently.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/contact" className="group">
                Discuss Your Project
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Button>
              <Button to="/portfolio" variant="secondary">
                Explore Our Work
              </Button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-navy-100 pt-8 sm:grid-cols-4">
              {capabilities.map((item) => (
                <div key={item}>
                  <dt className="text-sm font-semibold text-navy-950">{item}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delayMs={120}>
            <figure className="relative">
              <div className="overflow-hidden rounded-2xl border border-navy-200 bg-navy-950 shadow-lift">
                <img
                  src="/sales-overview.png"
                  alt="Regional sales overview dashboard built in Power BI by Kavelis — year-over-year sales, profit, and quantity by region"
                  width={1170}
                  height={661}
                  loading="eager"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4 text-xs text-charcoal-500">
                <span>
                  Regional sales overview — a Power BI report designed by Kavelis.
                </span>
                <Link
                  to="/work"
                  className="shrink-0 font-semibold text-gold-700 hover:text-gold-800"
                >
                  See the work →
                </Link>
              </figcaption>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -left-6 hidden w-40 overflow-hidden rounded-xl border border-navy-200 bg-white p-1.5 shadow-lift lg:block"
              >
                <img
                  src="/fleet-cost-maintenance.png"
                  alt=""
                  loading="lazy"
                  className="h-24 w-full rounded-lg object-cover object-top"
                />
              </div>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
