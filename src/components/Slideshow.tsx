import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { photos } from '../data/photos'
import './Slideshow.css'

interface Slide {
  type: 'photo' | 'video'
  src: string
  caption: string
}

const slides: Slide[] = [
  ...photos.map((p) => ({ type: 'photo' as const, src: p.src, caption: p.caption })),
  {
    type: 'video',
    src: '/photos/Slidevid.mp4',
    caption: 'Such a cute woman!!',
  },
]

export default function Slideshow() {
  const [[page, dir], setPage] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slide = slides[page]
  const isPlaceholder = slide.type === 'photo' && !slide.src

  const paginate = useCallback(
    (delta: number) => {
      setPage(([cur]) => {
        const next = (cur + delta + slides.length) % slides.length
        return [next, delta]
      })
    },
    [],
  )

  const goTo = useCallback((i: number) => {
    setPage(([cur]) => [i, i > cur ? 1 : -1])
  }, [])

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => paginate(1), 4000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, paginate])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <section className="app__section slideshow" aria-label="A slideshow of our memories">
      <div className="app__inner slideshow__inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          a story in motion
        </motion.span>

        <div
          className="slideshow__stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              className="slideshow__slide"
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {slide.type === 'video' ? (
                slide.src ? (
                  <video
                    className="slideshow__media"
                    src={slide.src}
                    controls
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  <div className="slideshow__placeholder slideshow__placeholder--video">
                    <svg viewBox="0 0 48 48" className="slideshow__placeholder-icon" aria-hidden="true">
                      <rect x="6" y="10" width="36" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                      <polygon points="20,17 20,31 32,24" fill="currentColor" />
                    </svg>
                    <span className="slideshow__placeholder-label">Drop a video here</span>
                  </div>
                )
              ) : isPlaceholder ? (
                <div className="slideshow__placeholder">
                  <svg viewBox="0 0 32 28" className="slideshow__placeholder-icon" aria-hidden="true">
                    <path
                      d="M16 26C16 26 2 17.5 2 8.8C2 4.6 5.3 1.5 9.2 1.5C12 1.5 14.4 3.1 16 5.6C17.6 3.1 20 1.5 22.8 1.5C26.7 1.5 30 4.6 30 8.8C30 17.5 16 26 16 26Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <span className="slideshow__placeholder-label">Add your photo</span>
                </div>
              ) : (
                <img className="slideshow__media" src={slide.src} alt={slide.caption} />
              )}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            className="slideshow__nav slideshow__nav--prev"
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="slideshow__nav slideshow__nav--next"
            onClick={() => paginate(1)}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="slideshow__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`slideshow__dot${i === page ? ' slideshow__dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.p
          className="slideshow__caption"
          key={slide.caption}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {slide.caption}
        </motion.p>
      </div>
    </section>
  )
}
