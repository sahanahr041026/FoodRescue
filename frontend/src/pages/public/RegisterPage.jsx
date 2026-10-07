import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>
        Create an Account
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Join FoodRescue as a Food Provider or NGO Receiver
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
            Account Type (Role)
          </label>
          <select style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'white' }}>
            <option value="PROVIDER">Food Provider (Restaurant, Hostel, Canteen, Bakery)</option>
            <option value="NGO">NGO / Community Organization (Food Bank, Shelter)</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
            Organization or Business Name
          </label>
          <input 
            type="text" 
            placeholder="e.g. City Central Bakery or Hope Shelter"
            style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
            Email Address
          </label>
          <input 
            type="email" 
            placeholder="contact@organization.org"
            style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
            Password
          </label>
          <input 
            type="password" 
            placeholder="At least 8 characters"
            style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
          />
        </div>

        <button 
          type="submit"
          style={{ width: '100%', backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.95rem' }}
        >
          Complete Registration
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary-dark)', fontWeight: '600' }}>Log in here</Link>
      </p>
    </div>
  );
}
