import { Plus, Trash2, Layers } from 'lucide-react'

export default function ReplacedPartsEditor({
  parts = [],
  onChange,
  errors = {},
}) {
  const handleAddPart = () => {
    const newPart = {
      id: `part_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      part_name: '',
      part_number: '',
      cost: '',
    }
    onChange([...parts, newPart])
  }

  const handleUpdatePart = (index, field, value) => {
    const updated = parts.map((part, i) => {
      if (i === index) {
        return { ...part, [field]: value }
      }
      return part
    })
    onChange(updated)
  }

  const handleRemovePart = (index) => {
    onChange(parts.filter((_, i) => i !== index))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0)
  }

  const partsSubtotal = parts.reduce((sum, p) => {
    const val = parseFloat(p.cost)
    return sum + (isNaN(val) || val < 0 ? 0 : val)
  }, 0)

  return (
    <div className="parts-editor-wrapper">
      <div className="parts-editor-header">
        <div className="parts-editor-header-info">
          <div className="form-section-title no-margin">
            Replaced Components (MongoDB sub-documents)
          </div>
          <span className="parts-editor-hint">
            Add hardware components replaced during this service ticket.
          </span>
        </div>
        <button
          type="button"
          className="btn-add-part"
          onClick={handleAddPart}
        >
          <Plus size={14} />
          <span>Add Component</span>
        </button>
      </div>

      {parts.length === 0 ? (
        <div className="parts-empty-notice">
          <Layers size={18} className="parts-empty-icon" />
          <span>
            No parts replaced. Service ticket will be logged as labor-only inspection or recalibration.
          </span>
        </div>
      ) : (
        <div className="parts-table-responsive">
          <table className="parts-editor-table">
            <thead>
              <tr>
                <th style={{ width: '42%' }}>Part Name *</th>
                <th style={{ width: '28%' }}>Part / OEM Code</th>
                <th style={{ width: '22%' }}>Cost (₹) *</th>
                <th style={{ width: '8%', textAlign: 'center' }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part, index) => {
                const partErrors = errors[index] || {}
                return (
                  <tr key={part.id || index}>
                    <td>
                      <input
                        type="text"
                        className={`form-input part-input ${
                          partErrors.part_name ? 'input-error' : ''
                        }`}
                        placeholder="e.g. 54Wh Battery Pack"
                        value={part.part_name}
                        onChange={(e) =>
                          handleUpdatePart(index, 'part_name', e.target.value)
                        }
                      />
                      {partErrors.part_name && (
                        <span className="part-error-text">
                          {partErrors.part_name}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input part-input"
                        placeholder="e.g. BAT-54WH-EB14"
                        value={part.part_number}
                        onChange={(e) =>
                          handleUpdatePart(index, 'part_number', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        className={`form-input part-input ${
                          partErrors.cost ? 'input-error' : ''
                        }`}
                        placeholder="0"
                        value={part.cost}
                        onChange={(e) =>
                          handleUpdatePart(index, 'cost', e.target.value)
                        }
                      />
                      {partErrors.cost && (
                        <span className="part-error-text">
                          {partErrors.cost}
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="btn-remove-part"
                        onClick={() => handleRemovePart(index)}
                        title="Remove part row"
                        aria-label="Remove part row"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {parts.length > 0 && (
        <div className="parts-subtotal-bar">
          <span className="parts-count-label">
            {parts.length} {parts.length === 1 ? 'component' : 'components'} listed
          </span>
          <span className="parts-subtotal-val">
            Parts Subtotal: <strong>{formatCurrency(partsSubtotal)}</strong>
          </span>
        </div>
      )}
    </div>
  )
}
