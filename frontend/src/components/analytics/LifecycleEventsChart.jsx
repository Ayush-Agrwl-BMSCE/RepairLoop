import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

export default function LifecycleEventsChart({ data = [] }) {
  const totalCount = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-card-title">Lifecycle Milestone Distribution</h3>
          <p className="chart-card-subtitle">
            Proportion of append-oriented milestones logged ({totalCount} total events)
          </p>
        </div>
        <span className="chart-source-tag">Field: lifecycle_events.event_type</span>
      </div>

      <div className="chart-wrapper">
        {data.length === 0 ? (
          <div className="chart-empty-state">
            <p>No lifecycle milestone events match current filter criteria.</p>
          </div>
        ) : (
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
                  <Cell
                    key={`lc-${entry.name}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
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
                formatter={(value, name) => [
                  `${value} events (${Math.round((value / totalCount) * 100)}%)`,
                  name,
                ]}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: '0.78rem', paddingTop: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
