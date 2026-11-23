import { useState } from 'react'
import { X, Milestone, AlertCircle, PackageCheck } from 'lucide-react'
import { lifecycleEventTypes } from '../../data/lifecycleData'

function getInitialLifecycleFormData() {
  return {
    product_id: '',
    event_type: 'Ownership Transfer',
    event_date: new Date().toISOString().split('T')[0],
    location: '',
    recorded_by: '',
    notes: '',
  }
}

export default function LifecycleForm({
  isOpen,
  onClose,
  onSubmit,
  products = [],
}) {
  const [formData, setFormData] = useState(getInitialLifecycleFormData)
  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const selectedProduct = products.find((p) => p._id === formData.product_id)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}

    // Product selection
    if (!formData.product_id) {
      newErrors.product_id = 'Please select a registered electronic device.'
    }

    // Event type
    if (!formData.event_type) {
      newErrors.event_type = 'Please select an event type.'
    }

    // Event date
    if (!formData.event_date) {
      newErrors.event_date = 'Event date is required.'
    }

    // Location
    if (!formData.location.trim()) {
      newErrors.location = 'Location or facility name is required.'
    }

    // Recorded By
    if (!formData.recorded_by.trim()) {
      newErrors.recorded_by = 'Name of person or role logging this event is required.'
    }

    // Notes
    if (!formData.notes.trim()) {
      newErrors.notes = 'Descriptive notes about the milestone are required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const eventPayload = {
      _id: `demo_lc_${Date.now()}`,
      product_id: formData.product_id,
      event_type: formData.event_type,
      event_date: new Date(formData.event_date).toISOString(),
      location: formData.location.trim(),
      recorded_by: formData.recorded_by.trim(),
      notes: formData.notes.trim(),
    }

    onSubmit(eventPayload)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-form-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Record Lifecycle Milestone</h3>
            <p className="modal-subtitle">
              Append a new chronological milestone into the <code>lifecycle_events</code> collection.
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

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body-scrollable">
            {/* Section 1: Associated Product Selection */}
            <div className="form-section-title">
              1. Target Product (BSON product_id)
            </div>

            <div className="form-group mb-12">
              <label className="form-label" htmlFor="lifecycle_product_id">
                Select Electronic Device <span className="required-star">*</span>
              </label>
              <select
                id="lifecycle_product_id"
                className={`form-select ${errors.product_id ? 'input-error' : ''}`}
                value={formData.product_id}
                onChange={(e) => handleChange('product_id', e.target.value)}
              >
                <option value="">-- Choose registered asset from products collection --</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.brand} {p.model} ({p.serial_number}) &mdash; {p.category}
                  </option>
                ))}
              </select>
              {errors.product_id && (
                <span className="form-error-msg">
                  <AlertCircle size={13} />
                  {errors.product_id}
                </span>
              )}
            </div>

            {/* Selected Product Preview Card */}
            {selectedProduct && (
              <div className="selected-product-card">
                <div className="selected-product-info">
                  <div className="selected-product-title">
                    <PackageCheck size={16} className="selected-product-icon" />
                    <strong>{selectedProduct.brand} {selectedProduct.model}</strong>
                  </div>
                  <div className="selected-product-meta">
                    <span>Serial: <code>{selectedProduct.serial_number}</code></span>
                    <span>Category: <strong>{selectedProduct.category}</strong></span>
                    <span>Current Status: <span className="status-subtle">{selectedProduct.current_status}</span></span>
                  </div>
                </div>
              </div>
            )}

            {/* Section 2: Milestone Information */}
            <div className="form-section-title">
              2. Milestone Parameters
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="event_type">
                  Milestone Event Type <span className="required-star">*</span>
                </label>
                <select
                  id="event_type"
                  className={`form-select ${errors.event_type ? 'input-error' : ''}`}
                  value={formData.event_type}
                  onChange={(e) => handleChange('event_type', e.target.value)}
                >
                  {lifecycleEventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.event_type && (
                  <span className="form-error-msg">{errors.event_type}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="event_date">
                  Event Date <span className="required-star">*</span>
                </label>
                <input
                  id="event_date"
                  type="date"
                  className={`form-input ${errors.event_date ? 'input-error' : ''}`}
                  value={formData.event_date}
                  onChange={(e) => handleChange('event_date', e.target.value)}
                />
                {errors.event_date && (
                  <span className="form-error-msg">{errors.event_date}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="location">
                  Facility / Campus Location <span className="required-star">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  className={`form-input ${errors.location ? 'input-error' : ''}`}
                  placeholder="e.g. Computer Science Department, Block A"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
                {errors.location && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.location}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="recorded_by">
                  Logged By (Person / Role) <span className="required-star">*</span>
                </label>
                <input
                  id="recorded_by"
                  type="text"
                  className={`form-input ${errors.recorded_by ? 'input-error' : ''}`}
                  placeholder="e.g. Ramesh Gupta (Asset Custodian)"
                  value={formData.recorded_by}
                  onChange={(e) => handleChange('recorded_by', e.target.value)}
                />
                {errors.recorded_by && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.recorded_by}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group mb-14">
              <label className="form-label" htmlFor="notes">
                Descriptive Milestone Notes <span className="required-star">*</span>
              </label>
              <textarea
                id="notes"
                rows={3}
                className={`form-textarea ${errors.notes ? 'input-error' : ''}`}
                placeholder="e.g. Assigned as primary workstation for laboratory sessions; custody verified."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
              {errors.notes && (
                <span className="form-error-msg">
                  <AlertCircle size={13} />
                  {errors.notes}
                </span>
              )}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              <Milestone size={16} />
              <span>Record Lifecycle Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
