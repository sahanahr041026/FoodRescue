import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkBackendHealth } from '../../services/api';

export default function LandingPage() {
  const [health, setHealth] = useState({
    loading: true,
    connected: false,
    data: null,
    error: null,
  });

  // Test backend connection on component mount
  useEffect(() => {
    async function verifyHealth() {
      setHealth((prev) => ({ ...prev, loading: true }));
      const result = await checkBackendHealth();
      if (result.ok) {
        setHealth({
          loading: false,
          connected: true,
          data: result.data,
          error: null,
        });
      } else {
        setHealth({
          loading: false,
          connected: false,
          data: null,
          error: result.error,
        });
      }
    }

    verifyHealth();
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-tagline">Surplus Food Redistribution</div>
        <h1 className="hero-title">
          Bridging Edible Surplus Food<br />to Local Communities
        </h1>
        <p className="hero-description">
          A transparent, verifiable platform connecting restaurants, canteens, and food providers 
          with nearby NGOs and community organizations for timely pickup and redistribution.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <Link 
            to="/register" 
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Get Started (Register)
          </Link>
          <Link 
            to="/login" 
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-main)',
              border: '1px solid var(--border)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600'
            }}
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Live Backend Connection Indicator */}
      <div className="health-card">
        <div className="health-header">
          <h3 className="health-title">
            <span>🔌</span> Full-Stack API Connection Status
          </h3>
          {health.loading ? (
            <span className="status-indicator checking">
              <span className="status-dot"></span> Checking API...
            </span>
          ) : health.connected ? (
            <span className="status-indicator connected">
              <span className="status-dot"></span> Backend Connected (200 OK)
            </span>
          ) : (
            <span className="status-indicator disconnected">
              <span className="status-dot"></span> Backend Disconnected
            </span>
          )}
        </div>

        {health.connected && health.data && (
          <div className="health-details">
            <div className="health-item">
              <div className="health-label">API Status</div>
              <div className="health-value" style={{ color: 'var(--primary-dark)' }}>
                ● {health.data.status.toUpperCase()}
              </div>
            </div>
            <div className="health-item">
              <div className="health-label">Service</div>
              <div className="health-value">{health.data.service}</div>
            </div>
            <div className="health-item">
              <div className="health-label">API Version</div>
              <div className="health-value">v{health.data.version}</div>
            </div>
            <div className="health-item">
              <div className="health-label">Server Timestamp</div>
              <div className="health-value">
                {new Date(health.data.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {!health.connected && !health.loading && (
          <div className="hint-box">
            <strong>⚠️ Backend Server Not Reachable:</strong> {health.error}
            <br /><br />
            To start the FastAPI backend server, open your terminal and run:
            <br />
            <code>cd backend && uvicorn app.main:app --reload --port 8000</code>
          </div>
        )}
      </div>

      {/* User Roles Section */}
      <section>
        <h2 className="section-title">Three Core User Roles</h2>
        <p className="section-subtitle">
          Role-based authorization guarantees distinct capabilities and data boundaries.
        </p>
        <div className="roles-grid">
          <div className="role-card">
            <div className="role-icon">🏪</div>
            <h3 className="role-title">Food Provider</h3>
            <p className="role-desc">Restaurants, bakeries, hostels, canteens, and caterers.</p>
            <ul className="role-list">
              <li>Create surplus food listings</li>
              <li>Set quantity, unit & pickup window</li>
              <li>Review & accept/reject NGO requests</li>
              <li>Mark donations handed over</li>
            </ul>
          </div>

          <div className="role-card">
            <div className="role-icon">🤝</div>
            <h3 className="role-title">NGO / Receiver</h3>
            <p className="role-desc">Food banks, shelters, and verified community volunteers.</p>
            <ul className="role-list">
              <li>Browse available food listings</li>
              <li>Filter by category & distance</li>
              <li>Request pickup with custom message</li>
              <li>Confirm food collection on-site</li>
            </ul>
          </div>

          <div className="role-card">
            <div className="role-icon">🛡️</div>
            <h3 className="role-title">Platform Admin</h3>
            <p className="role-desc">System moderation, security, and integrity management.</p>
            <ul className="role-list">
              <li>View & manage all registered users</li>
              <li>Moderate & remove inappropriate listings</li>
              <li>Inspect requests and donation stats</li>
              <li>Oversee platform compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Flow Pipeline */}
      <section className="flow-section">
        <h2 className="section-title">5-Stage Donation Lifecycle</h2>
        <p className="section-subtitle">
          Clear state transitions guarantee that donations are accurately tracked and audited.
        </p>
        <div className="flow-steps">
          <div className="flow-step">
            <div className="flow-step-num">1</div>
            <div className="flow-step-title">AVAILABLE</div>
            <div className="flow-step-desc">Provider posts edible surplus food</div>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step">
            <div className="flow-step-num">2</div>
            <div className="flow-step-title">REQUESTED</div>
            <div className="flow-step-desc">Nearby NGO requests pickup</div>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step">
            <div className="flow-step-num">3</div>
            <div className="flow-step-title">ACCEPTED</div>
            <div className="flow-step-desc">Provider accepts the request</div>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step">
            <div className="flow-step-num">4</div>
            <div className="flow-step-title">COLLECTED</div>
            <div className="flow-step-desc">NGO collects food at location</div>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step">
            <div className="flow-step-num">5</div>
            <div className="flow-step-title">COMPLETED</div>
            <div className="flow-step-desc">Handover finalized & logged</div>
          </div>
        </div>
      </section>
    </div>
  );
}
