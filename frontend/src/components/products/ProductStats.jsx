import { Package, CheckCircle2, Wrench, RotateCcw } from 'lucide-react'

export default function ProductStats({ products }) {
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.current_status === 'Active').length
  const underRepair = products.filter((p) => p.current_status === 'Under Repair').length
  const refurbished = products.filter((p) => p.current_status === 'Refurbished').length

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      label: 'Registered inventory records',
      icon: Package,
      tag: 'Collection: products',
    },
    {
      title: 'Active Products',
      value: activeProducts,
      label: 'In normal working operation',
      icon: CheckCircle2,
      tag: 'Status: Active',
    },
    {
      title: 'Under Repair',
      value: underRepair,
      label: 'Awaiting diagnosis / parts',
      icon: Wrench,
      tag: 'Status: Under Repair',
    },
    {
      title: 'Refurbished Products',
      value: refurbished,
      label: 'Certified for secondary use',
      icon: RotateCcw,
      tag: 'Status: Refurbished',
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
