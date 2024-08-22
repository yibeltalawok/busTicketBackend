const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User  = require('../models/usersModel');
const { authenticateToken } = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();
router.post('/login', async (req, res) => {
  console.log(req)
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Compare hashed password with the provided password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Sign a JWT token with user id, email, and role
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, "eplusapp", { expiresIn: '20s' });
    // Return the user role, id, email, and token
    res.json({ role: user.role, id: user.id, email: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Example protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});
module.exports = router;
