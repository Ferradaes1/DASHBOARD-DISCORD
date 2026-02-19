const mysql = require('mysql2/promise');

function getSession(req) {
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/ds_session=([^;]+)/);
  if (!match) return null;
  try {
    const session = JSON.parse(Buffer.from(match[1], 'base64').toString());
    if (session.expires < Date.now()) return null;
    return session;
  } catch { return null; }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const session = getSession(req);
  if (!session) return res.status(401).json({ success: false, error: 'Não autenticado' });
  if (!session.isAdmin) return res.status(403).json({ success: false, error: 'Sem permissão' });

  if (req.method !== 'PUT') return res.status(405).end();

  const { discord_id, message_count } = req.body;
  if (!discord_id || message_count === undefined) {
    return res.status(400).json({ success: false, error: 'Dados inválidos' });
  }

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: true },
    });

    await connection.execute(
      'UPDATE staff_members SET message_count = ?, updated_at = NOW() WHERE discord_id = ?',
      [message_count, discord_id]
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.end();
  }
};
