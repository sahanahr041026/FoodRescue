import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Provider Pages
import ProviderDashboard from './pages/provider/ProviderDashboard';
import CreateListingPage from './pages/provider/CreateListingPage';
import MyListingsPage from './pages/provider/MyListingsPage';
import ProviderRequestsPage from './pages/provider/ProviderRequestsPage';

// NGO Pages
import NgoDashboard from './pages/ngo/NgoDashboard';
import BrowseFoodPage from './pages/ngo/BrowseFoodPage';
import FoodDetailsPage from './pages/ngo/FoodDetailsPage';
import MyRequestsPage from './pages/ngo/MyRequestsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

import './App.css';

/**
 * App Component (Central Routing Hub)
 * ===================================
 * Configures client-side routing using react-router-dom.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Provider Routes */}
          <Route path="provider/dashboard" element={<ProviderDashboard />} />
          <Route path="provider/create-listing" element={<CreateListingPage />} />
          <Route path="provider/my-listings" element={<MyListingsPage />} />
          <Route path="provider/requests" element={<ProviderRequestsPage />} />

          {/* NGO / Receiver Routes */}
          <Route path="ngo/dashboard" element={<NgoDashboard />} />
          <Route path="ngo/browse" element={<BrowseFoodPage />} />
          <Route path="ngo/food/:id" element={<FoodDetailsPage />} />
          <Route path="ngo/my-requests" element={<MyRequestsPage />} />

          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
