import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { workSlides } from '@/data/workSlides'
import { useI18n } from '@/i18n'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Carousel } from '@/components/ui/Carousel'
import { Picture } from '@/components/ui/Picture'

/** Section 05 — horizontal showcase of published client work and work samples. */
export function FeaturedWork() {
  const { t } = useI18n()
  const copy = t.home.work

  return (
    <section className="section overflow-hidden bg-navy-950 text-white">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{copy.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl">{copy.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-navy-300 sm:text-lg">{copy.description}</p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-200"
          >
            <span className="link-underline">{copy.allWork}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Reveal>

        <Reveal className="mt-14" delayMs={80}>
          <Carousel label={copy.carouselLabel} onDark slideClassName="w-[86%] sm:w-[72%] lg:w-[46%]">
            {workSlides.map((slide) => {
              const item = copy.items[slide.id]
              return (
                <article key={slide.id} className="group flex h-full flex-col">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900">
                    <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span dir="ltr" className="ms-2 truncate rounded bg-white/5 px-2 py-0.5 text-[11px] text-navy-300">
                        {slide.frameLabel}
                      </span>
                    </div>
                    <div className="aspect-[16/9] overflow-hidden bg-white">
                      <Picture
                        src={slide.image}
                        alt={`${item.title} — ${item.category}`}
                        sizes="(min-width: 1024px) 46vw, 86vw"
                        className="pointer-events-none h-full w-full select-none object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">{item.category}</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-300 sm:text-base">{item.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={copy.focusLabel}>
                      {item.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-navy-200">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
                      <Link to={slide.to} className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="link-underline">{copy.viewCase}</span>
                        <ArrowRight aria-hidden="true" className="h-4 w-4 text-gold-400 rtl:-scale-x-100" />
                      </Link>
                      {slide.externalUrl ? (
                        <a
                          href={slide.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-navy-300 hover:text-white"
                        >
                          {copy.visitSite}
                          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 rtl:-scale-x-100" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  )
}
