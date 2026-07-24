import { motion } from 'framer-motion'
import { STATS } from '../data/content'
import { useCountUp, formatStat } from '../hooks/useCountUp'

function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[number]
  index: number
}) {
  const { ref, value } = useCountUp(stat.value, 2200)
  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* 悬停流光边框 */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-[21px] bg-gradient-to-r from-electric/0 via-electric/70 to-neon/70 opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="glass relative flex flex-col items-center gap-2 overflow-hidden rounded-[20px] px-6 py-9 transition-shadow duration-500 group-hover:shadow-[0_0_50px_rgba(0,212,255,0.15)]">
        <div
          aria-hidden
          className="absolute -top-16 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-electric/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span ref={ref} className="font-display text-4xl font-bold tracking-tight text-ice md:text-5xl">
          <span className="text-gradient">{formatStat(value, stat.format)}</span>
          <span className="ml-1 text-2xl text-electric md:text-3xl">{stat.suffix}</span>
        </span>
        <span className="text-sm tracking-widest text-mist">{stat.label}</span>
      </div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section id="stats" aria-label="核心数据指标" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}
