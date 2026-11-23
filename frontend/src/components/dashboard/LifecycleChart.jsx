import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

export default function LifecycleChart({ data }) {
  const totalCount = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-card-title">Product Status Distribution</h3>
          <p className="chart-card-subtitle">
            Current operational condition across registered products ({totalCount} total)
          </p>
        </div>
        <span className="chart-source-tag">Field: products.current_status</span>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e3eae5',
                borderRadius: '8px',
                fontSize: '0.82rem',
                boxShadow: '0 4px 12px rgba(27, 67, 50, 0.08)',
              }}
              formatter={(value, name) => [`${value} products (${Math.round((value / totalCount) * 100)}%)`, name]}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: '0.78rem', paddingTop: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card-footer">
        <p>
          <strong>Data Model Alignment:</strong> Aggregates <code>products.current_status</code> (agreed values: <code>Active</code>, <code>Under Repair</code>, <code>Refurbished</code>, <code>Decommissioned</code>, <code>Recycled</code>). Kept conceptually separate from milestone event types in <code>lifecycle_events</code>.
        </p>
      </div>
    </div>
  )
}
