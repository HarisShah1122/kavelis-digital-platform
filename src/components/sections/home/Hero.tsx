import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { HERO_INTERVAL, heroSlides } from '@/data/home'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'
import { Picture } from '@/components/ui/Picture'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const controlClass =
  'flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-gold-400 hover:bg-gold-500 hover:text-navy-950'

/**
 * Full-bleed hero slider.
 *
 * Autoplay is driven by the active progress bar's CSS animation: when it
 * ends, the next slide shows. Pausing (button, hover, keyboard focus, hidden
 * tab) pauses that animation, so timing and visible progress never drift.
 * Under reduced motion the slideshow starts paused and never auto-advances.
 */
export function Hero() {
  const { t, dir } = useI18n()
  const copy = t.home.hero
  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(reducedMotion)
  const [interacting, setInteracting] = useState(false)
  const [hidden, setHidden] = useState(false)
  const swipeStart = useRef<number | null>(null)

  const count = heroSlides.length
  const go = useCallback((index: number) => setActive((index + count) % count), [count])
  const paused = userPaused || interacting || hidden

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const slide = heroSlides[active] ?? heroSlides[0]!
  const slideCopy = copy.slides[slide.id]
  const arrow = 'h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'

  return (
    <section
      aria-roledescription="carousel"
      aria-label={copy.label}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setInteracting(false)
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== 'mouse') swipeStart.current = event.clientX
      }}
      onPointerUp={(event) => {
        if (swipeStart.current === null) return
        const delta = event.clientX - swipeStart.current
        swipeStart.current = null
        if (Math.abs(delta) < 50) return
        const forward = dir === 'rtl' ? delta > 0 : delta < 0
        go(active + (forward ? 1 : -1))
      }}
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-navy-950 text-white lg:min-h-[calc(100svh-5rem)]"
    >
      {/* The page's one h1 stays constant; slide headlines are presentational. */}
      <h1 className="sr-only">
        Kavelis Solutions — {copy.slides.overview.lines.join(' ')}
      </h1>

      {/* Image layer — crossfade with a slow zoom on the active slide */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 lg:start-[34%]">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-out',
              index === active ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div key={index === active ? `on-${active}` : 'off'} className={cn('h-full w-full', index === active && 'hero-kenburns')}>
              <Picture
                src={item.image}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : undefined}
                sizes="(min-width: 1024px) 66vw, 100vw"
                className={cn('h-full w-full object-cover', item.imagePosition)}
              />
            </div>
          </div>
        ))}
        {/* Legibility: solid tint on mobile, a fade from the text side on desktop */}
        <div className="absolute inset-0 bg-navy-950/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy-950 lg:via-navy-950/50 lg:to-navy-950/5 rtl:lg:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -start-40 top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-gold-500/15 blur-3xl" />

      <Container className="flex flex-1 flex-col justify-center py-16 lg:py-20">
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${active + 1} ${t.common.of} ${count}: ${slideCopy.tab}`}
          aria-live={paused ? 'polite' : 'off'}
          className="max-w-2xl"
        >
          <p className="eyebrow fade-up text-gold-300">{slideCopy.eyebrow}</p>
          <p
            aria-hidden={active === 0 ? true : undefined}
            className="mt-6 font-display text-[2.6rem] leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-7xl rtl:text-[2.3rem] rtl:sm:text-5xl rtl:xl:text-6xl"
          >
            {slideCopy.lines.map((line, index) => (
              <span key={line} className="line-mask">
                <span style={{ '--line': index } as CSSProperties} className={cn(index === 2 && 'italic text-gold-400')}>
                  {line}
                </span>
              </span>
            ))}
          </p>
          <p className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-navy-200" style={{ '--delay': '380ms' } as CSSProperties}>
            {slideCopy.lead}
          </p>
          <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={{ '--delay': '500ms' } as CSSProperties}>
            <Button to={slide.to} className="group">
              {slideCopy.cta}
              <ArrowRight aria-hidden="true" className={arrow} />
            </Button>
            <Button to={siteConfig.startPath} variant="ghost-light" className="border border-white/20">
              {t.common.startProject}
            </Button>
          </div>
        </div>
      </Container>

      {/* Slide tabs with progress, plus prev / pause / next */}
      <Container className="pb-8 sm:pb-10">
        <div className="flex items-end gap-6 border-t border-white/10 pt-5">
          <div className="grid flex-1 grid-cols-4 gap-3 sm:gap-6">
            {heroSlides.map((item, index) => {
              const isActive = index === active
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(index)}
                  aria-label={`${t.common.goToSlide} ${index + 1}: ${copy.slides[item.id].tab}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group py-2 text-start"
                >
                  <span className="relative block h-0.5 overflow-hidden rounded-full bg-white/15">
                    {isActive ? (
                      <span
                        key={`progress-${active}`}
                        className="hero-progress absolute inset-0 bg-gold-500"
                        style={
                          {
                            '--hero-interval': `${HERO_INTERVAL}ms`,
                            animationPlayState: paused ? 'paused' : 'running',
                          } as CSSProperties
                        }
                        onAnimationEnd={() => {
                          if (!reducedMotion()) go(active + 1)
                        }}
                      />
                    ) : index < active ? (
                      <span className="absolute inset-0 bg-white/40" />
                    ) : null}
                  </span>
                  <span className="mt-3 hidden items-baseline gap-2 text-sm sm:flex">
                    <span className={cn('tabular-nums', isActive ? 'text-gold-400' : 'text-navy-400')}>0{index + 1}</span>
                    <span className={cn('truncate transition-colors', isActive ? 'text-white' : 'text-navy-300 group-hover:text-white')}>
                      {copy.slides[item.id].tab}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={() => go(active - 1)} aria-label={t.common.previous} className={controlClass}>
              <ArrowLeft aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-label={userPaused ? copy.play : copy.pause}
              aria-pressed={userPaused}
              className={controlClass}
            >
              {userPaused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
            </button>
            <button type="button" onClick={() => go(active + 1)} aria-label={t.common.next} className={controlClass}>
              <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
