import { Wrench, CheckCircle2, Database, ClipboardList } from 'lucide-react'

export default function RepairsPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-header-title">Repair History &amp; Events</h2>
        <p className="page-header-subtitle">
          Detailed records of diagnostic inspections, servicing operations, and component replacements.
        </p>
      </div>

      {/* Collection Status Banner */}
      <div className="status-banner">
        <div className="status-banner-content">
          <Database className="status-banner-icon" size={24} />
          <div>
            <div className="status-banner-title">Collection Target: repair_events</div>
            <div className="status-banner-desc">
              Stores diagnostic findings, technician logs, replaced parts arrays, and total service costs.
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
              <Wrench size={20} />
            </div>
            <h3 className="placeholder-card-title">Repair Ticket Schema</h3>
          </div>
          <p className="placeholder-card-body">
            Repair records reference the product and store granular maintenance details:
          </p>
          <ul className="placeholder-card-list">
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>product_id:</strong> BSON ObjectId reference to products collection</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>fault_description &amp; diagnosis:</strong> Technician observations</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>parts_replaced:</strong> Array of replaced component objects with costs</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>labor_cost &amp; total_cost:</strong> Financial tracking of repair jobs</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>outcome:</strong> Successful, Partial, or Unrepairable</span>
            </li>
          </ul>
        </div>

        <div className="placeholder-card">
          <div className="placeholder-card-header">
            <div className="placeholder-card-icon">
              <ClipboardList size={20} />
            </div>
            <h3 className="placeholder-card-title">Planned Service Workflow</h3>
          </div>
          <p className="placeholder-card-body">
            Planned frontend interaction for service technicians and lab operators:
          </p>
          <ul className="placeholder-card-list">
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span>New repair event logging form with dynamic part itemization</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span>Direct reference lookup showing past repairs for the same device</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span>Automatic product status updates upon repair completion</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span>Exportable repair summaries for customer and audit records</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
