module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const cookie = req.headers.cookie || '';
  const match = cookie.match(/ds_session=([^;]+)/);

  if (!match) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const session = JSON.parse(Buffer.from(match[1], 'base64').toString());

    if (session.expires < Date.now()) {
      return res.status(401).json({ authenticated: false, error: 'Session expired' });
    }

    return res.status(200).json({ authenticated: true, user: session });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
};
