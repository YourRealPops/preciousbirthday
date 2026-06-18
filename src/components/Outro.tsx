import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Outro.css'

interface Spark {
  id: number
  x: number
  y: number
}

export default function Outro() {
  const [lit, setLit] = useState(true)
  const [blowCount, setBlowCount] = useState(0)

  const sparks: Spark[] = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
      const distance = 50 + Math.random() * 70
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 30,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blowCount])

  const handleCandleClick = () => {
    if (lit) {
      setLit(false)
      setBlowCount((c) => c + 1)
    } else {
      setLit(true)
    }
  }

  return (
    <section className="app__section outro" aria-label="A closing wish">
      <div className="app__inner outro__inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          {lit ? 'make a wish' : 'wish made'}
        </motion.span>

        <motion.h2
          className="outro__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Here's to you, Precious.
        </motion.h2>

        <motion.p
          className="outro__subline"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Today, and every ordinary day after this one.
        </motion.p>

        <div className="outro__candle-wrap">
          <button
            type="button"
            className="outro__candle"
            onClick={handleCandleClick}
            aria-label={lit ? 'Blow out the candle and make a wish' : 'Relight the candle'}
          >
            <span className="outro__candle-body" />
            <span className="outro__candle-wick" />
            {lit && <span className="outro__candle-flame" />}
            {!lit && <span className="outro__candle-smoke" />}
          </button>

          <AnimatePresence>
            {!lit && (
              <motion.div key={blowCount} className="outro__sparks" aria-hidden="true">
                {sparks.map((s) => (
                  <motion.span
                    key={s.id}
                    className="outro__spark"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{ opacity: 0, x: s.x, y: s.y, scale: 0.3 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!lit && (
            <motion.p
              className="outro__note"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Whatever you wished for, I hope it's already on its way to you.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.p
          className="outro__signature"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          — Fehinti
        </motion.p>
      </div>
    </section>
  )
}
