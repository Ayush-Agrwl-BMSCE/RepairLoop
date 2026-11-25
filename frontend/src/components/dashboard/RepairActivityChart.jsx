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

export default function RepairActivityChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-card-title">Monthly Repair Activity</h3>
          <p className="chart-card-subtitle">
            Number of service events logged over the past 6 months
          </p>
        </div>
        <span className="chart-source-tag">Source: repair_events</span>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
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
              stroke="#1b4332"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1b4332' }}
              activeDot={{ r: 6, fill: '#1b4332' }}
            />
            <Line
              type="monotone"
              dataKey="successfulRepairs"
              name="Successful Repairs"
              stroke="#52b788"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#52b788' }}
              activeDot={{ r: 5, fill: '#52b788' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
