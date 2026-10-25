import metrics from './metrics.json'

export const project = {
  ...metrics,
  github: 'https://github.com/Roastedpotato21/smart-inventory-analytics',
  report: '/smart_inventoryanalytics.pbix',
  dashboard: '/dashboard.png',
  sql: '/inventory_analysis.sql',
  dataset: '/cleaned_inventory.csv',
}

export const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value)
