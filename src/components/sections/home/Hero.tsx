import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { DashboardMockup } from '@/components/sections/home/DashboardMockup'

const proofPoints = [
  'SaaS products & portals',
  'Business automation',
  'E-commerce platforms',
  'API integrations',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-navy-100 bg-gradient-to-b from-navy-50/70 to-white">
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />
      <Container className="relative section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Badge>Built for product teams and operators</Badge>
            <h1 className="display-heading mt-6">
              Build smarter.
              <br />
              Automate better.
              <br />
              <span className="text-electric-700">Scale faster.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Kavelis is a technology partner for companies that need real software — SaaS
              products, custom platforms, automation, and digital commerce — designed, built, and
              maintained with engineering discipline.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/contact" className="group">
                Start a project
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button to="/services" variant="secondary">
                Explore capabilities
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {proofPoints.map((point) => (
                <li key={point} className="text-sm font-medium text-charcoal-500">
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={120}>
            <DashboardMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
