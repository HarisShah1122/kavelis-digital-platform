import { Mail, Phone } from 'lucide-react'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/lib/site'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryForm } from '@/components/forms/EnquiryForm'

/** Section 14 — closing conversion section with the live enquiry form. */
export function HomeContact() {
  const { t } = useI18n()
  const copy = t.home.contact
  const phoneLabels = { uae: t.footer.uae, ksa: t.footer.ksa }

  return (
    <section id="start" className="section relative overflow-hidden bg-navy-900 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -start-40 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-3xl"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-gold-300">{copy.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-navy-200 sm:text-lg">{copy.description}</p>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">{copy.direct}</p>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href={`mailto:${siteConfig.businessEmail}`}
                    className="group inline-flex items-center gap-3 text-lg font-semibold text-white"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold-400 transition-colors group-hover:border-gold-400">
                      <Mail aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="link-underline">{siteConfig.businessEmail}</span>
                  </a>
                </li>
                {siteConfig.phones.map((phone) => (
                  <li key={phone.id}>
                    <a href={`tel:${phone.tel}`} className="group inline-flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold-400 transition-colors group-hover:border-gold-400">
                        <Phone aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span>
                        <span dir="ltr" className="link-underline block text-lg font-semibold text-white">
                          {phone.display}
                        </span>
                        <span className="block text-xs text-navy-300">{phoneLabels[phone.id]}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <EnquiryForm onDark />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
