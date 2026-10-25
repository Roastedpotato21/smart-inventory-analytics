import { useState } from 'react'
import { ArrowRight, Braces, Check, Database, FileCode2 } from 'lucide-react'
import { project, formatNumber } from '../data/project'
import { Eyebrow, Reveal } from './ui'

function HighlightedSQL({ sql }: { sql: string }) {
  return <code>{sql.split(/(\b(?:SELECT|COUNT|DISTINCT|AS|FROM|GROUP BY|ORDER BY|DESC|ROUND|AVG|SUM|STR_TO_DATE)\b|'[^']*'|`[^`]*`)/g).map((part, i) => <span key={i} className={/^(SELECT|COUNT|DISTINCT|AS|FROM|GROUP BY|ORDER BY|DESC|ROUND|AVG|SUM|STR_TO_DATE)$/.test(part) ? 'sql-keyword' : /^[`']/.test(part) ? 'sql-field' : undefined}>{part}</span>)}</code>
}

const descriptions = [
  'Establish the size of the dataset and the number of distinct categories before exploring the data.',
  'Group records by parsed calendar date to inspect daily coverage and average pricing.',
  'Compare category averages to understand the pricing landscape across the dataset.',
  'Aggregate recorded inventory snapshots by category to examine the distribution of stock observations.',
  'Sum recorded units sold by category to compare sales volumes across the full dataset.',
  'Compare average demand forecasts across categories as a starting point for order planning.',
]

export function SQLAnalysis() {
  const [active, setActive] = useState(2)
  const query = project.queries[active]
  const highest = [...project.categories].sort((a, b) => b.averagePrice - a.averagePrice)[0]
  const results = [
    `${formatNumber(project.records)} records · ${project.categories.length} categories`,
    'Dates parsed explicitly from DD-MM-YYYY',
    `${highest.name} · ${highest.averagePrice.toFixed(2)} highest category average`,
    `${formatNumber(project.totalInventory)} summed inventory observations`,
    `${formatNumber(project.unitsSold)} recorded units sold across all categories`,
    'Category-level averages for further comparison',
  ]
  return <section id="analysis" className="section analysis-section">
    <div className="container">
      <Reveal className="section-heading"><div><Eyebrow number="03">BEHIND THE NUMBERS</Eyebrow><h2>Good questions.<br />Readable SQL.</h2></div><div className="heading-aside"><p>SQL Analysis</p><span>Explore the actual MySQL queries used to turn rows into findings.</span></div></Reveal>
      <Reveal className="sql-layout">
        <div className="query-list" role="group" aria-label="SQL analysis previews">{project.queries.map((item, i) => <button key={item.title} className={`query-button${active === i ? ' is-active' : ''}`} onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="sql-preview"><span className="query-number">0{i + 1}</span><span>{item.title}</span><ArrowRight size={16} /></button>)}<a className="query-full-link" href={project.sql} target="_blank" rel="noreferrer"><FileCode2 size={17} />View Full SQL Analysis<ArrowRight size={15} /></a></div>
        <div id="sql-preview" className="code-panel" aria-live="polite" aria-atomic="true"><div className="code-toolbar"><span><Braces size={17} />inventory_analysis.sql</span><span>MySQL</span></div><div className="code-description"><h3>{query.title}</h3><p>{descriptions[active]}</p></div><pre tabIndex={0} aria-label={`${query.title} SQL query`}><HighlightedSQL sql={query.sql} /></pre><div className="query-result"><span><Check size={15} />{active === 1 || active === 5 ? 'METHOD NOTE' : 'VERIFIED FROM CSV'}</span><p>{results[active]}</p></div></div>
      </Reveal>
      <div className="analysis-footnote"><Database size={15} /><span>Real columns. Reproducible queries. The full SQL file includes sales totals, discounts and top products.</span></div>
    </div>
  </section>
}
