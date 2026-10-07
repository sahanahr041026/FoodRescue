import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        {/* Mandatory Food Safety Notice */}
        <div className="disclaimer-box">
          <strong>⚖️ Food Safety Notice:</strong> FoodRescue is a matching platform. 
          We do not claim food is automatically pre-verified. Food providers are strictly responsible 
          for ensuring all donated food is safe, hygienic, and complies with applicable local food handling standards.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem' }}>
          <div>
            <strong>FoodRescue</strong> — Full-Stack Surplus Food Redistribution Platform
            <p style={{ marginTop: '0.25rem', color: 'var(--text-muted)' }}>
              Built incrementally for real-world engineering portfolio.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <Link to="/ngo/browse" style={{ color: 'var(--text-muted)' }}>Browse Food</Link>
            <Link to="/login" style={{ color: 'var(--text-muted)' }}>Login</Link>
            <Link to="/register" style={{ color: 'var(--text-muted)' }}>Register</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
