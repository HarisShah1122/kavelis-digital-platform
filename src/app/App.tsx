import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Languages } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'
import { useScrollManager } from '@/hooks/useScrollManager'
import { isTranslatedRoute, useI18n } from '@/i18n'

const Home = lazy(() => import('@/pages/Home'))
const Services = lazy(() => import('@/pages/Services'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const Products = lazy(() => import('@/pages/Products'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Work = lazy(() => import('@/pages/Work'))
const CaseStudy = lazy(() => import('@/pages/CaseStudy'))
const Portfolio = lazy(() => import('@/pages/Portfolio'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Solutions = lazy(() => import('@/pages/Solutions'))
const About = lazy(() => import('@/pages/About'))
const Careers = lazy(() => import('@/pages/Careers'))
const Contact = lazy(() => import('@/pages/Contact'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function RouteFallback() {
  const { t } = useI18n()
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label={t.common.loading}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-gold-600" />
    </div>
  )
}

export default function App() {
  useScrollManager()
  const { pathname } = useLocation()
  const { lang, t } = useI18n()

  // Untranslated pages keep their English body LTR inside the Arabic chrome.
  const englishOnly = lang === 'ar' && !isTranslatedRoute(pathname)

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-skip focus:rounded-lg focus:bg-navy-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t.common.skipToContent}
      </a>
      <Navbar />
      {englishOnly ? (
        <p className="flex items-center justify-center gap-2 border-b border-gold-200 bg-gold-50 px-5 py-2.5 text-center text-sm text-gold-900">
          <Languages aria-hidden="true" className="h-4 w-4 shrink-0" />
          {t.common.englishOnly}
        </p>
      ) : null}
      <main
        id="main-content"
        className="flex-1"
        lang={englishOnly ? 'en' : undefined}
        dir={englishOnly ? 'ltr' : undefined}
      >
        <Suspense fallback={<RouteFallback />}>
          <div key={pathname} className="page-enter">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:caseStudyId" element={<CaseStudy />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
