import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { BiDashboard } from '@/components/ui/BiDashboard'

const offerings = [
  'Business dashboards',
  'Sales analytics & reporting',
  'KPI & operational reporting',
  'ETL & data preparation',
  'Custom BI solutions',
  'Analytics strategy',
]

/** Dark navy BI band with realistic illustrative dashboard. */
export function BiShowcase() {
  return (
    <section className="section bg-navy-950 text-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-gold-300">Business intelligence</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your data already exists. Make it decision-ready.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy-300 sm:text-lg">
              Kavelis builds dashboards, reports, and analytics systems that turn scattered data
              — CRMs, stores, spreadsheets, operations tools — into a shared source of truth. We
              start with the decisions you need to make, then design the metrics and visuals
              around them.
            </p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {offerings.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-navy-800 bg-navy-900 px-3.5 py-2.5 text-sm font-medium text-navy-200"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                to="/services/business-intelligence-analytics"
                className="btn btn-dark group"
              >
                Explore BI services
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <BiDashboard />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
