import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Boxes, Database, Layers, ShoppingBag } from 'lucide-react'
import { project, formatNumber } from '../data/project'
import { Reveal } from './ui'

function Count({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    if (!inView || reduced) { setDisplay(value); return }
    const controls = animate(0, value, { duration: 1.1, ease: 'easeOut', onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, reduced, value])
  return <span ref={ref}><span className="sr-only">{formatNumber(value)}</span><span aria-hidden="true">{decimals ? display.toFixed(decimals) : formatNumber(Math.round(display))}</span></span>
}

export function Metrics() {
  return <section className="metrics-section" aria-label="Project metrics">
    <div className="container metrics-grid">
      {[
        { icon: Database, label: 'Total records', value: <Count value={project.records} />, note: 'Cleaned and ready for analysis' },
        { icon: ShoppingBag, label: 'Total units sold', value: <><span className="metric-approx">≈</span> <Count value={10} />M</>, note: `${formatNumber(project.unitsSold)} units in the source data` },
        { icon: Boxes, label: 'Product categories', value: <><Count value={project.categories.length} /><span className="metric-word"> categories</span></>, note: 'Clothing to consumer electronics' },
        { icon: Layers, label: 'Core analysis tools', value: <span className="metric-tools">Excel · SQL<br />Power BI</span>, note: 'Prepared, queried, visualized' },
      ].map(({ icon: Icon, label, value, note }, i) => <Reveal className="metric-card" key={label} delay={i * 0.06}>
        <div className="metric-label"><span>{label}</span><Icon size={17} /></div><div className="metric-value">{value}</div><div className="metric-note">{i === 1 && <ArrowUpRight size={14} />}{note}</div>
      </Reveal>)}
    </div>
  </section>
}
