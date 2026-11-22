import { Package, CheckCircle2, Database, PlusCircle } from 'lucide-react'

export default function ProductsPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-header-title">Products Management</h2>
        <p className="page-header-subtitle">
          Central inventory registry for electronic devices, hardware specifications, and asset statuses.
        </p>
      </div>

      {/* Collection Status Banner */}
      <div className="status-banner">
        <div className="status-banner-content">
          <Database className="status-banner-icon" size={24} />
          <div>
            <div className="status-banner-title">Collection Target: products</div>
            <div className="status-banner-desc">
              Stores master hardware records with embedded technical specifications and unique serial numbers.
            </div>
          </div>
        </div>
        <span className="status-pill">MongoDB Collection</span>
      </div>

      {/* Planned Feature Cards */}
      <div className="cards-grid">
        <div className="placeholder-card">
          <div className="placeholder-card-header">
            <div className="placeholder-card-icon">
              <Package size={20} />
            </div>
            <h3 className="placeholder-card-title">Document Schema Design</h3>
          </div>
          <p className="placeholder-card-body">
            Each document represents an electronic device with structured attributes:
          </p>
          <ul className="placeholder-card-list">
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>serial_number:</strong> Indexed unique manufacturer identifier</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>brand &amp; model:</strong> Manufacturer identification</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>category:</strong> Laptop, Smartphone, Monitor, Audio</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>specifications:</strong> Embedded sub-document with hardware parameters</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span><strong>current_status:</strong> Active, Under Repair, Refurbished, Recycled</span>
            </li>
          </ul>
        </div>

        <div className="placeholder-card">
          <div className="placeholder-card-header">
            <div className="placeholder-card-icon">
              <PlusCircle size={20} />
            </div>
            <h3 className="placeholder-card-title">Planned Operations</h3>
          </div>
          <p className="placeholder-card-body">
            The frontend interface will connect to FastAPI endpoints in upcoming phases:
          </p>
          <ul className="placeholder-card-list">
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span>Fast product registration form with specification builders</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span>Live serial number lookup querying indexed fields</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span>Filter and categorize assets by operational status</span>
            </li>
            <li>
              <CheckCircle2 className="check-bullet" size={15} />
              <span>Product detail view linking to complete service history</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
