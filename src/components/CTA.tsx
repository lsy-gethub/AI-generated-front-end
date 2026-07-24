import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function CTA() {
  return (
    <section id="cta" aria-label="立即体验" className="relative overflow-hidden px-6 py-36">
      {/* 强烈的渐变光晕背景 */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.22),rgba(168,85,247,0.14)_45%,transparent_72%)] blur-2xl" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_55%_55%_at_50%_50%,black,transparent)]" />
      </div>
      {/* 同心圆装饰 */}
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[560px] w-[560px] animate-spin-slow rounded-full border border-electric/10" />
      </div>
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[380px] w-[380px] rounded-full border border-neon/15" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-[0.3em] text-mint"
        >
          <Sparkles className="h-3.5 w-3.5" />
          START YOUR JOURNEY
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl leading-[1.1] font-black tracking-tight text-ice md:text-6xl"
        >
          未来已来
          <br />
          <span className="text-gradient glow-electric">即刻开启智能新纪元</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-md text-base leading-relaxed text-mist"
        >
          免费接入 NEXARA 平台，五分钟内部署你的第一个智能体，与世界一同进入下一代数字文明。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.28 }}
        >
          <MagneticButton href="#hero" variant="primary" className="px-10 py-4 text-base">
            免费开始体验
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-mono text-xs tracking-[0.25em] text-mist/60"
        >
          NO CREDIT CARD REQUIRED · 14-DAY ENTERPRISE TRIAL
        </motion.span>
      </div>
    </section>
  )
}
