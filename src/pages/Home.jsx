import Hero from '../sections/Hero'
import Intro from '../sections/Intro'
import Services from '../sections/Services'
import WhyLaxz from '../sections/WhyLaxz'
import HowItWorks from '../sections/HowItWorks'
import FeaturedGallery from '../sections/FeaturedGallery'
import TechSection from '../sections/TechSection'
import Faq from '../sections/Faq'
import FinalCta from '../sections/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <WhyLaxz />
      <HowItWorks />
      <FeaturedGallery />
      <TechSection />
      <Faq />
      <FinalCta />
    </>
  )
}
