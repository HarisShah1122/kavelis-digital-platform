import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en, type Dictionary } from '@/i18n/en'
import { ar } from '@/i18n/ar'

export type Language = 'en' | 'ar'
export type Direction = 'ltr' | 'rtl'

const STORAGE_KEY = 'kavelis-lang'
const dictionaries: Record<Language, Dictionary> = { en, ar }

/**
 * Reads the saved language. index.html applies the same value to <html>
 * before first paint, so the initial render and the document never disagree.
 */
function readStoredLanguage(): Language {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en'
  } catch {
    return 'en'
  }
}

interface I18nValue {
  lang: Language
  dir: Direction
  t: Dictionary
  setLang: (lang: Language) => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLanguage)
  const dir: Direction = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', lang === 'ar' ? 'ar_AE' : 'en_US')
  }, [lang, dir])

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage unavailable (private mode) — the choice lasts for this visit only.
    }
  }, [])

  const value = useMemo(() => ({ lang, dir, t: dictionaries[lang], setLang }), [lang, dir, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside <LanguageProvider>.')
  }
  return context
}

