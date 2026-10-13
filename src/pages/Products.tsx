import { ArrowRight, Check, Puzzle } from 'lucide-react'
import { products } from '@/data/products'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'

const statusLabels: Record<string, string> = {
  placeholder: 'Placeholder',
  'in-development': 'In development',
  beta: 'Beta',
  live: 'Live',
}

export default function Products() {
  useSeo({
    title: 'Products',
    description:
      'The Kavelis product portfolio — configurable platforms for memberships, billing, customer portals, and business automation.',
    path: '/products',
  })

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Products built by Kavelis"
        description="Alongside client engagements, we develop our own products for recurring operational problems. This page is structured to scale as verified products are published."
      />

      <Section className="border-b border-navy-100">
        <Container>
          <Reveal className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <Puzzle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div>
              <h2 className="text-sm font-semibold text-amber-900">Editable placeholders</h2>
              <p className="mt-1 text-sm leading-relaxed text-amber-900/80">
                The product entries on this page are clearly marked placeholders. Replace them in{' '}
                <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">src/data/products.ts</code>{' '}
                with verified Kavelis products — real names, features, screenshots, and status —
                before publishing. Nothing here should be presented as a launched product until it
                is confirmed.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 space-y-8">
            {products.map((product, index) => (
              <Reveal key={product.id} delayMs={index * 60}>
                <article className="card overflow-hidden">
                  <div className="grid lg:grid-cols-[1.3fr_1fr]">
                    <div className="p-7 sm:p-9">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold tracking-tight text-navy-950">
                          {product.name}
                        </h2>
                        <Badge tone={product.isPlaceholder ? 'warning' : 'blue'}>
                          {statusLabels[product.status] ?? product.status}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm font-medium text-electric-700">{product.tagline}</p>
                      <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
                        {product.description}
                      </p>

                      <div className="mt-7">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                          Problem it solves
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                          {product.problem}
                        </p>
                      </div>

                      <div className="mt-7 grid gap-7 sm:grid-cols-2">
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                            Key features
                          </h3>
                          <ul className="mt-3 space-y-2">
                            {product.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-charcoal-700"
                              >
                                <Check
                                  aria-hidden="true"
                                  className="mt-0.5 h-4 w-4 shrink-0 text-electric-600"
                                />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                            Built for
                          </h3>
                          <ul className="mt-3 space-y-2">
                            {product.targetUsers.map((user) => (
                              <li key={user} className="text-sm text-charcoal-700">
                                {user}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button to={product.ctaTo} className="group">
                          {product.ctaLabel}
                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          />
                        </Button>
                      </div>
                    </div>

                    <div
                      className="flex min-h-[240px] items-center justify-center border-t border-navy-100 bg-navy-950 p-8 lg:border-l lg:border-t-0"
                      aria-hidden="true"
                    >
                      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="h-2 w-16 rounded-full bg-white/20" />
                          <span className="h-2 w-8 rounded-full bg-electric-500/60" />
                        </div>
                        <div className="space-y-2.5">
                          {[72, 54, 88, 40, 64].map((width, i) => (
                            <div
                              key={i}
                              className="h-2.5 rounded-full bg-white/10"
                              style={{ width: `${width}%` }}
                            />
                          ))}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="h-14 rounded-lg bg-white/5" />
                          <div className="h-14 rounded-lg bg-electric-500/20" />
                        </div>
                        <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-navy-500">
                          Product visual placeholder
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Interested in a Kavelis product?"
        description="Tell us which product you would like to see, or describe the problem you need solved — we can advise whether a product or a custom build is the better fit."
        secondaryLabel="View work"
        secondaryTo="/work"
      />
    </>
  )
}
