import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function ProductCategoryChart({ data = [] }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-card-title">Registered Products by Category</h3>
          <p className="chart-card-subtitle">
            Asset volume breakdown across hardware categories
          </p>
        </div>
        <span className="chart-source-tag">Field: products.category</span>
      </div>

      <div className="chart-wrapper">
        {data.length === 0 ? (
          <div className="chart-empty-state">
            <p>No products match current filter criteria.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={data}
              margin={{ top: 12, right: 20, left: -10, bottom: 15 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ece9" vertical={false} />
              <XAxis
                dataKey="category"
                stroke="#52796f"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e3eae5' }}
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
                formatter={(value) => [`${value} registered assets`, 'Count']}
              />
              <Bar
                dataKey="count"
                name="Products"
                fill="#1b4332"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
