import { Eye, Edit3, Trash2, SearchX, RotateCcw } from 'lucide-react'

export default function ProductTable({ products, onViewDetails, onEdit, onDelete, onResetFilters }) {
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

  if (products.length === 0) {
    return (
      <div className="table-card empty-state-card">
        <div className="empty-state-content">
          <div className="empty-state-icon-box">
            <SearchX size={36} />
          </div>
          <h3 className="empty-state-title">No matching products found</h3>
          <p className="empty-state-desc">
            No registered products match your current search query or filter criteria.
          </p>
          {onResetFilters && (
            <button
              type="button"
              className="btn-reset-filters-empty"
              onClick={onResetFilters}
            >
              <RotateCcw size={15} />
              <span>Clear Search &amp; Filters</span>
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="dashboard-table product-list-table">
          <thead>
            <tr>
              <th className="th-product">Product</th>
              <th className="th-serial">Serial Number</th>
              <th className="th-category">Category</th>
              <th className="th-date">Purchase Date</th>
              <th className="th-status">Current Status</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id || product.serial_number}>
                <td className="table-product-cell">
                  <div className="product-cell-name">
                    {product.brand} {product.model}
                  </div>
                  <div className="product-cell-specs-summary">
                    {product.specifications?.processor && product.specifications.processor !== 'N/A'
                      ? product.specifications.processor
                      : product.category}
                  </div>
                </td>
                <td className="table-serial-cell">
                  <code>{product.serial_number}</code>
                </td>
                <td className="table-category-cell">
                  <span className="category-pill">{product.category}</span>
                </td>
                <td className="table-date-cell">{formatDate(product.purchase_date)}</td>
                <td className="table-status-cell">
                  <span className={getStatusClass(product.current_status)}>
                    {product.current_status}
                  </span>
                </td>
                <td className="table-actions-cell">
                  <div className="row-actions-group">
                    <button
                      type="button"
                      className="btn-action-icon btn-view"
                      onClick={() => onViewDetails(product)}
                      title={`View specifications for ${product.brand} ${product.model}`}
                      aria-label="View Product Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-action-icon btn-edit"
                      onClick={() => onEdit(product)}
                      title={`Edit ${product.brand} ${product.model}`}
                      aria-label="Edit Product"
                    >
                      <Edit3 size={16} />
                    </button>
                    {onDelete && (
                      <button
                        type="button"
                        className="btn-action-icon btn-delete"
                        onClick={() => onDelete(product)}
                        title={`Delete ${product.brand} ${product.model}`}
                        aria-label="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
