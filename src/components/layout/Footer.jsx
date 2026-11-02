import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { Instagram, Facebook, Linkedin, Youtube } from '../ui/SocialIcons'
import Logo from '../ui/Logo'
import { SERVICES } from '../../data/services'
import { SITE, hasWhatsapp, whatsappLink } from '../../config/site'
import { useI18n } from '../../i18n/useI18n'
import { NAV_ITEMS } from '../../data/nav'

const SOCIALS = [
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
]

function ColTitle({ children }) {
  return <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">{children}</h3>
}

const linkCls = 'text-sm text-ink/75 transition-colors hover:text-gold-dark'

export default function Footer() {
  const { t } = useI18n()
  const areas = t('footer.areaList')
  const socials = SOCIALS.filter(({ key }) => SITE[key])
  const hasContact = SITE.phone || SITE.email || hasWhatsapp

  return (
    <footer className="bg-sand relative overflow-hidden pb-24 pt-20 text-ink md:pb-10">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold-gradient" />
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/75">{t('footer.desc')}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">IDEAS | EVENTS | EXPERIENCES</p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(({ key, label, icon: Icon }) => (
                  <a key={key} href={SITE[key]} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-10 place-items-center rounded-full border border-gold-dark/50 text-ink transition-colors hover:bg-gold-gradient">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <ColTitle>{t('footer.explore')}</ColTitle>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link to={item.to} className={linkCls}>{t(`nav.${item.key}`)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <ColTitle>{t('footer.services')}</ColTitle>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.key}>
                  <Link to={`/services/${s.slug}`} className={linkCls}>{t(`services.items.${s.key}.title`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ColTitle>{t('footer.areas')}</ColTitle>
            <ul className="mb-8 space-y-3">
              {areas.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-ink/75">
                  <MapPin aria-hidden="true" className="size-3.5 text-gold-dark" />
                  {a}
                </li>
              ))}
            </ul>
            <ColTitle>{t('footer.contact')}</ColTitle>
            <ul className="space-y-3 text-sm text-ink/75">
              {SITE.phone && (
                <li className="flex items-center gap-2">
                  <Phone aria-hidden="true" className="size-3.5 text-gold-dark" />
                  <a className={linkCls} href={`tel:${SITE.phone}`}>{SITE.phone}</a>
                </li>
              )}
              {SITE.email && (
                <li className="flex items-center gap-2">
                  <Mail aria-hidden="true" className="size-3.5 text-gold-dark" />
                  <a className={linkCls} href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
              )}
              {hasWhatsapp && (
                <li>
                  <a className={`${linkCls} inline-flex items-center gap-1`} href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    WhatsApp <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </li>
              )}
              {!hasContact && (
                <li>
                  <Link className={`${linkCls} inline-flex items-center gap-1`} to="/quote">
                    {t('nav.quote')} <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gold-dark/30 pt-8 text-xs text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LAXZ EVENTS. {t('footer.rights')}</p>
          <p className="max-w-md md:text-center">{t('footer.disclaimer')}</p>
          <div className="flex gap-6 md:mr-16">
            <Link to="/privacy" className={linkCls}>{t('footer.privacy')}</Link>
            <Link to="/terms" className={linkCls}>{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
