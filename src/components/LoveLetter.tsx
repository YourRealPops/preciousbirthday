import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoveLetter.css'

const paragraphs: string[] = [
  "There's a particular kind of luck in loving someone whose name already says what I mean. Today the world simply catches up to what I've known since the day I met you.",
  "I want you to know that loving you has never felt like effort. It's been the easiest, most natural thing I do, the way breathing is easiest when the air is good. You've made ordinary days feel worth remembering and hard days feel survivable, and that is no small thing.",
  'So here is what I wish for you, on the day the universe made room for you: that you keep laughing and smiling every day, that you keep shining in an undimmable glow, that you keep being soft in a world that asks you not to be, and that you never doubt, not even for a moment, how deeply and completely you are loved.',
  "Happy birthday Love of my Life!!!. Thank you for letting me be the one who gets to celebrate you! Not just today, but every ordinary day after this one too.",
]

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="app__section letter" aria-label="A letter for Precious">
      <div className="app__inner letter__inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          for your eyes only
        </motion.span>

        <div className="letter__stage">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="envelope"
                type="button"
                className="letter__envelope"
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.35 } }}
                whileHover={{ y: -4 }}
                aria-label="Open the letter to Precious"
              >
                <svg viewBox="0 0 220 150" className="letter__envelope-art" aria-hidden="true">
                  <defs>
                    <linearGradient id="envGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3a1a2b" />
                      <stop offset="100%" stopColor="#1d0e16" />
                    </linearGradient>
                    <radialGradient id="sealGrad" cx="35%" cy="30%" r="75%">
                      <stop offset="0%" stopColor="#e0be6e" />
                      <stop offset="100%" stopColor="#a8803a" />
                    </radialGradient>
                  </defs>
                  <rect x="4" y="4" width="212" height="142" rx="4" fill="url(#envGrad)" stroke="#c9a24b" strokeWidth="1" />
                  <path d="M4,8 L110,92 L216,8" fill="none" stroke="#c9a24b" strokeWidth="1" opacity="0.7" />
                  <path d="M4,146 L88,84" fill="none" stroke="#c9a24b" strokeWidth="0.75" opacity="0.35" />
                  <path d="M216,146 L132,84" fill="none" stroke="#c9a24b" strokeWidth="0.75" opacity="0.35" />
                  <circle cx="110" cy="78" r="23" fill="url(#sealGrad)" />
                  <text x="110" y="84" textAnchor="middle" className="letter__seal-text">
                    F · P
                  </text>
                </svg>
                <span className="letter__envelope-label">click to break the seal</span>
              </motion.button>
            ) : (
              <motion.div
                key="letter"
                className="letter__card"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="letter__salutation">My Precious,</p>
                <span className="letter__rule" aria-hidden="true" />
                {paragraphs.map((p, i) => (
                  <p key={i} className="letter__paragraph">
                    {p}
                  </p>
                ))}
                <p className="letter__signoff">Yours, always,</p>
                <p className="letter__signature">Fehinti</p>

                <button type="button" className="letter__close" onClick={() => setIsOpen(false)}>
                  fold it closed
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
