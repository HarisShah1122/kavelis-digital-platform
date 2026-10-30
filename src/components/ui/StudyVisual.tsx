import { cn } from '@/lib/utils'
import type { StudyVisual as StudyVisualKind } from '@/data/portfolio'

/**
 * Original concept visuals for the e-commerce design studies.
 *
 * These are original illustrations drawn with CSS — not screenshots, and not
 * reproductions of the referenced websites. Each one interprets the design
 * principles of the category (premium accessories, packaged snacks, online
 * grocery, technical apparel) so the study can show an idea visually without
 * copying another brand's assets.
 */
function Frame({
  url,
  children,
  className,
}: {
  url: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-navy-200 bg-white shadow-card', className)}>
      <div className="flex items-center gap-2 border-b border-navy-100 bg-navy-50 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-navy-300" />
        <span className="h-2 w-2 rounded-full bg-navy-300" />
        <span className="h-2 w-2 rounded-full bg-navy-300" />
        <span className="ml-2 truncate rounded-md bg-white px-2.5 py-0.5 text-[10px] font-medium text-charcoal-500">
          {url}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden">{children}</div>
    </div>
  )
}

function AccessoriesVisual() {
  const swatches = ['#1C1A17', '#8A5A34', '#B3342F', '#F2EDE6']
  return (
    <Frame url="showtote.com — concept visual" className="h-full">
      <div className="flex h-full flex-col bg-[#F4F0EA]">
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="font-display text-[13px] tracking-wide text-[#1C1A17]">SHOWroom</span>
          <div className="flex gap-3 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#5A5248]">
            <span>Leather</span>
            <span>Clear</span>
            <span>Accessories</span>
          </div>
        </div>
        <div className="relative mx-4 mb-3 flex-1 overflow-hidden rounded-lg bg-[#1C1A17]">
          <div className="absolute inset-0 flex items-end justify-center gap-3 pb-4">
            {['#8A5A34', '#E9E2D6', '#B3342F'].map((tone, index) => (
              <div
                key={tone}
                className="rounded-t-md"
                style={{
                  background: tone,
                  width: index === 1 ? '19%' : '15%',
                  height: `${[52, 68, 44][index]}%`,
                }}
              />
            ))}
          </div>
          <div className="absolute left-4 top-4 max-w-[45%]">
            <p className="font-display text-[15px] leading-tight text-white">New collection</p>
            <p className="mt-1 text-[7.5px] leading-relaxed text-white/70">
              Refined silhouettes designed to pass the security gate.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 pb-2">
          <span className="rounded-full bg-[#1C1A17] px-2.5 py-1 text-[7.5px] font-semibold uppercase tracking-wider text-white">
            Find your venue
          </span>
          <span className="h-4 flex-1 rounded-full border border-[#D8CEC0] bg-white" />
        </div>
        <div className="grid grid-cols-4 gap-2 px-4 pb-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index}>
              <div className="h-8 rounded-md bg-white" />
              <div className="mt-1.5 flex gap-1">
                {swatches.slice(0, 2).map((swatch) => (
                  <span
                    key={swatch}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: swatch }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function SnacksVisual() {
  const products = [
    { fill: '#E4573D', cap: '#2A1A14' },
    { fill: '#F0B429', cap: '#2A1A14' },
    { fill: '#2E8B74', cap: '#F7F3EC' },
  ]
  return (
    <Frame url="skinnydipped.com — concept visual" className="h-full">
      <div className="flex h-full flex-col bg-white">
        <div className="flex items-center justify-between bg-[#2A1A14] px-4 py-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">
            Snacks
          </span>
          <div className="flex gap-3 text-[7.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
            <span>Cups</span>
            <span>Bites</span>
            <span>Variety</span>
          </div>
        </div>
        <div className="relative flex flex-1 items-center overflow-hidden bg-[#F7F3EC] px-4">
          <div className="max-w-[46%]">
            <p className="font-display text-[19px] leading-[0.95] text-[#2A1A14]">
              Snacks that
              <br />
              hit different
            </p>
            <div className="mt-2.5 h-1.5 w-16 rounded-full bg-[#E4573D]" />
            <div className="mt-1.5 h-1.5 w-11 rounded-full bg-[#2A1A14]/20" />
          </div>
          <div className="absolute bottom-0 right-4 top-0 flex items-end gap-2">
            {products.map((product, index) => (
              <div key={product.fill} className="flex flex-col items-center">
                <div
                  className="rounded-t-lg"
                  style={{ background: product.fill, width: 22, height: 30 + index * 10 }}
                />
                <div
                  className="rounded-b-md"
                  style={{ background: product.cap, width: 22, height: 7 }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 px-4 py-3">
          {products.map((product) => (
            <div key={product.fill}>
              <div
                className="h-7 rounded-md"
                style={{ background: `${product.fill}22`, border: `1px solid ${product.fill}55` }}
              />
              <div className="mt-1 h-1.5 w-3/4 rounded-full bg-[#2A1A14]/15" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function GroceryVisual() {
  return (
    <Frame url="halalworlddepot.com — concept visual" className="h-full">
      <div className="flex h-full flex-col bg-[#FBF8F2]">
        <div className="flex items-center justify-between bg-[#1F4D3A] px-4 py-2">
          <span className="font-display text-[11px] tracking-wide text-white">Market</span>
          <div className="flex gap-3 text-[7.5px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <span>Bundles</span>
            <span>Beef</span>
            <span>Chicken</span>
            <span>Build a box</span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 p-4">
          {[
            { label: 'Small', packs: 4 },
            { label: 'Medium', packs: 6 },
            { label: 'Large', packs: 8 },
          ].map((tier, index) => (
            <div
              key={tier.label}
              className={cn(
                'flex flex-col rounded-lg border p-2',
                index === 1 ? 'border-[#1F4D3A] bg-white' : 'border-[#E4DCCB] bg-white/70',
              )}
            >
              <span className="text-[8px] font-bold uppercase tracking-wider text-[#1F4D3A]">
                {tier.label}
              </span>
              <div className="mt-1.5 flex flex-1 flex-col justify-center gap-1">
                {Array.from({ length: tier.packs }).map((_, pack) => (
                  <span
                    key={pack}
                    className="h-1.5 rounded-full"
                    style={{
                      background: index === 1 ? '#1F4D3A' : '#C9BEA6',
                      width: `${60 + ((pack * 13) % 40)}%`,
                    }}
                  />
                ))}
              </div>
              <span className="mt-2 h-3 rounded bg-[#1F4D3A]/10" />
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-[7.5px] font-semibold uppercase tracking-wider text-[#5B5346]">
            <span>Free delivery threshold</span>
            <span>Cold-packed shipping</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#E4DCCB]">
            <div className="h-full w-2/3 rounded-full bg-[#1F4D3A]" />
          </div>
        </div>
      </div>
    </Frame>
  )
}

function ApparelVisual() {
  return (
    <Frame url="inklineapparel.com — concept visual" className="h-full">
      <div className="flex h-full flex-col bg-white">
        <div className="flex items-center justify-between border-b border-[#E7E7E7] px-4 py-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#111]">
            Kit
          </span>
          <div className="flex gap-3 text-[7.5px] font-semibold uppercase tracking-[0.16em] text-[#6B6B6B]">
            <span>Mens</span>
            <span>Womens</span>
            <span>Layering</span>
          </div>
        </div>
        <div className="relative flex flex-1 items-stretch gap-px bg-[#E7E7E7]">
          {[
            { label: 'Shell', height: '100%' },
            { label: 'Bib', height: '82%' },
            { label: 'Mid', height: '64%' },
          ].map((piece) => (
            <div key={piece.label} className="relative flex-1 bg-[#111]">
              <div
                className="absolute inset-x-2 bottom-8 rounded-sm bg-[#F4F4F4]"
                style={{ height: piece.height, maxHeight: '62%' }}
              />
              <span className="absolute bottom-3 left-2 text-[7.5px] font-bold uppercase tracking-[0.18em] text-white">
                {piece.label}
              </span>
            </div>
          ))}
          <div className="absolute left-1/2 top-3 -translate-x-1/2 bg-white px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#111]">
            Matching kits
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex gap-1.5">
            {['#111111', '#D9D9D9'].map((tone) => (
              <span
                key={tone}
                className="h-2.5 w-2.5 rounded-full border border-[#D9D9D9]"
                style={{ background: tone }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[52, 40, 30].map((width) => (
              <span
                key={width}
                className="h-1.5 rounded-full bg-[#D9D9D9]"
                style={{ width }}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

export function StudyVisual({
  visual,
  className,
}: {
  visual: StudyVisualKind
  className?: string
}) {
  return (
    <div className={cn('h-full', className)}>
      {visual === 'accessories' ? <AccessoriesVisual /> : null}
      {visual === 'snacks' ? <SnacksVisual /> : null}
      {visual === 'grocery' ? <GroceryVisual /> : null}
      {visual === 'apparel' ? <ApparelVisual /> : null}
    </div>
  )
}
