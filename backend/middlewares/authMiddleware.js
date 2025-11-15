const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies?.token; // requires cookie-parser

  if (!token) {
    return res.status(401).json({ message: 'Token missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id, role, email
    next();
  } catch (error) {
    console.error('Token error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
