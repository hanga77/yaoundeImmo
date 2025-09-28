import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from the token (and remove password)
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Non autorisé, utilisateur non trouvé' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Non autorisé, le jeton a échoué' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Non autorisé, pas de jeton' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès refusé. Rôle Administrateur requis.' });
  }
};

export { protect, admin };