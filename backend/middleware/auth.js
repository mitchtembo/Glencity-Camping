const jwt = require('jsonwebtoken');
const { config } = require('../config/environment');

module.exports = function (req, res, next) {
  // Get token from cookie or header (for backward compatibility)
  const tokenFromCookie = req.cookies?.auth_token;
  const tokenFromHeader = req.header('x-auth-token');
  
  const token = tokenFromCookie || tokenFromHeader;

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
