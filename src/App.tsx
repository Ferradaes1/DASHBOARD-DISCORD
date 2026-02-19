import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StaffPage from './pages/StaffPage';
import ActivityPage from './pages/ActivityPage';
import MilestonesPage from './pages/MilestonesPage';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
