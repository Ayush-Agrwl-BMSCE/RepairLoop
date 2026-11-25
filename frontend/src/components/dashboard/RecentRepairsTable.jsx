export default function RecentRepairsTable({ repairs }) {
  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return isoString
    }
  }

  // Consistent Indian Rupee (INR ₹) formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const getOutcomeClass = (outcome) => {
    switch (outcome) {
      case 'Successful':
        return 'outcome-badge outcome-successful'
      case 'Partial':
        return 'outcome-badge outcome-partial'
      case 'Unrepairable':
        return 'outcome-badge outcome-unrepairable'
      default:
        return 'outcome-badge'
    }
  }

  return (
    <div className="table-card">
      <div className="table-card-header">
        <div>
          <h3 className="table-card-title">Recent Repair Activities</h3>
          <p className="table-card-subtitle">
            Illustrative sample records joined from <code>repair_events</code> and <code>products</code>
          </p>
        </div>
        <span className="table-count-tag">{repairs.length} records</span>
      </div>

      <div className="table-responsive">
        <table className="dashboard-table recent-repairs-table">
          <thead>
            <tr>
              <th className="th-ticket">Ticket ID</th>
              <th className="th-product">Product</th>
              <th className="th-category">Category</th>
              <th className="th-fault">Fault Description</th>
              <th className="th-date">Repair Date</th>
              <th className="th-cost">Repair Cost</th>
              <th className="th-outcome">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((repair) => (
              <tr key={repair.ticketId}>
                <td className="table-ticket-cell">
                  <code>{repair.ticketId}</code>
                </td>
                <td className="table-product-cell">
                  <div className="product-cell-name">{repair.productModel}</div>
                  <div className="product-cell-serial">{repair.serialNumber}</div>
                </td>
                <td className="table-category-cell">
                  <span className="category-pill">{repair.category}</span>
                </td>
                <td className="table-fault-cell" title={repair.faultDescription}>
                  {repair.faultDescription}
                </td>
                <td className="table-date-cell">{formatDate(repair.repairDate)}</td>
                <td className="table-cost-cell">{formatCurrency(repair.repairCost)}</td>
                <td className="table-outcome-cell">
                  <span className={getOutcomeClass(repair.outcome)}>
                    {repair.outcome}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
