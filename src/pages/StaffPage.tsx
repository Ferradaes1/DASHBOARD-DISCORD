import { useState } from 'react';
import { Search, Pencil, Check, X } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../hooks/useAuth';
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
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  const filtered = (data ?? []).filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.discord_id.includes(search) ||
    (m.current_role ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (m: StaffMember) => {
    setEditing(m.discord_id);
    setEditValue(m.message_count);
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = async (discord_id: string) => {
    setSaving(true);
    try {
      await fetch('/api/staff-update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discord_id, message_count: editValue }),
      });
      setEditing(null);
      window.location.reload();
    } catch (e) {
      alert('Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        title="Staff"
        sub={data ? `${data.length} membros cadastrados` : 'Carregando...'}
      />

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
                {['#', 'Nome', 'Discord ID', 'Cargo Atual', 'Mensagens', 'Entrou em', user?.isAdmin ? 'Ações' : ''].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: '#4b5163', textTransform: 'uppercase' }}>{h}</th>
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
                    {i < 3 ? ['🥇','🥈','🥉'][i] : `#${i+1}`}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: 14, color: '#e3e5e8' }}>{m.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#4b5163' }}>{m.discord_id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {m.current_role ? <Badge label={m.current_role} color={roleColor(m.current_role)} /> : <span style={{ color: '#3d4157', fontSize: 12 }}>—</span>}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#57F287' }}>
                    {editing === m.discord_id ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={e => setEditValue(Number(e.target.value))}
                        style={{ width: 90, padding: '4px 8px', background: '#0b0d14', border: '1px solid #5865F2', borderRadius: 6, color: '#57F287', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}
                      />
                    ) : m.message_count.toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#4b5163' }}>
                    {new Date(m.added_at).toLocaleDateString('pt-BR')}
                  </td>
                  {user?.isAdmin && (
                    <td style={{ padding: '12px 16px' }}>
                      {editing === m.discord_id ? (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => saveEdit(m.discord_id)} disabled={saving} style={{ background: '#57F28720', border: '1px solid #57F28740', color: '#57F287', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}>
                            <Check size={13} />
                          </button>
                          <button onClick={cancelEdit} style={{ background: '#ED424520', border: '1px solid #ED424540', color: '#ED4245', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}>
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(m)} style={{ background: '#5865F220', border: '1px solid #5865F240', color: '#5865F2', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}>
                          <Pencil size={13} />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#3d4157', fontSize: 13 }}>Nenhum membro encontrado</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
