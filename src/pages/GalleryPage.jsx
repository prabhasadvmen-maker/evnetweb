import GalleryGrid from '../components/GalleryGrid'
import { SectionHeading } from '../components/ui/Reveal'
import { useI18n } from '../i18n/useI18n'

export default function GalleryPage() {
  const { t } = useI18n()
  return (
    <section className="bg-cream pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="container-x">
        <SectionHeading kicker={t('gallery.kicker')} title={t('gallery.title')} className="mb-12" />
        <GalleryGrid />
      </div>
    </section>
  )
}
