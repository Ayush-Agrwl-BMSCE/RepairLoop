import { useState } from 'react'
import { X, AlertCircle, Wrench, PackageCheck } from 'lucide-react'
import { repairOutcomes } from '../../data/repairsData'
import ReplacedPartsEditor from './ReplacedPartsEditor'

function getInitialRepairFormData() {
  return {
    product_id: '',
    repair_date: new Date().toISOString().split('T')[0],
    service_center: '',
    technician_name: '',
    fault_description: '',
    diagnosis: '',
    labor_cost: '500',
    outcome: 'Successful',
  }
}

export default function RepairForm({
  isOpen,
  onClose,
  onSubmit,
  products = [],
}) {
  const [formData, setFormData] = useState(getInitialRepairFormData)
  const [parts, setParts] = useState([])
  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const selectedProduct = products.find((p) => p._id === formData.product_id)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  // Calculate costs in real-time
  const parsedLaborCost = parseFloat(formData.labor_cost)
  const validLaborCost = isNaN(parsedLaborCost) || parsedLaborCost < 0 ? 0 : parsedLaborCost

  const partsSubtotal = parts.reduce((sum, p) => {
    const costNum = parseFloat(p.cost)
    return sum + (isNaN(costNum) || costNum < 0 ? 0 : costNum)
  }, 0)

  const calculatedTotalCost = validLaborCost + partsSubtotal

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const validate = () => {
    const newErrors = {}

    // Product selection
    if (!formData.product_id) {
      newErrors.product_id = 'Please select a registered electronic product.'
    }

    // Repair date
    if (!formData.repair_date) {
      newErrors.repair_date = 'Repair date is required.'
    }

    // Service Center
    if (!formData.service_center.trim()) {
      newErrors.service_center = 'Service center or laboratory name is required.'
    }

    // Technician Name
    if (!formData.technician_name.trim()) {
      newErrors.technician_name = 'Technician name or identifier is required.'
    }

    // Fault description
    if (!formData.fault_description.trim()) {
      newErrors.fault_description = 'Reported fault description is required.'
    }

    // Diagnosis
    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'Technical diagnosis finding is required.'
    }

    // Labor cost
    if (formData.labor_cost === '' || isNaN(parsedLaborCost) || parsedLaborCost < 0) {
      newErrors.labor_cost = 'Labor cost must be a non-negative number.'
    }

    // Replaced parts validation
    const partErrors = {}
    parts.forEach((part, index) => {
      const pErr = {}
      if (!part.part_name || !part.part_name.trim()) {
        pErr.part_name = 'Part name is required'
      }
      const c = parseFloat(part.cost)
      if (part.cost === '' || isNaN(c) || c < 0) {
        pErr.cost = 'Valid cost required'
      }
      if (Object.keys(pErr).length > 0) {
        partErrors[index] = pErr
      }
    })

    if (Object.keys(partErrors).length > 0) {
      newErrors.parts = partErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const sanitizedParts = parts.map((p) => ({
      part_name: p.part_name.trim(),
      part_number: p.part_number.trim() || 'OEM-GENERIC',
      cost: parseFloat(p.cost) || 0,
    }))

    const repairPayload = {
      _id: `demo_rep_${Date.now()}`,
      product_id: formData.product_id,
      repair_date: formData.repair_date,
      service_center: formData.service_center.trim(),
      technician_name: formData.technician_name.trim(),
      fault_description: formData.fault_description.trim(),
      diagnosis: formData.diagnosis.trim(),
      parts_replaced: sanitizedParts,
      labor_cost: validLaborCost,
      total_cost: calculatedTotalCost,
      outcome: formData.outcome,
    }

    onSubmit(repairPayload)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-form-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Record New Repair Ticket</h3>
            <p className="modal-subtitle">
              Register servicing operations, technician findings, and replaced components into <code>repair_events</code>.
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
              1. Product Reference (BSON product_id)
            </div>

            <div className="form-group mb-12">
              <label className="form-label" htmlFor="repair_product_id">
                Target Electronic Device <span className="required-star">*</span>
              </label>
              <select
                id="repair_product_id"
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
                    <span>Status: <span className="status-subtle">{selectedProduct.current_status}</span></span>
                  </div>
                </div>
              </div>
            )}

            {/* Section 2: Repair Service Metadata */}
            <div className="form-section-title">
              2. Service Ticket Details
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="repair_date">
                  Repair Date <span className="required-star">*</span>
                </label>
                <input
                  id="repair_date"
                  type="date"
                  className={`form-input ${errors.repair_date ? 'input-error' : ''}`}
                  value={formData.repair_date}
                  onChange={(e) => handleChange('repair_date', e.target.value)}
                />
                {errors.repair_date && (
                  <span className="form-error-msg">{errors.repair_date}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="outcome">
                  Repair Outcome <span className="required-star">*</span>
                </label>
                <select
                  id="outcome"
                  className="form-select"
                  value={formData.outcome}
                  onChange={(e) => handleChange('outcome', e.target.value)}
                >
                  {repairOutcomes.map((out) => (
                    <option key={out} value={out}>
                      {out}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="service_center">
                  Service Center / Facility <span className="required-star">*</span>
                </label>
                <input
                  id="service_center"
                  type="text"
                  className={`form-input ${errors.service_center ? 'input-error' : ''}`}
                  placeholder="e.g. Campus Electronics Repair Lab"
                  value={formData.service_center}
                  onChange={(e) => handleChange('service_center', e.target.value)}
                />
                {errors.service_center && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.service_center}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="technician_name">
                  Servicing Technician <span className="required-star">*</span>
                </label>
                <input
                  id="technician_name"
                  type="text"
                  className={`form-input ${errors.technician_name ? 'input-error' : ''}`}
                  placeholder="e.g. Alex Kumar"
                  value={formData.technician_name}
                  onChange={(e) => handleChange('technician_name', e.target.value)}
                />
                {errors.technician_name && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.technician_name}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group mb-14">
              <label className="form-label" htmlFor="fault_description">
                Reported Fault Description <span className="required-star">*</span>
              </label>
              <textarea
                id="fault_description"
                rows={2}
                className={`form-textarea ${errors.fault_description ? 'input-error' : ''}`}
                placeholder="e.g. Laptop battery drains in less than 30 minutes under normal workload"
                value={formData.fault_description}
                onChange={(e) => handleChange('fault_description', e.target.value)}
              />
              {errors.fault_description && (
                <span className="form-error-msg">
                  <AlertCircle size={13} />
                  {errors.fault_description}
                </span>
              )}
            </div>

            <div className="form-group mb-14">
              <label className="form-label" htmlFor="diagnosis">
                Diagnostic Finding / Root Cause <span className="required-star">*</span>
              </label>
              <textarea
                id="diagnosis"
                rows={2}
                className={`form-textarea ${errors.diagnosis ? 'input-error' : ''}`}
                placeholder="e.g. Severe chemical battery degradation; maximum hold capacity reduced to 42%"
                value={formData.diagnosis}
                onChange={(e) => handleChange('diagnosis', e.target.value)}
              />
              {errors.diagnosis && (
                <span className="form-error-msg">
                  <AlertCircle size={13} />
                  {errors.diagnosis}
                </span>
              )}
            </div>

            {/* Section 3: Replaced Components */}
            <ReplacedPartsEditor
              parts={parts}
              onChange={setParts}
              errors={errors.parts || {}}
            />

            {/* Section 4: Cost Calculation Breakdown */}
            <div className="form-section-title">
              3. Service Expenditure (INR)
            </div>

            <div className="cost-breakdown-card">
              <div className="form-row align-items-center">
                <div className="form-group">
                  <label className="form-label" htmlFor="labor_cost">
                    Labor Cost (₹) <span className="required-star">*</span>
                  </label>
                  <input
                    id="labor_cost"
                    type="number"
                    min="0"
                    step="any"
                    className={`form-input ${errors.labor_cost ? 'input-error' : ''}`}
                    placeholder="0"
                    value={formData.labor_cost}
                    onChange={(e) => handleChange('labor_cost', e.target.value)}
                  />
                  {errors.labor_cost && (
                    <span className="form-error-msg">{errors.labor_cost}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Parts Subtotal (₹)</label>
                  <div className="cost-readonly-box">
                    {formatCurrency(partsSubtotal)}
                  </div>
                </div>
              </div>

              {/* Total Cost Display Box */}
              <div className="total-cost-summary-box">
                <div className="total-cost-label">
                  <strong>Total Repair Cost (total_cost):</strong>
                  <span className="cost-formula-note">
                    (Labor ₹{validLaborCost.toLocaleString('en-IN')} + Parts ₹{partsSubtotal.toLocaleString('en-IN')})
                  </span>
                </div>
                <div className="total-cost-figure">
                  {formatCurrency(calculatedTotalCost)}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              <Wrench size={16} />
              <span>Record Repair Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
