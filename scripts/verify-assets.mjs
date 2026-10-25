import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const manifest = JSON.parse(readFileSync(new URL('scripts/artifact-manifest.json', root), 'utf8'))
for (const [file, expected] of Object.entries(manifest)) {
  const actual = createHash('sha256').update(readFileSync(new URL(`public/${file}`, root))).digest('hex')
  if (actual !== expected) throw new Error(`Original artifact changed: ${file}`)
  console.log(`SHA-256 verified: ${file}`)
}
const sql = readFileSync(new URL('public/inventory_analysis.sql', root), 'utf8').replace(/\r\n/g, '\n')
const data = JSON.parse(readFileSync(new URL('src/data/metrics.json', root), 'utf8'))
for (const query of data.queries) {
  if (!sql.includes(query.sql)) throw new Error(`SQL preview is out of date: ${query.title}`)
}
console.log('SQL previews match the downloadable analysis.')
