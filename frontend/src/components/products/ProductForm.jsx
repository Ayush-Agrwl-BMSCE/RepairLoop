import { useState } from 'react'
import { X, PlusCircle, Check, AlertCircle } from 'lucide-react'
import { productCategories, productStatuses } from '../../data/productsData'

function getInitialFormData(initialData) {
  if (initialData) {
    return {
      serial_number: initialData.serial_number || '',
      brand: initialData.brand || '',
      model: initialData.model || '',
      category: initialData.category || 'Laptop',
      purchase_date: initialData.purchase_date || '',
      current_status: initialData.current_status || 'Active',
      processor: initialData.specifications?.processor || '',
      ram: initialData.specifications?.ram || '',
      storage: initialData.specifications?.storage || '',
      other: initialData.specifications?.other || '',
    }
  }
  return {
    serial_number: '',
    brand: '',
    model: '',
    category: 'Laptop',
    purchase_date: new Date().toISOString().split('T')[0],
    current_status: 'Active',
    processor: '',
    ram: '',
    storage: '',
    other: '',
  }
}

export default function ProductForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  existingSerials = [],
}) {
  const isEditMode = Boolean(initialData)

  const [formData, setFormData] = useState(() => getInitialFormData(initialData))
  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for field upon typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}

    const trimmedSerial = formData.serial_number.trim().toUpperCase()
    if (!trimmedSerial) {
      newErrors.serial_number = 'Serial number is required.'
    } else {
      // Check for duplicate serial numbers in existing products
      const isDuplicate = isEditMode
        ? trimmedSerial !== initialData.serial_number.toUpperCase() &&
          existingSerials.some((s) => s.toUpperCase() === trimmedSerial)
        : existingSerials.some((s) => s.toUpperCase() === trimmedSerial)

      if (isDuplicate) {
        newErrors.serial_number = 'A product with this serial number is already registered.'
      }
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required.'
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Model is required.'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required.'
    }

    if (!formData.purchase_date) {
      newErrors.purchase_date = 'Purchase date is required.'
    }

    if (!formData.current_status) {
      newErrors.current_status = 'Current status is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const productPayload = {
      _id: isEditMode ? initialData._id : `demo_${Date.now()}`,
      serial_number: formData.serial_number.trim().toUpperCase(),
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      category: formData.category,
      purchase_date: formData.purchase_date,
      current_status: formData.current_status,
      specifications: {
        processor: formData.processor.trim() || 'N/A',
        ram: formData.ram.trim() || 'N/A',
        storage: formData.storage.trim() || 'N/A',
        other: formData.other.trim() || 'Standard OEM specifications',
      },
      created_at: isEditMode
        ? initialData.created_at || new Date().toISOString()
        : new Date().toISOString(),
    }

    onSubmit(productPayload)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-form-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">
              {isEditMode ? 'Edit Product Record' : 'Register New Product'}
            </h3>
            <p className="modal-subtitle">
              {isEditMode
                ? 'Update device specifications and operational condition.'
                : 'Enter device parameters into the local products registry.'}
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
            {/* General Information Section */}
            <div className="form-section-title">Core Device Information</div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="serial_number">
                  Serial Number <span className="required-star">*</span>
                </label>
                <input
                  id="serial_number"
                  type="text"
                  className={`form-input ${errors.serial_number ? 'input-error' : ''}`}
                  placeholder="e.g. SN-LPT-2024-0042"
                  value={formData.serial_number}
                  onChange={(e) => handleChange('serial_number', e.target.value)}
                />
                {errors.serial_number && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.serial_number}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  Category <span className="required-star">*</span>
                </label>
                <select
                  id="category"
                  className={`form-select ${errors.category ? 'input-error' : ''}`}
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {productCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="form-error-msg">{errors.category}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="brand">
                  Brand / Manufacturer <span className="required-star">*</span>
                </label>
                <input
                  id="brand"
                  type="text"
                  className={`form-input ${errors.brand ? 'input-error' : ''}`}
                  placeholder="e.g. ThinkClean"
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                />
                {errors.brand && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.brand}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="model">
                  Model Designation <span className="required-star">*</span>
                </label>
                <input
                  id="model"
                  type="text"
                  className={`form-input ${errors.model ? 'input-error' : ''}`}
                  placeholder="e.g. EcoBook 14"
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                />
                {errors.model && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.model}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="purchase_date">
                  Purchase Date <span className="required-star">*</span>
                </label>
                <input
                  id="purchase_date"
                  type="date"
                  className={`form-input ${errors.purchase_date ? 'input-error' : ''}`}
                  value={formData.purchase_date}
                  onChange={(e) => handleChange('purchase_date', e.target.value)}
                />
                {errors.purchase_date && (
                  <span className="form-error-msg">{errors.purchase_date}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="current_status">
                  Current Status <span className="required-star">*</span>
                </label>
                <select
                  id="current_status"
                  className={`form-select ${errors.current_status ? 'input-error' : ''}`}
                  value={formData.current_status}
                  onChange={(e) => handleChange('current_status', e.target.value)}
                >
                  {productStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.current_status && (
                  <span className="form-error-msg">{errors.current_status}</span>
                )}
              </div>
            </div>

            {/* Embedded Specifications Section */}
            <div className="form-section-title">
              Embedded Specifications (MongoDB sub-document)
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="processor">
                  Processor / Engine
                </label>
                <input
                  id="processor"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Intel Core i5 2.4GHz"
                  value={formData.processor}
                  onChange={(e) => handleChange('processor', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ram">
                  Memory (RAM)
                </label>
                <input
                  id="ram"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 16 GB DDR4"
                  value={formData.ram}
                  onChange={(e) => handleChange('ram', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="storage">
                  Internal Storage
                </label>
                <input
                  id="storage"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 512 GB NVMe SSD"
                  value={formData.storage}
                  onChange={(e) => handleChange('storage', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="other">
                  Other Technical Parameters
                </label>
                <input
                  id="other"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 54 Wh Battery, 14-inch FHD"
                  value={formData.other}
                  onChange={(e) => handleChange('other', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditMode ? (
                <>
                  <Check size={16} />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <PlusCircle size={16} />
                  <span>Register Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
