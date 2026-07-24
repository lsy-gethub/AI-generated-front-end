import { lazy, Suspense } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { Play, Rocket } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { useMouseParallax } from '../hooks/useMouseParallax'

const HoloSphere = lazy(() => import('./HoloSphere'))

/** 逐字出现 + 故障艺术 Glitch 标题 */
function GlitchTitle({
  text,
  gradient = false,
  className = '',
}: {
  text: string
  gradient?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const chars = Array.from(text)
  return (
    <span className={`glitch relative inline-block ${className}`} data-text={text} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block ${gradient ? 'text-gradient glow-electric' : ''}`}
          initial={reduced ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.055, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.9 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 70, damping: 16 },
  },
}

export default function Hero() {
  const reduced = useReducedMotion()
  const { sx, sy } = useMouseParallax()
  const glowX = useTransform(sx, (v) => v * 120)
  const glowY = useTransform(sy, (v) => v * 90)
  const sphereX = useTransform(sx, (v) => v * -26)
  const sphereY = useTransform(sy, (v) => v * -20)

  return (
    <section
      id="hero"
      className="scanlines relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* 跟随鼠标的环境光 */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { x: glowX, y: glowY }}
        className="pointer-events-none absolute top-1/4 left-1/4 h-[480px] w-[480px] rounded-full bg-electric/12 blur-[130px]"
      />
      <motion.div
        aria-hidden
        style={reduced ? undefined : { x: glowY, y: glowX }}
        className="pointer-events-none absolute right-1/5 bottom-1/4 h-[420px] w-[420px] rounded-full bg-neon/12 blur-[130px]"
      />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-7"
        >
          <motion.div
            variants={item}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-[0.25em] text-electric"
          >
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-mint shadow-[0_0_8px_#2dd4bf]" />
            NEXT-GEN INTELLIGENCE PLATFORM
          </motion.div>

          <h1 className="font-display text-5xl leading-[1.08] font-black tracking-tight text-ice sm:text-6xl xl:text-7xl">
            <GlitchTitle text="构建下一代" />
            <br />
            <GlitchTitle text="智能数字世界" gradient />
          </h1>

          <motion.p variants={item} className="max-w-lg text-base leading-relaxed text-mist md:text-lg">
            NEXARA 将大模型推理、全球边缘算力与数字孪生融为一体，
            为航天、金融与能源行业提供毫秒级智能决策基础设施。
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <MagneticButton href="#product" variant="primary">
              <Rocket className="h-4 w-4" />
              立即探索
            </MagneticButton>
            <MagneticButton href="#product" variant="ghost">
              <Play className="h-4 w-4" />
              观看演示
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-2 flex items-center gap-6 font-mono text-xs text-mist/70">
            <span>LATENCY 12MS</span>
            <span className="h-3 w-px bg-white/15" />
            <span>UPTIME 99.99%</span>
            <span className="h-3 w-px bg-white/15" />
            <span>NODES 86</span>
          </motion.div>
        </motion.div>

        {/* 三维全息 AI 核心 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={reduced ? undefined : { x: sphereX, y: sphereY }}
          className="relative mx-auto aspect-square w-full max-w-[520px]"
          data-cursor-hover
        >
          <div aria-hidden className="absolute inset-8 rounded-full bg-electric/10 blur-3xl" />
          {reduced ? (
            <div
              aria-hidden
              className="absolute inset-16 rounded-full border border-electric/40 bg-[radial-gradient(circle_at_38%_32%,rgba(0,212,255,0.35),rgba(168,85,247,0.18)_48%,transparent_72%)] shadow-[0_0_80px_rgba(0,212,255,0.3)]"
            />
          ) : (
            <Suspense
              fallback={
                <div className="grid h-full w-full place-items-center">
                  <div className="h-24 w-24 animate-spin-slow rounded-full border border-electric/40 border-t-electric" />
                </div>
              }
            >
              <HoloSphere />
            </Suspense>
          )}
        </motion.div>
      </div>

      {/* 底部滚动提示 */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] text-mist/60">SCROLL</span>
        <div className="h-10 w-px overflow-hidden bg-white/10">
          <motion.div
            animate={reduced ? undefined : { y: [-40, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1/2 w-px bg-gradient-to-b from-transparent via-electric to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}
