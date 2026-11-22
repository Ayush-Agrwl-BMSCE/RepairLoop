import { useLocation } from 'react-router-dom'
import { Search, Bell, User, Menu } from 'lucide-react'

export default function Topbar({ onToggleMobileMenu }) {
  const location = useLocation()

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
        <div className="search-field-wrapper">
          <Search className="search-icon" size={17} />
          <input
            type="text"
            className="search-input"
            placeholder="Search products, serials..."
            aria-label="Search"
            readOnly
          />
        </div>

        <div className="topbar-actions">
          <button
            type="button"
            className="notification-btn"
            aria-label="Notifications"
            title="Notifications (0 unread)"
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>

          <div className="user-profile">
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
