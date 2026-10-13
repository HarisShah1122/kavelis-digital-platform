import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FaqItem } from '@/types'

interface AccordionProps {
  items: FaqItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className={cn('divide-y divide-navy-100 border-y border-navy-100', className)}>
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-button-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-navy-950 transition-colors hover:text-electric-700"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'h-5 w-5 shrink-0 text-charcoal-400 transition-transform duration-200',
                    open && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-button-${item.id}`}
              hidden={!open}
              className="pb-5 pr-8 text-sm leading-relaxed text-charcoal-600"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
