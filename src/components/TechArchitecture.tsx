import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { ARCH_NODES, ARCH_EDGES, type ArchNode } from '../data/content'

const nodeById = (id: string) => ARCH_NODES.find((n) => n.id === id)!

/** 未来感技术网络拓扑：动态光线连接 + 呼吸节点 + 悬浮信息 */
export default function TechArchitecture() {
  const [active, setActive] = useState<ArchNode | null>(null)
  const reduced = useReducedMotion()

  const paths = useMemo(
    () =>
      ARCH_EDGES.map(([a, b]) => {
        const na = nodeById(a)
        const nb = nodeById(b)
        const mx = (na.x + nb.x) / 2
        const my = (na.y + nb.y) / 2 - 10
        return { d: `M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`, key: `${a}-${b}` }
      }),
    [],
  )

  return (
    <section id="tech" aria-label="技术架构" className="relative mx-auto max-w-7xl px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-0 h-[420px] w-[420px] rounded-full bg-neon/8 blur-[140px]"
      />
      <SectionHeading
        kicker="ARCHITECTURE"
        title={
          <>
            贯通云边端的 <span className="text-gradient">神经网络</span>
          </>
        }
        desc="从边缘接入到行业应用，数据与智能在全链路中自由流动。"
      />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass bg-grid relative overflow-hidden rounded-[24px] p-4 md:p-8"
      >
        <div className="relative aspect-[16/10] w-full md:aspect-[16/8]">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="55%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
            {paths.map((p, i) => (
              <g key={p.key}>
                <path
                  d={p.d}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="0.28"
                  strokeOpacity="0.35"
                  vectorEffect="non-scaling-stroke"
                  style={{ strokeWidth: 1.2 }}
                />
                {/* 流动光点 */}
                {!reduced && (
                  <circle r="0.7" fill="#7dd3fc">
                    <animateMotion
                      dur={`${3.2 + (i % 3)}s`}
                      repeatCount="indefinite"
                      path={p.d}
                      begin={`${i * 0.6}s`}
                    />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* 节点 */}
          {ARCH_NODES.map((node, i) => (
            <motion.button
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 120, damping: 12 }}
              onMouseEnter={() => setActive(node)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(node)}
              onBlur={() => setActive(null)}
              aria-label={`${node.label}：${node.desc}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {/* 呼吸光环 */}
              <span
                aria-hidden
                className={`absolute -inset-4 rounded-full opacity-40 blur-md ${reduced ? '' : 'animate-pulse-glow'}`}
                style={{ background: `${node.accent}55`, animationDelay: `${i * 0.4}s` }}
              />
              <span
                className="relative grid h-12 w-12 place-items-center rounded-full border bg-void/80 backdrop-blur-md transition-transform duration-300 group-hover:scale-125 md:h-14 md:w-14"
                style={{ borderColor: `${node.accent}88`, boxShadow: `0 0 22px ${node.accent}44` }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: node.accent, boxShadow: `0 0 10px ${node.accent}` }}
                />
              </span>
              <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 font-mono text-[10px] tracking-wider whitespace-nowrap text-mist">
                {node.label}
              </span>
            </motion.button>
          ))}

          {/* 信息浮层 */}
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.22 }}
                className="glass pointer-events-none absolute z-20 w-56 rounded-xl p-4 text-left"
                style={{
                  left: `${Math.min(Math.max(active.x, 14), 66)}%`,
                  top: `${active.y > 55 ? active.y - 34 : active.y + 12}%`,
                  borderColor: `${active.accent}55`,
                  boxShadow: `0 0 32px ${active.accent}33`,
                }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: active.accent, boxShadow: `0 0 8px ${active.accent}` }}
                  />
                  <span className="font-display text-sm font-semibold text-ice">{active.label}</span>
                </div>
                <p className="text-xs leading-relaxed text-mist">{active.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
