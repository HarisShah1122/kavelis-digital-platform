/**
 * Build-time prerender of per-route HTML metadata.
 *
 * The site is a client-rendered React SPA, so crawlers and social scrapers that
 * do not execute JavaScript would otherwise only ever see the default tags in
 * index.html. This script runs after `vite build` and writes a small HTML file
 * per route (dist/<route>/index.html) with that route's title, description,
 * canonical URL, Open Graph tags, Twitter/X tags, and structured data baked in.
 *
 * Netlify serves these files ahead of the SPA redirect, so:
 *   - /portfolio  → dist/portfolio/index.html (real metadata)
 *   - /unknown    → /* redirect → dist/index.html (client router renders 404)
 *
 * The React app applies the same values at runtime through useSeo(), so the
 * client and the static HTML never disagree.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const templatePath = join(dist, 'index.html')
const seoPath = join(root, 'src', 'data', 'seo.json')

if (!existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found — run `vite build` first.')
  process.exit(1)
}

const template = readFileSync(templatePath, 'utf8')
const seo = JSON.parse(readFileSync(seoPath, 'utf8'))
const siteUrl = (process.env.VITE_SITE_URL ?? 'https://kavelis.llc').replace(/\/$/, '')

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function setTag(html, tagName, attributes, selfClose = false) {
  const attrPairs = Object.entries(attributes)
  const key = attrPairs[0]
  const matcher = new RegExp(
    `<${tagName}\\s+[^>]*${key[0]}="${escapeRegExp(key[1])}"[^>]*${selfClose ? '\\s*/?' : ''}>`,
  )
  const rendered = `<${tagName} ${attrPairs
    .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
    .join(' ')}${selfClose ? ' /' : ''}>`
  return matcher.test(html) ? html.replace(matcher, rendered) : html.replace('</head>', `  ${rendered}\n  </head>`)
}

function setJsonLd(html, data) {
  if (!data) return html
  const rendered = `<script type="application/ld+json" id="route-jsonld">${JSON.stringify(
    data,
  )}</script>`
  if (html.includes('id="route-jsonld"')) {
    return html.replace(/<script type="application\/ld\+json" id="route-jsonld">[\s\S]*?<\/script>/, rendered)
  }
  return html.replace('</head>', `    ${rendered}\n  </head>`)
}

function buildPage(route, meta) {
  const fullTitle = meta.fullTitle ?? `${meta.title} | Kavelis`
  const description = meta.description ?? ''
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`
  const image = `${siteUrl}${meta.image ?? '/og-image.png'}`

  let html = template

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`)
  html = setTag(html, 'link', { rel: 'canonical', href: canonical })
  html = setTag(html, 'meta', { name: 'description', content: description }, true)
  html = setTag(html, 'meta', { name: 'robots', content: meta.noindex ? 'noindex, nofollow' : 'index, follow' }, true)
  html = setTag(html, 'meta', { property: 'og:url', content: canonical }, true)
  html = setTag(html, 'meta', { property: 'og:title', content: fullTitle }, true)
  html = setTag(html, 'meta', { property: 'og:description', content: description }, true)
  html = setTag(html, 'meta', { property: 'og:image', content: image }, true)
  html = setTag(html, 'meta', { name: 'twitter:title', content: fullTitle }, true)
  html = setTag(html, 'meta', { name: 'twitter:description', content: description }, true)
  html = setTag(html, 'meta', { name: 'twitter:image', content: image }, true)
  html = setJsonLd(html, meta.jsonLd)

  const outFile = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  return outFile
}

const routes = Object.keys(seo)
routes.forEach((route) => buildPage(route, seo[route]))
console.log(`[prerender] wrote metadata for ${routes.length} routes.`)
