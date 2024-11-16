import jwt from 'jsonwebtoken'; // Import JSON Web Token module

const authMiddleware = (role = null) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (role && decoded.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware; // Default export
