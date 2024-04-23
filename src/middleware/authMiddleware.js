const jwt = require('jsonwebtoken');
const { User } = require('../models/usersModel'); // Import your User model
require('dotenv').config();

// Use the environment variable directly


function authenticateToken(req, res, next) {
  const token = req.headers['authorization'].split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }
  console.log('Received Token:', token);
  const decodedToken = jwt.decode(token);
console.log('Decoded Token without Verification:', decodedToken);

  jwt.verify(token, "eplusapp", (err, user) => {
     if (err) {
       if (err.name === 'TokenExpiredError') {
         return res.status(403).json({ error: 'Token expired' });
       } else if (err.name === 'JsonWebTokenError') {
         return res.status(403).json({ error: 'Invalid token' });
       } else {
         console.error('Error verifying token:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       }
     }

     req.user = user; // Attach user data to the request
     next();
   });
}

module.exports = { authenticateToken };