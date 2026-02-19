import { useFetch } from '../hooks/useFetch';
import { StatCard, Card, Loader, ErrorMsg, PageHeader, Badge } from '../components/UI';
import { StaffMember, MilestoneLog } from '../lib/schema';

const roleColor = (role: string | null) => {
  switch (role) {
    case 'Owner':      return '#FEE75C';
    case 'Admin':      return '#ED4245';
    case 'Moderador':  return '#5865F2';
    case 'Helper':     return '#57F287';
    default:           return '#8e9297';
  }
};

function formatDate(d: string | Date) {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function Dashboard() {
  const staff = useFetch<StaffMember[]>('/api/staff');
  const logs  = useFetch<MilestoneLog[]>('/api/logs');

  const totalMsgs   = staff.data?.reduce((s, m) => s + m.message_count, 0) ?? 0;
  const topStaff    = staff.data?.[0];
  const recentLogs  = logs.data?.slice(0, 6) ?? [];

  return (
    <div style={{ padding: 28 }}>
      <PageHeader title="Visão Geral" sub="Estatísticas em tempo real do seu servidor" />

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard
          label="Membros da Staff"
          value={staff.loading ? '—' : (staff.data?.length ?? 0)}
          accent="#5865F2"
        />
        <StatCard
          label="Total de Mensagens"
          value={staff.loading ? '—' : totalMsgs}
          accent="#57F287"
        />
        <StatCard
          label="Marcos Alcançados"
          value={logs.loading ? '—' : (logs.data?.length ?? 0)}
          accent="#FEE75C"
        />
        <StatCard
          label="Top Staff"
          value={staff.loading ? '—' : (topStaff?.name ?? '—')}
          sub={topStaff ? `${topStaff.message_count.toLocaleString('pt-BR')} msgs` : undefined}
          accent="#EB459E"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Top Staff ranking */}
        <Card style={{ padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#4b5163', textTransform: 'uppercase', marginBottom: 16 }}>
            🏆 Ranking da Staff
          </p>
          {staff.loading && <Loader />}
          {staff.error  && <ErrorMsg msg={staff.error} />}
          {staff.data?.slice(0, 6).map((m, i) => (
            <div key={m.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0',
              borderBottom: i < 5 ? '1px solid #1e2030' : undefined,
            }}>
              <span className="mono" style={{ fontSize: 12, color: i < 3 ? '#FEE75C' : '#3d4157', width: 20, textAlign: 'center' }}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#e3e5e8' }}>{m.name}</p>
                {m.current_role && (
                  <Badge label={m.current_role} color={roleColor(m.current_role)} />
                )}
              </div>
              <span className="mono" style={{ fontSize: 13, color: '#57F287' }}>
                {m.message_count.toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
        </Card>

        {/* Recent milestone logs */}
        <Card style={{ padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#4b5163', textTransform: 'uppercase', marginBottom: 16 }}>
            🎯 Marcos Recentes
          </p>
          {logs.loading && <Loader />}
          {logs.error   && <ErrorMsg msg={logs.error} />}
          {recentLogs.map((log, i) => (
            <div key={log.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '10px 0',
              borderBottom: i < recentLogs.length - 1 ? '1px solid #1e2030' : undefined,
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#e3e5e8' }}>{log.username}</p>
                <p style={{ fontSize: 12, color: '#4b5163', marginTop: 2 }}>
                  Alcançou <span style={{ color: '#5865F2' }}>{log.message_count.toLocaleString('pt-BR')} msgs</span> → <span style={{ color: '#57F287' }}>{log.role_received}</span>
                </p>
              </div>
              <span style={{ fontSize: 11, color: '#3d4157', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap' }}>
                {formatDate(log.achieved_at)}
              </span>
            </div>
          ))}
          {!logs.loading && recentLogs.length === 0 && (
            <p style={{ color: '#3d4157', fontSize: 13, textAlign: 'center', padding: 20 }}>Nenhum marco ainda</p>
          )}
        </Card>
      </div>
    </div>
  );
}
