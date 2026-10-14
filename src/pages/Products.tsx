import { ArrowRight, Check, Puzzle } from 'lucide-react'
import { products } from '@/data/products'
import { productCategories } from '@/data/productCategories'
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

/** CSS-only visual per product category — no fabricated screenshots. */
function CategoryVisual({ variant }: { variant: number }) {
  return (
    <div aria-hidden="true" className="rounded-xl bg-navy-950 p-4">
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="h-2 w-14 rounded-full bg-white/25" />
          <span className="h-2 w-7 rounded-full bg-gold-500/70" />
        </div>
        {variant === 1 ? (
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-1">
                <div
                  className={`h-7 rounded ${i % 3 === 1 ? 'bg-gold-500/25' : 'bg-white/10'}`}
                />
                <div className="h-1 w-3/4 rounded-full bg-white/15" />
              </div>
            ))}
          </div>
        ) : variant === 2 ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={`h-6 w-6 rounded ${i === 1 ? 'bg-gold-500/40' : 'bg-white/15'}`}
                />
                <span className="h-1.5 flex-1 rounded-full bg-white/15" />
                <span className="h-1.5 w-8 rounded-full bg-gold-500/50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-16 items-end gap-1.5">
            {[40, 65, 50, 80, 58, 90, 70, 84].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t ${i % 3 === 2 ? 'bg-gold-500/70' : 'bg-white/20'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Products() {
  useSeo({
    title: 'Products',
    description:
      'Kavelis product capabilities — SaaS applications, business platforms, subscription products, e-commerce, and automation dashboards.',
    path: '/products',
  })

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Products built for how businesses run"
        description="Alongside client engagements, Kavelis designs and builds product-grade software — SaaS applications, operational platforms, subscription products, and commerce systems. Explore the categories below."
      >
        <Button to="/contact" className="group">
          Discuss Your Project
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, index) => (
              <Reveal key={category.id} delayMs={(index % 3) * 70} className="h-full">
                <article className="card card-hover flex h-full flex-col p-6">
                  <CategoryVisual variant={index % 3} />
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold tracking-tight text-navy-950">
                      {category.title}
                    </h2>
                    {category.isPlaceholder ? <Badge tone="warning">Example</Badge> : null}
                  </div>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal-500">
                    {category.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {category.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <Reveal className="flex items-start gap-4 rounded-2xl border border-warning/25 bg-warning/10 p-5">
            <Puzzle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div>
              <h2 className="text-sm font-semibold text-warning">Editable placeholders</h2>
              <p className="mt-1 text-sm leading-relaxed text-warning/90">
                The product entries below are clearly marked placeholders. Replace them in{' '}
                <code className="rounded bg-white/60 px-1.5 py-0.5 text-xs">
                  src/data/products.ts
                </code>{' '}
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
                        <Badge tone={product.isPlaceholder ? 'warning' : 'brand'}>
                          {statusLabels[product.status] ?? product.status}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gold-700">{product.tagline}</p>
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
                                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-600"
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
                          <span className="h-2 w-8 rounded-full bg-gold-500/60" />
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
                          <div className="h-14 rounded-lg bg-gold-500/20" />
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
