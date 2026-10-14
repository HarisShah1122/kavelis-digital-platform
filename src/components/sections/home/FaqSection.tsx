import { homeFaqs } from '@/data/content'
import { Accordion } from '@/components/ui/Accordion'
import { Container, Section, SectionHeader } from '@/components/ui/Section'

const homepageFaqIds = [
  'what-kavelis-does',
  'starting-a-project',
  'requirements-planning',
  'project-timeline',
  'pricing-models',
  'post-launch-support',
]

export function FaqSection() {
  const items = homeFaqs.filter((faq) => homepageFaqIds.includes(faq.id))

  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions we hear before a first call"
            description="If your question is not covered here, send a project inquiry and we will respond with specifics."
          />
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  )
}
