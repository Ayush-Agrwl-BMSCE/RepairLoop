// src/data/dashboardData.js
/**
 * Demonstration Data for RepairLoop Dashboard.
 *
 * NOTE: All data structures below represent illustrative sample figures designed
 * for frontend interface development. They are fully compatible with the schema
 * design defined for MongoDB collections:
 *   - products (master inventory & current_status)
 *   - repair_events (diagnostic tickets, costs, replaced parts)
 *   - lifecycle_events (append-oriented chronological milestone log)
 *
 * All figures are illustrative and internally consistent.
 * When backend services are integrated, these data structures will be replaced
 * by live API responses from FastAPI endpoints.
 */

// 1. KPI Summary Metrics
// NOTE: Document counts from lifecycle_events are labeled as "Events" rather
// than unique products, preserving accurate distinction between entities and event logs.
export const kpiMetrics = [
  {
    id: 'total-products',
    title: 'Total Products',
    value: '124',
    explanatoryLabel: 'Registered assets in database',
    iconName: 'Package',
    collectionRef: 'products',
  },
  {
    id: 'total-repairs',
    title: 'Total Repairs',
    value: '87',
    explanatoryLabel: 'Service tickets logged to date',
    iconName: 'Wrench',
    collectionRef: 'repair_events',
  },
  {
    id: 'reuse-events',
    title: 'Reuse Events',
    value: '52',
    explanatoryLabel: 'Refurbishment & transfer events logged',
    iconName: 'RotateCcw',
    collectionRef: 'lifecycle_events',
  },
  {
    id: 'recycling-events',
    title: 'Recycling Events',
    value: '19',
    explanatoryLabel: 'End-of-life recycling milestones logged',
    iconName: 'Recycle',
    collectionRef: 'lifecycle_events',
  },
]

// 2. Monthly Repair Activity (illustrating repair_events over time)
export const monthlyRepairActivity = [
  { month: 'Jun', totalRepairs: 9, successfulRepairs: 8 },
  { month: 'Jul', totalRepairs: 12, successfulRepairs: 11 },
  { month: 'Aug', totalRepairs: 15, successfulRepairs: 13 },
  { month: 'Sep', totalRepairs: 14, successfulRepairs: 13 },
  { month: 'Oct', totalRepairs: 18, successfulRepairs: 16 },
  { month: 'Nov', totalRepairs: 19, successfulRepairs: 18 },
]

// 3. Frequently Replaced Components (illustrating $unwind + $group on repair_events.parts_replaced)
// Costs specified in INR (₹)
export const componentReplacementStats = [
  { component: 'Battery', count: 34, avgCostINR: 2800 },
  { component: 'Display', count: 21, avgCostINR: 4500 },
  { component: 'Charging Port', count: 18, avgCostINR: 850 },
  { component: 'Power Supply', count: 14, avgCostINR: 2200 },
  { component: 'Cooling Fan', count: 9, avgCostINR: 750 },
]

// 4. Product Status Distribution (reflecting products.current_status)
// Strictly uses the 5 agreed current_status values from the approved README data model:
//   - Active (68)
//   - Refurbished (22)
//   - Under Repair (15)
//   - Decommissioned (10)
//   - Recycled (9)
// Total: 68 + 22 + 15 + 10 + 9 = 124 products (matches Total Products KPI)
export const productStatusDistribution = [
  { name: 'Active', count: 68, color: '#2d6a4f' },
  { name: 'Refurbished', count: 22, color: '#40916c' },
  { name: 'Under Repair', count: 15, color: '#d97706' },
  { name: 'Decommissioned', count: 10, color: '#64748b' },
  { name: 'Recycled', count: 9, color: '#1b4332' },
]

// 5. Recent Repair Activities (illustrating repair_events documents joined with products)
// Repair costs formatted in Indian Rupees (INR ₹)
export const recentRepairs = [
  {
    ticketId: 'REP-2024-0087',
    productModel: 'ThinkClean E14',
    serialNumber: 'SN-LPT-2024-0042',
    category: 'Laptop',
    faultDescription: 'Battery cell degradation (<30m charge hold)',
    repairDate: '2024-11-18',
    repairCost: 3500.0,
    outcome: 'Successful',
  },
  {
    ticketId: 'REP-2024-0086',
    productModel: 'EcoDisplay Pro 27',
    serialNumber: 'SN-MON-2023-0118',
    category: 'Monitor',
    faultDescription: 'Capacitor failure causing backlight flicker',
    repairDate: '2024-11-15',
    repairCost: 1800.0,
    outcome: 'Successful',
  },
  {
    ticketId: 'REP-2024-0085',
    productModel: 'CircularTab 10',
    serialNumber: 'SN-TAB-2023-0095',
    category: 'Tablet',
    faultDescription: 'Cracked digitizer screen with touch dead zones',
    repairDate: '2024-11-12',
    repairCost: 4200.0,
    outcome: 'Successful',
  },
  {
    ticketId: 'REP-2024-0084',
    productModel: 'OptiDesk Mini PC',
    serialNumber: 'SN-DSK-2022-0312',
    category: 'Desktop',
    faultDescription: 'Thermal fan bearing seized; thermal shutdown',
    repairDate: '2024-11-08',
    repairCost: 1250.0,
    outcome: 'Partial',
  },
  {
    ticketId: 'REP-2024-0083',
    productModel: 'SmartPhone X Eco',
    serialNumber: 'SN-PHN-2023-0401',
    category: 'Smartphone',
    faultDescription: 'Damaged USB-C charging connector pins',
    repairDate: '2024-11-04',
    repairCost: 950.0,
    outcome: 'Successful',
  },
  {
    ticketId: 'REP-2024-0082',
    productModel: 'OfficeLaser E-400',
    serialNumber: 'SN-PRN-2021-0067',
    category: 'Printer',
    faultDescription: 'Mainboard voltage controller surge damage',
    repairDate: '2024-10-29',
    repairCost: 5800.0,
    outcome: 'Unrepairable',
  },
]
