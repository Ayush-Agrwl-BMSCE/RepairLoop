import { useMemo } from 'react'
import { Calendar, MapPin, User, FileText, Package, Milestone, Layers } from 'lucide-react'
import { getEventBadge } from '../../data/lifecycleData'

export default function LifecycleTimeline({
  products = [],
  selectedProductId,
  onSelectProduct,
  events = [],
}) {
  const selectedProduct = products.find((p) => p._id === selectedProductId) || products[0]

  // Chronologically sorted events for selected product: oldest first
  const productEvents = useMemo(() => {
    if (!selectedProduct) return []
    return events
      .filter((e) => e.product_id === selectedProduct._id)
      .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
  }, [events, selectedProduct])

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

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'product-status-badge status-active'
      case 'Refurbished':
        return 'product-status-badge status-refurbished'
      case 'Under Repair':
        return 'product-status-badge status-under-repair'
      case 'Decommissioned':
        return 'product-status-badge status-decommissioned'
      case 'Recycled':
        return 'product-status-badge status-recycled'
      default:
        return 'product-status-badge'
    }
  }

  return (
    <div className="table-card timeline-card">
      {/* Timeline Card Header */}
      <div className="timeline-card-header">
        <div className="timeline-header-left">
          <div className="timeline-header-title-row">
            <Milestone size={18} className="timeline-header-icon" />
            <h3 className="timeline-card-title">Product Lifecycle Journey (Chronological Timeline)</h3>
          </div>
          <p className="timeline-card-subtitle">
            Reconstructed from append-oriented <code>lifecycle_events</code> joined via <code>product_id</code>.
          </p>
        </div>

        {/* Product Selector Dropdown */}
        <div className="timeline-product-selector">
          <label htmlFor="timeline-product-select" className="timeline-select-label">
            Select Asset:
          </label>
          <select
            id="timeline-product-select"
            className="filter-select timeline-select-input"
            value={selectedProduct?._id || ''}
            onChange={(e) => onSelectProduct(e.target.value)}
            aria-label="Select product for timeline"
          >
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.brand} {p.model} ({p.serial_number}) &mdash; {p.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Product Identity Banner */}
      {selectedProduct && (
        <div className="timeline-product-strip">
          <div className="timeline-strip-identity">
            <Package size={18} className="strip-device-icon" />
            <div className="strip-device-name">
              <strong>{selectedProduct.brand} {selectedProduct.model}</strong>
              <span className="strip-device-category">({selectedProduct.category})</span>
            </div>
            <code className="strip-serial-code">{selectedProduct.serial_number}</code>
          </div>

          <div className="timeline-strip-status">
            <span className="strip-status-label">Current Condition:</span>
            <span className={getStatusClass(selectedProduct.current_status)}>
              {selectedProduct.current_status}
            </span>
            <span className="strip-events-count">
              <strong>{productEvents.length}</strong> {productEvents.length === 1 ? 'event' : 'events'} recorded
            </span>
          </div>
        </div>
      )}

      {/* Vertical Timeline Body */}
      <div className="timeline-body">
        {productEvents.length === 0 ? (
          <div className="timeline-empty-state">
            <Layers size={28} className="timeline-empty-icon" />
            <div className="timeline-empty-title">No Lifecycle Events Logged</div>
            <p className="timeline-empty-desc">
              This device has no registered milestone records yet. Use the <strong>&quot;Record Lifecycle Event&quot;</strong> button above to log its initial acquisition or ownership assignment.
            </p>
          </div>
        ) : (
          <div className="timeline-vertical-flow">
            {productEvents.map((event, index) => {
              const badgeInfo = getEventBadge(event.event_type)
              const BadgeIcon = badgeInfo.icon
              const isFirst = index === 0
              const isLast = index === productEvents.length - 1

              return (
                <div key={event._id} className="timeline-node">
                  {/* Left Column: Date & Sequence */}
                  <div className="timeline-node-aside">
                    <div className="timeline-seq-num">#{index + 1}</div>
                    <div className="timeline-node-date">
                      <Calendar size={13} />
                      <span>{formatDate(event.event_date)}</span>
                    </div>
                  </div>

                  {/* Center Column: Vertical Track & Marker */}
                  <div className="timeline-track-col">
                    {!isFirst && <div className="timeline-track-line timeline-line-top" />}
                    <div className={`timeline-marker-dot ${badgeInfo.className}`}>
                      <BadgeIcon size={14} />
                    </div>
                    {!isLast && <div className="timeline-track-line timeline-line-bottom" />}
                  </div>

                  {/* Right Column: Event Content Card */}
                  <div className="timeline-node-card">
                    <div className="timeline-card-meta-row">
                      <span className={badgeInfo.className}>
                        <BadgeIcon size={13} className="event-badge-icon" />
                        <span>{event.event_type}</span>
                      </span>
                      <span className="timeline-doc-id">
                        Doc: <code>{event._id}</code>
                      </span>
                    </div>

                    <div className="timeline-location-row">
                      <span className="timeline-detail-tag">
                        <MapPin size={13} />
                        <span>{event.location}</span>
                      </span>
                      <span className="timeline-detail-tag">
                        <User size={13} />
                        <span>Recorded by: <strong>{event.recorded_by}</strong></span>
                      </span>
                    </div>

                    <div className="timeline-notes-box">
                      <FileText size={14} className="timeline-notes-icon" />
                      <p className="timeline-notes-text">{event.notes}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
