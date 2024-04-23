// dashboardRoute.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/statstics', dashboardController.getDashboardStats);

module.exports = router;
