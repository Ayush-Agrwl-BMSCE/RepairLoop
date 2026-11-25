import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Bell, User, Menu, X } from 'lucide-react'

export default function Topbar({ onToggleMobileMenu }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [globalSearch, setGlobalSearch] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)

  const getPageMeta = (pathname) => {
    switch (pathname) {
      case '/':
      case '/dashboard':
        return { title: 'Dashboard', breadcrumb: 'Overview & Operations' }
      case '/products':
        return { title: 'Products', breadcrumb: 'Asset Inventory & Registry' }
      case '/repairs':
        return { title: 'Repair History', breadcrumb: 'Maintenance & Service Events' }
      case '/lifecycle':
        return { title: 'Lifecycle Tracking', breadcrumb: 'Milestone & Custody History' }
      case '/analytics':
        return { title: 'Analytics', breadcrumb: 'Database-Generated Insights' }
      default:
        return { title: 'RepairLoop', breadcrumb: 'System Workspace' }
    }
  }

  const { title, breadcrumb } = getPageMeta(location.pathname)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const trimmed = globalSearch.trim()
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`)
    }
  }

  const handleNotificationClick = () => {
    setNotificationMsg('No unread alerts (Live notification service connects in backend phase).')
    setTimeout(() => {
      setNotificationMsg(null)
    }, 3500)
  }

  return (
    <header className="topbar">
      {/* Left Area: Mobile Menu Toggle & Dynamic Page Title */}
      <div className="topbar-left">
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={onToggleMobileMenu}
          aria-label="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>

        <div className="topbar-title-group">
          <h1>{title}</h1>
          <span className="breadcrumb">RepairLoop &gt; {breadcrumb}</span>
        </div>
      </div>

      {/* Right Area: Search Field, Notification, User Profile */}
      <div className="topbar-right">
        <form className="search-field-wrapper" onSubmit={handleSearchSubmit} role="search">
          <Search className="search-icon" size={17} />
          <input
            type="text"
            className="search-input"
            placeholder="Search products, serials..."
            aria-label="Global product search"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
          {globalSearch && (
            <button
              type="button"
              className="topbar-search-clear"
              onClick={() => setGlobalSearch('')}
              aria-label="Clear search input"
            >
              <X size={14} />
            </button>
          )}
        </form>

        <div className="topbar-actions">
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="notification-btn"
              aria-label="Notifications"
              title="Notifications (Backend integration placeholder)"
              onClick={handleNotificationClick}
            >
              <Bell size={18} />
              <span className="notification-dot" />
            </button>
            {notificationMsg && (
              <div className="notification-toast">
                {notificationMsg}
              </div>
            )}
          </div>

          <div className="user-profile" title="Current session operator (Authentication integration planned for backend phase)">
            <div className="user-avatar" title="Admin Technician">
              <User size={16} />
            </div>
            <div className="user-meta">
              <span className="user-name">Admin Tech</span>
              <span className="user-badge">Lab Operator</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
