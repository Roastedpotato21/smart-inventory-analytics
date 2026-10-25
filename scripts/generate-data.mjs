// Development-only CSV aggregation. No dataset parsing runs in the browser.
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
function parseCsv(text) {
  const rows = []
  let row = [], field = '', quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++ }
      else quoted = !quoted
    } else if (!quoted && (c === ',' || c === '\n')) {
      row.push(field.replace(/\r$/, '')); field = ''
      if (c === '\n') { if (row.some(Boolean)) rows.push(row); row = [] }
    } else field += c
  }
  if (quoted) throw new Error('Unclosed quoted CSV field')
  if (field || row.length) { row.push(field.replace(/\r$/, '')); rows.push(row) }
  return rows
}
const [headers, ...rows] = parseCsv(readFileSync(new URL('public/cleaned_inventory.csv', root), 'utf8').replace(/^\uFEFF/, ''))
const column = (name) => {
  const i = headers.indexOf(name)
  if (i < 0) throw new Error(`Missing CSV column: ${name}`)
  return i
}
const categoryCol = column('Category'), soldCol = column('Units Sold')
const inventoryCol = column('Inventory Level'), priceCol = column('Price')
const groups = new Map()
let unitsSold = 0, totalInventory = 0
for (const row of rows) {
  if (row.length !== headers.length || row.some((cell) => !cell.trim())) throw new Error('Malformed or empty CSV field')
  const sold = Number(row[soldCol]), inventory = Number(row[inventoryCol])
  const priceCents = Math.round(Number(row[priceCol]) * 100)
  if (![sold, inventory, priceCents].every(Number.isSafeInteger)) throw new Error('Invalid numeric field')
  unitsSold += sold; totalInventory += inventory
  const name = row[categoryCol]
  const group = groups.get(name) ?? { name, records: 0, unitsSold: 0, inventory: 0, priceCents: 0 }
  group.records++; group.unitsSold += sold; group.inventory += inventory; group.priceCents += priceCents
  groups.set(name, group)
}
const categories = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name)).map(({ priceCents, ...group }) => ({
  ...group,
  averagePrice: Number((priceCents / group.records / 100).toFixed(4)),
  inventoryShare: Number((group.inventory / totalInventory * 100).toFixed(2)),
}))
const sql = readFileSync(new URL('public/inventory_analysis.sql', root), 'utf8').replace(/\r\n/g, '\n')
const queries = sql.split('-- Preview: ').slice(1).map((part) => {
  const [title, ...lines] = part.trim().split('\n')
  return { title: title.trim(), sql: lines.join('\n').split(';')[0].trim() + ';' }
})
const data = { records: rows.length, unitsSold, totalInventory, categories, queries }
const output = JSON.stringify(data, null, 2) + '\n'
const target = new URL('src/data/metrics.json', root)
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output) throw new Error('Metrics are stale. Run npm run data:generate.')
  console.log('Precomputed metrics and SQL previews match the source files.')
} else {
  writeFileSync(target, output)
  console.log(`${rows.length} records; ${unitsSold} units sold; ${categories.length} categories.`)
}
