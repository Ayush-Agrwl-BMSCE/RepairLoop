import { useMemo } from 'react'
import { X, Calendar, MapPin, User, FileText, Layers, Hash, Tag, Activity } from 'lucide-react'
import { getEventBadge } from '../../data/lifecycleData'

export default function ProductLifecycleDetails({
  isOpen,
  onClose,
  product,
  events = [],
}) {
  // Chronologically sorted events: oldest first (always call hook before early returns)
  const productEvents = useMemo(() => {
    if (!product) return []
    return events
      .filter((e) => e.product_id === product._id)
      .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
  }, [events, product])

  if (!isOpen || !product) return null

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
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-form-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title-with-badge">
              <h3 className="modal-title">Product Lifecycle History</h3>
              <span className={getStatusClass(product.current_status)}>
                {product.current_status}
              </span>
            </div>
            <p className="modal-subtitle">
              Asset: <strong>{product.brand} {product.model}</strong> &bull; Serial: <code>{product.serial_number}</code>
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
          {/* Product Overview Card */}
          <div className="details-section">
            <h4 className="details-section-heading">Asset Profile &amp; Current State</h4>
            <div className="details-grid-two">
              <div className="detail-item">
                <span className="detail-item-label">
                  <Hash size={14} /> Serial Number
                </span>
                <span className="detail-item-value serial-code">
                  <code>{product.serial_number}</code>
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <Tag size={14} /> Category
                </span>
                <span className="detail-item-value">
                  {product.category}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <Activity size={14} /> Current Condition (current_status)
                </span>
                <span className="detail-item-value">
                  <span className={getStatusClass(product.current_status)}>
                    {product.current_status}
                  </span>
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <Layers size={14} /> Recorded Milestones
                </span>
                <span className="detail-item-value font-semibold">
                  {productEvents.length} {productEvents.length === 1 ? 'event' : 'events'}
                </span>
              </div>
            </div>
          </div>

          {/* Chronological Milestone Timeline */}
          <div className="details-section">
            <h4 className="details-section-heading">
              Append-Oriented Event Log (Chronological Order)
            </h4>

            {productEvents.length === 0 ? (
              <div className="parts-empty-notice">
                <span>No lifecycle milestones logged for this asset yet.</span>
              </div>
            ) : (
              <div className="timeline-vertical-flow modal-timeline-flow">
                {productEvents.map((event, index) => {
                  const badgeInfo = getEventBadge(event.event_type)
                  const BadgeIcon = badgeInfo.icon
                  const isFirst = index === 0
                  const isLast = index === productEvents.length - 1

                  return (
                    <div key={event._id} className="timeline-node">
                      {/* Left: Date */}
                      <div className="timeline-node-aside">
                        <div className="timeline-seq-num">#{index + 1}</div>
                        <div className="timeline-node-date">
                          <Calendar size={13} />
                          <span>{formatDate(event.event_date)}</span>
                        </div>
                      </div>

                      {/* Center: Track */}
                      <div className="timeline-track-col">
                        {!isFirst && <div className="timeline-track-line timeline-line-top" />}
                        <div className={`timeline-marker-dot ${badgeInfo.className}`}>
                          <BadgeIcon size={14} />
                        </div>
                        {!isLast && <div className="timeline-track-line timeline-line-bottom" />}
                      </div>

                      {/* Right: Content */}
                      <div className="timeline-node-card">
                        <div className="timeline-card-meta-row">
                          <span className={badgeInfo.className}>
                            <BadgeIcon size={13} className="event-badge-icon" />
                            <span>{event.event_type}</span>
                          </span>
                          <span className="timeline-doc-id">
                            <code>{event._id}</code>
                          </span>
                        </div>

                        <div className="timeline-location-row">
                          <span className="timeline-detail-tag">
                            <MapPin size={13} />
                            <span>{event.location}</span>
                          </span>
                          <span className="timeline-detail-tag">
                            <User size={13} />
                            <span>By: <strong>{event.recorded_by}</strong></span>
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

          {/* Schema Integrity Note */}
          <div className="details-schema-note">
            <p>
              <strong>Schema Separation:</strong> Product operational state is stored in <code>products.current_status</code> (&quot;{product.current_status}&quot;). Historical events are append-only entries in <code>lifecycle_events</code> referencing <code>product_id: &quot;{product._id}&quot;</code>.
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
