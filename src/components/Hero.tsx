import { ArrowDown, ArrowDownRight, ArrowRight, Download } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { project, formatNumber } from '../data/project'
import { Reveal } from './ui'

export function Hero() {
  const reduced = useReducedMotion()
  return <section id="top" className="hero">
    <div className="container hero-grid">
      <Reveal className="hero-copy">
        <div className="project-badge"><span />Data Analytics Case Study<span className="badge-index">/ 01</span></div>
        <h1>Smart inventory<br /><span>analytics.</span></h1>
        <p className="hero-lead">A clearer view of stock, sales,<br className="desktop-break" /> and the decisions in between.</p>
        <p className="hero-description">An end-to-end retail inventory analysis using Excel, MySQL, SQL and Power BI. From raw records to practical business insights.</p>
        <div className="hero-actions">
          <a href="#dashboard" className="button button-primary">View Dashboard<ArrowDown size={17} /></a>
          <a href={project.report} download className="button button-outline"><Download size={16} />Download Power BI Report</a>
        </div>
        <div className="tool-row"><span className="tool-caption">THE TOOLKIT</span>{['Excel', 'MySQL', 'SQL', 'Power BI'].map(tool => <span key={tool} className="tool-chip">{tool}</span>)}</div>
      </Reveal>
      <Reveal className="hero-visual" delay={0.16}>
        <div className="visual-grid" aria-hidden="true" />
        <figure className="inventory-figure">
          <div className="figure-top"><span><span className="live-dot" />THE INVENTORY PICTURE</span><span className="figure-index">FIG. 01</span></div>
          <div className="figure-kpi"><div><span className="small-label">Total recorded units sold</span><strong>{(project.unitsSold / 1_000_000).toFixed(2)}<span>M</span></strong></div><div className="figure-kpi-note"><ArrowDownRight size={22} /><span>{formatNumber(project.records)} records<br />One retail story</span></div></div>
          <div className="chart-heading"><span>Inventory share by category</span><span>% of total</span></div>
          <div className="hero-chart" role="img" aria-label={project.categories.map(c => `${c.name}: ${c.inventoryShare}%`).join(', ')}>
            <div className="chart-grid" aria-hidden="true"><span>25</span><span>20</span><span>10</span><span>0</span></div>
            <div className="chart-columns">
              {project.categories.map((category, i) => <div key={category.name} className="chart-column">
                <span className="bar-value">{category.inventoryShare.toFixed(2)}<span>%</span></span>
                <motion.div className={`chart-bar chart-bar-${i}`} initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: reduced ? 0 : 0.3 + i * 0.08 }} style={{ height: `${category.inventoryShare / 25 * 179}px`, transformOrigin: 'bottom' }} />
                <span className="bar-label">{category.name}</span>
              </div>)}
            </div>
          </div>
          <figcaption><span className="mini-square" />Static summary · calculated from the cleaned CSV</figcaption>
        </figure>
        <div className="finding-note"><span className="note-marker">↳</span><div><span className="small-label">A FIRST OBSERVATION</span><p>Five categories.<br /><strong>A remarkably even split.</strong></p></div></div>
        <div className="visual-source">RETAIL INVENTORY <span>×</span> EXPLORATORY ANALYSIS</div>
      </Reveal>
    </div>
    <div className="container hero-bottom"><span>Excel → MySQL → Power BI</span><a href="#overview">Explore the case study<ArrowRight size={15} /></a><span className="hero-bottom-right">Built on data. Open to inspection.</span></div>
  </section>
}
