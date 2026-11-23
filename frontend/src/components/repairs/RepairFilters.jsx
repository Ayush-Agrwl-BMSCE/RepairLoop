import { Search, X, RotateCcw } from 'lucide-react'
import { repairOutcomes } from '../../data/repairsData'
import { productCategories } from '../../data/productsData'

export default function RepairFilters({
  searchTerm,
  onSearchChange,
  outcomeFilter,
  onOutcomeChange,
  categoryFilter,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onResetFilters,
  totalCount,
  filteredCount,
}) {
  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    outcomeFilter !== '' ||
    categoryFilter !== '' ||
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
            placeholder="Search by serial, brand, model or fault..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search repairs"
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

        {/* Outcome Filter */}
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={outcomeFilter}
            onChange={(e) => onOutcomeChange(e.target.value)}
            aria-label="Filter by repair outcome"
          >
            <option value="">All Outcomes</option>
            {repairOutcomes.map((outcome) => (
              <option key={outcome} value={outcome}>
                {outcome}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by product category"
          >
            <option value="">All Categories</option>
            {productCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort repairs"
          >
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="cost-desc">Cost (Highest First)</option>
            <option value="cost-asc">Cost (Lowest First)</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
            title="Reset all filters and sort order"
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Counter Tag */}
      <div className="filters-count-tag">
        Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> repairs
      </div>
    </div>
  )
}
