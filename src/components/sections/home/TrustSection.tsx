import { FileText, GitBranch, MonitorCheck, Unplug } from 'lucide-react'
import { trustItems } from '@/data/content'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const icons = [GitBranch, FileText, MonitorCheck, Unplug]

/** Trust principles as a two-column list — no card chrome. */
export function TrustSection() {
  return (
    <Section className="border-t border-navy-100">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Working together</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              What you can count on
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              No fabricated testimonials — just the principles every Kavelis engagement is
              actually built on.
            </p>
          </Reveal>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {trustItems.map((item, index) => {
              const Icon = icons[index] ?? GitBranch
              return (
                <Reveal key={item.id} delayMs={index * 60}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-navy-950">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
