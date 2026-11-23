import {
  Package,
  Wrench,
  RotateCcw,
  Recycle,
  Info,
  Database,
  Layers,
  ArrowRight
} from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import RepairActivityChart from '../components/dashboard/RepairActivityChart'
import ComponentUsageChart from '../components/dashboard/ComponentUsageChart'
import LifecycleChart from '../components/dashboard/LifecycleChart'
import RecentRepairsTable from '../components/dashboard/RecentRepairsTable'
import {
  kpiMetrics,
  monthlyRepairActivity,
  componentReplacementStats,
  productStatusDistribution,
  recentRepairs,
} from '../data/dashboardData'

const iconMap = {
  Package,
  Wrench,
  RotateCcw,
  Recycle,
}

export default function DashboardPage() {
  return (
    <div className="page-container">
      {/* 1. Dashboard Header with DEMO DATA Badge */}
      <div className="dashboard-header-group">
        <div className="page-header">
          <div className="page-header-title-row">
            <h2 className="page-header-title">System Dashboard</h2>
            <span className="demo-data-badge" title="Current metrics are illustrative sample values">
              <span className="demo-data-dot" aria-hidden="true" />
              DEMO DATA
            </span>
          </div>
          <p className="page-header-subtitle">
            Monitor product repairs, reuse activities and lifecycle operations.
          </p>
        </div>
      </div>

      {/* Illustrative Notice Banner */}
      <div className="demo-notice-banner">
        <Info className="demo-notice-icon" size={18} aria-hidden="true" />
        <p className="demo-notice-text">
          <strong>Illustrative Sample Data:</strong> The metrics, charts, and tables below display demonstration records showing how MongoDB aggregation pipelines will summarize data from <code>products</code>, <code>repair_events</code>, and <code>lifecycle_events</code>.
        </p>
      </div>

      {/* 2. Responsive KPI Cards Grid */}
      <div className="metrics-grid">
        {kpiMetrics.map((kpi) => {
          const Icon = iconMap[kpi.iconName] || Package
          return (
            <StatCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              explanatoryLabel={kpi.explanatoryLabel}
              collectionRef={kpi.collectionRef}
              icon={Icon}
            />
          )
        })}
      </div>

      {/* 3 & 4. Primary Charts Row: Monthly Repair Activity & Frequently Replaced Components */}
      <div className="charts-grid-two">
        <RepairActivityChart data={monthlyRepairActivity} />
        <ComponentUsageChart data={componentReplacementStats} />
      </div>

      {/* 5. Secondary Row: Product Lifecycle Distribution & MongoDB Schema Mapping */}
      <div className="charts-grid-two">
        <LifecycleChart data={productStatusDistribution} />

        <div className="chart-card schema-reference-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">MongoDB Aggregation Architecture</h3>
              <p className="chart-card-subtitle">
                Schema alignment for college Big Data Analytics project
              </p>
            </div>
            <span className="chart-source-tag">3 Collections</span>
          </div>

          <div className="schema-card-body">
            <div className="schema-item">
              <div className="schema-item-header">
                <Database size={16} className="schema-icon" />
                <span className="schema-collection">products</span>
              </div>
              <p className="schema-desc">
                Maintains product specifications and <code>current_status</code> (Active, Under Repair, Refurbished, Decommissioned, Recycled).
              </p>
            </div>

            <div className="schema-item">
              <div className="schema-item-header">
                <Layers size={16} className="schema-icon" />
                <span className="schema-collection">repair_events</span>
              </div>
              <p className="schema-desc">
                Stores service logs, technician observations, and embedded <code>parts_replaced</code> arrays unwound for frequency analytics.
              </p>
            </div>

            <div className="schema-item">
              <div className="schema-item-header">
                <ArrowRight size={16} className="schema-icon" />
                <span className="schema-collection">lifecycle_events</span>
              </div>
              <p className="schema-desc">
                Maintains a chronological, append-oriented history of custody milestones (Purchased, Refurbished, Recycled).
              </p>
            </div>
          </div>

          <div className="chart-card-footer">
            <p>
              <strong>API Integration:</strong> These cards and charts will bind directly to FastAPI routes (<code>/api/analytics/*</code>) via PyMongo queries.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Recent Repair Activities Table */}
      <RecentRepairsTable repairs={recentRepairs} />
    </div>
  )
}
