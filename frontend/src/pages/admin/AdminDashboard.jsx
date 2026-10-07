import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_USERS = [
  { id: 'usr-1', name: 'City Central Canteen', email: 'canteen@campus.edu', role: 'PROVIDER', status: 'ACTIVE', joined: '2 days ago' },
  { id: 'usr-2', name: 'Artisan Bakery', email: 'contact@artisanbakery.com', role: 'PROVIDER', status: 'ACTIVE', joined: '5 days ago' },
  { id: 'usr-3', name: 'Hope Street Community Shelter', email: 'director@hopeshelter.org', role: 'NGO', status: 'ACTIVE', joined: '1 week ago' },
  { id: 'usr-4', name: 'City Youth Food Relief', email: 'team@cityyouthfood.org', role: 'NGO', status: 'ACTIVE', joined: '2 weeks ago' },
];

const MOCK_ADMIN_LISTINGS = [
  { id: 'lst-1', title: 'Mixed Veg Fried Rice & Dal', provider: 'City Central Canteen', quantity: '30 portions', status: 'AVAILABLE', flagged: false },
  { id: 'lst-2', title: 'Assorted Fresh Multigrain Bread', provider: 'Artisan Bakery', quantity: '15 loaves', status: 'REQUESTED', flagged: false },
  { id: 'lst-3', title: 'Unlabeled Casserole Dish (Suspect Expiry)', provider: 'Unknown Catering', quantity: '10 portions', status: 'FLAGGED', flagged: true },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'listings'
  const [listings, setListings] = useState(MOCK_ADMIN_LISTINGS);

  const handleRemoveListing = (id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div>
      {/* Admin Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Platform Administration</h1>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: '#fee2e2', color: '#991b1b' }}>
              Admin Access Only
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>
            System-wide oversight, user verification, and content moderation
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: '600', backgroundColor: activeTab === 'overview' ? 'var(--primary)' : 'transparent', color: activeTab === 'overview' ? 'white' : 'var(--text-main)' }}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            style={{ padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: '600', backgroundColor: activeTab === 'users' ? 'var(--primary)' : 'transparent', color: activeTab === 'users' ? 'white' : 'var(--text-main)' }}
          >
            Users ({MOCK_USERS.length})
          </button>
          <button 
            onClick={() => setActiveTab('listings')}
            style={{ padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: '600', backgroundColor: activeTab === 'listings' ? 'var(--primary)' : 'transparent', color: activeTab === 'listings' ? 'white' : 'var(--text-main)' }}
          >
            Moderation ({listings.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Platform Overview Stats */}
      {activeTab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Registered Users</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem', color: 'var(--text-main)' }}>4</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', marginTop: '0.25rem' }}>2 Providers • 2 NGOs</div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Food Listings</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem', color: 'var(--primary-dark)' }}>
                {listings.filter((l) => l.status === 'AVAILABLE').length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Ready for pickup</div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pending Requests</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem', color: 'var(--secondary)' }}>2</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Awaiting provider approval</div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Completed Donations</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem', color: 'var(--primary-dark)' }}>42</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Food successfully saved</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>🛡️ Administrative Role Responsibilities</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Admins maintain the integrity of FoodRescue. In Phase 7 (Role-Based Authorization), admin endpoints 
              (<code>GET /api/admin/users</code>, <code>DELETE /api/admin/listings/{'{id}'}</code>) will require a verified <code>ADMIN</code> JWT token, 
              preventing unauthorized providers or NGOs from tampering with platform data.
            </p>
          </div>
        </>
      )}

      {/* Tab 2: User Management */}
      {activeTab === 'users' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Organization</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Email</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Role</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Joined</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>{user.name}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{user.email}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '700', 
                      padding: '0.2rem 0.55rem', 
                      borderRadius: '9999px',
                      backgroundColor: user.role === 'PROVIDER' ? 'var(--primary-light)' : '#e0e7ff',
                      color: user.role === 'PROVIDER' ? 'var(--primary-dark)' : '#3730a3'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{user.joined}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ color: 'var(--primary-dark)', fontWeight: '600', fontSize: '0.85rem' }}>● Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Content Moderation */}
      {activeTab === 'listings' && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {listings.map((l) => (
            <div 
              key={l.id}
              style={{ background: 'var(--bg-card)', border: l.flagged ? '1px solid #fca5a5' : '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{l.title}</h3>
                  {l.flagged && (
                    <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '9999px' }}>
                      ⚠️ Reported / Flagged
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Provider: <strong>{l.provider}</strong> • Quantity: {l.quantity} • Status: {l.status}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleRemoveListing(l.id)}
                  style={{ backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.85rem' }}
                >
                  Remove Inappropriate Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
