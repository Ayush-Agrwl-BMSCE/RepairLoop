import { useState, useMemo } from 'react'
import { Info } from 'lucide-react'
import AnalyticsStats from '../components/analytics/AnalyticsStats'
import AnalyticsFilters from '../components/analytics/AnalyticsFilters'
import ProductStatusChart from '../components/analytics/ProductStatusChart'
import RepairTrendsChart from '../components/analytics/RepairTrendsChart'
import ComponentReplacementChart from '../components/analytics/ComponentReplacementChart'
import RepairExpenditureChart from '../components/analytics/RepairExpenditureChart'
import LifecycleEventsChart from '../components/analytics/LifecycleEventsChart'
import ProductCategoryChart from '../components/analytics/ProductCategoryChart'
import AggregationConcepts from '../components/analytics/AggregationConcepts'

import { initialProducts } from '../data/productsData'
import { initialRepairs } from '../data/repairsData'
import { initialLifecycleEvents } from '../data/lifecycleData'

import {
  calculateAnalyticsKPIs,
  calculateProductStatusCounts,
  calculateMonthlyRepairTrends,
  calculateComponentReplacements,
  calculateExpenditureByCategory,
  calculateLifecycleEventDistribution,
  calculateProductCategoryCounts,
} from '../data/analyticsData'

export default function AnalyticsPage() {
  // Master demonstration datasets
  const allProducts = initialProducts
  const allRepairs = initialRepairs
  const allEvents = initialLifecycleEvents

  // Fast product reference map
  const productsMap = useMemo(() => {
    const map = {}
    allProducts.forEach((p) => {
      map[p._id] = p
    })
    return map
  }, [allProducts])

  // Filter State
  const [categoryFilter, setCategoryFilter] = useState('')
  const [dateRangeFilter, setDateRangeFilter] = useState('all')

  // Date boundary helper
  const isDateWithinRange = (dateString, rangeKey) => {
    if (!dateString || rangeKey === 'all') return true
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return false

    if (rangeKey === '2024') {
      return date.getFullYear() === 2024
    }
    if (rangeKey === '2023') {
      return date.getFullYear() === 2023
    }
    if (rangeKey === '6m') {
      // Last 6 months relative to dataset max date (March 2024 -> Oct 1, 2023)
      const sixMonthsAgo = new Date('2023-10-01T00:00:00Z')
      return date >= sixMonthsAgo
    }
    return true
  }

  // Filtered Datasets based on Category and Date Range
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory = categoryFilter === '' || p.category === categoryFilter
      const matchesDate = isDateWithinRange(p.purchase_date, dateRangeFilter)
      return matchesCategory && matchesDate
    })
  }, [allProducts, categoryFilter, dateRangeFilter])

  const filteredRepairs = useMemo(() => {
    return allRepairs.filter((r) => {
      const product = productsMap[r.product_id]
      const matchesCategory =
        categoryFilter === '' || (product && product.category === categoryFilter)
      const matchesDate = isDateWithinRange(r.repair_date, dateRangeFilter)
      return matchesCategory && matchesDate
    })
  }, [allRepairs, productsMap, categoryFilter, dateRangeFilter])

  const filteredEvents = useMemo(() => {
    return allEvents.filter((e) => {
      const product = productsMap[e.product_id]
      const matchesCategory =
        categoryFilter === '' || (product && product.category === categoryFilter)
      const matchesDate = isDateWithinRange(e.event_date, dateRangeFilter)
      return matchesCategory && matchesDate
    })
  }, [allEvents, productsMap, categoryFilter, dateRangeFilter])

  // Dynamically derived analytics data
  const kpis = useMemo(() => {
    return calculateAnalyticsKPIs(filteredProducts, filteredRepairs, filteredEvents)
  }, [filteredProducts, filteredRepairs, filteredEvents])

  const productStatusData = useMemo(() => {
    return calculateProductStatusCounts(filteredProducts)
  }, [filteredProducts])

  const repairTrendsData = useMemo(() => {
    return calculateMonthlyRepairTrends(filteredRepairs)
  }, [filteredRepairs])

  const componentReplacementData = useMemo(() => {
    return calculateComponentReplacements(filteredRepairs)
  }, [filteredRepairs])

  const expenditureByCategoryData = useMemo(() => {
    return calculateExpenditureByCategory(filteredRepairs, productsMap)
  }, [filteredRepairs, productsMap])

  const lifecycleDistributionData = useMemo(() => {
    return calculateLifecycleEventDistribution(filteredEvents)
  }, [filteredEvents])

  const productCategoryData = useMemo(() => {
    return calculateProductCategoryCounts(filteredProducts)
  }, [filteredProducts])

  const handleResetFilters = () => {
    setCategoryFilter('')
    setDateRangeFilter('all')
  }

  return (
    <div className="page-container">
      {/* 1. Page Header */}
      <div className="products-header-group">
        <div>
          <div className="header-badge-row">
            <h2 className="page-header-title">Analytics &amp; Insights</h2>
            <span
              className="demo-data-badge"
              title="Charts derive from demonstration products, repairs, and lifecycle events"
            >
              DEMO DATA
            </span>
          </div>
          <p className="page-header-subtitle">
            Explore product inventory, repair performance, component replacement patterns and lifecycle activities.
          </p>
        </div>
      </div>

      {/* Illustrative Notice Banner */}
      <div className="demo-notice-banner">
        <Info className="demo-notice-icon" size={18} aria-hidden="true" />
        <p className="demo-notice-text">
          <strong>Database Analytics (Client Aggregation):</strong> Visualizations dynamically aggregate records from the local <code>products</code>, <code>repair_events</code>, and <code>lifecycle_events</code> collections. Each chart corresponds conceptually to a MongoDB Aggregation Pipeline operation ($match, $unwind, $group, $lookup).
        </p>
      </div>

      {/* 2. Interactive Analytical Filter Bar */}
      <AnalyticsFilters
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        dateRangeFilter={dateRangeFilter}
        onDateRangeChange={setDateRangeFilter}
        onResetFilters={handleResetFilters}
        productsCount={filteredProducts.length}
        repairsCount={filteredRepairs.length}
        eventsCount={filteredEvents.length}
      />

      {/* 3. Summary KPI Cards */}
      <AnalyticsStats
        totalProducts={kpis.totalProducts}
        totalRepairs={kpis.totalRepairs}
        totalLifecycleEvents={kpis.totalLifecycleEvents}
        totalExpenditure={kpis.totalExpenditure}
      />

      {/* 4. Chart Grid Row 1: Inventory Status & Repair Activity Trends */}
      <div className="charts-grid-two">
        <ProductStatusChart data={productStatusData} />
        <RepairTrendsChart data={repairTrendsData} />
      </div>

      {/* 5. Chart Grid Row 2: Frequently Replaced Parts & Repair Expenditure by Category */}
      <div className="charts-grid-two">
        <ComponentReplacementChart data={componentReplacementData} />
        <RepairExpenditureChart data={expenditureByCategoryData} />
      </div>

      {/* 6. Chart Grid Row 3: Lifecycle Milestone Distribution & Asset Volume by Category */}
      <div className="charts-grid-two">
        <LifecycleEventsChart data={lifecycleDistributionData} />
        <ProductCategoryChart data={productCategoryData} />
      </div>

      {/* 7. MongoDB Big Data Analytics Educational Mapping */}
      <AggregationConcepts />
    </div>
  )
}
