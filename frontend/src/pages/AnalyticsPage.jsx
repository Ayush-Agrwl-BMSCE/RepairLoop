import { CheckCircle2, Database, TrendingUp, Layers } from 'lucide-react'

export default function AnalyticsPage() {
  const plannedAggregations = [
    {
      pipeline: 'Frequent Faulty Components',
      operator: '$unwind + $group',
      description: 'Unwinds the parts_replaced array inside repair_events and groups by part name to calculate replacement counts.',
    },
    {
      pipeline: 'Repair Expenditure by Category',
      operator: '$group + $avg / $sum',
      description: 'Calculates total and average maintenance costs grouped across device categories (Laptops, Monitors, Phones).',
    },
    {
      pipeline: 'Product Status Distribution',
      operator: '$group + $count',
      description: 'Summarizes active inventory versus devices under repair, refurbished, or decommissioned.',
    },
    {
      pipeline: 'Product Repair History Merging',
      operator: '$lookup (Join)',
      description: 'Performs a left outer join between products and repair_events on product_id to compute total cost of ownership.',
    },
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-header-title">Database Analytics &amp; Aggregations</h2>
        <p className="page-header-subtitle">
          Database-generated circularity insights powered by MongoDB multi-stage aggregation pipelines.
        </p>
      </div>

      {/* Analytics Readiness Banner */}
      <div className="status-banner">
        <div className="status-banner-content">
          <Database className="status-banner-icon" size={24} />
          <div>
            <div className="status-banner-title">Visualization Engine: Recharts Integration Ready</div>
            <div className="status-banner-desc">
              Charts will render live MongoDB aggregation results when backend API endpoints are linked. No mock datasets are used.
            </div>
          </div>
        </div>
        <span className="status-pill">MongoDB Aggregations</span>
      </div>

      {/* Aggregation Pipelines Overview */}
      <div className="cards-grid">
        <div className="placeholder-card">
          <div className="placeholder-card-header">
            <div className="placeholder-card-icon">
              <Layers size={20} />
            </div>
            <h3 className="placeholder-card-title">Planned Aggregation Pipelines</h3>
          </div>
          <p className="placeholder-card-body">
            MongoDB aggregation queries designed for the Big Data Analytics curriculum:
          </p>
          <ul className="placeholder-card-list">
            {plannedAggregations.map((agg) => (
              <li key={agg.pipeline}>
                <CheckCircle2 className="check-bullet" size={15} />
                <span>
                  <strong>{agg.pipeline}</strong> (<code>{agg.operator}</code>): {agg.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="placeholder-card">
          <div className="placeholder-card-header">
            <div className="placeholder-card-icon">
              <TrendingUp size={20} />
            </div>
            <h3 className="placeholder-card-title">Planned Chart Representations</h3>
          </div>
          <p className="placeholder-card-body">
            Planned Recharts components to be wired with the FastAPI aggregation endpoints:
          </p>
          <ul className="placeholder-card-list">
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>Horizontal Bar Chart:</strong> Top replaced hardware components</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>Grouped Bar Chart:</strong> Comparative repair costs across product categories</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>Donut / Pie Chart:</strong> Inventory lifecycle status distribution</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>Summary KPI Blocks:</strong> Aggregated total repair expenditure</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
