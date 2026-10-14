import {
  Compass,
  Gauge,
  Handshake,
  Layers3,
  PlugZap,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { differentiators } from '@/data/content'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const icons = [Compass, Layers3, ShieldCheck, Handshake, Users, PlugZap, Gauge]

export function Differentiators() {
  return (
    <Section className="border-y border-navy-100 bg-white">
      <Container>
        <SectionHeader
          eyebrow="Engineering approach"
          title="Why teams choose Kavelis"
          description="A working partnership built on craft, clarity, and software you can actually maintain."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {differentiators.map((item, index) => {
            const Icon = icons[index] ?? Compass
            return (
              <Reveal key={item.id} delayMs={index * 60}>
                <div className="card h-full p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-800 text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
