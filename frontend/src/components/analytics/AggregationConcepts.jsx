import { Database, Filter, Layers, Users, ArrowUpDown, Eye, Code2 } from 'lucide-react'

export default function AggregationConcepts() {
  const operators = [
    {
      operator: '$match',
      purpose: 'Document Filtering',
      icon: Filter,
      description: 'Filters documents based on date boundaries or specific product categories before downstream transformation.',
      example: '{ $match: { category: "Laptop", repair_date: { $gte: ISODate(...) } } }',
    },
    {
      operator: '$unwind',
      purpose: 'Array Deconstruction',
      icon: Layers,
      description: 'Deconstructs the embedded parts_replaced array inside repair_events so each component is analyzed as an individual document.',
      example: '{ $unwind: "$parts_replaced" }',
    },
    {
      operator: '$group',
      purpose: 'Aggregate Computation',
      icon: Database,
      description: 'Groups documents by category, status, or part name to calculate count occurrences ($sum: 1) or expenditure ($sum: "$total_cost").',
      example: '{ $group: { _id: "$parts_replaced.part_name", count: { $sum: 1 } } }',
    },
    {
      operator: '$lookup',
      purpose: 'Collection Join',
      icon: Users,
      description: 'Performs a left outer join between products and repair_events on product_id to aggregate repair costs across device categories.',
      example: '{ $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "product" } }',
    },
    {
      operator: '$sort',
      purpose: 'Order Ordering',
      icon: ArrowUpDown,
      description: 'Orders pipeline output descending by replacement frequency, chronological service date, or cumulative expenditure.',
      example: '{ $sort: { count: -1, totalCost: -1 } }',
    },
    {
      operator: '$project',
      purpose: 'Field Reshaping',
      icon: Eye,
      description: 'Reshapes documents into lightweight JSON payloads formatted specifically for client-side Recharts consumption.',
      example: '{ $project: { _id: 0, component: "$_id", count: 1, totalCost: 1 } }',
    },
  ]

  return (
    <div className="table-card aggregation-concepts-card">
      <div className="table-card-header">
        <div>
          <div className="aggregation-header-title-row">
            <Code2 size={20} className="aggregation-header-icon" />
            <h3 className="table-card-title">MongoDB Aggregation Concepts</h3>
          </div>
          <p className="table-card-subtitle">
            How client-side analytical calculations will map to native MongoDB multi-stage aggregation pipelines upon backend integration
          </p>
        </div>
        <span className="status-pill">Curriculum Concept</span>
      </div>

      <div className="aggregation-concepts-grid">
        {operators.map((op) => {
          const Icon = op.icon
          return (
            <div key={op.operator} className="aggregation-op-card">
              <div className="aggregation-op-header">
                <div className="aggregation-op-title">
                  <span className="op-badge">{op.operator}</span>
                  <span className="op-purpose">{op.purpose}</span>
                </div>
                <div className="op-icon-box">
                  <Icon size={16} />
                </div>
              </div>
              <p className="op-description">{op.description}</p>
              <div className="op-code-box">
                <code>{op.example}</code>
              </div>
            </div>
          )
        })}
      </div>

      <div className="aggregation-footer-note">
        <p>
          <strong>Architectural Note:</strong> These pipeline stages reflect the planned Big Data Analytics backend workflow. All calculations currently execute in local client-side memory to support standalone interface testing before FastAPI database connectivity is enabled.
        </p>
      </div>
    </div>
  )
}
