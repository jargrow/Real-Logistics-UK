import { motion } from 'framer-motion'
import QuoteForm from '../sections/QuoteForm'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Quote() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <QuoteForm standalone={true} />
    </motion.div>
  )
}
