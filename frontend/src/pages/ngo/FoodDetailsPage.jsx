import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function FoodDetailsPage() {
  const { id } = useParams();
  const [requested, setRequested] = useState(false);
  const [message, setMessage] = useState('');

  // Sample data (will connect to GET /api/listings/{id} in Phase 8)
  const listing = {
    id: id || 'lst-1',
    food_name: 'Mixed Veg Fried Rice & Dal',
    category: 'Cooked Meals',
    description: 'Freshly cooked surplus from the lunch buffet. Kept heated in insulated containers. Contains mild spices, carrots, peas, and lentils.',
    quantity: '30 portions',
    is_vegetarian: true,
    prepared_at: 'Today, 11:30 AM',
    best_before: 'Today, 6:00 PM',
    pickup_window: '2:00 PM - 5:00 PM',
    address: 'City Central Canteen, Dining Block Ground Floor',
    provider_name: 'City Central Canteen',
  };

  const handleRequest = (e) => {
    e.preventDefault();
    setRequested(true);
    // Will send POST /api/requests in Phase 10
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/ngo/browse" style={{ color: 'var(--primary-dark)', fontWeight: '600', fontSize: '0.9rem' }}>
          ← Back to All Listings
        </Link>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{listing.food_name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Posted by <strong>{listing.provider_name}</strong>
            </p>
          </div>
          <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', fontWeight: '700', fontSize: '0.8rem', padding: '0.3rem 0.75rem', borderRadius: '9999px' }}>
            ● Available for Pickup
          </span>
        </div>

        <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {listing.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'var(--bg-page)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Quantity</div>
            <div style={{ fontWeight: '700', fontSize: '1rem' }}>{listing.quantity}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dietary Type</div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--primary-dark)' }}>
              {listing.is_vegetarian ? '🌱 Vegetarian' : '🍗 Non-Vegetarian'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Best Before</div>
            <div style={{ fontWeight: '700', fontSize: '1rem' }}>{listing.best_before}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pickup Window</div>
            <div style={{ fontWeight: '700', fontSize: '1rem' }}>{listing.pickup_window}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pickup Address</div>
            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>📍 {listing.address}</div>
          </div>
        </div>

        {/* Request Food Form */}
        {requested ? (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>📨</span>
            <h3 style={{ color: '#065f46', marginTop: '0.5rem' }}>Pickup Request Sent!</h3>
            <p style={{ color: '#047857', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
              The provider has been notified. You can track their response in your requests dashboard.
            </p>
            <Link 
              to="/ngo/my-requests"
              style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', display: 'inline-block' }}
            >
              View My Requests
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRequest} style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>Request This Food Pickup</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Send a note to the provider with your expected arrival time and vehicle details.
            </p>
            <textarea 
              rows="3"
              required
              placeholder="e.g. Hope Shelter volunteer will arrive at 3:15 PM in a van with cold boxes."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', marginBottom: '1rem', fontFamily: 'inherit' }}
            />
            <button 
              type="submit"
              style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.95rem' }}
            >
              Submit Pickup Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
