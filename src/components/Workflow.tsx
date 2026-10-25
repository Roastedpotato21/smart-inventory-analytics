import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { BarChart3, Database, FileCode2, FileSpreadsheet, Github, Rocket, Search } from 'lucide-react'
import { Eyebrow, Reveal } from './ui'

const steps = [
  { icon: Search, title: 'Kaggle dataset', text: 'Start with the retail inventory dataset.' },
  { icon: FileSpreadsheet, title: 'Excel cleaning', text: 'Inspect dates, blanks and duplicates.' },
  { icon: Database, title: 'MySQL import', text: 'Bring the cleaned CSV into MySQL.' },
  { icon: FileCode2, title: 'SQL analysis', text: 'Query pricing, stock, sales and demand.' },
  { icon: BarChart3, title: 'Power BI dashboard', text: 'Make the patterns easier to see.' },
  { icon: Github, title: 'GitHub portfolio', text: 'Share the analysis and original files.' },
  { icon: Rocket, title: 'Vercel deployment', text: 'Next: publish this case study.', pending: true },
]

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 40%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <section id="workflow" className="section workflow-section"><div className="container"><Reveal className="section-heading"><div><Eyebrow number="05">THE ANALYST WORKFLOW</Eyebrow><h2>Every step has a purpose.</h2></div><p>From a downloaded dataset<br className="desktop-break" /> to a shareable case study.</p></Reveal><div ref={ref} className="workflow-track"><div className="workflow-line" aria-hidden="true"><motion.div className="workflow-progress-horizontal" style={{ scaleX: reduced ? 1 : progress }} /><motion.div className="workflow-progress-vertical" style={{ scaleY: reduced ? 1 : progress }} /></div><ol>{steps.map(({ icon: Icon, ...step }, i) => <li key={step.title} className={step.pending ? 'workflow-pending' : ''}><Reveal delay={i * 0.045}><span className="workflow-node"><Icon size={21} strokeWidth={1.6} /></span><span className="workflow-index">STEP 0{i + 1}{step.pending && <span>UP NEXT</span>}</span><h3>{step.title}</h3><p>{step.text}</p></Reveal></li>)}</ol></div></div></section>
}
