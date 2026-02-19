import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Trophy, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const nav = [
  { to: '/',           icon: LayoutDashboard, label: 'Dashboard'  },
  { to: '/staff',      icon: Users,           label: 'Staff'       },
  { to: '/activity',   icon: Activity,        label: 'Atividade'   },
  { to: '/milestones', icon: Trophy,          label: 'Marcos'      },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside style={{
      width: 210, minWidth: 210,
      background: '#13151f', borderRight: '1px solid #1e2030',
      display: 'flex', flexDirection: 'column', height: '100vh',
    }}>
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #1e2030', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, background: '#5865F2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 127.14 96.36" fill="white" width="18" height="18">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#e3e5e8' }}>Staff Dashboard</div>
          <div style={{ fontSize: 10, color: '#5865F2', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1 }}>DISCORD</div>
        </div>
      </div>

      <nav style={{ padding: '12px 8px', flex: 1 }}>
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, marginBottom: 2,
              textDecoration: 'none', fontSize: 14, fontWeight: 500,
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

      {user && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #1e2030' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <img
              src={user.avatar
                ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png?size=32'
                : 'https://cdn.discordapp.com/embed/avatars/0.png'}
              alt={user.username}
              style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#e3e5e8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.username}
              </p>
              {user.isAdmin && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#FEE75C', fontWeight: 700 }}>
                  <Shield size={10} /> ADMIN
                </span>
              )}
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              width: '100%', padding: '7px 10px', borderRadius: 8,
              background: 'transparent', border: '1px solid #1e2030',
              color: '#6b7280', cursor: 'pointer', fontSize: 13,
              fontFamily: 'Outfit, sans-serif', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ED424520'; e.currentTarget.style.color = '#ED4245'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280'; }}
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      )}
    </aside>
  );
}
