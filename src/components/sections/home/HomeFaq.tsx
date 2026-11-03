import { useI18n } from '@/i18n'
import { Accordion } from '@/components/ui/Accordion'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/** Section 13 — FAQ accordion. Answers reflect published company policy. */
export function HomeFaq() {
  const { t } = useI18n()
  const copy = t.home.faq
  const items = copy.items.map((item, index) => ({ id: `faq-${index}`, ...item }))

  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="section-heading mt-4">{copy.title}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
