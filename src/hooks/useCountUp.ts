import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/** 数字进入视口后从 0 增长到目标值 */
export function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setValue(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, reduced])

  return { ref, value }
}

export function formatStat(value: number, format: string) {
  if (format === 'compact') {
    if (value >= 10000) return `${(value / 10000).toFixed(value >= 1000000 ? 0 : 1)}万`
    return Math.round(value).toString()
  }
  if (format === 'decimal') return value.toFixed(2)
  return Math.round(value).toString()
}
