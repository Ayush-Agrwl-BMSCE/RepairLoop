import { Calendar, Filter, RotateCcw } from 'lucide-react'
import { productCategories } from '../../data/productsData'

export default function AnalyticsFilters({
  categoryFilter,
  onCategoryChange,
  dateRangeFilter,
  onDateRangeChange,
  onResetFilters,
  productsCount,
  repairsCount,
  eventsCount,
}) {
  const hasActiveFilters = categoryFilter !== '' || dateRangeFilter !== 'all'

  return (
    <div className="product-filters-bar analytics-filters-bar">
      <div className="filters-controls-group">
        {/* Category Filter */}
        <div className="filter-select-wrapper">
          <label htmlFor="analytics-category-filter" className="filter-inline-label">
            <Filter size={13} />
            <span>Category:</span>
          </label>
          <select
            id="analytics-category-filter"
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter analytics by product category"
          >
            <option value="">All Product Categories</option>
            {productCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="filter-select-wrapper">
          <label htmlFor="analytics-date-filter" className="filter-inline-label">
            <Calendar size={13} />
            <span>Date Range:</span>
          </label>
          <select
            id="analytics-date-filter"
            className="filter-select"
            value={dateRangeFilter}
            onChange={(e) => onDateRangeChange(e.target.value)}
            aria-label="Filter analytics by date range"
          >
            <option value="all">All Historical Time</option>
            <option value="2024">Year 2024 Records</option>
            <option value="2023">Year 2023 Records</option>
            <option value="6m">Last 6 Months</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
            title="Reset category and date range filters"
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Scope Indicator */}
      <div className="filters-count-tag">
        Scope: <strong>{productsCount}</strong> products &bull; <strong>{repairsCount}</strong> repairs &bull; <strong>{eventsCount}</strong> events
      </div>
    </div>
  )
}
