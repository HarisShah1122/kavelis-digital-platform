import { processSteps } from '@/data/content'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/** Delivery process — five stages, shown as an editorial stepped list. */
export function ProcessSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="How we work"
          title="A clear path from idea to production"
          description="Five stages, every engagement — so you always know what is being built, why, and what comes next."
        />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.id} as="li" delayMs={index * 60} className="h-full">
              <div className="border-t-2 border-gold-500 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                  {step.number}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
