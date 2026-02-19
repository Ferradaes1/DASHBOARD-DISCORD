module.exports = async function handler(req, res) {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const REDIRECT_URI = 'https://dashboard-discord-seven.vercel.app/api/auth/discord/callback';

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify guilds.members.read',
  });

  res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
};


