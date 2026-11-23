export default function StatCard({ title, value, explanatoryLabel, icon: Icon, collectionRef }) {
  return (
    <div className="metric-card">
      <div className="metric-card-top">
        <span className="metric-label">{title}</span>
        <div className="metric-icon-box" aria-hidden="true">
          {Icon && <Icon size={18} strokeWidth={2.2} />}
        </div>
      </div>
      <div className="metric-placeholder-value">{value}</div>
      <p className="metric-desc">{explanatoryLabel}</p>
      {collectionRef && (
        <div className="metric-collection-tag">
          <span>Target: {collectionRef}</span>
        </div>
      )}
    </div>
  )
}
