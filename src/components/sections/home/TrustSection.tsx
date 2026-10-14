import { FileText, GitBranch, MonitorCheck, Unplug } from 'lucide-react'
import { trustItems } from '@/data/content'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const icons = [GitBranch, FileText, MonitorCheck, Unplug]

export function TrustSection() {
  return (
    <Section className="border-t border-navy-100">
      <Container>
        <SectionHeader
          eyebrow="Working together"
          title="What you can count on"
          description="No fabricated testimonials — just the principles every Kavelis engagement is actually built on."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = icons[index] ?? GitBranch
            return (
              <Reveal key={item.id} delayMs={index * 60} className="h-full">
                <div className="card h-full p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
