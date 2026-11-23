import { Eye, Wrench, RotateCcw } from 'lucide-react'

export default function RepairTable({
  repairs = [],
  productsMap = {},
  onViewDetails,
  onResetFilters,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return '—'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-IN', {
        month: 'short',
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

  if (repairs.length === 0) {
    return (
      <div className="table-card empty-state-card">
        <div className="empty-state-content">
          <div className="empty-state-icon-box">
            <Wrench size={32} />
          </div>
          <h4 className="empty-state-title">No Repair Records Match</h4>
          <p className="empty-state-desc">
            No service tickets match your selected search keywords, outcome status, or category filter.
          </p>
          <button
            type="button"
            className="btn-reset-filters-empty"
            onClick={onResetFilters}
          >
            <RotateCcw size={15} />
            <span>Clear Search &amp; Filters</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="dashboard-table product-list-table repair-list-table">
          <thead>
            <tr>
              <th className="th-product">Product</th>
              <th className="th-serial">Serial Number</th>
              <th className="th-date">Repair Date</th>
              <th className="th-fault">Fault Description</th>
              <th className="th-center">Service Center</th>
              <th className="th-cost">Repair Cost</th>
              <th className="th-outcome">Outcome</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((repair) => {
              const product = productsMap[repair.product_id] || {
                brand: 'Unknown',
                model: 'Device',
                serial_number: 'N/A',
                category: 'Other',
              }

              return (
                <tr key={repair._id}>
                  {/* Product Brand & Model */}
                  <td className="table-product-cell">
                    <div className="product-cell-name">
                      {product.brand} {product.model}
                    </div>
                    <div className="product-cell-specs-summary">
                      {product.category}
                    </div>
                  </td>

                  {/* Serial Number */}
                  <td className="table-serial-cell">
                    <code>{product.serial_number}</code>
                  </td>

                  {/* Repair Date */}
                  <td className="table-date-cell">
                    {formatDate(repair.repair_date)}
                  </td>

                  {/* Fault Description */}
                  <td className="table-fault-cell">
                    <div
                      className="repair-fault-text"
                      title={repair.fault_description}
                    >
                      {repair.fault_description}
                    </div>
                  </td>

                  {/* Service Center */}
                  <td className="table-location-cell">
                    {repair.service_center}
                  </td>

                  {/* Repair Cost */}
                  <td className="table-cost-cell">
                    <strong>{formatCurrency(repair.total_cost)}</strong>
                  </td>

                  {/* Outcome Badge */}
                  <td className="table-status-cell">
                    <span className={getOutcomeClass(repair.outcome)}>
                      {repair.outcome}
                    </span>
                  </td>

                  {/* Action: View Details */}
                  <td className="table-actions-cell">
                    <button
                      type="button"
                      className="btn-action-icon btn-view"
                      onClick={() => onViewDetails(repair)}
                      title={`View repair details for ${product.serial_number}`}
                      aria-label="View repair details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
