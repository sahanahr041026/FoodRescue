import { Link } from 'react-router-dom';

const MOCK_LISTINGS = [
  {
    id: 'lst-1',
    food_name: 'Mixed Veg Fried Rice & Dal',
    category: 'Cooked Meals',
    quantity: '30 portions',
    status: 'AVAILABLE',
    pickup_window: 'Today, 2:00 PM - 5:00 PM',
    address: 'City Central Canteen, Main Block',
  },
  {
    id: 'lst-2',
    food_name: 'Assorted Fresh Multigrain Bread',
    category: 'Bakery',
    quantity: '15 loaves',
    status: 'REQUESTED',
    pickup_window: 'Today, 4:00 PM - 7:00 PM',
    address: 'Artisan Bakery, 42 Market Road',
  },
  {
    id: 'lst-3',
    food_name: 'Packed Lunch Boxes (Rice, Veg, Salad)',
    category: 'Cooked Meals',
    quantity: '20 boxes',
    status: 'COMPLETED',
    pickup_window: 'Yesterday, 1:00 PM - 3:00 PM',
    address: 'Hostel Mess Dining Hall B',
  },
];

export default function MyListingsPage() {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return { bg: '#ecfdf5', color: '#065f46', label: '● Available' };
      case 'REQUESTED':
        return { bg: '#eff6ff', color: '#1e40af', label: '● Request Pending' };
      case 'ACCEPTED':
        return { bg: '#fef3c7', color: '#92400e', label: '● Pickup Accepted' };
      case 'COMPLETED':
        return { bg: '#f3f4f6', color: '#374151', label: '✓ Completed' };
      default:
        return { bg: '#f3f4f6', color: '#374151', label: status };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>My Food Listings</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track the real-time status of your surplus food donations</p>
        </div>
        <Link 
          to="/provider/create-listing" 
          style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
        >
          + Post New Listing
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {MOCK_LISTINGS.map((listing) => {
          const badge = getStatusBadge(listing.status);
          return (
            <div 
              key={listing.id}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>{listing.food_name}</h3>
                  <span style={{ backgroundColor: badge.bg, color: badge.color, fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                    {badge.label}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span>🏷️ <strong>Category:</strong> {listing.category}</span>
                  <span>📦 <strong>Quantity:</strong> {listing.quantity}</span>
                  <span>⏰ <strong>Window:</strong> {listing.pickup_window}</span>
                  <span>📍 <strong>Location:</strong> {listing.address}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link 
                  to="/provider/requests"
                  style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: '600' }}
                >
                  View Requests
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
