// api/auth.js
export default function handler(req, res) {
  // Vercel automatically populates process.env with your variables
  const { user, pass } = req.body;

  if (user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ authenticated: true });
  } else {
    return res.status(401).json({ authenticated: false });
  }
}