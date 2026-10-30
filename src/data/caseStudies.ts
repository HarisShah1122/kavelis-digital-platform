import type { CaseStudy } from '@/types'

/**
 * Analytics work samples.
 *
 * These three Power BI reports are Kavelis work samples, published to show
 * dashboard design, data modelling, and reporting capability. Dashboard
 * screenshots come from the reports themselves.
 *
 * Honesty rules:
 * - Figures quoted in features and outcomes are the values shown in the
 *   dashboard dataset. They are not Kavelis business results, revenue claims,
 *   or client performance claims.
 * - No client is named, no deployment is claimed, and no permission statement
 *   is published. If a project is later confirmed and cleared for publication,
 *   add the verified details here and set `isPlaceholder` accordingly.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'fleet-cost-maintenance-dashboard',
    title: 'Fleet Cost & Maintenance Executive Dashboard',
    category: 'Business intelligence',
    summary:
      'A four-page Power BI executive report covering fleet operating cost, vehicle performance, maintenance spend, and downtime health for a trucking operation.',
    clientLabel: 'Kavelis analytics work sample',
    overview:
      'A fleet operations report built in Power BI Desktop. The brief: give leadership one place to see fuel and maintenance cost, vehicle utilization, driver and route performance, and which vehicles consume the most budget — without waiting for monthly spreadsheet packs.',
    challenge:
      'Fleet costs typically live in separate systems and spreadsheets. Fuel, maintenance, trips, and downtime are reported in isolation, so expensive vehicles, weak routes, and workshop vendors are only discovered after the money is spent.',
    solution:
      'A single Power BI report with four connected pages — Overview, Fleet Performance, Maintenance, and Cost Analysis — driven by a fleet data model with month, year, vehicle-type, and driver slicers on every page.',
    features: [
      'Executive KPI cards: fuel cost, maintenance cost, trips, operating cost, utilization %, KM per liter, cost per km, active trucks',
      'Cost trend over time comparing fuel against maintenance spend',
      'Top five most expensive vehicles and top drivers or routes by trips',
      'Maintenance cost breakdown by type (engine, suspension, AC, electrical, tires, brakes, battery, oil) and by vendor',
      'Fleet performance page: total distance, distance by vehicle type, utilization by fleet number',
      'Vehicle downtime summary with event counts, downtime hours, and a Good / Poor health status flag',
      'Trip map with location heat and month and year slicers on all pages',
    ],
    approach: [
      'Modelled fleet, trip, maintenance, and vendor data into a star schema',
      'Defined DAX measures for cost, utilization, and downtime KPIs',
      'Built the four report pages in priority order: executive overview first, detail pages after',
      'Added slicers, top-N visuals, and map layers, then cross-checked calculated totals against the dataset used to build the report',
    ],
    technologies: ['Power BI', 'DAX', 'Data modeling', 'Mapping visuals'],
    outcomes: [
      'Four connected report pages reading from one shared data model',
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
      'A one-page Power BI sales overview comparing current-year against previous-year revenue, profit, and quantity across four US regions — with monthly trends and a state map.',
    clientLabel: 'Kavelis analytics work sample',
    overview:
      'A sales overview report designed to give leadership a fast read on how each US region performs against the previous year — sales, profit, and quantity in one interactive page.',
    challenge:
      'Regional performance is often reviewed from static monthly exports. Comparing current year to previous year, spotting which regions carry growth, and seeing profit against revenue direction requires manual spreadsheet work every cycle.',
    solution:
      'A single-page Power BI dashboard with region cards (current-year sales with previous-year reference and monthly sparklines), an interactive US state map, and a region matrix with year-over-year sales, profit, and quantity — filtered by a year slicer.',
    features: [
      'Four region cards (South, Central, East, West) with current-year sales, previous-year sales, and 12-month sparklines',
      'Interactive US state map tied to the region view',
      'Region matrix comparing current year against previous year for sales, profit, and quantity with year-over-year percentages',
      'Totals row comparing the two years for sales, profit, and units sold',
      'Year slicer covering the available reporting years and a measure selector for Sales, Profit, or Quantity',
    ],
    approach: [
      'Consolidated order data into a region-friendly model with current-year and previous-year measures',
      'Built year-over-year comparison logic in DAX, including the no-prior-year edge case for the earliest year in the dataset',
      'Designed the page for one-glance regional reading: cards, then map, then detail matrix',
      'Cross-checked regional totals and year-over-year percentages against the source dataset',
    ],
    technologies: ['Power BI', 'DAX', 'Data modeling'],
    outcomes: [
      'Single-page regional view of sales, profit, and quantity with year-over-year comparison',
      'Interactive filtering by year, region, and measure',
      'Transparent year-over-year calculations, including correct handling when no previous-year data exists',
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
    clientLabel: 'Kavelis analytics work sample',
    overview:
      'A growth-focused sales report for a multi-category retail dataset: how sales grow by product and category, how actuals track against budget, and what the trend looks like going forward.',
    challenge:
      'Sales growth, budget variance, and category performance usually live in different reports. Answering "are we ahead of budget, and where is growth coming from?" means assembling numbers by hand each period.',
    solution:
      'A Power BI dashboard combining a product-level growth view, a multi-year sales trend with forecast, a category mix breakdown, and a monthly current-year, previous-year, and budget comparison with a variance table.',
    features: [
      'Sales growth percentage against sales by product, with products ranked by year-over-year growth',
      'Sales trend with a forecast line extending beyond actuals',
      'Current-year sales by category with share-of-total breakdown',
      'Monthly comparison of current-year sales, previous-year sales, and budgeted sales',
      'Category table with current-year and previous-year sales, growth %, budgeted sales, and budget variance %',
    ],
    approach: [
      'Modelled sales, budget, and product and category hierarchies into one dataset',
      'Built growth, variance, and forecast measures in DAX',
      'Laid out the page around the three leadership questions: growth source, budget status, trend',
      'Cross-checked category and product totals against the source dataset',
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
