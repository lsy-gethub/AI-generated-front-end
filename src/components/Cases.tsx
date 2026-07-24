import { motion } from 'framer-motion'
import { Orbit, Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { BRANDS, CASES } from '../data/content'

export default function Cases() {
  return (
    <section id="cases" aria-label="用户案例与合作品牌" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="TRUSTED BY"
          title={
            <>
              与全球领先者 <span className="text-gradient">共建未来</span>
            </>
          }
        />
      </div>

      {/* 无限滚动 Logo 墙 */}
      <div
        className="relative mb-20 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
        aria-label="合作品牌"
      >
        <div className="animate-marquee flex w-max gap-16 px-8">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="group flex shrink-0 items-center gap-2.5 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              data-cursor-hover
            >
              <Orbit className="h-5 w-5 text-mist transition-all duration-500 group-hover:text-electric group-hover:drop-shadow-[0_0_10px_#00d4ff]" />
              <span className="font-display text-xl font-bold tracking-[0.25em] text-mist transition-all duration-500 group-hover:text-ice group-hover:[text-shadow:0_0_18px_rgba(0,212,255,0.7)]">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 用户案例卡片 */}
      <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3">
        {CASES.map((c, i) => (
          <motion.div
            key={c.company}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard accent={i === 0 ? '#2dd4bf' : i === 1 ? '#00d4ff' : '#a855f7'} className="h-full">
              <article className="flex h-full flex-col gap-5 p-7">
                <Quote className="h-6 w-6 text-electric/60" aria-hidden />
                <blockquote className="text-sm leading-relaxed text-ice/90">{c.quote}</blockquote>
                <div className="mt-auto flex items-end justify-between border-t border-white/8 pt-5">
                  <div>
                    <div className="font-display text-sm font-semibold text-ice">{c.company}</div>
                    <div className="mt-0.5 text-xs text-mist">{c.field}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl font-bold text-gradient">{c.metric}</div>
                    <div className="mt-0.5 text-[10px] tracking-wider text-mist">{c.metricLabel}</div>
                  </div>
                </div>
              </article>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
