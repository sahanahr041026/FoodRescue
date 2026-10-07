import { Link } from 'react-router-dom';

const MOCK_DONATIONS = [
  {
    id: 'lst-1',
    food_name: 'Mixed Veg Fried Rice & Dal',
    provider_name: 'City Central Canteen',
    category: 'Cooked Meals',
    quantity: '30 portions',
    is_veg: true,
    best_before: 'Today, 6:00 PM',
    distance: '1.2 km away',
    pickup_window: '2:00 PM - 5:00 PM',
  },
  {
    id: 'lst-2',
    food_name: 'Assorted Fresh Multigrain Bread',
    provider_name: 'Artisan Bakery',
    category: 'Bakery',
    quantity: '15 loaves',
    is_veg: true,
    best_before: 'Tomorrow, 10:00 AM',
    distance: '2.5 km away',
    pickup_window: '4:00 PM - 7:00 PM',
  },
  {
    id: 'lst-3',
    food_name: 'Fresh Garden Salad & Fruit Bowls',
    provider_name: 'Green Catering Co.',
    category: 'Fresh Produce',
    quantity: '18 bowls',
    is_veg: true,
    best_before: 'Today, 8:00 PM',
    distance: '3.1 km away',
    pickup_window: '3:30 PM - 6:00 PM',
  },
];

export default function BrowseFoodPage() {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Browse Available Surplus Food</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Discover surplus food posted by nearby restaurants, caterers, and canteens
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search by food name or provider..." 
          style={{ flex: 1, minWidth: '220px', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
        />
        <select style={{ padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white' }}>
          <option value="">All Categories</option>
          <option value="cooked">Cooked Meals</option>
          <option value="bakery">Bakery & Bread</option>
          <option value="produce">Fresh Produce</option>
          <option value="dairy">Dairy Products</option>
        </select>
        <select style={{ padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white' }}>
          <option value="">Dietary Type</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
      </div>

      {/* Listings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {MOCK_DONATIONS.map((food) => (
          <div 
            key={food.id}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
                  {food.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  📍 {food.distance}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                {food.food_name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Provider: <strong>{food.provider_name}</strong>
              </p>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', background: 'var(--bg-page)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
                <div>📦 <strong>Quantity:</strong> {food.quantity}</div>
                <div>⏰ <strong>Consume By:</strong> {food.best_before}</div>
                <div>🕒 <strong>Window:</strong> {food.pickup_window}</div>
              </div>
            </div>

            <Link 
              to={`/ngo/food/${food.id}`}
              style={{ textAlign: 'center', backgroundColor: 'var(--primary)', color: 'white', padding: '0.65rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.9rem' }}
            >
              View Details & Request Pickup
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
