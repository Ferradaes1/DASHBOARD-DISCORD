import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#0b0d14', flexDirection: 'column', gap: 24,
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div style={{
          width: 64, height: 64, background: '#5865F2', borderRadius: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
        }}>
          <svg viewBox="0 0 127.14 96.36" fill="white" width="36" height="36">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
          </svg>
        </div>
        <h1 style={{ color: '#e3e5e8', fontSize: 24, fontWeight: 800, margin: 0 }}>Staff Dashboard</h1>
        <p style={{ color: '#4b5163', fontSize: 14, marginTop: 8 }}>Faça login com sua conta do Discord</p>
      </div>

      {/* Card */}
      <div style={{
        background: '#13151f', border: '1px solid #1e2030',
        borderRadius: 16, padding: '32px 40px', textAlign: 'center', minWidth: 320,
      }}>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 24 }}>
          Apenas membros autorizados têm acesso ao dashboard.
        </p>
        <button
          onClick={login}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', padding: '12px 24px',
            background: '#5865F2', color: 'white',
            border: 'none', borderRadius: 10, cursor: 'pointer',
            fontSize: 15, fontWeight: 700, fontFamily: 'Outfit, sans-serif',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#4752c4')}
          onMouseLeave={e => (e.currentTarget.style.background = '#5865F2')}
        >
          <svg viewBox="0 0 127.14 96.36" fill="white" width="18" height="18">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
          </svg>
          Entrar com Discord
        </button>
      </div>

      <p style={{ color: '#2a2d3e', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>
        Staff Dashboard v1.0
      </p>
    </div>
  );
}
