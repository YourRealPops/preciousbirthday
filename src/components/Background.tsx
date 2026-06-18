import { motion, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import './Background.css'

interface BackgroundProps {
  /** 0 → 1 scroll progress for the whole page, from App's useScroll() */
  progress: MotionValue<number>
}

/**
 * The gradient strings below are deliberately written with an identical
 * "shape" (same function, same number of numeric/color tokens in the same
 * order) so Framer Motion's complex-value interpolation can morph smoothly
 * between them as `progress` changes, instead of snapping.
 */
export default function Background({ progress }: BackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  const backgroundImage = useTransform(
    progress,
    [0, 0.28, 0.55, 0.8, 1],
    [
      'radial-gradient(130% 100% at 50% 0%, #2b1320 0%, #0b0710 55%, #050308 100%)',
      'radial-gradient(130% 100% at 50% 25%, #4a1224 0%, #0b0710 60%, #050308 100%)',
      'radial-gradient(130% 100% at 50% 50%, #4a1224 0%, #2b1320 60%, #050308 100%)',
      'radial-gradient(130% 100% at 50% 75%, #2b1320 0%, #0b0710 65%, #050308 100%)',
      'radial-gradient(130% 100% at 50% 100%, #0b0710 0%, #050308 70%, #050308 100%)',
    ],
  )

  return (
    <div className="background" aria-hidden="true">
      <motion.div className="background__gradient" style={{ backgroundImage }} />
      {!prefersReducedMotion && (
        <Canvas
          className="background__canvas"
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <Stars radius={60} depth={30} count={1000} factor={2} saturation={0} fade speed={0.35} />
          <Sparkles count={60} scale={[14, 9, 6]} size={2.2} speed={0.25} color="#c9a24b" opacity={0.55} />
        </Canvas>
      )}
    </div>
  )
}
