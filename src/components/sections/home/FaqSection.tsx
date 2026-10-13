import { homeFaqs } from '@/data/content'
import { Accordion } from '@/components/ui/Accordion'
import { Container, Section, SectionHeader } from '@/components/ui/Section'

export function FaqSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions we hear before a first call"
            description="If your question is not covered here, send a project inquiry and we will respond with specifics."
          />
          <Accordion items={homeFaqs} />
        </div>
      </Container>
    </Section>
  )
}
