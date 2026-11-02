import { Lightbulb, ClipboardCheck, Handshake, Cpu, Route } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui/Reveal'
import { useI18n } from '../i18n/useI18n'

const ICONS = [Lightbulb, ClipboardCheck, Handshake, Cpu, Route]

export default function WhyLaxz() {
  const { t } = useI18n()
  const items = t('why.items')
  return (
    <section id="why" className="bg-sand relative overflow-hidden py-16 md:py-36">
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading kicker={t('why.kicker')} title={t('why.title')} />
            <Reveal delay={0.2} className="mt-8 border-l-2 border-gold-dark pl-5 font-display text-2xl font-medium italic text-gold-dark">
              {t('intro.tagline')}
            </Reveal>
          </div>
        </div>
        <ul className="grid gap-4 lg:col-span-7">
          {items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal as="li" key={item.t} delay={i * 0.06} y={28} className="card-light group flex gap-4 rounded-2xl p-5 sm:gap-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-dark md:p-7">
                <span className="grid size-12 shrink-0 sm:size-14 place-items-center rounded-full bg-gold-gradient text-ink">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-ink">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{item.d}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
