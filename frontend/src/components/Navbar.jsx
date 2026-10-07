import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const navLinkStyle = ({ isActive }) => ({
    fontSize: '0.9rem',
    fontWeight: isActive ? '700' : '500',
    color: isActive ? 'var(--primary-dark)' : 'var(--text-main)',
    padding: '0.4rem 0.75rem',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
    transition: 'all 0.15s ease',
  });

  return (
    <header className="app-header">
      <div className="container header-content">
        {/* Brand Logo */}
        <Link to="/" className="brand">
          <span className="brand-icon">🍲</span>
          <span className="brand-title">Food<span>Rescue</span></span>
          <span className="badge">Phase 2 Router</span>
        </Link>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <NavLink to="/" style={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/ngo/browse" style={navLinkStyle}>
            Browse Food
          </NavLink>
          <NavLink to="/provider/dashboard" style={navLinkStyle}>
            Provider
          </NavLink>
          <NavLink to="/ngo/dashboard" style={navLinkStyle}>
            NGO
          </NavLink>
          <NavLink to="/admin/dashboard" style={navLinkStyle}>
            Admin
          </NavLink>
          <div style={{ height: '20px', width: '1px', backgroundColor: 'var(--border)', margin: '0 0.5rem' }}></div>
          <NavLink to="/login" style={navLinkStyle}>
            Login
          </NavLink>
          <NavLink 
            to="/register" 
            style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
