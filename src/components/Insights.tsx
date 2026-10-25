import { ArrowUpRight, Boxes, CircleDollarSign, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { project, formatNumber } from '../data/project'
import { Eyebrow, Reveal } from './ui'

export function Insights() {
  const prices = project.categories.map(c => c.averagePrice)
  const shares = project.categories.map(c => c.inventoryShare)
  const insights = [
    { icon: CircleDollarSign, tag: 'PRICING', title: 'Electronics leads on average price.', body: 'Electronics has the highest average price among the five product categories.', evidence: `${Math.max(...prices).toFixed(2)} average price · currency unspecified` },
    { icon: Boxes, tag: 'INVENTORY', title: 'Stock is fairly evenly distributed.', body: 'No single category dominates the inventory observations in this dataset.', evidence: `${Math.min(...shares).toFixed(2)}–${Math.max(...shares).toFixed(2)}% inventory share per category` },
    { icon: ShoppingBag, tag: 'SALES', title: 'Almost 10 million units sold.', body: 'The dataset records approximately 10 million units sold across all categories.', evidence: `${formatNumber(project.unitsSold)} total recorded units sold` },
    { icon: SlidersHorizontal, tag: 'COMPARISON', title: 'Category prices stay close.', body: 'Average prices across categories remain relatively similar, despite Electronics taking the lead.', evidence: `${Math.min(...prices).toFixed(2)}–${Math.max(...prices).toFixed(2)} category average price` },
  ]
  return <section id="insights" className="section insights-section">
    <div className="container">
      <Reveal className="section-heading"><div><Eyebrow number="04">WHAT THE DATA SAYS</Eyebrow><h2>Four findings.<br />A clearer picture.</h2></div><p>Grounded in the source data.<br className="desktop-break" /> Kept in perspective.</p></Reveal>
      <div className="insights-grid">{insights.map(({ icon: Icon, ...item }, i) => <Reveal className="insight-card" key={item.tag} delay={i * 0.06}><div className="insight-top"><span className={`insight-icon insight-icon-${i}`}><Icon size={22} strokeWidth={1.6} /></span><span className="small-label">{item.tag}</span><span className="insight-index">0{i + 1}</span></div><h3>{item.title}</h3><p>{item.body}</p><div className="insight-evidence"><ArrowUpRight size={15} />{item.evidence}</div></Reveal>)}</div>
      <p className="section-note">Inventory figures sum recorded daily snapshots. Balanced category totals alone do not establish optimal stock levels.</p>
    </div>
  </section>
}
