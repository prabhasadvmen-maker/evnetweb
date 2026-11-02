import { MessageCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import { Reveal, SplitText } from '../components/ui/Reveal'
import { hasWhatsapp, whatsappLink } from '../config/site'
import { useI18n } from '../i18n/useI18n'

export default function FinalCta() {
  const { t } = useI18n()
  return (
    <section id="contact" className="relative isolate overflow-hidden py-16 md:py-36">
      <div className="container-x">
        <div className="bg-gold-gradient relative overflow-hidden rounded-[2rem] px-5 py-14 text-center sm:rounded-[2.5rem] sm:px-6 sm:py-20 shadow-[0_40px_80px_-40px_rgba(184,137,70,.8)] md:px-16 md:py-28">
          <div aria-hidden="true" className="absolute inset-3 rounded-[2rem] border border-ink/20" />
          <Reveal className="mb-8 flex items-center justify-center gap-3 text-ink/70">
            <span aria-hidden="true" className="h-px w-12 bg-current" />
            <span aria-hidden="true" className="size-2 rotate-45 bg-current" />
            <span aria-hidden="true" className="h-px w-12 bg-current" />
          </Reveal>
          <SplitText text={t('cta.title')} className="mx-auto max-w-4xl text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl" />
          <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl text-base text-ink/80 md:text-lg">{t('cta.sub')}</Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to="/quote" variant="solid">{t('cta.button')}</Button>
            {hasWhatsapp && (
              <Button href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="outline" arrow={false}>
                <span className="inline-flex items-center gap-2">
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {t('cta.whatsapp')}
                </span>
              </Button>
            )}
          </Reveal>
          <Reveal delay={0.4} className="mt-12 text-xs font-semibold uppercase tracking-[0.4em] text-ink/70">{t('cta.tagline')}</Reveal>
        </div>
      </div>
    </section>
  )
}
