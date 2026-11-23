import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function ComponentUsageChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-card-title">Frequently Replaced Components</h3>
          <p className="chart-card-subtitle">
            Component replacement counts unwound from repair records
          </p>
        </div>
        <span className="chart-source-tag">Aggregation: $unwind + $group</span>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8ece9" vertical={false} />
            <XAxis
              dataKey="component"
              stroke="#52796f"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e3eae5' }}
              angle={-15}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              stroke="#52796f"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e3eae5',
                borderRadius: '8px',
                fontSize: '0.82rem',
                boxShadow: '0 4px 12px rgba(27, 67, 50, 0.08)',
              }}
              labelStyle={{ fontWeight: 600, color: '#182820', marginBottom: '4px' }}
              formatter={(value) => [`${value} replacements`, 'Count']}
            />
            <Bar
              dataKey="count"
              name="Replacements"
              fill="#2d6a4f"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
