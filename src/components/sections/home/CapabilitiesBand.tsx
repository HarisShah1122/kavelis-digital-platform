import { useI18n } from '@/i18n'
import { Marquee } from '@/components/ui/Marquee'

const Star = () => (
  <span aria-hidden="true" className="mx-6 text-gold-500 sm:mx-10">
    ✦
  </span>
)

/** Section 03 — full-width capability marquees, opposite directions. */
export function CapabilitiesBand() {
  const { t } = useI18n()
  const items = t.home.capabilities

  return (
    <section aria-label={t.home.capabilitiesLabel} className="overflow-hidden bg-navy-950 py-10 sm:py-14">
      <Marquee
        items={items}
        label={t.home.capabilitiesLabel}
        duration={45}
        separator={<Star />}
        renderItem={(item) => (
          <span className="whitespace-nowrap font-display text-4xl uppercase leading-none text-white sm:text-6xl lg:text-7xl">
            {item}
          </span>
        )}
      />
      <Marquee
        items={items}
        label={t.home.capabilitiesLabel}
        reverse
        duration={55}
        className="mt-4 sm:mt-6"
        separator={<Star />}
        renderItem={(item) => (
          <span className="whitespace-nowrap text-lg font-semibold uppercase tracking-[0.2em] text-navy-400 sm:text-2xl">
            {item}
          </span>
        )}
      />
    </section>
  )
}
