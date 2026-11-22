import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Wrench,
  GitBranch,
  BarChart3,
  RotateCcw,
  X,
  Leaf
} from 'lucide-react'

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Repair History', path: '/repairs', icon: Wrench },
    { name: 'Lifecycle Tracking', path: '/lifecycle', icon: GitBranch },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar Header / Logo */}
      <div className="sidebar-header">
        <NavLink to="/dashboard" className="brand-link" onClick={onClose}>
          <div className="brand-icon-wrapper">
            <RotateCcw size={22} strokeWidth={2.4} />
          </div>
          <div className="brand-info">
            <span className="brand-title">RepairLoop</span>
            <span className="brand-tagline">Lifecycle &amp; Repair</span>
          </div>
        </NavLink>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close Sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Section */}
      <nav className="sidebar-nav">
        <span className="nav-section-label">Main Navigation</span>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon className="nav-icon" />
              <span>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Sidebar Footer / SDG Alignment */}
      <div className="sidebar-footer">
        <div className="sdg-badge-card">
          <Leaf className="sdg-badge-icon" size={20} />
          <div className="sdg-badge-text">
            <h4>UN SDG 12.5 Target</h4>
            <p>Promoting electronic repair, reuse, and lifecycle tracking.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
