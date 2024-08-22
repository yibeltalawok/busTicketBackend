
const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/resetPasswordController');

// CRUD routes for Station
router.post('/forgot-password', passwordController.forgotPassword);
router.get('/reset-password', passwordController.passwordReset);

module.exports = router;
