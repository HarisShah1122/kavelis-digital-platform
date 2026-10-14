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
    <section className="border-b border-navy-100 bg-gold-50/60">
      <Container className="section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Badge>Digital products & technology solutions</Badge>
            <h1 className="display-heading mt-6">
              Digital products
              <br />
              built to move
              <br />
              <span className="text-gold-700">your business forward.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Kavelis designs and builds SaaS products, business automation, and AI-assisted
              software — helping businesses launch faster, operate smarter, and grow with
              confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/contact" className="group">
                Discuss Your Project
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Button>
              <Button to="/services" variant="secondary">
                Explore Our Services
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
