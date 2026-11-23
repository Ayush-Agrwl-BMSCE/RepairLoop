import { X, Edit3, Cpu, HardDrive, MemoryStick, Layers, Calendar, Hash, Tag } from 'lucide-react'

export default function ProductDetails({ isOpen, onClose, product, onEdit }) {
  if (!isOpen || !product) return null

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

  const formatTimestamp = (isoString) => {
    if (!isoString) return '—'
    try {
      const date = new Date(isoString)
      return date.toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return isoString
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
      <div className="modal-dialog modal-details-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title-with-badge">
              <h3 className="modal-title">
                {product.brand} {product.model}
              </h3>
              <span className={getStatusClass(product.current_status)}>
                {product.current_status}
              </span>
            </div>
            <p className="modal-subtitle">
              Serial Number: <code>{product.serial_number}</code> &bull; Category: {product.category}
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
          {/* Metadata Section */}
          <div className="details-section">
            <h4 className="details-section-heading">Master Record Metadata</h4>
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
                  <span className="category-pill">{product.category}</span>
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <Calendar size={14} /> Purchase Date
                </span>
                <span className="detail-item-value">{formatDate(product.purchase_date)}</span>
              </div>

              <div className="detail-item">
                <span className="detail-item-label">
                  <Layers size={14} /> Registered At
                </span>
                <span className="detail-item-value">{formatTimestamp(product.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Embedded Hardware Specifications Section */}
          <div className="details-section">
            <h4 className="details-section-heading">
              Embedded Specifications (MongoDB sub-document)
            </h4>
            <div className="specs-display-grid">
              <div className="spec-display-box">
                <div className="spec-display-icon">
                  <Cpu size={16} />
                </div>
                <div className="spec-display-content">
                  <span className="spec-display-label">Processor</span>
                  <span className="spec-display-value">
                    {product.specifications?.processor || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="spec-display-box">
                <div className="spec-display-icon">
                  <MemoryStick size={16} />
                </div>
                <div className="spec-display-content">
                  <span className="spec-display-label">Memory (RAM)</span>
                  <span className="spec-display-value">
                    {product.specifications?.ram || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="spec-display-box">
                <div className="spec-display-icon">
                  <HardDrive size={16} />
                </div>
                <div className="spec-display-content">
                  <span className="spec-display-label">Storage</span>
                  <span className="spec-display-value">
                    {product.specifications?.storage || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="spec-display-box full-width">
                <div className="spec-display-icon">
                  <Layers size={16} />
                </div>
                <div className="spec-display-content">
                  <span className="spec-display-label">Other Parameters</span>
                  <span className="spec-display-value">
                    {product.specifications?.other || 'Standard OEM configurations'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schema Integrity Note */}
          <div className="details-schema-note">
            <p>
              <strong>Data Model:</strong> Document ID: <code>{product._id}</code>. Future repair events and lifecycle history will reference this document using <code>product_id</code>.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn-submit"
            onClick={() => {
              onClose()
              onEdit(product)
            }}
          >
            <Edit3 size={15} />
            <span>Edit Product</span>
          </button>
        </div>
      </div>
    </div>
  )
}
