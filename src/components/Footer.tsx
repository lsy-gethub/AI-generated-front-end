import { Hexagon, Code2, AtSign, Briefcase, Rss, Mail, MapPin, Phone } from 'lucide-react'
import { NAV_LINKS } from '../data/content'

const SOCIALS = [
  { icon: Code2, label: 'GitHub' },
  { icon: AtSign, label: 'Twitter' },
  { icon: Briefcase, label: 'LinkedIn' },
  { icon: Rss, label: 'YouTube' },
] as const

const RESOURCES = ['开发文档', 'API 参考', '模型广场', '开源社区', '状态页']

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden border-t border-white/8">
      {/* 低调动态网格背景 */}
      <div aria-hidden className="bg-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(180deg,transparent,black_40%)]" />
      <div aria-hidden className="absolute -top-24 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-electric/8 blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <a href="#hero" className="flex items-center gap-2.5">
            <span className="relative grid h-8 w-8 place-items-center">
              <Hexagon className="h-8 w-8 text-electric" strokeWidth={1.4} />
              <span className="absolute h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_10px_#00d4ff]" />
            </span>
            <span className="font-display text-base font-bold tracking-[0.22em] text-ice">
              NEX<span className="text-gradient">ARA</span>
            </span>
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-mist">
            构建下一代智能数字世界。融合大模型、边缘算力与数字孪生的未来科技基础设施。
          </p>
          <div className="mt-2 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#footer"
                aria-label={s.label}
                className="glass grid h-9 w-9 place-items-center rounded-lg text-mist transition-all duration-300 hover:border-electric/50 hover:text-electric hover:shadow-[0_0_18px_rgba(0,212,255,0.3)]"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="页脚导航">
          <h3 className="mb-4 font-mono text-xs tracking-[0.3em] text-electric/80">导航</h3>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-mist transition-colors hover:text-ice">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="资源链接">
          <h3 className="mb-4 font-mono text-xs tracking-[0.3em] text-electric/80">资源</h3>
          <ul className="flex flex-col gap-2.5">
            {RESOURCES.map((r) => (
              <li key={r}>
                <a href="#footer" className="text-sm text-mist transition-colors hover:text-ice">
                  {r}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-mono text-xs tracking-[0.3em] text-electric/80">联系我们</h3>
          <ul className="flex flex-col gap-3 text-sm text-mist">
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-electric/70" />
              hello@nexara.tech
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-electric/70" />
              +86 400-888-0000
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric/70" />
              上海市浦东新区 · 未来科技园 A 座 88 层
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-mist/60 sm:flex-row">
          <span>© 2026 NEXARA Technologies. 保留所有权利。</span>
          <span className="font-mono tracking-[0.25em]">DESIGNED FOR THE FUTURE</span>
        </div>
      </div>
    </footer>
  )
}
