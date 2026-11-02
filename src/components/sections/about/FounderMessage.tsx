import { ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const paragraphs = [
  'I founded Kavelis Solutions with a simple vision: to help businesses turn complex challenges into smarter, practical technology solutions.',
  'I believe technology should do more than support business operations. It should simplify workflows, eliminate repetitive tasks, improve decision-making, and create opportunities for growth.',
  'At Kavelis Solutions, we focus on building custom software, business automation systems, web applications, and intelligent dashboards that solve real business problems.',
  'My goal is to build long-term partnerships based on trust, innovation, transparency, and delivering solutions that create measurable value.',
  'We are committed to helping businesses work smarter, automate better, and scale with confidence.',
]

/**
 * Founder & CEO message. Uses logical (start/end) utilities throughout so the
 * layout mirrors correctly when rendered inside a dir="rtl" context.
 */
export function FounderMessage() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="section relative overflow-hidden bg-navy-950 text-white"
    >
      {/* Soft gold glow behind the portrait */}
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
              <div className="relative overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-white/10">
                <img
                  src="/CEO.jpg"
                  alt="Portrait of Asad Ullah Khan, Founder & CEO of Kavelis Solutions"
                  width={1248}
                  height={832}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-[50%_30%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent"
                />
              </div>
              <figcaption className="absolute -bottom-6 start-6 rounded-lg border border-gold-500/30 bg-navy-900/95 px-4 py-3 shadow-lift backdrop-blur">
                <p className="text-sm font-semibold text-white">Asad Ullah Khan</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                  Founder &amp; CEO
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delayMs={100}>
            <p className="eyebrow text-gold-300">Leadership</p>
            <h2
              id="founder-heading"
              className="mt-3 font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl"
            >
              A Message from the Founder
            </h2>

            <blockquote className="relative mt-14">
              <Quote
                aria-hidden="true"
                className="absolute -top-2 start-0 h-8 w-8 -translate-x-1/2 -translate-y-full text-gold-500/40 rtl:translate-x-1/2 rtl:-scale-x-100"
              />
              <div className="prose-measure space-y-5 border-s border-gold-500/40 ps-6 text-base leading-relaxed text-navy-200 sm:text-lg">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="font-display text-2xl leading-snug text-gold-300 sm:text-3xl">
                  Let’s build something meaningful together.
                </p>
              </div>
            </blockquote>

            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-3xl italic text-white">Asad Ullah Khan</p>
                <p className="mt-2 text-sm font-medium text-navy-300">
                  Founder &amp; CEO, Kavelis Solutions
                  <span aria-hidden="true" className="mx-2 text-gold-500">
                    ·
                  </span>
                  <span className="text-gold-300">Build smarter. Automate better. Scale faster.</span>
                </p>
              </div>
              <Button to="/contact" className="group shrink-0 self-start sm:self-auto">
                Let’s Work Together
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
