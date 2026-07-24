import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Activity,
  BarChart3,
  Bot,
  Gauge,
  Radar,
  Send,
  Waves,
} from 'lucide-react'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const BARS = [42, 68, 35, 80, 56, 92, 64, 74, 48, 88, 60, 96]
const HIGHLIGHTS = [
  { icon: Radar, title: '实时态势感知', desc: '千万级数据流实时渲染，全局状态一屏尽览。' },
  { icon: Bot, title: 'AI 决策副驾', desc: '自然语言驱动的智能分析与策略建议。' },
  { icon: Gauge, title: '预测性调控', desc: '基于数字孪生的仿真推演，提前 72 小时预判风险。' },
]

/** 模拟智能控制中心面板 */
function ControlPanel() {
  return (
    <div className="glass scanlines relative overflow-hidden rounded-[24px] p-5 shadow-[0_0_80px_rgba(0,212,255,0.12)]">
      {/* 顶栏 */}
      <div className="showcase-module mb-5 flex items-center justify-between border-b border-white/8 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] text-mist/70">
          NEXARA CONSOLE v4.2
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-mint">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-mint" />
          LIVE
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr]">
        {/* 左侧指标列 */}
        <div className="flex flex-col gap-4">
          <div className="showcase-module rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-mist">
              <Activity className="h-3.5 w-3.5 text-electric" />
              推理吞吐
            </div>
            <div className="font-display text-2xl font-bold text-ice">
              84.2<span className="ml-1 text-xs font-normal text-mint">K/s</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '84%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-electric to-mint"
              />
            </div>
          </div>
          <div className="showcase-module rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-mist">
              <Waves className="h-3.5 w-3.5 text-neon" />
              网络负载
            </div>
            <div className="font-display text-2xl font-bold text-ice">
              37<span className="ml-1 text-xs font-normal text-electric">%</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '37%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-neon to-electric"
              />
            </div>
          </div>
          {/* AI 对话 */}
          <div className="showcase-module flex-1 rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center gap-2 text-xs text-mist">
              <Bot className="h-3.5 w-3.5 text-mint" />
              AI 副驾
            </div>
            <div className="mb-2 rounded-lg rounded-tl-none bg-electric/10 px-3 py-2 text-[11px] leading-relaxed text-ice/90">
              检测到华东节点流量上升 23%，已自动扩容 4 个推理单元。
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <span className="flex-1 text-[10px] text-mist/60">输入指令…</span>
              <Send className="h-3 w-3 text-electric" />
            </div>
          </div>
        </div>

        {/* 右侧图表 */}
        <div className="showcase-module flex flex-col rounded-xl border border-white/8 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs text-mist">
              <BarChart3 className="h-3.5 w-3.5 text-electric" />
              全局算力分布
            </span>
            <span className="font-mono text-[10px] text-mist/50">REALTIME</span>
          </div>
          <div className="flex flex-1 items-end gap-1.5" aria-hidden>
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`flex-1 rounded-t-sm ${
                  i % 3 === 0
                    ? 'bg-gradient-to-t from-neon/70 to-neon/30'
                    : i % 3 === 1
                      ? 'bg-gradient-to-t from-electric/70 to-electric/30'
                      : 'bg-gradient-to-t from-mint/70 to-mint/30'
                }`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between font-mono text-[9px] text-mist/40">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      // 滚动驱动：面板整体缩放 + 轻微旋转
      gsap.fromTo(
        '.showcase-panel',
        { scale: 0.9, rotateX: 8, opacity: 0.4 },
        {
          scale: 1,
          rotateX: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.showcase-panel',
            start: 'top 92%',
            end: 'top 35%',
            scrub: 0.6,
          },
        },
      )
      // 内部模块逐层展开
      gsap.utils.toArray<HTMLElement>('.showcase-module').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 56, opacity: 0, filter: 'blur(6px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              end: 'top 62%',
              scrub: 0.5,
            },
            delay: i * 0.05,
          },
        )
      })
      // 左侧文案视差
      gsap.to('.showcase-copy', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="product"
      ref={sectionRef}
      aria-label="产品展示"
      className="relative mx-auto max-w-7xl overflow-visible px-6 py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-electric/8 blur-[150px]"
      />
      <SectionHeading
        kicker="PRODUCT"
        title={
          <>
            NEXARA <span className="text-gradient">智能控制中心</span>
          </>
        }
        desc="一个界面，统御全球算力、模型与数据流。"
      />

      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.3fr]">
        <div className="showcase-copy flex flex-col gap-8">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group flex gap-4"
            >
              <div className="glass grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-all duration-500 group-hover:border-electric/50 group-hover:shadow-[0_0_24px_rgba(0,212,255,0.25)]">
                <h.icon className="h-5 w-5 text-electric transition-transform duration-500 group-hover:scale-110" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="mb-1.5 font-display text-lg font-semibold text-ice">{h.title}</h3>
                <p className="text-sm leading-relaxed text-mist">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="showcase-panel" style={{ transformPerspective: 1200 }}>
          <ControlPanel />
        </motion.div>
      </div>
    </section>
  )
}
