/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { initialProducts } from '../data/productsData'
import { initialRepairs } from '../data/repairsData'
import { initialLifecycleEvents } from '../data/lifecycleData'
import {
  calculateProductStatusCounts,
  calculateMonthlyRepairTrends,
  calculateComponentReplacements,
} from '../data/analyticsData'

const STORAGE_KEY_PRODUCTS = 'repairloop_products'
const STORAGE_KEY_REPAIRS = 'repairloop_repairs'
const STORAGE_KEY_LIFECYCLE = 'repairloop_lifecycle_events'

function loadInitialData(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err)
  }
  return fallback
}

export const DataContext = createContext(null)

export function DataProvider({ children }) {
  // Primary collections persisted in localStorage
  const [products, setProducts] = useState(() =>
    loadInitialData(STORAGE_KEY_PRODUCTS, initialProducts)
  )
  const [repairs, setRepairs] = useState(() =>
    loadInitialData(STORAGE_KEY_REPAIRS, initialRepairs)
  )
  const [lifecycleEvents, setLifecycleEvents] = useState(() =>
    loadInitialData(STORAGE_KEY_LIFECYCLE, initialLifecycleEvents)
  )

  // Sync state mutations to browser localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products))
    } catch (e) {
      console.warn('Failed to persist products to localStorage:', e)
    }
  }, [products])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REPAIRS, JSON.stringify(repairs))
    } catch (e) {
      console.warn('Failed to persist repairs to localStorage:', e)
    }
  }, [repairs])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIFECYCLE, JSON.stringify(lifecycleEvents))
    } catch (e) {
      console.warn('Failed to persist lifecycle events to localStorage:', e)
    }
  }, [lifecycleEvents])

  // Fast normalized product map by _id
  const productsMap = useMemo(() => {
    const map = {}
    products.forEach((p) => {
      map[p._id] = p
    })
    return map
  }, [products])

  // CRUD actions for Products
  const addProduct = useCallback((productPayload) => {
    const newProduct = {
      _id:
        productPayload._id ||
        '651a1b' + Math.random().toString(16).substring(2, 10) + Date.now().toString(16).substring(4),
      created_at: productPayload.created_at || new Date().toISOString(),
      ...productPayload,
    }
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }, [])

  const updateProduct = useCallback((productPayload) => {
    setProducts((prev) =>
      prev.map((item) =>
        item._id === productPayload._id || item.serial_number === productPayload.serial_number
          ? productPayload
          : item
      )
    )
  }, [])

  const deleteProduct = useCallback((productOrId) => {
    const targetId = typeof productOrId === 'string' ? productOrId : productOrId?._id
    const targetSerial = typeof productOrId === 'object' ? productOrId?.serial_number : null
    setProducts((prev) =>
      prev.filter(
        (p) => p._id !== targetId && (!targetSerial || p.serial_number !== targetSerial)
      )
    )
  }, [])

  // CRUD actions for Repairs
  const addRepair = useCallback((repairPayload) => {
    const newRepair = {
      _id:
        repairPayload._id ||
        '651a2c' + Math.random().toString(16).substring(2, 10) + Date.now().toString(16).substring(4),
      ...repairPayload,
    }
    setRepairs((prev) => [newRepair, ...prev])
    return newRepair
  }, [])

  // CRUD actions for Lifecycle Events
  const addLifecycleEvent = useCallback((eventPayload) => {
    const newEvent = {
      _id:
        eventPayload._id ||
        '651a3d' + Math.random().toString(16).substring(2, 10) + Date.now().toString(16).substring(4),
      ...eventPayload,
    }
    setLifecycleEvents((prev) => [newEvent, ...prev])

    // If event updates device condition, reflect in products.current_status
    if (eventPayload.product_id && eventPayload.event_type) {
      const statusTransitions = {
        Refurbished: 'Refurbished',
        Decommissioned: 'Decommissioned',
        Recycled: 'Recycled',
      }
      const newStatus = statusTransitions[eventPayload.event_type]
      if (newStatus) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === eventPayload.product_id ? { ...p, current_status: newStatus } : p
          )
        )
      }
    }
    return newEvent
  }, [])

  // Reset to original demonstration baseline
  const resetAllData = useCallback(() => {
    setProducts(initialProducts)
    setRepairs(initialRepairs)
    setLifecycleEvents(initialLifecycleEvents)
    try {
      localStorage.removeItem(STORAGE_KEY_PRODUCTS)
      localStorage.removeItem(STORAGE_KEY_REPAIRS)
      localStorage.removeItem(STORAGE_KEY_LIFECYCLE)
    } catch (e) {
      console.warn('Failed to clear storage:', e)
    }
  }, [])

  // Dynamic Dashboard Aggregations (Single Shared Source of Truth)
  const dashboardKpis = useMemo(() => {
    const totalProducts = products.length
    const totalRepairs = repairs.length
    const reuseEvents = lifecycleEvents.filter(
      (e) => e.event_type === 'Ownership Transfer' || e.event_type === 'Refurbished'
    ).length
    const recyclingEvents = lifecycleEvents.filter(
      (e) => e.event_type === 'Recycled' || e.event_type === 'Decommissioned'
    ).length

    return [
      {
        id: 'total-products',
        title: 'Total Products',
        value: totalProducts.toString(),
        explanatoryLabel: 'Registered assets in database',
        iconName: 'Package',
        collectionRef: 'products',
      },
      {
        id: 'total-repairs',
        title: 'Total Repairs',
        value: totalRepairs.toString(),
        explanatoryLabel: 'Service tickets logged to date',
        iconName: 'Wrench',
        collectionRef: 'repair_events',
      },
      {
        id: 'reuse-events',
        title: 'Reuse Events',
        value: reuseEvents.toString(),
        explanatoryLabel: 'Refurbishment & transfer events logged',
        iconName: 'RotateCcw',
        collectionRef: 'lifecycle_events',
      },
      {
        id: 'recycling-events',
        title: 'Recycling Events',
        value: recyclingEvents.toString(),
        explanatoryLabel: 'End-of-life recycling milestones logged',
        iconName: 'Recycle',
        collectionRef: 'lifecycle_events',
      },
    ]
  }, [products.length, repairs.length, lifecycleEvents])

  const dashboardMonthlyRepairActivity = useMemo(() => {
    const trends = calculateMonthlyRepairTrends(repairs)
    if (trends.length > 0) {
      return trends.map((t) => ({
        month: t.month.split(' ')[0],
        totalRepairs: t.totalRepairs,
        successfulRepairs: t.successfulRepairs,
      }))
    }
    return [
      { month: 'Jun', totalRepairs: 0, successfulRepairs: 0 },
      { month: 'Jul', totalRepairs: 0, successfulRepairs: 0 },
      { month: 'Aug', totalRepairs: 0, successfulRepairs: 0 },
      { month: 'Sep', totalRepairs: 0, successfulRepairs: 0 },
      { month: 'Oct', totalRepairs: 0, successfulRepairs: 0 },
      { month: 'Nov', totalRepairs: 0, successfulRepairs: 0 },
    ]
  }, [repairs])

  const dashboardComponentReplacementStats = useMemo(() => {
    const replacements = calculateComponentReplacements(repairs)
    if (replacements.length > 0) {
      return replacements.map((item) => ({
        component: item.component,
        count: item.count,
        avgCostINR: item.count > 0 ? Math.round(item.totalCost / item.count) : 0,
      }))
    }
    return [
      { component: 'Battery', count: 0, avgCostINR: 0 },
      { component: 'Display', count: 0, avgCostINR: 0 },
      { component: 'Charging Port', count: 0, avgCostINR: 0 },
      { component: 'Power Supply', count: 0, avgCostINR: 0 },
      { component: 'Cooling Fan', count: 0, avgCostINR: 0 },
    ]
  }, [repairs])

  const dashboardProductStatusDistribution = useMemo(() => {
    const dist = calculateProductStatusCounts(products)
    if (dist.length > 0) return dist
    return [
      { name: 'Active', count: 0, color: '#2d6a4f' },
      { name: 'Refurbished', count: 0, color: '#40916c' },
      { name: 'Under Repair', count: 0, color: '#d97706' },
      { name: 'Decommissioned', count: 0, color: '#64748b' },
      { name: 'Recycled', count: 0, color: '#1b4332' },
    ]
  }, [products])

  const dashboardRecentRepairs = useMemo(() => {
    return repairs.slice(0, 5).map((repair, idx) => {
      const product = productsMap[repair.product_id] || {}
      return {
        ticketId:
          repair.ticketId ||
          `REP-2024-${String(Math.max(1, repairs.length - idx)).padStart(4, '0')}`,
        productModel:
          product.brand && product.model
            ? `${product.brand} ${product.model}`
            : product.model || 'Unknown Device',
        serialNumber: product.serial_number || 'SN-UNKNOWN',
        category: product.category || 'Other',
        faultDescription: repair.fault_description || 'General maintenance service',
        repairDate: repair.repair_date,
        repairCost: Number(repair.total_cost) || 0,
        outcome: repair.outcome || 'Successful',
      }
    })
  }, [repairs, productsMap])

  const value = {
    // Master data
    products,
    repairs,
    lifecycleEvents,
    productsMap,

    // CRUD mutations
    addProduct,
    updateProduct,
    deleteProduct,
    addRepair,
    addLifecycleEvent,
    resetAllData,

    // Dynamic dashboard derived aggregations
    dashboardKpis,
    dashboardMonthlyRepairActivity,
    dashboardComponentReplacementStats,
    dashboardProductStatusDistribution,
    dashboardRecentRepairs,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
