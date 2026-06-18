import { motion, type Variants } from 'framer-motion'
import './Hero.css'

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section className="app__section hero" aria-label="Happy birthday">
      <motion.div
        className="app__inner hero__inner"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={rise} className="eyebrow">
          for the keeper of my favorite memories
        </motion.span>

        <motion.h1 variants={rise} className="hero__title">
          <span className="hero__title-line">Happy Birthday,</span>
          <span className="hero__title-name">Precious.</span>
        </motion.h1>

        <motion.p variants={rise} className="hero__subline">
          Today, the world simply catches up to what I've always known.
        </motion.p>

        <motion.div variants={rise} className="hero__cue" aria-hidden="true">
          <span className="hero__cue-line" />
          <span className="hero__cue-label">scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
