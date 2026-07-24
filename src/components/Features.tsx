import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { FEATURES } from '../data/content'

export default function Features() {
  return (
    <section id="features" aria-label="核心能力" className="relative mx-auto max-w-7xl px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-neon/8 blur-[140px]"
      />
      <SectionHeading
        kicker="CORE CAPABILITIES"
        title={
          <>
            全栈式 <span className="text-gradient">智能能力矩阵</span>
          </>
        }
        desc="从算力调度到行业智能体，六大核心引擎构成下一代数字基础设施。"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard accent={f.accent} className="h-full">
              <div className="flex h-full flex-col gap-4 p-7">
                <div
                  className="relative grid h-13 w-13 place-items-center rounded-xl border transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110"
                  style={{
                    borderColor: `${f.accent}44`,
                    background: `${f.accent}12`,
                    boxShadow: `0 0 0 rgba(0,0,0,0)`,
                  }}
                >
                  <f.icon
                    className="h-6 w-6 transition-all duration-500 group-hover:drop-shadow-[0_0_10px_currentColor]"
                    style={{ color: f.accent }}
                    strokeWidth={1.6}
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-ice">{f.title}</h3>
                <p className="text-sm leading-relaxed text-mist">{f.desc}</p>
                <span
                  aria-hidden
                  className="mt-auto font-mono text-[10px] tracking-[0.3em] opacity-40"
                  style={{ color: f.accent }}
                >
                  MODULE / 0{i + 1}
                </span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
