import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Hammer } from 'lucide-react'
import { showcaseProducts } from '@/data/home'
import { internalProducts } from '@/data/internalProducts'
import { formatPrice, getMarketplaceProductById } from '@/data/marketplace'
import { useI18n } from '@/i18n'
import type { Dictionary } from '@/i18n/en'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Picture } from '@/components/ui/Picture'

type PipelineId = keyof Dictionary['home']['products']['pipeline']

/** Section 08 — real catalogue products presented as commercial software. */
export function ProductShowcase() {
  const { t, dir } = useI18n()
  const copy = t.home.products
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const activeId = showcaseProducts[activeIndex] ?? 'hr-employee-management-system'
  const item = copy.items[activeId]
  const product = getMarketplaceProductById(activeId)

  // Roving focus across tabs: arrows follow reading direction, Home/End jump.
  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = showcaseProducts.length - 1
    const next = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const prev = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    let target: number | null = null
    if (event.key === next || event.key === 'ArrowDown') target = activeIndex === last ? 0 : activeIndex + 1
    else if (event.key === prev || event.key === 'ArrowUp') target = activeIndex === 0 ? last : activeIndex - 1
    else if (event.key === 'Home') target = 0
    else if (event.key === 'End') target = last
    if (target === null) return
    event.preventDefault()
    setActiveIndex(target)
    tabRefs.current[target]?.focus()
  }

  return (
    <Section className="border-t border-navy-100 bg-white">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-heading mt-4">{copy.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal-600 sm:text-lg">{copy.description}</p>
        </Reveal>

        <Reveal delayMs={80} className="mt-12">
          <div
            role="tablist"
            aria-label={copy.tabsLabel}
            onKeyDown={onTabKeyDown}
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
          >
            {showcaseProducts.map((id, index) => (
              <button
                key={id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`product-tab-${id}`}
                aria-selected={index === activeIndex}
                aria-controls="product-panel"
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-250',
                  index === activeIndex
                    ? 'border-navy-950 bg-navy-950 text-white'
                    : 'border-navy-200 text-charcoal-600 hover:border-gold-400 hover:text-navy-950',
                )}
              >
                {copy.items[id].name}
              </button>
            ))}
          </div>

          <div
            id="product-panel"
            role="tabpanel"
            aria-labelledby={`product-tab-${activeId}`}
            key={activeId}
            className="page-enter mt-8 grid overflow-hidden rounded-[1.75rem] border border-navy-100 bg-canvas lg:grid-cols-[1.1fr_1fr]"
          >
            <figure className="relative bg-navy-950">
              {product?.image ? (
                <Picture
                  src={product.image}
                  alt={`${item.name} — ${copy.previewNote}`}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="h-full max-h-[34rem] min-h-[18rem] w-full object-cover"
                />
              ) : null}
              <figcaption className="absolute bottom-3 start-3 rounded-md bg-navy-950/80 px-2.5 py-1 text-[11px] text-navy-200 backdrop-blur">
                {copy.previewNote}
              </figcaption>
            </figure>

            <div className="flex flex-col p-8 sm:p-10">
              <h3 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{item.name}</h3>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{copy.problem}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-charcoal-600">{item.problem}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{copy.solves}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-navy-900">{item.solves}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{copy.modules}</dt>
                  <dd>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                      {item.modules.map((module) => (
                        <li key={module} className="flex items-start gap-2 text-sm text-navy-900">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                          {module}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{copy.users}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-navy-900">{item.users}</dd>
                </div>
              </dl>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-navy-100 pt-6">
                {product ? (
                  <p className="text-sm text-charcoal-500">
                    {t.form.startingAt}{' '}
                    <span dir="ltr" className="text-lg font-bold text-navy-950">
                      {formatPrice(product.startingPrice)}
                    </span>
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-3">
                  <Button to={`/contact?product=${activeId}`} variant="secondary">
                    {copy.ask}
                  </Button>
                  <Button to={`/products/${activeId}`} className="group">
                    {copy.cta}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Own products still being built — clearly labelled, no capability claims */}
        <Reveal delayMs={120} className="mt-10 grid gap-4 rounded-2xl border border-dashed border-navy-200 p-6 sm:p-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-navy-950">
              <Hammer aria-hidden="true" className="h-4 w-4 text-gold-600" />
              {copy.pipelineTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{copy.pipelineNote}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {internalProducts.map((internal) => {
              const pipeline = copy.pipeline[internal.id as PipelineId]
              return (
                <li key={internal.id} className="flex flex-col rounded-xl bg-canvas p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-400">{pipeline.category}</p>
                  <p dir="ltr" className="mt-1 self-start text-base font-bold text-navy-950">
                    {internal.name}
                  </p>
                  <p className="mt-1 text-sm text-charcoal-600">{pipeline.summary}</p>
                  <Link
                    to={`/contact?product=${internal.id}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
                  >
                    {copy.register}
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
