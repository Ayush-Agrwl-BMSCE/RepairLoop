import { useState, useMemo } from 'react'
import { Milestone, Info } from 'lucide-react'
import LifecycleStats from '../components/lifecycle/LifecycleStats'
import LifecycleFilters from '../components/lifecycle/LifecycleFilters'
import LifecycleTable from '../components/lifecycle/LifecycleTable'
import LifecycleTimeline from '../components/lifecycle/LifecycleTimeline'
import LifecycleForm from '../components/lifecycle/LifecycleForm'
import ProductLifecycleDetails from '../components/lifecycle/ProductLifecycleDetails'
import { useData } from '../context/DataContext'

export default function LifecyclePage() {
  // Shared data context holding lifecycle events and products registry
  const { lifecycleEvents: events, products, productsMap, addLifecycleEvent } = useData()

  // Selected product for the on-page Interactive Timeline viewer
  const [selectedProductId, setSelectedProductId] = useState(
    products[0]?._id || ''
  )

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('')
  const [eventTypeFilter, setEventTypeFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('date-desc')

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedProductForModal, setSelectedProductForModal] = useState(null)

  // Filtered and sorted lifecycle events for the table
  const filteredEvents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return events
      .filter((event) => {
        const product = productsMap[event.product_id] || {
          brand: '',
          model: '',
          serial_number: '',
          category: '',
        }

        // 1. Search filter: serial_number, brand, model, event_type, location, recorded_by
        const matchesSearch =
          query === '' ||
          product.serial_number.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.model.toLowerCase().includes(query) ||
          event.event_type.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.recorded_by.toLowerCase().includes(query) ||
          event.notes.toLowerCase().includes(query)

        // 2. Event type filter
        const matchesEventType =
          eventTypeFilter === '' || event.event_type === eventTypeFilter

        // 3. Category filter
        const matchesCategory =
          categoryFilter === '' || product.category === categoryFilter

        return matchesSearch && matchesEventType && matchesCategory
      })
      .sort((a, b) => {
        if (sortOrder === 'date-desc') {
          return new Date(b.event_date) - new Date(a.event_date)
        }
        if (sortOrder === 'date-asc') {
          return new Date(a.event_date) - new Date(b.event_date)
        }
        return 0
      })
  }, [events, productsMap, searchTerm, eventTypeFilter, categoryFilter, sortOrder])

  // Handlers
  const handleOpenAddForm = () => {
    setIsFormOpen(true)
  }

  const handleOpenProductHistory = (product) => {
    setSelectedProductForModal(product)
    setIsDetailsModalOpen(true)
  }

  const handleSaveEvent = (newEventPayload) => {
    // Add new event to shared state (prepended to display at top of table)
    addLifecycleEvent(newEventPayload)
    // Also auto-select this product for the timeline viewer so the user immediately sees it
    setSelectedProductId(newEventPayload.product_id)
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setEventTypeFilter('')
    setCategoryFilter('')
    setSortOrder('date-desc')
  }

  return (
    <div className="page-container">
      {/* 1. Page Header */}
      <div className="products-header-group">
        <div>
          <div className="header-badge-row">
            <h2 className="page-header-title">Lifecycle Tracking</h2>
            <span className="demo-data-badge" title="Illustrative sample records for frontend demonstration">
              DEMO DATA
            </span>
          </div>
          <p className="page-header-subtitle">
            Track product journeys, ownership transitions, refurbishment, reuse and end-of-life activities.
          </p>
        </div>

        <button
          type="button"
          className="btn-add-product"
          onClick={handleOpenAddForm}
          title="Record a new lifecycle milestone"
        >
          <Milestone size={18} strokeWidth={2.2} />
          <span>Record Lifecycle Event</span>
        </button>
      </div>

      {/* Illustrative Notice Banner */}
      <div className="demo-notice-banner">
        <Info className="demo-notice-icon" size={18} aria-hidden="true" />
        <p className="demo-notice-text">
          <strong>Lifecycle Events Collection (Local State):</strong> Managing demonstration milestone events linked via <code>product_id</code> references to the <code>products</code> collection. Newly recorded events update summary counts, the timeline, and the event log in local React state without remote network calls.
        </p>
      </div>

      {/* 2. Dynamically Calculated KPI Cards */}
      <LifecycleStats events={events} />

      {/* 3. Product Lifecycle Chronological Timeline */}
      <LifecycleTimeline
        products={products}
        selectedProductId={selectedProductId}
        onSelectProduct={setSelectedProductId}
        events={events}
      />

      {/* 4. Search and Filtering Controls */}
      <LifecycleFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        eventTypeFilter={eventTypeFilter}
        onEventTypeChange={setEventTypeFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onResetFilters={handleResetFilters}
        totalCount={events.length}
        filteredCount={filteredEvents.length}
      />

      {/* 5. Lifecycle Events Listing Table */}
      <LifecycleTable
        events={filteredEvents}
        productsMap={productsMap}
        onViewProductHistory={handleOpenProductHistory}
        onResetFilters={handleResetFilters}
      />

      {/* 6. Record Lifecycle Event Modal */}
      {isFormOpen && (
        <LifecycleForm
          key="new-lifecycle-event-modal"
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSaveEvent}
          products={products}
        />
      )}

      {/* 7. Product Lifecycle History Modal */}
      <ProductLifecycleDetails
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        product={selectedProductForModal}
        events={events}
      />
    </div>
  )
}
