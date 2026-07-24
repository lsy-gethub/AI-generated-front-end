import { lazy, Suspense } from 'react'
import { useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import ProductShowcase from './components/ProductShowcase'
import TechArchitecture from './components/TechArchitecture'
import Cases from './components/Cases'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

const BackgroundScene = lazy(() => import('./components/BackgroundScene'))

function App() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* 三维粒子星空背景：懒加载，减少动画偏好时以静态渐变替代 */}
      {reduced ? (
        <div
          aria-hidden
          className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#131044_0%,#050218_45%,#02010a_100%)]"
        />
      ) : (
        <Suspense fallback={null}>
          <BackgroundScene />
        </Suspense>
      )}

      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Features />
        <ProductShowcase />
        <TechArchitecture />
        <Cases />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
