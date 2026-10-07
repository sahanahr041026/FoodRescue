import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '440px', margin: '2rem auto', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>
        Welcome Back
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Sign in to manage surplus food donations or requests
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
            Email Address
          </label>
          <input 
            type="email" 
            placeholder="you@organization.org"
            style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
            Password
          </label>
          <input 
            type="password" 
            placeholder="••••••••"
            style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
          />
        </div>

        <button 
          type="submit"
          style={{ width: '100%', backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.95rem' }}
        >
          Sign In
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary-dark)', fontWeight: '600' }}>Register here</Link>
      </p>
    </div>
  );
}
