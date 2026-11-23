import { Package, Wrench, History, IndianRupee } from 'lucide-react'

export default function AnalyticsStats({
  totalProducts = 0,
  totalRepairs = 0,
  totalLifecycleEvents = 0,
  totalExpenditure = 0,
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const stats = [
    {
      id: 'stat-products',
      title: 'Total Products',
      value: totalProducts,
      label: 'Registered asset records',
      icon: Package,
      tag: 'Collection: products',
    },
    {
      id: 'stat-repairs',
      title: 'Total Repair Events',
      value: totalRepairs,
      label: 'Servicing tickets analyzed',
      icon: Wrench,
      tag: 'Collection: repair_events',
    },
    {
      id: 'stat-lifecycle',
      title: 'Total Lifecycle Events',
      value: totalLifecycleEvents,
      label: 'Milestone events logged',
      icon: History,
      tag: 'Collection: lifecycle_events',
    },
    {
      id: 'stat-expenditure',
      title: 'Total Repair Expenditure',
      value: formatCurrency(totalExpenditure),
      label: 'Combined parts and labor',
      icon: IndianRupee,
      tag: 'Field: total_cost (INR)',
    },
  ]

  return (
    <div className="metrics-grid">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.id} className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">{stat.title}</span>
              <div className="metric-icon-box" aria-hidden="true">
                <Icon size={18} strokeWidth={2.2} />
              </div>
            </div>
            <div className="metric-placeholder-value">{stat.value}</div>
            <p className="metric-desc">{stat.label}</p>
            <div className="metric-collection-tag">
              <span>{stat.tag}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
