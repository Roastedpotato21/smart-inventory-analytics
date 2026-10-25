import { Database, Info } from 'lucide-react'
import { project, formatNumber } from '../data/project'
import { Eyebrow, Reveal } from './ui'

export function ProjectOverview() {
  return <section id="overview" className="section overview-section">
    <div className="container">
      <Reveal className="overview-grid">
        <div><Eyebrow number="01">THE CONTEXT</Eyebrow><h2>From rows to <br />a retail story.</h2></div>
        <div className="overview-content"><h3>The objective</h3><p>Analyze retail inventory data to identify useful patterns in stock levels, product categories, pricing, demand and sales performance.</p><p className="text-secondary">This project follows the complete analyst workflow: preparing the data, asking questions in SQL, and communicating the findings through a Power BI dashboard.</p><div className="disclosure"><Info size={18} /><p>A portfolio exercise using a <strong>synthetic but realistic dataset</strong>. These findings describe the sample data, rather than a real company.</p></div></div>
      </Reveal>
      <Reveal className="metadata-grid" delay={0.08}>
        <div><span className="small-label">DATASET</span><strong><Database size={17} />{formatNumber(project.records)} rows</strong></div>
        <div><span className="small-label">SOURCE</span><strong>Kaggle</strong><span className="metadata-note">Retail Store Inventory Forecasting</span></div>
        <div><span className="small-label">DOMAIN</span><strong>Retail inventory</strong></div>
        <div><span className="small-label">ANALYSIS</span><strong>SQL + Power BI</strong></div>
      </Reveal>
    </div>
  </section>
}
