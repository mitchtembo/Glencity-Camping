const jwt = require('jsonwebtoken');
// We'll need a JWT secret, typically stored in environment variables
// For now, I'll use a placeholder.
// TODO: Move JWT_SECRET to an environment variable file (.env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with a strong secret

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
