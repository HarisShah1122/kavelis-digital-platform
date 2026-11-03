import { technologies } from '@/data/home'
import { useI18n } from '@/i18n'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Marquee } from '@/components/ui/Marquee'

/** Section 06 — typographic technology marquee. No logos, no implied partnerships. */
export function TechStack() {
  const { t } = useI18n()
  const copy = t.home.tech

  return (
    <section className="border-y border-navy-100 bg-white py-16 sm:py-20">
      <Container>
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-navy-950 sm:text-4xl">{copy.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-charcoal-500">{copy.note}</p>
        </Reveal>
      </Container>
      <Marquee
        items={technologies}
        label={copy.eyebrow}
        duration={35}
        className="mt-10"
        renderItem={(item) => (
          <span
            dir="ltr"
            className="mx-2 whitespace-nowrap rounded-full border border-navy-100 bg-canvas px-6 py-3 text-base font-semibold text-navy-900 transition-colors hover:border-gold-400 hover:text-gold-700 sm:text-lg"
          >
            {item}
          </span>
        )}
      />
    </section>
  )
}
