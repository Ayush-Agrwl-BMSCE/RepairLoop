// src/data/analyticsData.js
/**
 * Analytical computation helpers for RepairLoop.
 *
 * NOTE: In this frontend architecture, these pure utility functions derive
 * analytical aggregates (status counts, monthly repair trends, component frequencies,
 * expenditure by category, and lifecycle event distribution) directly from the
 * local normalized demonstration datasets.
 *
 * In the planned MongoDB production deployment, each of these calculations will map
 * directly to a FastAPI endpoint backed by a native MongoDB Aggregation Pipeline
 * ($match, $unwind, $group, $lookup, $sort, $project).
 */

// Status colors aligned with the forest-green circular economy palette
export const statusColors = {
  Active: '#2d6a4f',
  Refurbished: '#40916c',
  'Under Repair': '#d97706',
  Decommissioned: '#64748b',
  Recycled: '#1b4332',
}

// Event type colors for lifecycle distribution
export const eventColors = {
  Purchased: '#0284c7',
  'Ownership Transfer': '#d97706',
  Refurbished: '#16a34a',
  Decommissioned: '#64748b',
  Recycled: '#1b4332',
}

/**
 * Calculate high-level summary KPIs
 */
export function calculateAnalyticsKPIs(products = [], repairs = [], events = []) {
  const totalProducts = products.length
  const totalRepairs = repairs.length
  const totalLifecycleEvents = events.length
  const totalExpenditure = repairs.reduce(
    (sum, r) => sum + (Number(r.total_cost) || 0),
    0
  )

  return {
    totalProducts,
    totalRepairs,
    totalLifecycleEvents,
    totalExpenditure,
  }
}

/**
 * 1. Product Status Distribution ($group by current_status)
 */
export function calculateProductStatusCounts(products = []) {
  const counts = {
    Active: 0,
    Refurbished: 0,
    'Under Repair': 0,
    Decommissioned: 0,
    Recycled: 0,
  }

  products.forEach((p) => {
    if (counts[p.current_status] !== undefined) {
      counts[p.current_status] += 1
    }
  })

  return Object.keys(counts)
    .filter((status) => counts[status] > 0)
    .map((status) => ({
      name: status,
      count: counts[status],
      color: statusColors[status] || '#52796f',
    }))
}

/**
 * 2. Monthly Repair Activity Trends ($group by month of repair_date)
 */
export function calculateMonthlyRepairTrends(repairs = []) {
  if (!repairs.length) return []

  const monthMap = {}

  repairs.forEach((r) => {
    if (!r.repair_date) return
    const d = new Date(r.repair_date)
    if (isNaN(d.getTime())) return

    const yearMonth = r.repair_date.substring(0, 7) // 'YYYY-MM'
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })

    if (!monthMap[yearMonth]) {
      monthMap[yearMonth] = {
        key: yearMonth,
        month: label,
        totalRepairs: 0,
        successfulRepairs: 0,
      }
    }

    monthMap[yearMonth].totalRepairs += 1
    if (r.outcome === 'Successful') {
      monthMap[yearMonth].successfulRepairs += 1
    }
  })

  return Object.keys(monthMap)
    .sort()
    .map((k) => monthMap[k])
}

/**
 * 3. Frequently Replaced Components ($unwind: parts_replaced + $group by part_name)
 */
export function calculateComponentReplacements(repairs = []) {
  if (!repairs.length) return []

  const partMap = {}

  repairs.forEach((r) => {
    const parts = r.parts_replaced || []
    parts.forEach((p) => {
      const name = (p.part_name || '').trim()
      if (!name) return

      if (!partMap[name]) {
        partMap[name] = {
          component: name,
          count: 0,
          totalCost: 0,
        }
      }
      partMap[name].count += 1
      partMap[name].totalCost += Number(p.cost) || 0
    })
  })

  return Object.values(partMap)
    .sort((a, b) => b.count - a.count || b.totalCost - a.totalCost)
    .slice(0, 7) // Top 7 replaced parts
}

/**
 * 4. Repair Expenditure by Product Category ($lookup: products + $group by category)
 */
export function calculateExpenditureByCategory(repairs = [], productsMap = {}) {
  if (!repairs.length) return []

  const categoryMap = {}

  repairs.forEach((r) => {
    const product = productsMap[r.product_id]
    const category = product ? product.category : 'Other'
    const cost = Number(r.total_cost) || 0

    if (!categoryMap[category]) {
      categoryMap[category] = {
        category,
        totalCost: 0,
        repairCount: 0,
      }
    }
    categoryMap[category].totalCost += cost
    categoryMap[category].repairCount += 1
  })

  return Object.values(categoryMap).sort((a, b) => b.totalCost - a.totalCost)
}

/**
 * 5. Lifecycle Event Distribution ($group by event_type)
 */
export function calculateLifecycleEventDistribution(events = []) {
  if (!events.length) return []

  const counts = {
    Purchased: 0,
    'Ownership Transfer': 0,
    Refurbished: 0,
    Decommissioned: 0,
    Recycled: 0,
  }

  events.forEach((e) => {
    if (counts[e.event_type] !== undefined) {
      counts[e.event_type] += 1
    }
  })

  return Object.keys(counts)
    .filter((type) => counts[type] > 0)
    .map((type) => ({
      name: type,
      count: counts[type],
      color: eventColors[type] || '#52796f',
    }))
}

/**
 * 6. Product Category Distribution ($group by category)
 */
export function calculateProductCategoryCounts(products = []) {
  if (!products.length) return []

  const categoryMap = {}

  products.forEach((p) => {
    const cat = p.category || 'Other'
    categoryMap[cat] = (categoryMap[cat] || 0) + 1
  })

  return Object.keys(categoryMap)
    .map((cat) => ({
      category: cat,
      count: categoryMap[cat],
    }))
    .sort((a, b) => b.count - a.count)
}
