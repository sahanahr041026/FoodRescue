import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateListingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food_name: '',
    food_category: 'cooked',
    description: '',
    quantity: '',
    quantity_unit: 'portions',
    is_vegetarian: true,
    prepared_at: '',
    best_before: '',
    pickup_start_time: '',
    pickup_end_time: '',
    pickup_address: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In Phase 8, this will send a POST request to /api/listings
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Link to="/provider/dashboard" style={{ color: 'var(--primary-dark)', fontWeight: '600', fontSize: '0.9rem' }}>
          ← Back to Dashboard
        </Link>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          Post Surplus Food Donation
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Provide accurate details about the food, its preparation time, and when an NGO can collect it.
        </p>

        {submitted ? (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🎉</span>
            <h3 style={{ color: '#065f46', marginTop: '0.5rem' }}>Listing Created (Mock Preview)</h3>
            <p style={{ color: '#047857', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>
              In Phase 8, this form will connect directly to the FastAPI <code>POST /api/listings</code> endpoint.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setSubmitted(false)}
                style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600' }}
              >
                Create Another Listing
              </button>
              <Link 
                to="/provider/my-listings"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600' }}
              >
                View My Listings
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Food Name & Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Food Item Name *
                </label>
                <input 
                  type="text"
                  name="food_name"
                  required
                  placeholder="e.g. Fresh Vegetable Rice & Dal"
                  value={formData.food_name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Category *
                </label>
                <select 
                  name="food_category"
                  value={formData.food_category}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'white' }}
                >
                  <option value="cooked">Cooked Meals</option>
                  <option value="bakery">Bakery / Bread</option>
                  <option value="produce">Fresh Produce</option>
                  <option value="packaged">Packaged Goods</option>
                  <option value="dairy">Dairy Products</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Description & Allergen Details
              </label>
              <textarea 
                name="description"
                rows="3"
                placeholder="Include contents, spice level, allergen warnings (nuts, dairy, gluten), and storage suggestions."
                value={formData.description}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* Quantity & Unit */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Quantity *
                </label>
                <input 
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  placeholder="e.g. 25"
                  value={formData.quantity}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Unit *
                </label>
                <select 
                  name="quantity_unit"
                  value={formData.quantity_unit}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'white' }}
                >
                  <option value="portions">Portions / Meals</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="boxes">Boxes</option>
                  <option value="loaves">Loaves</option>
                </select>
              </div>

              <div style={{ paddingTop: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
                  <input 
                    type="checkbox"
                    name="is_vegetarian"
                    checked={formData.is_vegetarian}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  Vegetarian Food
                </label>
              </div>
            </div>

            {/* Timings: Prepared At & Best Before */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Prepared At *
                </label>
                <input 
                  type="datetime-local"
                  name="prepared_at"
                  required
                  value={formData.prepared_at}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Best Before / Consume By *
                </label>
                <input 
                  type="datetime-local"
                  name="best_before"
                  required
                  value={formData.best_before}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Pickup Window */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Pickup Start Time *
                </label>
                <input 
                  type="datetime-local"
                  name="pickup_start_time"
                  required
                  value={formData.pickup_start_time}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Pickup End Time *
                </label>
                <input 
                  type="datetime-local"
                  name="pickup_end_time"
                  required
                  value={formData.pickup_end_time}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Pickup Address */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Pickup Address & Instructions *
              </label>
              <input 
                type="text"
                name="pickup_address"
                required
                placeholder="Building name, street, nearby landmark, or kitchen door"
                value={formData.pickup_address}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
              />
            </div>

            {/* Food Safety Affirmation */}
            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ⚠️ <strong>Provider Responsibility:</strong> By posting this listing, you confirm that this surplus food has been prepared, packed, and stored following standard food hygiene practices and is safe for consumption.
            </div>

            <button 
              type="submit"
              style={{ width: '100%', backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '1rem' }}
            >
              Publish Surplus Food Listing
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
