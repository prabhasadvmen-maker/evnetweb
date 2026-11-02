import { useSearchParams } from 'react-router-dom'
import { MapPin, MessageCircle, ShieldCheck } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import Button from '../components/ui/Button'
import { Reveal, SectionHeading } from '../components/ui/Reveal'
import { hasWhatsapp, whatsappLink } from '../config/site'
import { useI18n } from '../i18n/useI18n'

const VALID = ['birthday', 'wedding', 'corporate', 'live', 'experience', 'other']

export default function QuotePage() {
  const { t } = useI18n()
  const [params] = useSearchParams()
  const requested = params.get('category')
  const initialCategory = VALID.includes(requested) ? requested : ''

  return (
    <section className="relative overflow-hidden bg-cream pb-28 pt-36 md:pt-44">
      <div aria-hidden="true" className="orb absolute -right-40 top-20 size-[30rem] rounded-full bg-gold/20 blur-[120px]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading kicker={t('form.kicker')} title={t('form.title')} sub={t('form.sub')} />
            <Reveal delay={0.2} className="mt-10 space-y-5">
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink"><MapPin aria-hidden="true" className="size-5" /></span>
                <div>
                  <p className="font-semibold text-ink">{t('form.areaTitle')}</p>
                  <p className="text-sm text-muted">{t('form.area')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink"><ShieldCheck aria-hidden="true" className="size-5" /></span>
                <p className="text-sm leading-relaxed text-muted">{t('form.notBooking')}</p>
              </div>
              {hasWhatsapp && (
                <div className="card-light rounded-2xl p-5">
                  <p className="font-semibold text-ink">{t('form.directTitle')}</p>
                  <p className="mb-4 mt-1 text-sm text-muted">{t('form.direct')}</p>
                  <Button href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="outline" arrow={false}>
                    <span className="inline-flex items-center gap-2"><MessageCircle aria-hidden="true" className="size-4" />WhatsApp</span>
                  </Button>
                </div>
              )}
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm key={initialCategory} initialCategory={initialCategory} />
        </div>
      </div>
    </section>
  )
}
