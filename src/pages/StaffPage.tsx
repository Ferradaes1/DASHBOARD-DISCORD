import { useState } from 'react';
import { Search } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { Card, Loader, ErrorMsg, PageHeader, Badge } from '../components/UI';
import { StaffMember } from '../lib/schema';

const roleColor = (role: string | null) => {
  switch (role) {
    case 'Owner':     return '#FEE75C';
    case 'Admin':     return '#ED4245';
    case 'Moderador': return '#5865F2';
    case 'Helper':    return '#57F287';
    default:          return '#8e9297';
  }
};

export default function StaffPage() {
  const { data, loading, error } = useFetch<StaffMember[]>('/api/staff');
  const [search, setSearch] = useState('');

  const filtered = (data ?? []).filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.discord_id.includes(search) ||
    (m.current_role ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        title="Staff"
        sub={data ? `${data.length} membros cadastrados` : 'Carregando...'}
      />

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 340, marginBottom: 20 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4b5163' }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, ID ou cargo..."
          style={{
            width: '100%', padding: '9px 12px 9px 36px',
            background: '#13151f', border: '1px solid #1e2030',
            borderRadius: 8, color: '#c9cdd4', fontSize: 13, outline: 'none',
          }}
        />
      </div>

      {loading && <Loader />}
      {error   && <ErrorMsg msg={error} />}

      {!loading && !error && (
        <Card>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2030' }}>
                {['#', 'Nome', 'Discord ID', 'Cargo Atual', 'Mensagens', 'Entrou em', 'Última Atualização'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px',
                    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                    color: '#4b5163', textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m.id}
                  style={{ borderBottom: '1px solid #1e2030', transition: 'background 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#1e203050')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '12px 16px', color: '#3d4157', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>
                    {i + 1 <= 3
                      ? ['🥇', '🥈', '🥉'][i]
                      : `#${i + 1}`}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#e3e5e8' }}>{m.name}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#4b5163' }}>
                    {m.discord_id}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {m.current_role
                      ? <Badge label={m.current_role} color={roleColor(m.current_role)} />
                      : <span style={{ color: '#3d4157', fontSize: 12 }}>—</span>}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#57F287' }}>
                    {m.message_count.toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#4b5163' }}>
                    {new Date(m.added_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#4b5163' }}>
                    {new Date(m.updated_at).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#3d4157', fontSize: 13 }}>
                    Nenhum membro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
