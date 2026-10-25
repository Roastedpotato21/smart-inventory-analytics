import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children, number, light = false }: { children: ReactNode; number?: string; light?: boolean }) {
  return <div className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{number && <span className="section-number">{number}</span>}{children}</div>
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return <a className="brand" href="#top" aria-label="Smart Inventory Analytics — back to top">
    <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
    <span>Smart Inventory{!compact && <><br /><span className="brand-subtitle">Analytics</span></>}</span>
  </a>
}
