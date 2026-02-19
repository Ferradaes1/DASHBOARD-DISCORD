import { useFetch } from '../hooks/useFetch';
import { Card, Loader, ErrorMsg, PageHeader } from '../components/UI';
import { Milestone } from '../lib/schema';

export default function MilestonesPage() {
  const { data, loading, error } = useFetch<Milestone[]>('/api/milestones');

  return (
    <div style={{ padding: 28 }}>
      <PageHeader
        title="Marcos de Mensagens"
        sub="Cargos concedidos automaticamente por quantidade de mensagens"
      />

      {loading && <Loader />}
      {error   && <ErrorMsg msg={error} />}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {(data ?? []).map((m, i) => (
            <Card key={m.id} style={{ padding: '20px 24px' }} >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 22 }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🏅'}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  color: '#5865F2', fontFamily: 'JetBrains Mono, monospace',
                }}>
                  NÍVEL {i + 1}
                </span>
              </div>

              <p style={{ fontSize: 26, fontWeight: 800, color: '#57F287', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>
                {m.message_threshold.toLocaleString('pt-BR')}
              </p>
              <p style={{ fontSize: 11, color: '#4b5163', marginBottom: 12 }}>mensagens necessárias</p>

              <div style={{
                background: '#5865F215', border: '1px solid #5865F230',
                borderRadius: 8, padding: '8px 12px',
              }}>
                <p style={{ fontSize: 11, color: '#4b5163', marginBottom: 2 }}>Cargo concedido</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#e3e5e8' }}>{m.role_name}</p>
                <p style={{ fontSize: 10, color: '#3d4157', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>
                  ID: {m.role_id}
                </p>
              </div>
            </Card>
          ))}

          {(data ?? []).length === 0 && (
            <p style={{ color: '#3d4157', fontSize: 13, gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>
              Nenhum marco configurado
            </p>
          )}
        </div>
      )}
    </div>
  );
}
