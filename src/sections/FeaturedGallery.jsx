import GalleryGrid from '../components/GalleryGrid'
import Button from '../components/ui/Button'
import { Reveal, SectionHeading } from '../components/ui/Reveal'
import { useI18n } from '../i18n/useI18n'

export default function FeaturedGallery() {
  const { t } = useI18n()
  return (
    <section id="gallery" className="relative bg-cream-light py-16 md:py-36">
      <div className="container-x">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading kicker={t('gallery.kicker')} title={t('gallery.title')} />
          <Reveal>
            <Button to="/gallery" variant="outline">{t('gallery.viewAll')}</Button>
          </Reveal>
        </div>
        <GalleryGrid limit={8} />
      </div>
    </section>
  )
}
