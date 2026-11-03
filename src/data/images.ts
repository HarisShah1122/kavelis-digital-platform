/**
 * Intrinsic sizes of the optimised WebP images in /public (generated alongside
 * them). Each original has `name.webp` (≤1600px wide) and, when wider than
 * 800px, `name-800.webp` for small screens. Used by <Picture> to emit srcset
 * and explicit dimensions so images never cause layout shift.
 */
export const imageSizes: Record<string, { width: number; height: number }> = {
  '/api-integration-package.jpg': { width: 1536, height: 1024 },
  '/booking-appointment-platform.jpg': { width: 1343, height: 930 },
  '/business-intelligence.jpg': { width: 1536, height: 1024 },
  '/business-kpi-dashboard.jpg': { width: 1586, height: 992 },
  '/business-workflow-automation.jpg': { width: 1600, height: 1068 },
  '/CEO.jpg': { width: 1248, height: 832 },
  '/comparative-analysis.png': { width: 1203, height: 661 },
  '/crm-software.jpg': { width: 1024, height: 670 },
  '/custom-bi-solution.jpg': { width: 1000, height: 750 },
  '/custom-business-website.jpg': { width: 1024, height: 1024 },
  '/custom-reporting-automation.jpg': { width: 768, height: 512 },
  '/digital-products.jpg': { width: 1540, height: 929 },
  '/email-journey-automation.jpg': { width: 1200, height: 798 },
  '/fleet-cost-maintenance.png': { width: 652, height: 445 },
  '/halal-world-depot.png': { width: 1257, height: 581 },
  '/hr-employee-management-system.jpg': { width: 1024, height: 1024 },
  '/inkline-apparel.png': { width: 1261, height: 577 },
  '/inventory-management-system.jpg': { width: 800, height: 533 },
  '/invoicing-billing-system.jpg': { width: 1290, height: 860 },
  '/professional-ecommerce-store.jpg': { width: 1344, height: 752 },
  '/sales-analytics-dashboard.jpg': { width: 1536, height: 1024 },
  '/sales-overview.png': { width: 1170, height: 661 },
  '/show-tote.png': { width: 1267, height: 585 },
  '/skinnydipped.png': { width: 1261, height: 580 },
  '/starter-ecommerce-website.jpg': { width: 1344, height: 752 },
}
