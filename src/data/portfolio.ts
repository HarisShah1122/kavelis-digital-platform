/**
 * E-commerce portfolio entries.
 *
 * Classification rules (see PortfolioClassification): every entry must state
 * honestly what it is. The four entries below are client projects — e-commerce
 * storefronts delivered by Kavelis, published here with screenshots of the
 * live public sites.
 *
 * No entry may claim work, features, integrations, or business outcomes that
 * have not been verified. Design highlights and commerce features describe
 * what the live storefront does; they are not claims about business results.
 * Product names, prices, certifications, and brand claims belong to the
 * original businesses.
 */
export type PortfolioClassification = 'client-work' | 'internal-product' | 'design-study'

export type StudyVisual = 'accessories' | 'snacks' | 'grocery' | 'apparel'

export interface DesignObservation {
  title: string
  description: string
}

export interface PortfolioEntry {
  id: string
  /** Portfolio title shown on cards and headings. */
  title: string
  /** Brand or business name as published by the business itself. */
  brand: string
  /** Live public website. */
  brandUrl: string
  /** Product category. */
  category: string
  classification: PortfolioClassification
  /** Short line used on cards and filters. */
  classificationLabel: string
  summary: string
  /** Longer description of the brand and shopping experience. */
  overview: string
  /** Design and UX highlights of the delivered storefront. */
  designObservations: DesignObservation[]
  /** Commerce patterns the storefront uses. */
  commercePatterns: string[]
  /** What Kavelis actually did here. Always honest. */
  contribution: string
  /** Screenshot of the live storefront, served from /public. */
  image?: string
  /** Alt text for the screenshot. */
  imageAlt?: string
  /** Fallback concept visual, used only when no screenshot exists. */
  visual: StudyVisual
  /** External link label. */
  linkLabel: string
}

export const portfolioEntries: PortfolioEntry[] = [
  {
    id: 'show-tote',
    title: 'Show Tote — Premium Accessories E-commerce',
    brand: 'Show Tote',
    brandUrl: 'https://showtote.com/',
    category: 'Premium accessories & e-commerce',
    classification: 'client-work',
    classificationLabel: 'Client work',
    summary:
      'A premium leather and clear-bag retailer whose store is organised around venue bag policies — including a venue search that tells shoppers which bags are allowed.',
    overview:
      'Show Tote sells premium leather bags, clear bags, and finishing accessories such as straps and charms. The storefront is built around a real shopping problem: many venues publish strict bag policies, so the site pairs a normal product catalogue with a venue search that matches bags to events. Kavelis delivered the storefront, keeping the policy-driven tool from overwhelming the fashion-led shopping experience.',
    designObservations: [
      {
        title: 'Editorial merchandising',
        description:
          'Collection pages are framed like a lookbook, with large campaign imagery leading into a dense but legible product grid — photography carries the premium positioning before price is ever read.',
      },
      {
        title: 'Policy as a shopping feature',
        description:
          'The venue search sits inside the navigation rather than in a help page. Shoppers can move from "which bag can I carry in" straight to a product that satisfies the rule — the search is a conversion path, not documentation.',
      },
      {
        title: 'Variant clarity at card level',
        description:
          'Colour variants are shown as swatches directly on collection cards, and compact size dimensions appear alongside price, so comparison happens without opening every product page.',
      },
      {
        title: 'Two catalogues, one brand',
        description:
          'Leather and clear ranges share a visual system but are merchandised separately, letting the brand sell a fashion product and a compliance product without either diluting the other.',
      },
    ],
    commercePatterns: [
      'Collection-led navigation split by material (leather / clear) and by accessory type',
      'Colour swatches and size dimensions surfaced on collection cards',
      'Venue-policy search paired with product discovery',
      'Lookbook and editorial pages supporting the shopping journey',
      'Gift cards and accessory cross-sell alongside core products',
    ],
    contribution:
      'Client project. Kavelis delivered e-commerce design and development for the Show Tote storefront. The public store shown above is the production site, open to customers at showtote.com.',
    image: '/show-tote.png',
    imageAlt:
      'Show Tote storefront homepage — newest collection of leather and clear bags',
    visual: 'accessories',
    linkLabel: 'Visit showtote.com',
  },
  {
    id: 'skinnydipped',
    title: 'SkinnyDipped — Consumer Brand E-commerce',
    brand: 'SkinnyDipped',
    brandUrl: 'https://skinnydipped.com/',
    category: 'Consumer packaged goods & food e-commerce',
    classification: 'client-work',
    classificationLabel: 'Client work',
    summary:
      'A better-for-you snack brand storefront that combines bold packaging-led merchandising, ingredient transparency, and retail availability typical of CPG e-commerce.',
    overview:
      'SkinnyDipped sells chocolate-dipped nuts, cups, and bites, with a brand voice built on plain-spoken ingredient messaging. The store does two jobs at once: convert direct-to-consumer orders and support shoppers who ultimately buy the product in retail. Kavelis delivered the storefront work, keeping packaging, ingredient information, and retail availability working together in one shopping experience.',
    designObservations: [
      {
        title: 'Packaging does the design work',
        description:
          'The catalogue leans on colourful product photography against simple backgrounds. In CPG the package is the brand — the interface stays restrained so the products supply the colour.',
      },
      {
        title: 'Ingredient transparency in the product page',
        description:
          'Ingredients and nutrition sit in dedicated product-page tabs next to the purchase action, so a shopper checking sugar content never has to leave the page to decide.',
      },
      {
        title: 'Retail availability as a second funnel',
        description:
          'A store locator on product pages routes online visitors to physical shelves, recognising that a share of the audience will convert in-store rather than at checkout.',
      },
      {
        title: 'Repeat purchase mechanics',
        description:
          'Variety packs, a rewards programme, and subscription-style reorder cues give a low-price consumable product a reason to be bought again rather than once.',
      },
    ],
    commercePatterns: [
      'Category navigation built around product format (cups, bites, nuts, variety packs)',
      'Ingredient and nutrition tabs on product pages',
      'Store locator supporting retail purchase alongside direct sales',
      'Variety packs and cross-sell carousels for basket building',
      'Rewards programme and wholesale channel presented alongside DTC',
    ],
    contribution:
      'Client project. Kavelis delivered e-commerce design and development for the SkinnyDipped direct-to-consumer storefront. The public store shown above is the production site, open to customers at skinnydipped.com.',
    image: '/skinnydipped.png',
    imageAlt:
      'SkinnyDipped storefront homepage — product categories for wafers, bites, and cups',
    visual: 'snacks',
    linkLabel: 'Visit skinnydipped.com',
  },
  {
    id: 'halal-world-depot',
    title: 'Halal World Depot — Online Grocery E-commerce',
    brand: 'Halal World Depot',
    brandUrl: 'https://www.halalworlddepot.com/',
    category: 'Online halal grocery & meat retail',
    classification: 'client-work',
    classificationLabel: 'Client work',
    summary:
      'A cold-chain grocery store that sells halal meat nationwide — built on curated bundles, subscription reordering, tiered shipping, and visible sourcing information.',
    overview:
      'Halal World Depot sells halal meat and grocery products online, delivered nationwide in cold packaging. The store communicates sourcing standards clearly, makes freight costs predictable, and turns a high-consideration purchase into a repeatable weekly or monthly order. Kavelis delivered the storefront, building trust and steadiness into a normal shopping flow.',
    designObservations: [
      {
        title: 'Bundles reduce decision load',
        description:
          'Rather than forcing shoppers to weigh dozens of individual cuts, curated bundles and build-your-box tiers give a clear entry point and a predictable basket size.',
      },
      {
        title: 'Freight cost made legible',
        description:
          'Shipping is presented as a visible threshold ladder rather than a surprise at checkout. On a heavy, cold-shipped product, delivery cost is a merchandising decision as much as a pricing one.',
      },
      {
        title: 'Sourcing stated up front',
        description:
          'Certification, preparation standards, and sourcing information appear in navigation and policy pages rather than being buried — the trust question is answered before the cart, not after delivery.',
      },
      {
        title: 'Subscription for perishables',
        description:
          'Repeating orders with delivery intervals suit a freezer-stocking purchase pattern, and the discount is expressed against delivery count so the commitment is easy to understand.',
      },
    ],
    commercePatterns: [
      'Shop-by-category navigation organised by cut and product type',
      'Curated bundles and build-your-box tiers',
      'Subscription reordering with interval selection',
      'Tiered shipping thresholds and delivery-window communication',
      'Frequently asked questions and policy pages surfaced in the footer',
    ],
    contribution:
      'Client project. Kavelis delivered e-commerce design and development for the Halal World Depot storefront. Certifications, delivery coverage, sourcing, and shipping claims belong to Halal World Depot. The public store shown above is the production site, open to customers at halalworlddepot.com.',
    image: '/halal-world-depot.png',
    imageAlt:
      'Halal World Depot storefront homepage — the halal butcher, delivered, with featured collections',
    visual: 'grocery',
    linkLabel: 'Visit halalworlddepot.com',
  },
  {
    id: 'inkline-apparel',
    title: 'Inkline Apparel — Performance Apparel E-commerce',
    brand: 'Inkline Apparel',
    brandUrl: 'https://www.inklineapparel.com/',
    category: 'Premium ski & snowboard apparel e-commerce',
    classification: 'client-work',
    classificationLabel: 'Client work',
    summary:
      'A technical outerwear brand that sells coordinated three-piece ski kits — using product education and kit merchandising to support a premium price point.',
    overview:
      'Inkline Apparel sells ski and snowboard outerwear designed as coordinated kits: shell jackets, bibs, and mid-layers that are sold together or separately. Technical apparel carries a high price and a high return risk, so the store has to educate as much as it sells. Kavelis delivered the storefront, supporting a considered purchase with specification detail and kit-based merchandising.',
    designObservations: [
      {
        title: 'Kit-first merchandising',
        description:
          'Men\u2019s and women\u2019s kit pages lead with a complete coordinated outfit, then break it into individual pieces — the outfit is the product, and the garment is the upsell.',
      },
      {
        title: 'Specification as sales copy',
        description:
          'Construction details such as waterproofing, zippers, and fill are presented as concise bullet specifications on the product card and page, where a technical buyer looks first.',
      },
      {
        title: 'Education reduces returns',
        description:
          'A dedicated layering guide sits in the main navigation, answering sizing and combination questions before purchase rather than after a return.',
      },
      {
        title: 'Minimal editorial layout',
        description:
          'A restrained black-and-white interface with condensed uppercase headings keeps attention on snow photography and product flat-lays — appropriate for a brand selling performance and style equally.',
      },
    ],
    commercePatterns: [
      'Kit pages bundling jacket, bib, and mid-layer',
      'Separate men\u2019s and women\u2019s discovery paths',
      'Technical specification bullets on product cards and pages',
      'Layering guide as navigational product education',
      'Seasonal collection pages and a digital catalogue',
    ],
    contribution:
      'Client project. Kavelis delivered e-commerce design and development for the Inkline Apparel storefront. Product designs and technical features belong to Inkline Apparel. The public store shown above is the production site, open to customers at inklineapparel.com.',
    image: '/inkline-apparel.png',
    imageAlt:
      'Inkline Apparel storefront homepage — matching ski kits worn on a snowy mountain',
    visual: 'apparel',
    linkLabel: 'Visit inklineapparel.com',
  },
]

export const getPortfolioEntryById = (id: string): PortfolioEntry | undefined =>
  portfolioEntries.find((entry) => entry.id === id)

/**
 * Explains the classification labels used on the portfolio page.
 * Kept next to the data so labels and explanation cannot drift apart.
 */
export const classificationExplanations: Record<PortfolioClassification, string> = {
  'client-work':
    'Client work — projects designed and developed by Kavelis for a business, with the live public store linked from the entry.',
  'internal-product':
    'Internal product — software designed, built, and owned by Kavelis.',
  'design-study':
    'Design study — an independent analysis of a public website. It demonstrates how Kavelis reads a brand and plans an e-commerce experience; it does not claim that Kavelis built the referenced site.',
}
