import Hero from './components/hero';
import FeaturedSection from './components/FeaturedSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import CallToAction from './components/CallToAction';

export default function Home(){
  return(
    <>
      <Hero />
      <FeaturedSection />
      <FeaturesShowcase />
      <CallToAction />
    </>
  )
}