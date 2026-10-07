import { Link } from 'react-router-dom';

export default function ProviderDashboard() {
  return (
    <div>
      {/* Header & Quick Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Provider Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your surplus food listings and incoming NGO pickup requests</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link 
            to="/provider/my-listings"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '0.65rem 1.15rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
          >
            My Listings
          </Link>
          <Link 
            to="/provider/create-listing"
            style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.65rem 1.15rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
          >
            + Create Food Listing
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <Link 
          to="/provider/my-listings"
          style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'block' }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Listings</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem', color: 'var(--primary-dark)' }}>3</div>
        </Link>
        <Link 
          to="/provider/requests"
          style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'block' }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pending Requests</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem', color: 'var(--secondary)' }}>2</div>
        </Link>
        <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Accepted Pickups</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem' }}>1</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Completed Donations</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem' }}>14</div>
        </div>
      </div>

      {/* Quick Access Menu */}
      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Provider Quick Navigation</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          Explore the individual pages built for the food provider workflow:
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link 
            to="/provider/create-listing"
            style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
          >
            📝 Surplus Food Creation Form
          </Link>
          <Link 
            to="/provider/my-listings"
            style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
          >
            📋 Manage My Listings
          </Link>
          <Link 
            to="/provider/requests"
            style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
          >
            📬 Incoming Pickup Requests
          </Link>
        </div>
      </div>
    </div>
  );
}
