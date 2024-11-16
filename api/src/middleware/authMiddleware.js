import jwt from 'jsonwebtoken';

const authMiddleware = (role) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (role && decoded.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    req.user = decoded; // Attach decoded token data (e.g., user ID) to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export default authMiddleware;
