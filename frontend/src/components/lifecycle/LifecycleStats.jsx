import { History, ArrowRightLeft, RotateCcw, Recycle } from 'lucide-react'

export default function LifecycleStats({ events = [] }) {
  const totalEvents = events.length

  const transferEvents = events.filter(
    (e) => e.event_type === 'Ownership Transfer'
  ).length

  const refurbishmentEvents = events.filter(
    (e) => e.event_type === 'Refurbished'
  ).length

  const endOfLifeEvents = events.filter(
    (e) => e.event_type === 'Decommissioned' || e.event_type === 'Recycled'
  ).length

  const stats = [
    {
      title: 'Total Lifecycle Events',
      value: totalEvents,
      label: 'Logged milestone records',
      icon: History,
      tag: 'Collection: lifecycle_events',
    },
    {
      title: 'Ownership Transfers',
      value: transferEvents,
      label: 'Departmental & user reassignments',
      icon: ArrowRightLeft,
      tag: 'Type: Ownership Transfer',
    },
    {
      title: 'Refurbishment Events',
      value: refurbishmentEvents,
      label: 'Certified reconditioning milestones',
      icon: RotateCcw,
      tag: 'Type: Refurbished',
    },
    {
      title: 'End-of-Life Events',
      value: endOfLifeEvents,
      label: 'Decommissioned or recycled assets',
      icon: Recycle,
      tag: 'Type: Decommissioned / Recycled',
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
