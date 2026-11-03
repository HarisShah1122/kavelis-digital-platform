import { Children, useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

interface CarouselProps {
  label: string
  children: ReactNode
  /** Tailwind width classes for each slide. */
  slideClassName?: string
  onDark?: boolean
}

/**
 * Horizontal carousel built on native scroll-snap.
 *
 * Touch swipe and trackpads use native scrolling; mouse users can drag.
 * Prev/next, dots, and arrow keys move one slide at a time via
 * scrollIntoView, which handles LTR and RTL scroll coordinates for us.
 * No autoplay.
 */
export function Carousel({ label, children, slideClassName, onDark = false }: CarouselProps) {
  const { t, dir } = useI18n()
  const slides = Children.toArray(children)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false })

  const [atEnd, setAtEnd] = useState(false)

  // Active slide = the one whose start edge is nearest the track's start edge.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const update = () => {
      const trackRect = track.getBoundingClientRect()
      let best = 0
      let bestDistance = Infinity
      Array.from(track.children).forEach((child, index) => {
        const rect = child.getBoundingClientRect()
        const distance = Math.abs(dir === 'rtl' ? rect.right - trackRect.right : rect.left - trackRect.left)
        if (distance < bestDistance) {
          bestDistance = distance
          best = index
        }
      })
      setActive(best)
      setAtEnd(Math.abs(track.scrollLeft) + track.clientWidth >= track.scrollWidth - 4)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [dir, slides.length])

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      const clamped = Math.max(0, Math.min(slides.length - 1, index))
      const slide = track?.children[clamped] as HTMLElement | undefined
      if (!track || !slide) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      // Scroll the track only — scrollIntoView would also move the page.
      const offset =
        dir === 'rtl'
          ? slide.offsetLeft + slide.offsetWidth - track.offsetWidth
          : slide.offsetLeft
      track.scrollTo({ left: offset, behavior: reduced ? 'auto' : 'smooth' })
    },
    [dir, slides.length],
  )

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    if (event.key === forward) {
      event.preventDefault()
      goTo(active + 1)
    } else if (event.key === backward) {
      event.preventDefault()
      goTo(active - 1)
    }
  }

  // Mouse drag (touch and pen already scroll natively).
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !trackRef.current) return
    drag.current = { down: true, startX: event.clientX, startScroll: trackRef.current.scrollLeft, moved: false }
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!drag.current.down || !track) return
    const delta = event.clientX - drag.current.startX
    if (Math.abs(delta) > 5 && !drag.current.moved) {
      drag.current.moved = true
      track.setPointerCapture(event.pointerId)
      track.style.scrollSnapType = 'none'
    }
    if (drag.current.moved) track.scrollLeft = drag.current.startScroll - delta
  }
  const endDrag = () => {
    const track = trackRef.current
    if (!drag.current.down || !track) return
    drag.current.down = false
    track.style.scrollSnapType = ''
    if (drag.current.moved) goTo(active)
  }

  const controlClass = cn(
    'inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-35',
    onDark
      ? 'border-white/20 text-white hover:border-gold-400 hover:bg-gold-500 hover:text-navy-950'
      : 'border-navy-200 text-navy-950 hover:border-gold-400 hover:bg-gold-50',
  )

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(event) => {
          // A drag should not count as a click on a link inside the slide.
          if (drag.current.moved) {
            event.preventDefault()
            event.stopPropagation()
            drag.current.moved = false
          }
        }}
        className="no-scrollbar relative flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:gap-6"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            data-index={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} ${t.common.of} ${slides.length}`}
            className={cn('shrink-0 snap-start', slideClassName)}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${t.common.goToSlide} ${index + 1}`}
              aria-current={active === index ? 'true' : undefined}
              className={cn(
                'h-1.5 rounded-full transition-all duration-400',
                active === index ? 'w-8 bg-gold-500' : onDark ? 'w-3 bg-white/25 hover:bg-white/50' : 'w-3 bg-navy-200 hover:bg-navy-300',
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className={cn('hidden text-sm tabular-nums sm:inline', onDark ? 'text-navy-300' : 'text-charcoal-500')}>
            {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={t.common.previous} className={controlClass}>
            <ArrowLeft aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={atEnd}
            aria-label={t.common.next}
            className={controlClass}
          >
            <ArrowRight aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  )
}
