import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { prefersReducedMotion } from '../../lib/scroll'
import Logo from '../ui/Logo'
import { useI18n } from '../../i18n/useI18n'

const SEEN_KEY = 'laxz-preloader-seen'

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

// Brief brand reveal once per session; skipped for reduced-motion users.
export default function Preloader() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(() => !alreadySeen() && !prefersReducedMotion())

  useEffect(() => {
    if (!visible) return undefined
    const timer = setTimeout(() => {
      setVisible(false)
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        /* ignore */
      }
    }, 2100)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className="glow fixed inset-0 z-[100] grid place-items-center bg-cream"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center gap-8 px-6">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Logo size="lg" />
            </motion.div>
            <div className="h-px w-56 overflow-hidden bg-gold-dark/25">
              <motion.div className="h-full bg-gold-gradient" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.7, ease: 'easeInOut' }} />
            </div>
            <motion.p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {t('preloader.text')}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
