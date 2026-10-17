import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const principles = [
  {
    title: 'Ship and run, not just ship',
    description:
      'Maintenance, monitoring, and handover are part of the work — because most of a product’s life happens after launch.',
  },
  {
    title: 'You own everything we build',
    description:
      'Source code, documentation, and credentials are yours from day one. No hostage-taking, no proprietary lock-in.',
  },
  {
    title: 'Honest pricing models',
    description:
      'Listed subscription prices, listed product prices, and custom quotes only where scope genuinely varies.',
  },
]

/** Short editorial introduction between the hero and the service grid. */
export function IntroStrip() {
  return (
    <section className="border-b border-navy-100 bg-white">
      <Container className="section-tight">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Who we build for</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              Growing businesses that need software to work — not demos that impress once
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              Kavelis works with founders, operations leads, and product teams who have real users
              and real constraints. Whether the job is a subscription product, a ready-made
              system from our catalog, or a custom build, the standard is the same: software your
              team can rely on every working day.
            </p>
          </Reveal>

          <div className="space-y-6">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delayMs={index * 70}>
                <div className="border-l-2 border-gold-500 pl-5">
                  <h3 className="text-sm font-bold text-navy-950">{principle.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
