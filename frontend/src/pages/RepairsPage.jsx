import { useState, useMemo } from 'react'
import { Wrench, Info } from 'lucide-react'
import RepairStats from '../components/repairs/RepairStats'
import RepairFilters from '../components/repairs/RepairFilters'
import RepairTable from '../components/repairs/RepairTable'
import RepairForm from '../components/repairs/RepairForm'
import RepairDetails from '../components/repairs/RepairDetails'
import { useData } from '../context/DataContext'

export default function RepairsPage() {
  // Shared data context holding repairs and products registry
  const { repairs, products, productsMap, addRepair } = useData()

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('')
  const [outcomeFilter, setOutcomeFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('date-desc')

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedRepair, setSelectedRepair] = useState(null)

  // Filtered and sorted repairs
  const filteredRepairs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return repairs
      .filter((repair) => {
        const product = productsMap[repair.product_id] || {
          brand: '',
          model: '',
          serial_number: '',
          category: '',
        }

        // 1. Search filter: serial_number, brand, model, fault_description
        const matchesSearch =
          query === '' ||
          product.serial_number.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.model.toLowerCase().includes(query) ||
          repair.fault_description.toLowerCase().includes(query) ||
          repair.service_center.toLowerCase().includes(query)

        // 2. Outcome filter
        const matchesOutcome =
          outcomeFilter === '' || repair.outcome === outcomeFilter

        // 3. Category filter
        const matchesCategory =
          categoryFilter === '' || product.category === categoryFilter

        return matchesSearch && matchesOutcome && matchesCategory
      })
      .sort((a, b) => {
        if (sortOrder === 'date-desc') {
          return new Date(b.repair_date) - new Date(a.repair_date)
        }
        if (sortOrder === 'date-asc') {
          return new Date(a.repair_date) - new Date(b.repair_date)
        }
        if (sortOrder === 'cost-desc') {
          return (Number(b.total_cost) || 0) - (Number(a.total_cost) || 0)
        }
        if (sortOrder === 'cost-asc') {
          return (Number(a.total_cost) || 0) - (Number(b.total_cost) || 0)
        }
        return 0
      })
  }, [repairs, productsMap, searchTerm, outcomeFilter, categoryFilter, sortOrder])

  // Handlers
  const handleOpenAddForm = () => {
    setIsFormOpen(true)
  }

  const handleOpenDetails = (repair) => {
    setSelectedRepair(repair)
    setIsDetailsOpen(true)
  }

  const handleSaveRepair = (newRepairPayload) => {
    // Add new repair to shared state (prepended to display at top)
    addRepair(newRepairPayload)
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setOutcomeFilter('')
    setCategoryFilter('')
    setSortOrder('date-desc')
  }

  return (
    <div className="page-container">
      {/* 1. Page Header */}
      <div className="products-header-group">
        <div>
          <div className="header-badge-row">
            <h2 className="page-header-title">Repair History</h2>
            <span className="demo-data-badge" title="Illustrative sample records for frontend demonstration">
              DEMO DATA
            </span>
          </div>
          <p className="page-header-subtitle">
            Record, monitor and analyze electronic product repair activities.
          </p>
        </div>

        <button
          type="button"
          className="btn-add-product"
          onClick={handleOpenAddForm}
          title="Record a new servicing ticket"
        >
          <Wrench size={18} strokeWidth={2.2} />
          <span>Record New Repair</span>
        </button>
      </div>

      {/* Illustrative Notice Banner */}
      <div className="demo-notice-banner">
        <Info className="demo-notice-icon" size={18} aria-hidden="true" />
        <p className="demo-notice-text">
          <strong>Repair Events Collection (Local State):</strong> Managing demonstration service tickets linked via <code>product_id</code> references to the <code>products</code> collection. Newly recorded repairs update summary counts and expenditure in local React state without remote network calls.
        </p>
      </div>

      {/* 2. Dynamically Calculated Summary Cards */}
      <RepairStats repairs={repairs} />

      {/* 3. Search and Filtering Controls */}
      <RepairFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        outcomeFilter={outcomeFilter}
        onOutcomeChange={setOutcomeFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onResetFilters={handleResetFilters}
        totalCount={repairs.length}
        filteredCount={filteredRepairs.length}
      />

      {/* 4. Repair Records Table */}
      <RepairTable
        repairs={filteredRepairs}
        productsMap={productsMap}
        onViewDetails={handleOpenDetails}
        onResetFilters={handleResetFilters}
      />

      {/* 5. Record New Repair Form Modal */}
      {isFormOpen && (
        <RepairForm
          key="new-repair-modal"
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSaveRepair}
          products={products}
        />
      )}

      {/* 6. Repair Details Modal */}
      <RepairDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        repair={selectedRepair}
        product={selectedRepair ? productsMap[selectedRepair.product_id] : null}
      />
    </div>
  )
}
