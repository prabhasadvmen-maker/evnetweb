import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Preloader from './components/layout/Preloader'
import SmoothScroll from './components/layout/SmoothScroll'
import FloatingActions from './components/layout/FloatingActions'
import Home from './pages/Home'
const ServicePage = lazy(() => import('./pages/ServicePage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const QuotePage = lazy(() => import('./pages/QuotePage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { useI18n } from './i18n/useI18n'
import { ScrollTrigger } from './lib/scroll'

// Fade/rise page transition; ScrollTrigger is refreshed once the new page has mounted.
function PageTransition({ children }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => ScrollTrigger.refresh()}
    >
      <Suspense fallback={<div className="min-h-[60svh]" />}>{children}</Suspense>
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()
  const { t } = useI18n()

  return (
    <>
      <a href="#main" className="skip-link">{t('skip')}</a>
      <Preloader />
      <SmoothScroll />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services/:slug" element={<PageTransition><ServicePage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
          <Route path="/quote" element={<PageTransition><QuotePage /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><LegalPage kind="privacy" /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><LegalPage kind="terms" /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
    </>
  )
}
