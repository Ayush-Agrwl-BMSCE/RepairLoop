import { Search, X, RotateCcw } from 'lucide-react'
import { productCategories, productStatuses } from '../../data/productsData'

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  sortOrder = 'date-desc',
  onSortChange,
  onResetFilters,
  totalCount,
  filteredCount,
}) {
  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    categoryFilter !== '' ||
    statusFilter !== '' ||
    sortOrder !== 'date-desc'

  return (
    <div className="product-filters-bar">
      <div className="filters-controls-group">
        {/* Search Field */}
        <div className="filter-search-box">
          <Search className="filter-search-icon" size={17} />
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search by serial number, brand or model..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              type="button"
              className="filter-clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category Dropdown Filter */}
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {productCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown Filter */}
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            {productStatuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order Dropdown */}
        {onSortChange && (
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort products"
            >
              <option value="date-desc">Newest First (Purchase)</option>
              <option value="date-asc">Oldest First (Purchase)</option>
              <option value="brand-asc">Brand &amp; Model (A &ndash; Z)</option>
              <option value="serial-asc">Serial Number (A &ndash; Z)</option>
            </select>
          </div>
        )}

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
            title="Reset all search and filter fields"
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Counter Tag */}
      <div className="filters-count-tag">
        Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> products
      </div>
    </div>
  )
}
