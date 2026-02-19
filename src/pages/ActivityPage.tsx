import { useFetch } from '../hooks/useFetch';
import { Card, Loader, ErrorMsg, PageHeader } from '../components/UI';
import { MilestoneLog } from '../lib/schema';

export default function ActivityPage() {
  const { data, loading, error } = useFetch<MilestoneLog[]>('/api/logs');

  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        title="Log de Atividade"
        sub="Histórico de marcos alcançados pela staff"
      />

      {loading && <Loader />}
      {error   && <ErrorMsg msg={error} />}

      {!loading && !error && (
        <Card>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2030' }}>
                {['Data', 'Usuário', 'Discord ID', 'Mensagens', 'Cargo Recebido'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px',
                    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                    color: '#4b5163', textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((log, i) => (
                <tr
                  key={log.id}
                  style={{ borderBottom: '1px solid #1e2030', transition: 'background 0.15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#1e203050')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '11px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#4b5163', whiteSpace: 'nowrap' }}>
                    {new Date(log.achieved_at).toLocaleString('pt-BR', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                  <td style={{ padding: '11px 16px', fontWeight: 600, color: '#e3e5e8', fontSize: 14 }}>
                    {log.username}
                  </td>
                  <td style={{ padding: '11px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#3d4157' }}>
                    {log.discord_id}
                  </td>
                  <td style={{ padding: '11px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#57F287' }}>
                    {log.message_count.toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{
                      background: '#5865F220', color: '#5865F2',
                      border: '1px solid #5865F240',
                      borderRadius: 6, padding: '2px 10px',
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {log.role_received}
                    </span>
                  </td>
                </tr>
              ))}
              {(data ?? []).length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#3d4157', fontSize: 13 }}>
                    Nenhum log encontrado
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
