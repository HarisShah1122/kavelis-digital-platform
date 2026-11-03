import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { formatPrice } from '@/data/marketplace'
import { useMarketplace } from '@/i18n/data/marketplace'
import { usePageCopy } from '@/i18n/localize'
import { productsCopy } from '@/i18n/pages/products'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/utils'

const ALL = 'all'
const arrow = 'h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'

export default function Products() {
  const copy = usePageCopy(productsCopy)
  const { products, categories, internal, getCategory } = useMarketplace()

  useSeo({ title: copy.seoTitle, description: copy.seoDescription, path: '/products' })

  const [activeCategory, setActiveCategory] = useState(ALL)
  const filtered = activeCategory === ALL ? products : products.filter((product) => product.categoryId === activeCategory)
  const countFor = (id: string) => products.filter((product) => product.categoryId === id).length

  const filterButtons = [
    { id: ALL, label: copy.all, count: products.length },
    ...categories.map((category) => ({ id: category.id, label: category.title, count: countFor(category.id) })),
  ]

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <Button to="/pricing" className="group">
          {copy.compare}
          <ArrowRight aria-hidden="true" className={arrow} />
        </Button>
      </PageHero>

      {/* Internal products in development */}
      <Section className="border-b border-navy-100 bg-white">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{copy.pipelineEyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{copy.pipelineTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">{copy.pipelineDescription}</p>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {internal.map((product, index) => (
              <Reveal key={product.id} delayMs={index * 70} className="h-full">
                <article className="card flex h-full flex-col p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning ring-1 ring-inset ring-warning/30">
                      {product.statusLabel}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">{product.category}</p>
                  </div>
                  <h3 dir="ltr" className="mt-3 self-start text-xl font-bold tracking-tight text-navy-950">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">{product.summary}</p>
                  <div className="mt-5">
                    <Button to={`/contact?product=${product.id}`} variant="secondary">
                      {copy.registerInterest}
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Category intro */}
      <Section className="border-b border-navy-100 bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.id} className="border-s-2 border-gold-500 ps-4">
                <h2 className="font-sans text-sm font-bold text-navy-950">{category.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-500">{category.description}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-charcoal-400">
                  {copy.productCount(countFor(category.id))}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Filters + grid */}
      <Section>
        <Container>
          <Reveal className="mb-8">
            <div className="flex flex-wrap gap-2" role="group" aria-label={copy.filterLabel}>
              {filterButtons.map((button) => (
                <button
                  key={button.id}
                  type="button"
                  onClick={() => setActiveCategory(button.id)}
                  aria-pressed={activeCategory === button.id}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                    activeCategory === button.id
                      ? 'border-navy-950 bg-navy-950 text-white'
                      : 'border-navy-100 bg-white text-charcoal-600 hover:border-gold-300 hover:text-navy-950',
                  )}
                >
                  {button.label}
                  <span className={cn('ms-1.5 text-xs', activeCategory === button.id ? 'text-gold-400' : 'text-charcoal-400')}>
                    {button.count}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {activeCategory !== ALL ? (
            <p className="mb-6 text-sm text-charcoal-500">{getCategory(activeCategory)?.description}</p>
          ) : null}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, index) => (
              <Reveal key={product.id} delayMs={(index % 3) * 60} className="h-full">
                <article className="card card-hover group flex h-full flex-col overflow-hidden p-0">
                  {product.image ? (
                    <div className="h-44 overflow-hidden bg-navy-950">
                      <Picture
                        src={product.image}
                        alt={copy.previewAlt(product.name)}
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-bold leading-snug tracking-tight text-navy-950">{product.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">{product.description}</p>
                    <ul className="mt-4 space-y-2">
                      {product.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-charcoal-600">
                          <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 border-t border-navy-100 pt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">{copy.startingAt}</p>
                      <p className="text-lg font-bold text-navy-950">
                        <span dir="ltr">{formatPrice(product.startingPrice)}</span>
                        <span className="ms-1 text-xs font-medium text-charcoal-400">{copy.oneTime}</span>
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button to={`/products/${product.id}`} variant="secondary" className="flex-1">
                        {copy.viewDetails}
                      </Button>
                      <Button to={`/contact?product=${product.id}`} className="flex-1">
                        {copy.getProduct}
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How products work */}
      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">{copy.howEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{copy.howTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-600">{copy.howDescription}</p>
              <div className="mt-8 aspect-[2/1] overflow-hidden rounded-2xl">
                <Picture src="/digital-products.jpg" alt="" sizes="(min-width: 1024px) 480px, 100vw" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <ol className="space-y-4">
              {copy.steps.map((step, index) => (
                <Reveal key={step.title} as="li" delayMs={index * 70}>
                  <div className="flex gap-4 rounded-2xl border border-navy-100 bg-canvas p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-gold-400">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-950">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-600">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        secondaryLabel={copy.ctaSecondary}
        secondaryTo="/pricing"
      />
    </>
  )
}
