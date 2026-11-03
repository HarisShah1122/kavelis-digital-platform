import { imageSizes } from '@/data/images'

interface PictureProps {
  /** Original image path in /public, e.g. "/show-tote.png". */
  src: string
  alt: string
  className?: string
  /** `sizes` attribute for the WebP srcset. */
  sizes?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

/**
 * Serves the optimised WebP (with an 800px variant for small screens) and
 * falls back to the original file. Width and height come from the manifest,
 * so the browser reserves space before the image loads.
 */
export function Picture({ src, alt, className, sizes = '100vw', loading = 'lazy', fetchPriority }: PictureProps) {
  const size = imageSizes[src]
  const base = src.replace(/\.(png|jpe?g)$/i, '')
  const srcSet =
    size && size.width > 800 ? `${base}-800.webp 800w, ${base}.webp ${size.width}w` : `${base}.webp`

  return (
    <picture>
      {size ? <source type="image/webp" srcSet={srcSet} sizes={sizes} /> : null}
      <img
        src={src}
        alt={alt}
        width={size?.width}
        height={size?.height}
        loading={loading}
        decoding="async"
        // React 18 warns on camelCase fetchPriority; pass the DOM attribute directly.
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        className={className}
      />
    </picture>
  )
}
