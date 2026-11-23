import { X, Wrench, Calendar, MapPin, User, AlertCircle, CheckCircle2, Layers, IndianRupee, Hash } from 'lucide-react'

export default function RepairDetails({
  isOpen,
  onClose,
  repair,
  product,
}) {
  if (!isOpen || !repair) return null

  const resolvedProduct = product || {
    brand: 'Unknown',
    model: 'Device',
    serial_number: 'N/A',
    category: 'Other',
    current_status: 'Unknown',
  }

  const formatDate = (dateString) => {
    if (!dateString) return '—'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-IN', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0)
  }

  const getOutcomeClass = (outcome) => {
    switch (outcome) {
      case 'Successful':
        return 'outcome-badge outcome-successful'
      case 'Partial':
        return 'outcome-badge outcome-partial'
      case 'Unrepairable':
        return 'outcome-badge outcome-unrepairable'
      default:
        return 'outcome-badge'
    }
  }

  const parts = repair.parts_replaced || []
  const partsSubtotal = parts.reduce((sum, p) => sum + (Number(p.cost) || 0), 0)

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-form-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title-with-badge">
              <h3 className="modal-title">Repair Ticket Details</h3>
              <span className={getOutcomeClass(repair.outcome)}>
                {repair.outcome}
              </span>
            </div>
            <p className="modal-subtitle">
              Document ID: <code>{repair._id}</code> &bull; Service Date: {formatDate(repair.repair_date)}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scrollable">
          {/* Associated Product Section */}
          <div className="details-section">
            <h4 className="details-section-heading">Associated Electronic Product</h4>
            <div className="details-grid-two">
              <div className="detail-item">
                <span className="detail-item-label">
                  <Wrench size={14} /> Product Designation
                </span>
                <span className="detail-item-value font-semibold">
                  {resolvedProduct.brand} {resolvedProduct.model}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <Hash size={14} /> Serial Number
                </span>
                <span className="detail-item-value serial-code">
                  <code>{resolvedProduct.serial_number}</code>
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">Category</span>
                <span className="detail-item-value">
                  {resolvedProduct.category}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">Current Product Status</span>
                <span className="detail-item-value">
                  {resolvedProduct.current_status}
                </span>
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="details-section">
            <h4 className="details-section-heading">Service Execution &amp; Location</h4>
            <div className="details-grid-two">
              <div className="detail-item">
                <span className="detail-item-label">
                  <Calendar size={14} /> Completion Date
                </span>
                <span className="detail-item-value">
                  {formatDate(repair.repair_date)}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <MapPin size={14} /> Service Center
                </span>
                <span className="detail-item-value">
                  {repair.service_center}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <User size={14} /> Servicing Technician
                </span>
                <span className="detail-item-value font-medium">
                  {repair.technician_name}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <CheckCircle2 size={14} /> Service Outcome
                </span>
                <span className="detail-item-value">
                  <span className={getOutcomeClass(repair.outcome)}>
                    {repair.outcome}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Technical Diagnostics */}
          <div className="details-section">
            <h4 className="details-section-heading">Fault Observation &amp; Diagnosis</h4>
            <div className="detail-text-block mb-10">
              <span className="detail-text-label">
                <AlertCircle size={14} /> Reported Fault Description:
              </span>
              <p className="detail-text-content">{repair.fault_description}</p>
            </div>
            <div className="detail-text-block">
              <span className="detail-text-label">
                <CheckCircle2 size={14} /> Technician Diagnostic Finding:
              </span>
              <p className="detail-text-content">{repair.diagnosis}</p>
            </div>
          </div>

          {/* Replaced Components Table */}
          <div className="details-section">
            <h4 className="details-section-heading">
              <Layers size={14} /> Replaced Components ({parts.length})
            </h4>
            {parts.length === 0 ? (
              <div className="parts-empty-notice">
                <span>No components replaced (labor-only inspection or recalibration service).</span>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="parts-detail-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Part Name</th>
                      <th>Part / OEM Code</th>
                      <th style={{ textAlign: 'right' }}>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.map((part, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="font-medium">{part.part_name}</td>
                        <td>
                          <code>{part.part_number || 'OEM-GENERIC'}</code>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {formatCurrency(part.cost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="details-section">
            <h4 className="details-section-heading">
              <IndianRupee size={14} /> Financial Breakdown
            </h4>
            <div className="cost-summary-list">
              <div className="cost-summary-item">
                <span className="cost-item-label">Parts Subtotal:</span>
                <span className="cost-item-val">{formatCurrency(partsSubtotal)}</span>
              </div>
              <div className="cost-summary-item">
                <span className="cost-item-label">Labor Cost (labor_cost):</span>
                <span className="cost-item-val">{formatCurrency(repair.labor_cost)}</span>
              </div>
              <div className="cost-summary-item total-row">
                <span className="cost-item-label">Total Repair Cost (total_cost):</span>
                <span className="cost-item-val total-highlight">
                  {formatCurrency(repair.total_cost)}
                </span>
              </div>
            </div>
          </div>

          {/* Schema Integrity Note */}
          <div className="details-schema-note">
            <p>
              <strong>Schema Audit:</strong> MongoDB Collection <code>repair_events</code>. Foreign reference key: <code>product_id: "{repair.product_id}"</code> joined with master <code>products</code> record.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
