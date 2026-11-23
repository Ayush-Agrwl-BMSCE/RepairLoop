import { Wrench, CheckCircle2, AlertTriangle, IndianRupee } from 'lucide-react'

export default function RepairStats({ repairs = [] }) {
  const totalRepairs = repairs.length

  const successfulRepairs = repairs.filter(
    (repair) => repair.outcome === 'Successful'
  ).length

  const partialRepairs = repairs.filter(
    (repair) => repair.outcome === 'Partial'
  ).length

  const totalExpenditure = repairs.reduce(
    (acc, repair) => acc + (Number(repair.total_cost) || 0),
    0
  )

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const stats = [
    {
      title: 'Total Repairs',
      value: totalRepairs,
      label: 'Logged service tickets',
      icon: Wrench,
      tag: 'Collection: repair_events',
    },
    {
      title: 'Successful Repairs',
      value: successfulRepairs,
      label: 'Fully restored to service',
      icon: CheckCircle2,
      tag: 'Outcome: Successful',
    },
    {
      title: 'Partial Repairs',
      value: partialRepairs,
      label: 'Restored with limitations',
      icon: AlertTriangle,
      tag: 'Outcome: Partial',
    },
    {
      title: 'Total Expenditure',
      value: formatCurrency(totalExpenditure),
      label: 'Combined parts & labor cost',
      icon: IndianRupee,
      tag: 'Field: total_cost (INR)',
    },
  ]

  return (
    <div className="metrics-grid">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.title} className="metric-card">
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
