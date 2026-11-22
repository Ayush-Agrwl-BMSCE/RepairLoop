import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="app-container">
      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Persistent Left Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Main Content Wrapper */}
      <div className="main-wrapper">
        <Topbar onToggleMobileMenu={toggleMobileMenu} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
