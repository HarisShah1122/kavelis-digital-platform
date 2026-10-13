import { processSteps } from '@/data/content'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function ProcessSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Delivery process"
          title="A clear path from idea to production"
          description="Every engagement follows a transparent process so you always know what is being built, why, and what comes next."
          align="center"
        />

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.id} as="li" delayMs={index * 60} className="h-full">
              <div className="card h-full p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric-600">
                  {step.number}
                </p>
                <h3 className="mt-3 text-base font-semibold text-navy-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
