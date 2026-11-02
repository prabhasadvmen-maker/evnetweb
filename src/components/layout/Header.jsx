import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarHeart, ChevronDown, Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import LanguageSwitch from './LanguageSwitch'
import { useI18n } from '../../i18n/useI18n'
import { lockScroll, unlockScroll } from '../../lib/scroll'
import { NAV_ITEMS } from '../../data/nav'
import { SERVICES } from '../../data/services'

export default function Header() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Close menus whenever the route changes.
    const id = requestAnimationFrame(() => { setOpen(false); setMenu(false) })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  useEffect(() => {
    if (!menu) return undefined
    const onDown = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false) }
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  useEffect(() => {
    if (!open) return undefined
    lockScroll()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const text = 'text-ink'
  const linkCls = `relative whitespace-nowrap py-2 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-gold-dark ${text}`

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'border-b border-gold/25 bg-cream/90 py-2.5 shadow-[0_10px_30px_-20px_rgba(11,11,11,.4)] backdrop-blur-xl'
            : 'bg-cream/60 py-4 backdrop-blur-md'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <Link to="/" aria-label="LAXZ EVENTS home" className="relative z-50">
            <Logo size="sm" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            <NavLink to="/" end className={linkCls}>{t('nav.home')}</NavLink>
            <NavLink to="/about" className={linkCls}>{t('nav.about')}</NavLink>

            <div ref={menuRef} className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
              <button type="button" aria-expanded={menu} aria-haspopup="true" onClick={() => setMenu((v) => !v)} className={`${linkCls} inline-flex items-center gap-1.5`}>
                {t('nav.services')}
                <ChevronDown aria-hidden="true" className={`size-3.5 transition-transform ${menu ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {menu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3"
                  >
                    <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-gold/30 bg-cream-light p-3 shadow-[0_30px_60px_-24px_rgba(11,11,11,.5)]">
                      {SERVICES.map((s) => {
                        const Icon = s.icon
                        return (
                          <li key={s.key}>
                            <Link to={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-xl p-3 text-ink transition-colors hover:bg-beige/60">
                              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink">
                                <Icon aria-hidden="true" className="size-4" />
                              </span>
                              <span className="text-sm font-medium leading-tight">{t(`services.items.${s.key}.title`)}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/gallery" className={linkCls}>{t('nav.portfolio')}</NavLink>
            <NavLink to="/contact" className={linkCls}>{t('nav.contact')}</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <div className="hidden md:block">
              <Button to="/quote" arrow={false} variant="outline" className="whitespace-nowrap !min-h-10 !px-5 !py-2.5 !text-xs">
                <span className="inline-flex items-center gap-2"><CalendarHeart aria-hidden="true" className="size-4" />{t('nav.planEvent')}</span>
              </Button>
            </div>
            <button
              type="button"
              aria-label={open ? t('nav.close') : t('nav.menu')}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 grid size-11 place-items-center rounded-full border border-ink/40 text-ink lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="glow fixed inset-0 z-[45] overflow-y-auto bg-cream lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="container-x relative flex min-h-full flex-col justify-center gap-1 pb-10 pt-28">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-gold-dark/30 py-3 font-display text-3xl font-semibold text-ink transition-colors hover:text-gold-dark sm:text-4xl"
                  >
                    <span className="font-sans text-xs font-medium text-gold-dark">0{i + 1}</span>
                    {t(`nav.${item.key}`)}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div className="mt-8 flex flex-wrap items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <LanguageSwitch />
                <Button to="/quote" onClick={() => setOpen(false)}>{t('nav.quote')}</Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
