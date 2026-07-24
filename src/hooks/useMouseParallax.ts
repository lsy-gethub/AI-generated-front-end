import { useEffect } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'

export interface MouseState {
  /** 归一化坐标 -0.5 ~ 0.5 */
  nx: MotionValue<number>
  ny: MotionValue<number>
  /** 平滑弹簧值 */
  sx: MotionValue<number>
  sy: MotionValue<number>
}

/** 全局鼠标位置（归一化 + 弹簧平滑），供视差与光效跟随使用 */
export function useMouseParallax(stiffness = 60, damping = 18): MouseState {
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const sx = useSpring(nx, { stiffness, damping })
  const sy = useSpring(ny, { stiffness, damping })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      nx.set(e.clientX / window.innerWidth - 0.5)
      ny.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [nx, ny])

  return { nx, ny, sx, sy }
}
