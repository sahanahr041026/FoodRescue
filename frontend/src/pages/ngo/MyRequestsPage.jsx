import { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_NGO_REQUESTS = [
  {
    id: 'req-201',
    listing_name: 'Assorted Fresh Multigrain Bread (15 loaves)',
    provider_name: 'Artisan Bakery',
    pickup_address: '42 Market Road, Kitchen Rear Entrance',
    pickup_window: 'Today, 4:00 PM - 7:00 PM',
    status: 'ACCEPTED',
    requested_at: '1 hour ago',
  },
  {
    id: 'req-202',
    listing_name: 'Mixed Veg Fried Rice & Dal (30 portions)',
    provider_name: 'City Central Canteen',
    pickup_address: 'Main Campus Dining Facility Gate 2',
    pickup_window: 'Today, 2:00 PM - 5:00 PM',
    status: 'PENDING',
    requested_at: '20 minutes ago',
  },
];

export default function MyRequestsPage() {
  const [requests, setRequests] = useState(INITIAL_NGO_REQUESTS);

  const confirmCollection = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'COLLECTED' } : r))
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Link to="/ngo/dashboard" style={{ color: 'var(--primary-dark)', fontWeight: '600', fontSize: '0.9rem' }}>
          ← Back to NGO Dashboard
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>My Food Pickup Requests</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track approval and confirm on-site collection of surplus food</p>
        </div>
        <Link 
          to="/ngo/browse" 
          style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
        >
          Browse Available Food
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {requests.map((req) => (
          <div 
            key={req.id}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>{req.listing_name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Provider: <strong>{req.provider_name}</strong> • Requested {req.requested_at}
                </div>
              </div>

              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: '700', 
                padding: '0.25rem 0.65rem', 
                borderRadius: '9999px',
                backgroundColor: req.status === 'ACCEPTED' ? '#ecfdf5' : req.status === 'COLLECTED' ? '#f3f4f6' : '#eff6ff',
                color: req.status === 'ACCEPTED' ? '#065f46' : req.status === 'COLLECTED' ? '#374151' : '#1e40af'
              }}>
                ● {req.status}
              </span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', background: 'var(--bg-page)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span>⏰ <strong>Pickup Window:</strong> {req.pickup_window}</span>
              <span>📍 <strong>Location:</strong> {req.pickup_address}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {req.status === 'ACCEPTED' && (
                <button 
                  onClick={() => confirmCollection(req.id)}
                  style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
                >
                  Confirm Food Collected On-Site
                </button>
              )}
              {req.status === 'COLLECTED' && (
                <span style={{ fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: '600' }}>
                  ✓ Collection confirmed. Awaiting provider final completion.
                </span>
              )}
              {req.status === 'PENDING' && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Awaiting provider response.
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
