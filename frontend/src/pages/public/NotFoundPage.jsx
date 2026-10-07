import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        style={{
          backgroundColor: 'var(--primary)',
          color: 'white',
          padding: '0.65rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          fontWeight: '600'
        }}
      >
        Return to Home
      </Link>
    </div>
  );
}
