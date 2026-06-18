import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { photos } from '../data/photos'
import './PhotoGallery.css'

function HeartMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 28" className={className} aria-hidden="true">
      <path
        d="M16 26C16 26 2 17.5 2 8.8C2 4.6 5.3 1.5 9.2 1.5C12 1.5 14.4 3.1 16 5.6C17.6 3.1 20 1.5 22.8 1.5C26.7 1.5 30 4.6 30 8.8C30 17.5 16 26 16 26Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <polygon points="20,16 20,32 34,24" fill="currentColor" />
    </svg>
  )
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function PhotoGallery() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = photos.find((p) => p.id === activeId) ?? null
  const close = useCallback(() => setActiveId(null), [])

  useEffect(() => {
    if (!activeId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId, close])

  return (
    <section className="app__section gallery" aria-label="A few moments, kept">
      <div className="app__inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          a few moments, kept
        </motion.span>

        <div className="gallery__grid">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              className={`gallery__card gallery__card--${photo.size ?? 'md'}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
              onClick={() => setActiveId(photo.id)}
              aria-label={`Open ${photo.type === 'video' ? 'video' : 'photo'}: ${photo.caption}`}
            >
              <span className="gallery__frame">
                {photo.type === 'video' ? (
                  photo.src ? (
                    <>
                      <video
                        className="gallery__video-thumb"
                        src={photo.src}
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <span className="gallery__play-overlay">
                        <PlayIcon className="gallery__play-icon" />
                      </span>
                    </>
                  ) : (
                    <span className="gallery__placeholder">
                      <PlayIcon className="gallery__placeholder-icon" />
                    </span>
                  )
                ) : photo.src ? (
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                ) : (
                  <span className="gallery__placeholder">
                    <HeartMark className="gallery__placeholder-icon" />
                  </span>
                )}
              </span>
              <span className="gallery__caption">{photo.caption}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="gallery__lightbox-card"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={active.caption}
            >
              <button
                type="button"
                className="gallery__lightbox-close"
                onClick={close}
                aria-label="Close photo"
              >
                ×
              </button>
              <span className="gallery__lightbox-frame">
                {active.type === 'video' ? (
                  active.src ? (
                    <video
                      className="gallery__lightbox-video"
                      src={active.src}
                      controls
                      playsInline
                    />
                  ) : (
                    <span className="gallery__placeholder gallery__placeholder--lg">
                      <PlayIcon className="gallery__placeholder-icon" />
                    </span>
                  )
                ) : active.src ? (
                  <img src={active.src} alt={active.alt} />
                ) : (
                  <span className="gallery__placeholder gallery__placeholder--lg">
                    <HeartMark className="gallery__placeholder-icon" />
                  </span>
                )}
              </span>
              <p className="gallery__lightbox-caption">{active.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
