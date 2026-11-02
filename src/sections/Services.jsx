import { SectionHeading } from '../components/ui/Reveal'
import ServiceCard from '../components/ServiceCard'
import { SERVICES } from '../data/services'
import { useI18n } from '../i18n/useI18n'

export default function Services() {
  const { t } = useI18n()
  return (
    <section id="services" className="relative bg-cream-light py-16 md:py-36">
      <div className="container-x">
        <SectionHeading kicker={t('services.kicker')} title={t('services.title')} />
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {SERVICES.map((service, i) => (
            <div key={service.key} className="w-[80%] shrink-0 snap-center sm:w-auto"><ServiceCard service={service} index={i} /></div>
          ))}
        </div>
      </div>
    </section>
  )
}
