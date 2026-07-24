import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hexagon, Menu, X, ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-electric/15 bg-void/70 shadow-[0_8px_40px_rgba(0,212,255,0.08)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="主导航" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#hero" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center">
            <Hexagon className="h-9 w-9 text-electric transition-transform duration-500 group-hover:rotate-90" strokeWidth={1.4} />
            <span className="absolute h-2 w-2 rounded-full bg-electric shadow-[0_0_12px_#00d4ff]" />
          </span>
          <span className="font-display text-lg font-bold tracking-[0.22em] text-ice">
            NEX<span className="text-gradient">ARA</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm tracking-wider text-mist transition-colors duration-300 hover:text-ice"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-electric to-neon transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="btn-shine hidden items-center gap-1.5 rounded-full border border-electric/50 bg-electric/10 px-5 py-2 text-sm font-medium text-electric transition-all duration-300 hover:bg-electric/20 hover:shadow-[0_0_24px_rgba(0,212,255,0.4)] sm:inline-flex"
          >
            立即体验
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-ice lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-electric/15 bg-void/90 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-ice"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-full border border-electric/50 bg-electric/10 px-3 py-2.5 text-center text-sm font-medium text-electric"
                >
                  立即体验
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
