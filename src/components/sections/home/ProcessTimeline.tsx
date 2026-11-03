import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { processOrder, type ProcessStepId } from '@/data/home'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

function StepPreview({ stepId, index }: { stepId: ProcessStepId; index: number }) {
  const { t } = useI18n()
  const step = t.home.process.steps[stepId]
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-navy-100 bg-canvas px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{step.previewTitle}</p>
        <p className="text-xs font-semibold tabular-nums text-charcoal-400">
          0{index + 1} / 0{processOrder.length}
        </p>
      </div>
      <ul className="space-y-3 p-5">
        {step.preview.map((line, lineIndex) => (
          <li
            key={line}
            style={{ '--delay': `${lineIndex * 90}ms` } as CSSProperties}
            className="fade-up flex items-center gap-3 rounded-xl border border-navy-100 px-4 py-3 text-sm font-medium text-navy-900"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-700">
              <Check aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
            {line}
          </li>
        ))}
      </ul>
      <div className="px-5 pb-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-navy-100">
          <div
            className="h-full rounded-full bg-gold-500 transition-[width] duration-600 ease-out-expo"
            style={{ width: `${((index + 1) / processOrder.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Section 07 — process timeline. The active step follows normal page scroll
 * (no scroll hijacking); on desktop a sticky preview updates alongside it.
 */
export function ProcessTimeline() {
  const { t } = useI18n()
  const copy = t.home.process
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    stepRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="process">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-heading mt-4">{copy.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal-600 sm:text-lg">{copy.description}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ol className="relative">
            {/* Progress rail */}
            <span aria-hidden="true" className="absolute bottom-0 start-[1.375rem] top-0 w-px bg-navy-100" />
            <span
              aria-hidden="true"
              className="absolute start-[1.375rem] top-0 w-px bg-gold-500 transition-[height] duration-600 ease-out-expo"
              style={{ height: `${((active + 1) / processOrder.length) * 100}%` }}
            />
            {processOrder.map((stepId, index) => {
              const step = copy.steps[stepId]
              const isActive = index === active
              return (
                <li
                  key={stepId}
                  ref={(node) => {
                    stepRefs.current[index] = node
                  }}
                  data-index={index}
                  aria-current={isActive ? 'step' : undefined}
                  className="relative ps-16 pb-14 last:pb-0 lg:min-h-[30vh]"
                >
                  <span
                    className={cn(
                      'absolute start-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-400',
                      isActive ? 'border-gold-500 bg-gold-500 text-navy-950' : 'border-navy-200 bg-canvas text-charcoal-500',
                    )}
                  >
                    0{index + 1}
                  </span>
                  <p className="pt-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                    {copy.stepLabel} 0{index + 1}
                  </p>
                  <h3
                    className={cn(
                      'mt-2 text-2xl font-bold tracking-tight transition-colors duration-400 sm:text-3xl',
                      isActive ? 'text-navy-950' : 'text-charcoal-400',
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-charcoal-600">{step.description}</p>
                  <div className="mt-6 lg:hidden">
                    <StepPreview stepId={stepId} index={index} />
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-32">
              <StepPreview key={active} stepId={processOrder[active] ?? 'discover'} index={active} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
