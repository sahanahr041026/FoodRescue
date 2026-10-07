import { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_REQUESTS = [
  {
    id: 'req-101',
    listing_id: 'lst-2',
    listing_name: 'Assorted Fresh Multigrain Bread (15 loaves)',
    ngo_name: 'Hope Street Community Shelter',
    requested_quantity: '15 loaves',
    message: 'We serve an evening meal at 6:30 PM for 50 people. We have transport ready for immediate pickup.',
    status: 'PENDING',
    created_at: '10 minutes ago',
  },
  {
    id: 'req-102',
    listing_id: 'lst-3',
    listing_name: 'Packed Lunch Boxes (20 boxes)',
    ngo_name: 'City Youth Food Relief',
    requested_quantity: '20 boxes',
    message: 'Pickup volunteer can arrive by 2:15 PM today.',
    status: 'ACCEPTED',
    created_at: 'Yesterday',
  },
];

export default function ProviderRequestsPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const handleAction = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Link to="/provider/dashboard" style={{ color: 'var(--primary-dark)', fontWeight: '600', fontSize: '0.9rem' }}>
          ← Back to Dashboard
        </Link>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Incoming NGO Pickup Requests</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Review and approve pickup requests from nearby NGOs before food handover.
        </p>
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
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: '600', marginTop: '0.2rem' }}>
                  Requested by: {req.ngo_name} ({req.created_at})
                </div>
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: '700', 
                padding: '0.25rem 0.65rem', 
                borderRadius: '9999px',
                backgroundColor: req.status === 'ACCEPTED' ? '#ecfdf5' : req.status === 'REJECTED' ? '#fef2f2' : req.status === 'COMPLETED' ? '#f3f4f6' : '#eff6ff',
                color: req.status === 'ACCEPTED' ? '#065f46' : req.status === 'REJECTED' ? '#991b1b' : req.status === 'COMPLETED' ? '#374151' : '#1e40af'
              }}>
                ● {req.status}
              </span>
            </div>

            <div style={{ background: 'var(--bg-page)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              <strong>NGO Note:</strong> "{req.message}"
            </div>

            {/* Actions depending on state */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              {req.status === 'PENDING' && (
                <>
                  <button 
                    onClick={() => handleAction(req.id, 'ACCEPTED')}
                    style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.45rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.85rem' }}
                  >
                    Accept Request
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'REJECTED')}
                    style={{ backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.45rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.85rem' }}
                  >
                    Decline
                  </button>
                </>
              )}
              {req.status === 'ACCEPTED' && (
                <button 
                  onClick={() => handleAction(req.id, 'COMPLETED')}
                  style={{ backgroundColor: '#1e40af', color: 'white', padding: '0.45rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.85rem' }}
                >
                  Confirm Handover (Mark Completed)
                </button>
              )}
              {req.status === 'COMPLETED' && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  ✓ Donation handover complete and logged.
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
