import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, Reveal } from './ui'

const items = [
  ['Keep stock in balance', 'Maintain balanced stock levels to reduce shortages and excess inventory.'],
  ['Watch demand, then reorder', 'Monitor high-demand products regularly and reorder before inventory becomes too low.'],
  ['Keep pricing under review', 'Review category pricing to maintain competitiveness and profitability.'],
  ['Plan with the forecast', 'Compare inventory levels with demand forecasts when planning future orders.'],
]

export function Recommendations() {
  return <section className="recommendations-section" aria-labelledby="recommendations-title"><div className="container"><Reveal className="recommendations-panel"><div className="recommendations-intro"><Eyebrow light>FROM INSIGHT TO ACTION</Eyebrow><h2 id="recommendations-title">What would<br />I recommend?</h2><p>Practical next steps to investigate, based on this portfolio analysis.</p><span className="recommendation-stamp"><ArrowUpRight size={17} />BUSINESS RECOMMENDATIONS</span></div><div className="recommendation-list">{items.map(([title, text], i) => <div className="recommendation" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></Reveal></div></section>
}
