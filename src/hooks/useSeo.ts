import { useEffect } from 'react'
import { siteConfig } from '@/lib/site'

interface SeoOptions {
  title: string
  description?: string
  path?: string
  noindex?: boolean
}

function upsertMeta(selector: string, content: string, attr: 'name' | 'property'): void {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, selector.replace(/^meta\[["']?|["']?\]$/g, ''))
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/** Applies page-level title, description, canonical URL, and Open Graph metadata. */
export function useSeo({ title, description, path = '', noindex = false }: SeoOptions): void {
  useEffect(() => {
    const fullTitle = `${title} | ${siteConfig.name}`
    const metaDescription = description ?? siteConfig.description
    const origin = siteConfig.url.replace(/\/$/, '')
    const canonicalUrl = origin ? `${origin}${path}` : ''

    document.title = fullTitle
    upsertMeta('meta[name="description"]', metaDescription, 'name')
    upsertMeta('meta[property="og:title"]', fullTitle, 'property')
    upsertMeta('meta[property="og:description"]', metaDescription, 'property')

    if (canonicalUrl) {
      upsertMeta('meta[property="og:url"]', canonicalUrl, 'property')
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonicalUrl)
    }

    upsertMeta('meta[name="robots"]', noindex ? 'noindex, nofollow' : 'index, follow', 'name')
  }, [title, description, path, noindex])
}
