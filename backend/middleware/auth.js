const jwt = require('jsonwebtoken');
const { config } = require('../config/environment');

module.exports = function (req, res, next) {
  // Get token from cookie or header (for backward compatibility)
  const tokenFromCookie = req.cookies?.auth_token;
  const tokenFromHeader = req.header('x-auth-token');
  
  const token = tokenFromCookie || tokenFromHeader;

  // Debug logging for production
  if (process.env.NODE_ENV === 'production') {
    console.log('🔍 Auth Debug:', {
      hasCookies: !!req.cookies,
      cookieNames: req.cookies ? Object.keys(req.cookies) : [],
      hasAuthToken: !!tokenFromCookie,
      hasHeaderToken: !!tokenFromHeader,
      userAgent: req.get('User-Agent'),
      origin: req.get('Origin'),
      referer: req.get('Referer')
    });
  }

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
    console.log('🔍 Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
