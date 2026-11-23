import { useState, useMemo } from 'react'
import { Plus, Info } from 'lucide-react'
import ProductStats from '../components/products/ProductStats'
import ProductFilters from '../components/products/ProductFilters'
import ProductTable from '../components/products/ProductTable'
import ProductForm from '../components/products/ProductForm'
import ProductDetails from '../components/products/ProductDetails'
import { initialProducts } from '../data/productsData'

export default function ProductsPage() {
  // Local state holding the list of registered demonstration products
  const [products, setProducts] = useState(initialProducts)

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Filtered products list based on search term, category, and status
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
  }, [products, searchTerm, categoryFilter, statusFilter])

  // Existing serial numbers for validation
  const existingSerials = useMemo(() => {
    return products.map((p) => p.serial_number)
  }, [products])

  // Handlers for Add and Edit
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

  const handleSaveProduct = (productPayload) => {
    if (editingProduct) {
      // Update existing product
      setProducts((prev) =>
        prev.map((item) =>
          item._id === productPayload._id || item.serial_number === editingProduct.serial_number
            ? productPayload
            : item
        )
      )
    } else {
      // Add new product
      setProducts((prev) => [productPayload, ...prev])
    }
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setCategoryFilter('')
    setStatusFilter('')
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
        onResetFilters={handleResetFilters}
        totalCount={products.length}
        filteredCount={filteredProducts.length}
      />

      {/* 4. Product Listing Table */}
      <ProductTable
        products={filteredProducts}
        onViewDetails={handleOpenDetails}
        onEdit={handleOpenEditForm}
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
