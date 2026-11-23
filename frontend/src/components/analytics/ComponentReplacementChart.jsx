import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function ComponentReplacementChart({ data = [] }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-card-title">Frequently Replaced Components</h3>
          <p className="chart-card-subtitle">
            Occurrence counts extracted by unwinding <code>parts_replaced</code> sub-documents
          </p>
        </div>
        <span className="chart-source-tag">Aggregation: $unwind + $group</span>
      </div>

      <div className="chart-wrapper">
        {data.length === 0 ? (
          <div className="chart-empty-state">
            <p>No component replacement records match current filter criteria.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={data}
              margin={{ top: 12, right: 20, left: -10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ece9" vertical={false} />
              <XAxis
                dataKey="component"
                stroke="#52796f"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#e3eae5' }}
                angle={-18}
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
                formatter={(value, name, item) => [
                  `${value} replacements (${formatCurrency(item.payload.totalCost)} parts cost)`,
                  'Frequency',
                ]}
              />
              <Bar
                dataKey="count"
                name="Replacements"
                fill="#2d6a4f"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
