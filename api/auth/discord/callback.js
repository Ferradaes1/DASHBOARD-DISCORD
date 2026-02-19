module.exports = async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.redirect('/?error=no_code');
  }

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
  const GUILD_ID = process.env.DISCORD_GUILD_ID;
  const ADMIN_ROLE_ID = process.env.DISCORD_ADMIN_ROLE_ID;

  try {
    // Troca code por access_token
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return res.redirect('/?error=token_failed');
    }

    // Busca dados do usuário
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const user = await userRes.json();

    // Busca membro do servidor para checar cargos
    const memberRes = await fetch(`https://discord.com/api/users/@me/guilds/${GUILD_ID}/member`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const member = await memberRes.json();

    const isAdmin = member?.roles?.includes(ADMIN_ROLE_ID) || false;

    // Monta dados da sessão em base64 (simples, sem biblioteca de sessão)
    const sessionData = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      isAdmin,
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24h
    };

    const sessionB64 = Buffer.from(JSON.stringify(sessionData)).toString('base64');

    // Seta cookie de sessão
    res.setHeader('Set-Cookie', `ds_session=${sessionB64}; Path=/; HttpOnly; Max-Age=86400; SameSite=Lax`);
    res.redirect('/');
  } catch (err) {
    console.error('Auth error:', err);
    res.redirect('/?error=auth_failed');
  }
};
