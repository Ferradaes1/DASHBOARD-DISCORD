import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StaffPage from './pages/StaffPage';
import ActivityPage from './pages/ActivityPage';
import MilestonesPage from './pages/MilestonesPage';
import LoginPage from './pages/LoginPage';

function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0b0d14' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0b0d14' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/"            element={<Dashboard />} />
          <Route path="/staff"       element={<StaffPage />} />
          <Route path="/activity"    element={<ActivityPage />} />
          <Route path="/milestones"  element={<MilestonesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*"     element={<ProtectedLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
