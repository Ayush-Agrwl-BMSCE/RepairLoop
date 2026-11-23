import { History, RotateCcw } from 'lucide-react'
import { getEventBadge } from '../../data/lifecycleData'

export default function LifecycleTable({
  events = [],
  productsMap = {},
  onViewProductHistory,
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

  if (events.length === 0) {
    return (
      <div className="table-card empty-state-card">
        <div className="empty-state-content">
          <div className="empty-state-icon-box">
            <History size={32} />
          </div>
          <h4 className="empty-state-title">No Lifecycle Events Match</h4>
          <p className="empty-state-desc">
            No milestone records match your search keywords, event type, or product category filter.
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
        <table className="dashboard-table product-list-table lifecycle-list-table">
          <thead>
            <tr>
              <th className="th-product">Product</th>
              <th className="th-serial">Serial Number</th>
              <th className="th-event-type">Event Type</th>
              <th className="th-date">Event Date</th>
              <th className="th-location">Location</th>
              <th className="th-recorded-by">Recorded By</th>
              <th className="th-actions">History</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const product = productsMap[event.product_id] || {
                _id: event.product_id,
                brand: 'Unknown',
                model: 'Device',
                serial_number: 'N/A',
                category: 'Other',
              }

              const badgeInfo = getEventBadge(event.event_type)
              const BadgeIcon = badgeInfo.icon

              return (
                <tr key={event._id}>
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

                  {/* Event Type Badge */}
                  <td className="table-event-cell">
                    <span className={badgeInfo.className}>
                      <BadgeIcon size={13} className="event-badge-icon" />
                      <span>{event.event_type}</span>
                    </span>
                  </td>

                  {/* Event Date */}
                  <td className="table-date-cell">
                    {formatDate(event.event_date)}
                  </td>

                  {/* Location */}
                  <td className="table-location-cell">
                    {event.location}
                  </td>

                  {/* Recorded By */}
                  <td className="table-recorded-cell">
                    <span className="recorded-by-text">{event.recorded_by}</span>
                  </td>

                  {/* Action: View Product History */}
                  <td className="table-actions-cell">
                    <button
                      type="button"
                      className="btn-action-icon btn-view"
                      onClick={() => onViewProductHistory(product)}
                      title={`View chronological lifecycle timeline for ${product.serial_number}`}
                      aria-label="View product lifecycle history"
                    >
                      <History size={16} />
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
