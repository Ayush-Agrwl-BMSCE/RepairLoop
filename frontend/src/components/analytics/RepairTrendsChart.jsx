import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

export default function RepairTrendsChart({ data = [] }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-card-title">Monthly Repair Trends</h3>
          <p className="chart-card-subtitle">
            Chronological volume of maintenance tickets and successful resolutions
          </p>
        </div>
        <span className="chart-source-tag">Pipeline: $group by repair_date</span>
      </div>

      <div className="chart-wrapper">
        {data.length === 0 ? (
          <div className="chart-empty-state">
            <p>No repair records match current filter criteria.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={data}
              margin={{ top: 12, right: 24, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ece9" vertical={false} />
              <XAxis
                dataKey="month"
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
                  border: '1px solid #cbd9cf',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  boxShadow: '0 4px 12px rgba(27, 67, 50, 0.08)',
                }}
                labelStyle={{ fontWeight: 600, color: '#182820', marginBottom: '4px' }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: '0.78rem', paddingBottom: '10px' }}
              />
              <Line
                type="monotone"
                dataKey="totalRepairs"
                name="Total Repairs"
                stroke="#2d6a4f"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#2d6a4f' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="successfulRepairs"
                name="Successful"
                stroke="#52b788"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#52b788' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
