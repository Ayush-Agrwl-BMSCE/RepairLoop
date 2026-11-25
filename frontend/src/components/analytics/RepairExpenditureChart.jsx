import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function RepairExpenditureChart({ data = [] }) {
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
          <h3 className="chart-card-title">Repair Expenditure by Category</h3>
          <p className="chart-card-subtitle">
            Total servicing costs aggregated via <code>product_id</code> category grouping
          </p>
        </div>
        <span className="chart-source-tag">Pipeline: $lookup + $group by category</span>
      </div>

      <div className="chart-wrapper">
        {data.length === 0 ? (
          <div className="chart-empty-state">
            <p>No expenditure data matches current filter criteria.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={data}
              margin={{ top: 12, right: 20, left: 10, bottom: 15 }}
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
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(45, 106, 79, 0.05)', radius: 4 }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd9cf',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  boxShadow: '0 4px 12px rgba(27, 67, 50, 0.08)',
                }}
                labelStyle={{ fontWeight: 600, color: '#182820', marginBottom: '4px' }}
                formatter={(value, name, item) => [
                  `${formatCurrency(value)} (${item.payload.repairCount} repairs)`,
                  'Total Cost',
                ]}
              />
              <Bar
                dataKey="totalCost"
                name="Expenditure"
                fill="#40916c"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
