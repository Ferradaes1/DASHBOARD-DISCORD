const mysql = require('mysql2/promise');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 4000,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: true },
    });

    const [rows] = await connection.execute(
      'SELECT * FROM milestone_logs ORDER BY achieved_at DESC LIMIT 50'
    );

    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('DB Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.end();
  }
};
