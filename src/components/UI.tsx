import { ReactNode } from 'react';

export function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: '#13151f',
      border: '1px solid #1e2030',
      borderRadius: 12,
      ...style,
    }}>
      {children}
    </div>
  );
}

export function StatCard({
  label, value, sub, accent = '#5865F2',
}: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <Card style={{ padding: '20px 24px' }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: '#4b5163', textTransform: 'uppercase', marginBottom: 8 }}>
        {label}
      </p>
      <p style={{ fontSize: 32, fontWeight: 800, color: accent, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>
        {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
      </p>
      {sub && <p style={{ fontSize: 12, color: '#4b5163', marginTop: 6 }}>{sub}</p>}
    </Card>
  );
}

export function Loader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
      <div className="spinner" />
    </div>
  );
}

export function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div style={{
      margin: 24, padding: 16, borderRadius: 10,
      background: '#ED424520', border: '1px solid #ED424540',
      color: '#ED4245', fontSize: 14,
    }}>
      ⚠️ {msg}
    </div>
  );
}

export function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 28 }} className="fade-up">
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#e3e5e8' }}>{title}</h1>
      {sub && <p style={{ fontSize: 13, color: '#4b5163', marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

export function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 6,
      fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
      background: `${color}20`, color, border: `1px solid ${color}40`,
    }}>
      {label}
    </span>
  );
}
