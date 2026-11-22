import {
  Package,
  Wrench,
  GitBranch,
  BarChart3,
  CheckCircle2,
  Database
} from 'lucide-react'

export default function DashboardPage() {
  const metricPlaceholders = [
    {
      title: 'Products Collection',
      status: 'Initial State',
      description: 'Collection: products',
      icon: Package,
    },
    {
      title: 'Repair Events',
      status: 'Initial State',
      description: 'Collection: repair_events',
      icon: Wrench,
    },
    {
      title: 'Lifecycle Tracking',
      status: 'Initial State',
      description: 'Collection: lifecycle_events',
      icon: GitBranch,
    },
    {
      title: 'Analytics Engine',
      status: 'Configured',
      description: 'MongoDB Aggregations',
      icon: BarChart3,
    },
  ]

  const modules = [
    {
      title: 'Product Management',
      icon: Package,
      path: '/products',
      summary: 'Register and manage electronic devices, serial numbers, and hardware attributes.',
      details: [
        'Unique serial number indexing',
        'Device category & technical specifications',
        'Status management (Active, In Repair, Refurbished)',
      ],
    },
    {
      title: 'Repair & Service Tracking',
      icon: Wrench,
      path: '/repairs',
      summary: 'Log diagnostic checks, technician notes, and component replacement records.',
      details: [
        'Relational product_id reference',
        'Replaced parts sub-documents with cost breakdown',
        'Repair outcome classifications',
      ],
    },
    {
      title: 'Lifecycle Milestones',
      icon: GitBranch,
      path: '/lifecycle',
      summary: 'Chronological, append-oriented history of operational transitions.',
      details: [
        'Milestone logging (Purchase, Refurbish, Transfer)',
        'Technician & facility custody tracking',
        'Safe decommission and e-waste handover',
      ],
    },
    {
      title: 'Database Analytics',
      icon: BarChart3,
      path: '/analytics',
      summary: 'MongoDB aggregation pipelines producing actionable circularity insights.',
      details: [
        'Component failure frequency via $unwind',
        'Category repair costs via $group',
        'Product ownership join summaries via $lookup',
      ],
    },
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-header-title">System Dashboard</h2>
        <p className="page-header-subtitle">
          A MongoDB-based product repair, reuse and lifecycle management system for sustainable consumption.
        </p>
      </div>

      {/* Architecture Readiness Banner */}
      <div className="status-banner">
        <div className="status-banner-content">
          <Database className="status-banner-icon" size={24} />
          <div>
            <div className="status-banner-title">Frontend Shell Initialized</div>
            <div className="status-banner-desc">
              Navigation shell and responsive layout ready. Backend FastAPI and MongoDB connections are planned for subsequent phases.
            </div>
          </div>
        </div>
        <span className="status-pill">Phase: Shell Setup</span>
      </div>

      {/* Database Collection Overview Grid */}
      <div className="metrics-grid">
        {metricPlaceholders.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="metric-card">
              <div className="metric-card-top">
                <span className="metric-label">{item.title}</span>
                <div className="metric-icon-box">
                  <Icon size={18} />
                </div>
              </div>
              <div className="metric-placeholder-value">{item.status}</div>
              <p className="metric-desc">{item.description}</p>
            </div>
          )
        })}
      </div>

      {/* Modules Overview */}
      <div className="cards-grid">
        {modules.map((mod) => {
          const Icon = mod.icon
          return (
            <div key={mod.title} className="placeholder-card">
              <div className="placeholder-card-header">
                <div className="placeholder-card-icon">
                  <Icon size={20} />
                </div>
                <h3 className="placeholder-card-title">{mod.title}</h3>
              </div>
              <p className="placeholder-card-body">{mod.summary}</p>
              <ul className="placeholder-card-list">
                {mod.details.map((point) => (
                  <li key={point}>
                    <CheckCircle2 className="check-bullet" size={15} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
