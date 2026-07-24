import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/** 科技风自定义光标：内核光点 + 延迟光环 + 轻微拖尾 */
export default function CustomCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 250, damping: 22 })
  const ringY = useSpring(y, { stiffness: 250, damping: 22 })
  const trailX = useSpring(x, { stiffness: 90, damping: 18 })
  const trailY = useSpring(y, { stiffness: 90, damping: 18 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [data-cursor-hover]'))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [x, y, reduced])

  if (!enabled) return null

  return (
    <>
      {/* 拖尾 */}
      <motion.div
        aria-hidden
        style={{ x: trailX, y: trailY }}
        className="pointer-events-none fixed top-0 left-0 z-[99] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-md"
      />
      {/* 外环 */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/70"
      />
      {/* 内核 */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric shadow-[0_0_12px_rgba(0,212,255,0.9)]"
      />
    </>
  )
}
