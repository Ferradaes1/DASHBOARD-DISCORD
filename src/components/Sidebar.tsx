import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Trophy } from 'lucide-react';

const nav = [
  { to: '/',           icon: LayoutDashboard, label: 'Dashboard'   },
  { to: '/staff',      icon: Users,           label: 'Staff'        },
  { to: '/activity',   icon: Activity,        label: 'Atividade'    },
  { to: '/milestones', icon: Trophy,          label: 'Marcos'       },
];

const S = {
  aside: {
    width: 210,
    minWidth: 210,
    background: '#13151f',
    borderRight: '1px solid #1e2030',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
  },
  logo: {
    padding: '20px 16px 16px',
    borderBottom: '1px solid #1e2030',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36, height: 36,
    background: '#5865F2',
    borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: {
    fontWeight: 700,
    fontSize: 14,
    color: '#e3e5e8',
    lineHeight: 1.2,
  },
  logoSub: {
    fontSize: 10,
    color: '#5865F2',
    fontFamily: 'JetBrains Mono, monospace',
    letterSpacing: 1,
  },
  nav: { padding: '12px 8px', flex: 1 },
  footer: {
    padding: '12px 16px',
    borderTop: '1px solid #1e2030',
    fontSize: 10,
    color: '#3d4157',
    fontFamily: 'JetBrains Mono, monospace',
  },
};

export default function Sidebar() {
  return (
    <aside style={S.aside}>
      <div style={S.logo}>
        <div style={S.logoIcon}>
          <svg viewBox="0 0 127.14 96.36" fill="white" width="18" height="18">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
          </svg>
        </div>
        <div>
          <div style={S.logoText}>Staff Dashboard</div>
          <div style={S.logoSub}>DISCORD</div>
        </div>
      </div>

      <nav style={S.nav}>
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 8,
              marginBottom: 2,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.15s',
              background: isActive ? '#5865F220' : 'transparent',
              color: isActive ? '#5865F2' : '#6b7280',
              borderLeft: isActive ? '2px solid #5865F2' : '2px solid transparent',
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={S.footer}>v1.0 · TiDB Cloud</div>
    </aside>
  );
}
