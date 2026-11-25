import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import AppLayout from './components/layout/AppLayout'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import RepairsPage from './pages/RepairsPage'
import LifecyclePage from './pages/LifecyclePage'
import AnalyticsPage from './pages/AnalyticsPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Default redirect to /dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="repairs" element={<RepairsPage />} />
            <Route path="lifecycle" element={<LifecyclePage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            {/* Catch-all redirect to /dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  )
}
