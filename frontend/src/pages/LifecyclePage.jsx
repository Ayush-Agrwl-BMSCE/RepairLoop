import { CheckCircle2, Database, History, Milestone } from 'lucide-react'

export default function LifecyclePage() {
  const milestoneTypes = [
    { name: 'Purchased', desc: 'Initial acquisition and entry into service registry' },
    { name: 'Refurbished', desc: 'Diagnostic testing and certification for secondary use' },
    { name: 'Ownership Transfer', desc: 'Device custody passed to secondary owner or department' },
    { name: 'Decommissioned', desc: 'Formal retirement from active operational fleet' },
    { name: 'Recycled', desc: 'Safe disposal and materials recovery at authorized e-waste facility' },
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-header-title">Lifecycle Tracking</h2>
        <p className="page-header-subtitle">
          Chronological, append-oriented history of operational transitions and asset milestones.
        </p>
      </div>

      {/* Collection Status Banner */}
      <div className="status-banner">
        <div className="status-banner-content">
          <Database className="status-banner-icon" size={24} />
          <div>
            <div className="status-banner-title">Collection Target: lifecycle_events</div>
            <div className="status-banner-desc">
              Maintains an append-oriented audit trail of device custody, reconditioning, and disposal events.
            </div>
          </div>
        </div>
        <span className="status-pill">MongoDB Collection</span>
      </div>

      {/* Planned Feature Cards */}
      <div className="cards-grid">
        <div className="placeholder-card">
          <div className="placeholder-card-header">
            <div className="placeholder-card-icon">
              <Milestone size={20} />
            </div>
            <h3 className="placeholder-card-title">Supported Milestone Types</h3>
          </div>
          <p className="placeholder-card-body">
            Each lifecycle milestone records a distinct stage in the circular economy journey:
          </p>
          <ul className="placeholder-card-list">
            {milestoneTypes.map((m) => (
              <li key={m.name}>
                <CheckCircle2 className="check-bullet" size={15} />
                <span><strong>{m.name}:</strong> {m.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="placeholder-card">
          <div className="placeholder-card-header">
            <div className="placeholder-card-icon">
              <History size={20} />
            </div>
            <h3 className="placeholder-card-title">Append-Oriented Architecture</h3>
          </div>
          <p className="placeholder-card-body">
            Design principles demonstrated in this collection:
          </p>
          <ul className="placeholder-card-list">
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>product_id indexing:</strong> Fast chronological timeline reconstruction</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>Custody accountability:</strong> Records location and operating technician</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>Non-destructive logging:</strong> Past milestones are preserved as new events occur</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>Decoupled from repairs:</strong> Formal refurbishment logged as a distinct lifecycle event</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
