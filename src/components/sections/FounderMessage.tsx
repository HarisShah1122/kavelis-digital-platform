import { ArrowRight, Quote } from 'lucide-react'
import { useI18n } from '@/i18n'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Picture } from '@/components/ui/Picture'

/**
 * Founder & CEO message (homepage and About). Uses logical start/end
 * utilities so it mirrors correctly in Arabic.
 */
export function FounderMessage() {
  const { t } = useI18n()
  const copy = t.founder

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="section relative overflow-hidden bg-navy-950 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 start-[-10rem] h-[32rem] w-[32rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
            <figure className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -end-4 h-full w-full rounded-2xl border border-gold-500/40"
              />
              <div className="clip-reveal relative overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-white/10">
                <Picture
                  src="/CEO.jpg"
                  alt={copy.portraitAlt}
                  sizes="(min-width: 1024px) 420px, 384px"
                  className="aspect-[4/5] w-full object-cover object-[50%_30%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent"
                />
              </div>
              <figcaption className="absolute -bottom-6 start-6 rounded-lg border border-gold-500/30 bg-navy-900/95 px-4 py-3 shadow-lift backdrop-blur">
                <p className="text-sm font-semibold text-white">{copy.name}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{copy.role}</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="eyebrow text-gold-300">{copy.eyebrow}</p>
            <h2
              id="founder-heading"
              className="mt-3 font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl"
            >
              {copy.title}
            </h2>

            <blockquote className="relative mt-14">
              <Quote
                aria-hidden="true"
                className="absolute -top-2 start-0 h-8 w-8 -translate-x-1/2 -translate-y-full text-gold-500/40 rtl:translate-x-1/2 rtl:-scale-x-100"
              />
              <div className="prose-measure space-y-5 border-s border-gold-500/40 ps-6 text-base leading-relaxed text-navy-200 sm:text-lg">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="font-display text-2xl leading-snug text-gold-300 sm:text-3xl">{copy.closing}</p>
              </div>
            </blockquote>

            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-3xl italic text-white">{copy.name}</p>
                <p className="mt-2 text-sm font-medium text-navy-300">
                  {copy.role} · {copy.company}
                </p>
                <p className="mt-1 text-sm font-medium text-gold-300">{t.common.slogan}</p>
              </div>
              <Button to="/contact" className="group shrink-0 self-start sm:self-auto">
                {t.common.letsWorkTogether}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
