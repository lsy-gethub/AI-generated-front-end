import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion, useMotionTemplate } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  accent?: string
}

/** 三维倾斜 + 鼠标光点描边的玻璃拟态卡片 */
export default function TiltCard({ children, className = '', accent = '#00d4ff' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 16 })
  const sry = useSpring(ry, { stiffness: 150, damping: 16 })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}% ${my}%, ${accent}26, transparent 65%)`
  const borderGlow = useMotionTemplate`radial-gradient(240px circle at ${mx}% ${my}%, ${accent}, transparent 70%)`

  const onMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mx.set(px * 100)
    my.set(py * 100)
    if (reduced) return
    rx.set((py - 0.5) * -10)
    ry.set((px - 0.5) * 12)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`group relative rounded-[20px] ${className}`}
    >
      {/* 跟随鼠标的渐变描边 */}
      <motion.div
        aria-hidden
        style={{ background: borderGlow }}
        className="absolute -inset-px rounded-[21px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="glass relative h-full overflow-hidden rounded-[20px]">
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </motion.div>
  )
}
