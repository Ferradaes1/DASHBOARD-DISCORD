module.exports = async function handler(req, res) {
  res.setHeader('Set-Cookie', 'ds_session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax');
  res.redirect('/login');
};
