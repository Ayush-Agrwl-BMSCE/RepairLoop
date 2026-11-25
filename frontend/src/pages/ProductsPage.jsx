import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, Info } from 'lucide-react'
import ProductStats from '../components/products/ProductStats'
import ProductFilters from '../components/products/ProductFilters'
import ProductTable from '../components/products/ProductTable'
import ProductForm from '../components/products/ProductForm'
import ProductDetails from '../components/products/ProductDetails'
import { useData } from '../context/DataContext'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Shared data context holding products registry
  const { products, addProduct, updateProduct, deleteProduct } = useData()

  // Search & Filter State (synced with URL search param)
  const urlSearch = searchParams.get('search') || ''
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch)
  const [searchTerm, setSearchTerm] = useState(urlSearch)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('date-desc')

  // Adjust state during render when URL query param changes
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch)
    setSearchTerm(urlSearch)
  }

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Filtered and sorted products list
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // 1. Search filter: serial_number, brand, model
        const query = searchTerm.trim().toLowerCase()
        const matchesSearch =
          query === '' ||
          product.serial_number.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.model.toLowerCase().includes(query)

        // 2. Category filter
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter

        // 3. Status filter
        const matchesStatus = statusFilter === '' || product.current_status === statusFilter

        return matchesSearch && matchesCategory && matchesStatus
      })
      .sort((a, b) => {
        if (sortOrder === 'date-desc') {
          return new Date(b.purchase_date) - new Date(a.purchase_date)
        }
        if (sortOrder === 'date-asc') {
          return new Date(a.purchase_date) - new Date(b.purchase_date)
        }
        if (sortOrder === 'brand-asc') {
          return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
        }
        if (sortOrder === 'serial-asc') {
          return a.serial_number.localeCompare(b.serial_number)
        }
        return 0
      })
  }, [products, searchTerm, categoryFilter, statusFilter, sortOrder])

  // Existing serial numbers for validation
  const existingSerials = useMemo(() => {
    return products.map((p) => p.serial_number)
  }, [products])

  // Handlers for Add, Edit, and Delete
  const handleOpenAddForm = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  const handleOpenEditForm = (product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleOpenDetails = (product) => {
    setSelectedProduct(product)
    setIsDetailsOpen(true)
  }

  const handleDeleteProduct = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.brand} ${product.model} (SN: ${product.serial_number})? This action removes it from the local products registry.`
    )
    if (confirmed) {
      deleteProduct(product)
      if (selectedProduct && selectedProduct._id === product._id) {
        setIsDetailsOpen(false)
        setSelectedProduct(null)
      }
    }
  }

  const handleSaveProduct = (productPayload) => {
    if (editingProduct) {
      // Update existing product
      updateProduct(productPayload)
    } else {
      // Add new product
      addProduct(productPayload)
    }
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setCategoryFilter('')
    setStatusFilter('')
    setSortOrder('date-desc')
    setSearchParams({})
  }

  return (
    <div className="page-container">
      {/* 1. Header with Add Product Button & DEMO DATA Indicator */}
      <div className="products-header-group">
        <div className="page-header">
          <div className="page-header-title-row">
            <h2 className="page-header-title">Product Management</h2>
            <span className="demo-data-badge" title="Local demonstration product records">
              <span className="demo-data-dot" aria-hidden="true" />
              DEMO DATA
            </span>
          </div>
          <p className="page-header-subtitle">
            Register, monitor and manage electronic products throughout their lifecycle.
          </p>
        </div>

        <button
          type="button"
          className="btn-add-product"
          onClick={handleOpenAddForm}
          title="Register a new electronic device"
        >
          <Plus size={18} strokeWidth={2.4} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Illustrative Notice Banner */}
      <div className="demo-notice-banner">
        <Info className="demo-notice-icon" size={18} aria-hidden="true" />
        <p className="demo-notice-text">
          <strong>Products Collection (Local State):</strong> Managing demonstration assets matching the <code>products</code> collection schema. Registered products update summary counts in local React state without making remote network calls.
        </p>
      </div>

      {/* 2. Compact Summary Cards (dynamically computed from state) */}
      <ProductStats products={products} />

      {/* 3. Search and Filtering Controls */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onResetFilters={handleResetFilters}
        totalCount={products.length}
        filteredCount={filteredProducts.length}
      />

      {/* 4. Product Listing Table */}
      <ProductTable
        products={filteredProducts}
        onViewDetails={handleOpenDetails}
        onEdit={handleOpenEditForm}
        onDelete={handleDeleteProduct}
        onResetFilters={handleResetFilters}
      />

      {/* 5. Add / Edit Product Form Modal */}
      {isFormOpen && (
        <ProductForm
          key={editingProduct ? editingProduct.serial_number : 'new'}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSaveProduct}
          initialData={editingProduct}
          existingSerials={existingSerials}
        />
      )}

      {/* 6. Product Details Modal */}
      <ProductDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        product={selectedProduct}
        onEdit={handleOpenEditForm}
      />
    </div>
  )
}
