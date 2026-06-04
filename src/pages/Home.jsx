import { motion } from 'framer-motion'
import Hero         from '../sections/Hero'
import StatsStrip   from '../sections/StatsStrip'
import QuoteForm    from '../sections/QuoteForm'
import WhyChooseUs  from '../sections/WhyChooseUs'
import HowItWorks   from '../sections/HowItWorks'
import ServicesGrid from '../sections/ServicesGrid'
import CoverageMap  from '../sections/CoverageMap'
import Testimonials from '../sections/Testimonials'
import TrustSignals from '../sections/TrustSignals'
import CTABanner    from '../sections/CTABanner'
import FleetGallery from '../sections/FleetGallery'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}

export default function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero />
      <StatsStrip />
      <QuoteForm />
      <WhyChooseUs />
      <HowItWorks />
      <ServicesGrid />
      <CoverageMap />
      <Testimonials />
      <FleetGallery />
      <TrustSignals />
      <CTABanner />
    </motion.div>
  )
}
