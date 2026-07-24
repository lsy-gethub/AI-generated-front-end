import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  href?: string
  className?: string
  onClick?: () => void
}

/** 磁吸跟随 + 辉光 + 光线扫过 + 点击波纹按钮 */
export default function MagneticButton({
  children,
  variant = 'primary',
  href,
  className = '',
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14 })
  const sy = useSpring(y, { stiffness: 180, damping: 14 })
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.34)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }
  const spawnRipple = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const id = Date.now()
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setRipples((r) => r.filter((it) => it.id !== id)), 700)
    onClick?.()
  }

  const palette =
    variant === 'primary'
      ? 'bg-gradient-to-r from-electric/90 via-sky-500/90 to-neon/90 text-void font-semibold shadow-[0_0_28px_rgba(0,212,255,0.4)] hover:shadow-[0_0_48px_rgba(0,212,255,0.65)]'
      : 'border border-electric/40 text-ice bg-white/[0.03] backdrop-blur-md hover:border-electric/80 hover:bg-electric/10 hover:shadow-[0_0_32px_rgba(0,212,255,0.3)]'

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={spawnRipple}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`btn-shine group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm tracking-wider transition-shadow duration-300 ${palette} ${className}`}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute h-3 w-3 animate-[ripple_0.7s_ease-out_forwards] rounded-full bg-white/50"
          style={{ left: r.x - 6, top: r.y - 6 }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  )
}
