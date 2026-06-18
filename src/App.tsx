import { useScroll } from 'framer-motion'
import Background from './components/Background'
import Hero from './components/Hero'
import PhotoGallery from './components/PhotoGallery'
import Slideshow from './components/Slideshow'
import LoveLetter from './components/LoveLetter'
import Outro from './components/Outro'

export default function App() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <Background progress={scrollYProgress} />
      <main>
        <Hero />
        <PhotoGallery />
        <Slideshow />
        <LoveLetter />
        <Outro />
      </main>
    </>
  )
}
