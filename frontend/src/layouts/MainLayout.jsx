import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * MainLayout
 * ==========
 * The primary layout shell for public and standard routes.
 * It renders the persistent Navbar at the top, the dynamic page content via <Outlet />,
 * and the persistent Footer at the bottom.
 */
export default function MainLayout() {
  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
