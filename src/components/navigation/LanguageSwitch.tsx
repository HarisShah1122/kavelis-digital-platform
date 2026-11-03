import { Globe } from 'lucide-react'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

/** Toggles English ⇄ Arabic. The label is always shown in the target language. */
export function LanguageSwitch({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const { lang, setLang, t } = useI18n()
  const target = lang === 'ar' ? 'en' : 'ar'

  return (
    <button
      type="button"
      onClick={() => setLang(target)}
      lang={target}
      aria-label={t.common.switchLabel}
      className={cn(
        'inline-flex h-10 items-center gap-1.5 rounded-lg border px-3 text-sm font-semibold transition-colors',
        onDark
          ? 'border-white/15 text-navy-100 hover:border-gold-400 hover:text-white'
          : 'border-navy-200 text-navy-900 hover:border-gold-400 hover:bg-gold-50',
        className,
      )}
    >
      <Globe aria-hidden="true" className="h-4 w-4" />
      {t.common.switchTo}
    </button>
  )
}
