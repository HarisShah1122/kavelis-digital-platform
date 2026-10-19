import type { CaseStudy } from '@/types'

/**
 * Case study portfolio.
 *
 * These three entries are real Power BI dashboard projects. Figures quoted in
 * features and outcomes come from the dashboard screenshots in /public. Client
 * names remain unpublished. Add new projects with `isPlaceholder: true` until
 * their write-up is verified.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'fleet-cost-maintenance-dashboard',
    title: 'Fleet Cost & Maintenance Executive Dashboard',
    category: 'Business intelligence',
    summary:
      'A four-page Power BI executive report covering fleet operating cost, vehicle performance, maintenance spend, and downtime health for a trucking operation.',
    clientLabel: 'Confidential logistics fleet operator',
    overview:
      'An executive dashboard built in Power BI Desktop for a freight fleet running long-haul routes across Saudi Arabia. Leadership needed one place to see fuel and maintenance cost, vehicle utilization, driver and route performance, and which trucks were draining budget — without waiting for monthly spreadsheet packs.',
    challenge:
      'Fleet costs lived in separate systems and spreadsheets. Fuel, maintenance, trips, and downtime were reported in isolation, so expensive vehicles, weak routes, and workshop vendors were only discovered after the money was spent.',
    solution:
      'A single Power BI report with four connected pages — Overview, Fleet Performance, Maintenance, and Cost Analysis — driven by a fleet data model with month, year, vehicle-type, and driver slicers on every page.',
    features: [
      'Executive KPI cards: fuel cost, maintenance cost, trips, operating cost, utilization %, KM per liter, cost per km, active trucks',
      'Cost trend over time (fuel vs maintenance, Jan 2024 → Jan 2026)',
      'Top 5 most expensive vehicles and top 5 drivers/routes by trips',
      'Maintenance cost breakdown by type (engine, suspension, AC, electrical, tires, brakes, battery, oil) and by vendor',
      'Fleet performance page: total distance, distance by vehicle type, utilization by fleet number',
      'Vehicle downtime summary with event counts, downtime hours, and Good/Poor health status',
      'Trip map with location heat and month/year slicers across all pages',
    ],
    approach: [
      'Modelled fleet, trip, maintenance, and vendor data into a star schema',
      'Defined DAX measures for cost, utilization, and downtime KPIs',
      'Built the four report pages in priority order: executive overview first, detail pages after',
      'Added slicers, top-N visuals, and map layers, then validated totals against source data',
    ],
    technologies: ['Power BI', 'DAX', 'Data modeling', 'Mapping visuals'],
    outcomes: [
      'One four-page executive report replacing disconnected cost and maintenance reports',
      'Month, year, vehicle-type, and driver filtering available on every page',
      'Vehicle health flags (Good / Poor) derived from downtime events and hours',
      'Cost-driver visibility: maintenance by type and vendor, top expensive vehicles, route and driver leaderboards',
    ],
    image: '/fleet-cost-maintenance.png',
    isPlaceholder: false,
  },
  {
    id: 'regional-sales-dashboard',
    title: 'Regional Sales Overview Dashboard',
    category: 'Sales analytics',
    summary:
      'A one-page Power BI sales overview comparing current-year vs previous-year revenue, profit, and quantity across four US regions — with monthly trends and a state map.',
    clientLabel: 'Confidential US retail business',
    overview:
      'A sales overview report that gives leadership a fast, honest read on how each US region is performing against the previous year — sales, profit, and quantity in one interactive page.',
    challenge:
      'Regional performance was reviewed from static monthly exports. Comparing current year to previous year, spotting which regions carried growth, and seeing profit vs revenue direction required manual spreadsheet work every cycle.',
    solution:
      'A single-page Power BI dashboard with region cards (current-year sales with previous-year reference and monthly sparklines), an interactive US state map, and a region matrix with YOY sales, profit, and quantity — filtered by a year slicer.',
    features: [
      'Four region cards (South, Central, East, West) with CY sales, PY sales, and 12-month sparklines',
      'Interactive US state map tied to the region view',
      'Region matrix: CY vs PY sales, profit, and quantity with YOY percentages',
      'Totals row: $733.95K CY sales (+20% YOY), $93.58K profit (+14%), 12,515 units (+27%)',
      'Year slicer covering 2021–2024 and measure selector (Sales / Profit / Qty)',
    ],
    approach: [
      'Consolidated order data into a region-friendly model with CY/PY measures',
      'Built YOY comparison logic in DAX, including the no-prior-year edge case for 2021',
      'Designed the page for one-glance regional reading: cards → map → detail matrix',
      'Validated regional totals and YOY percentages against source exports',
    ],
    technologies: ['Power BI', 'DAX', 'Data modeling'],
    outcomes: [
      'Single-page regional view of sales, profit, and quantity with CY vs PY comparison',
      'Interactive filtering by year, region, and measure',
      'Transparent YOY calculations, including correct handling when no previous-year data exists',
      'Monthly sparklines per region so trend direction is visible without leaving the page',
    ],
    image: '/sales-overview.png',
    isPlaceholder: false,
  },
  {
    id: 'sales-growth-forecast-dashboard',
    title: 'Sales Growth & Forecast Dashboard',
    category: 'Sales analytics',
    summary:
      'A Power BI dashboard tracking product and category sales growth against budget, with a multi-year sales trend and forecast.',
    clientLabel: 'Confidential multi-category retailer',
    overview:
      'A growth-focused sales report for a multi-category retailer: how sales are growing by product and category, how actuals track against budget, and what the trend looks like going forward.',
    challenge:
      'Sales growth, budget variance, and category performance lived in different reports. Answering “are we ahead of budget, and where is growth coming from?” meant assembling numbers by hand each period.',
    solution:
      'A Power BI dashboard combining a product-level growth view, a multi-year sales trend with forecast, a category mix breakdown, and a monthly CY vs PY vs budget comparison with a variance table.',
    features: [
      'Sales growth % vs sales by product (products ranked by YoY growth, 30–34% band)',
      'Sales trend with forecast line spanning 2014–2021',
      'CY sales by category with share-of-total breakdown',
      'Monthly comparison of CY sales, PY sales, and budgeted sales',
      'Category table with CY/PY sales, growth %, budgeted sales, and budget variance %',
      'Headline totals: 888.11M CY sales vs 853.34M budget (+4.07% variance), +32.10% YoY',
    ],
    approach: [
      'Modelled sales, budget, and product/category hierarchies into one dataset',
      'Built growth, variance, and forecast measures in DAX',
      'Laid out the page around the three leadership questions: growth source, budget status, trend',
      'Cross-checked category and product totals against source figures',
    ],
    technologies: ['Power BI', 'DAX', 'Forecasting', 'Data modeling'],
    outcomes: [
      'One dashboard answering growth, budget, and trend questions without spreadsheet assembly',
      'Product-level and category-level growth visibility in the same view',
      'Budget variance shown per category and in total',
      'Forecast line extending the sales trend beyond actuals for planning conversations',
    ],
    image: '/comparative-analysis.png',
    isPlaceholder: false,
  },
]

export const getCaseStudyById = (id: string): CaseStudy | undefined =>
  caseStudies.find((study) => study.id === id)
