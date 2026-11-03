import { useI18n } from '@/i18n'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/** Section 09 — working principles as an editorial numbered list, not a card grid. */
export function WhyKavelis() {
  const { t } = useI18n()
  const copy = t.home.why

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="section-heading mt-4">{copy.title}</h2>
          </Reveal>

          <ol className="border-t border-navy-100">
            {copy.items.map((item, index) => (
              <Reveal key={item.title} as="li" delayMs={(index % 3) * 60}>
                <div className="group grid gap-3 border-b border-navy-100 py-7 transition-colors sm:grid-cols-[4rem_1fr_1.3fr] sm:items-baseline sm:gap-6">
                  <span className="font-display text-2xl text-gold-500 transition-transform duration-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-navy-950">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal-600 sm:text-base">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
