import { Mail, MapPin, MessageCircle, Phone, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import { Reveal, SectionHeading } from '../components/ui/Reveal'
import { SITE, hasWhatsapp, whatsappLink } from '../config/site'
import { useI18n } from '../i18n/useI18n'

export default function ContactPage() {
  const { t } = useI18n()
  const areas = t('footer.areaList')
  const rows = [
    SITE.phone && { icon: Phone, label: t('footer.phone'), value: SITE.phone, href: `tel:${SITE.phone}` },
    SITE.email && { icon: Mail, label: t('footer.email'), value: SITE.email, href: `mailto:${SITE.email}` },
    hasWhatsapp && { icon: MessageCircle, label: 'WhatsApp', value: t('nav.whatsapp'), href: whatsappLink() },
  ].filter(Boolean)

  return (
    <section className="glow relative overflow-hidden bg-cream pb-28 pt-36 md:pt-44">
      <div className="container-x relative">
        <SectionHeading kicker={t('footer.contact')} title={t('cta.title')} sub={t('cta.sub')} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="bg-gold-gradient rounded-3xl p-8 shadow-[0_30px_60px_-30px_rgba(184,137,70,.7)] md:p-10 lg:col-span-2">
            <h2 className="text-3xl font-semibold text-ink md:text-4xl">{t('form.title')}</h2>
            <p className="mt-3 max-w-lg text-ink/80">{t('form.sub')}</p>
            <div className="mt-8"><Button to="/quote" variant="solid">{t('nav.planEvent')}</Button></div>
          </Reveal>

          <Reveal delay={0.1} className="card-light rounded-3xl p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-ink"><MapPin aria-hidden="true" className="size-5 text-gold-dark" />{t('footer.areas')}</h2>
            <ul className="mt-4 space-y-2 text-muted">
              {areas.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </Reveal>
        </div>

        {rows.length > 0 && (
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {rows.map(({ icon: Icon, label, value, href }) => (
              <Reveal as="li" key={label}>
                <a href={href} className="card-light group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-gold-dark" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="grid size-11 place-items-center rounded-full bg-gold-gradient text-ink"><Icon aria-hidden="true" className="size-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-widest text-muted">{label}</span>
                    <span className="block truncate font-medium text-ink">{value}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 text-gold-dark transition-transform group-hover:translate-x-1" />
                </a>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
