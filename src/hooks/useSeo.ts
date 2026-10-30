import { useEffect } from 'react'
import { siteConfig } from '@/lib/site'

interface SeoOptions {
  /** Page title segment; rendered as `${title} | Kavelis`. */
  title: string
  /** Full document title override — use when a different suffix is required. */
  fullTitle?: string
  description?: string
  /** Route path used for the canonical URL and og:url, e.g. "/careers". */
  path?: string
  /** Social sharing image path or absolute URL. Defaults to the site image. */
  image?: string
  /** Open Graph type. Defaults to "website". */
  type?: 'website' | 'article'
  noindex?: boolean
  /** Route-specific structured data, merged under a single JSON-LD script. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const DEFAULT_IMAGE = '/og-image.png'

function upsertMeta(selector: string, content: string, attr: 'name' | 'property'): void {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, selector.replace(/^meta\[["']?|["']?\]$/g, ''))
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function upsertJsonLd(data: unknown): void {
  const ID = 'route-jsonld'
  document.head.querySelector(`#${ID}`)?.remove()
  if (!data) return
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = ID
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/**
 * Applies page-level title, description, canonical URL, Open Graph, Twitter/X,
 * and structured-data metadata.
 *
 * The same values are injected into the prerendered HTML for each route by
 * scripts/prerender.mjs, so crawlers that do not execute JavaScript still see
 * complete metadata.
 */
export function useSeo({
  title,
  fullTitle,
  description,
  path = '',
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoOptions): void {
  // Stable dependency: structured data objects are usually defined inline.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const documentTitle = fullTitle ?? `${title} | ${siteConfig.name}`
    const metaDescription = description ?? siteConfig.description
    const origin = siteConfig.url.replace(/\/$/, '')
    const canonicalUrl = origin ? `${origin}${path}` : ''
    const imageUrl = image
      ? image.startsWith('http')
        ? image
        : `${origin}${image}`
      : `${origin}${DEFAULT_IMAGE}`

    document.title = documentTitle

    upsertMeta('meta[name="description"]', metaDescription, 'name')
    upsertMeta('meta[name="robots"]', noindex ? 'noindex, nofollow' : 'index, follow', 'name')

    upsertMeta('meta[property="og:type"]', type, 'property')
    upsertMeta('meta[property="og:site_name"]', siteConfig.name, 'property')
    upsertMeta('meta[property="og:title"]', documentTitle, 'property')
    upsertMeta('meta[property="og:description"]', metaDescription, 'property')
    upsertMeta('meta[property="og:image"]', imageUrl, 'property')
    upsertMeta('meta[property="og:image:width"]', '1200', 'property')
    upsertMeta('meta[property="og:image:height"]', '627', 'property')

    upsertMeta('meta[name="twitter:card"]', 'summary_large_image', 'name')
    upsertMeta('meta[name="twitter:title"]', documentTitle, 'name')
    upsertMeta('meta[name="twitter:description"]', metaDescription, 'name')
    upsertMeta('meta[name="twitter:image"]', imageUrl, 'name')

    if (canonicalUrl) {
      upsertMeta('meta[property="og:url"]', canonicalUrl, 'property')
      upsertLink('canonical', canonicalUrl)
    }

    upsertJsonLd(jsonLd ? (JSON.parse(jsonLdKey) as unknown) : undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, fullTitle, description, path, image, type, noindex, jsonLdKey])
}
