import { motion } from 'framer-motion'

interface Props {
  kicker: string
  title: React.ReactNode
  desc?: string
  align?: 'center' | 'left'
}

export default function SectionHeading({ kicker, title, desc, align = 'center' }: Props) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 flex flex-col gap-4 ${alignCls}`}
    >
      <span className="font-mono text-xs tracking-[0.4em] text-electric/80 uppercase">
        {'// '}{kicker}
      </span>
      <h2 className="font-display text-4xl font-bold tracking-tight text-ice md:text-5xl">
        {title}
      </h2>
      {desc && <p className="max-w-xl text-base leading-relaxed text-mist">{desc}</p>}
    </motion.div>
  )
}
