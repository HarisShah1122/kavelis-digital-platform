import { useMemo } from 'react'
import { useI18n } from '@/i18n'
import type { Widen } from '@/i18n/en'

/**
 * Per-page copy: English is the source, Arabic must match its shape exactly.
 * Page copy lives in src/i18n/pages/* so it loads with its page chunk instead
 * of the main bundle.
 */
export interface PageCopy<T> {
  en: T
  ar: Widen<T>
}

export function definePageCopy<T>(en: T, ar: Widen<T>): PageCopy<T> {
  return { en, ar }
}

export function usePageCopy<T>(copy: PageCopy<T>): Widen<T> {
  const { lang } = useI18n()
  return copy[lang] as Widen<T>
}

/**
 * Arabic overlay for a data collection: the translatable fields of every
 * item, keyed by id. Non-text fields (ids, prices, images, links) always come
 * from the English source, so they can never drift between languages.
 */
export type Overlay<T extends { id: string }, K extends keyof T> = Record<string, Pick<T, K>>

export function localizeItems<T extends { id: string }, K extends keyof T>(
  items: readonly T[],
  overlay: Overlay<T, K>,
  lang: 'en' | 'ar',
): T[] {
  if (lang === 'en') return [...items]
  return items.map((item) => ({ ...item, ...overlay[item.id] }))
}

/** Hook form of localizeItems, memoised per language. */
export function useLocalizedItems<T extends { id: string }, K extends keyof T>(
  items: readonly T[],
  overlay: Overlay<T, K>,
): T[] {
  const { lang } = useI18n()
  return useMemo(() => localizeItems(items, overlay, lang), [items, overlay, lang])
}
