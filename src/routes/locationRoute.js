// routes/userLocationRoutes.js
const express = require('express');
const router = express.Router();
const userLocationController = require('../controllers/locationController');

// Create a new user location
router.post('/location', userLocationController.createUserLocation);

// Get all user locations
router.get('/location', userLocationController.getAllUserLocations);

// Get a single user location by ID
router.get('/location/:phone', userLocationController.getUserLocationByPhone);

// Update a user location
router.put('/location/:id', userLocationController.updateUserLocation);

// Delete a user location
router.delete('/location/:id', userLocationController.deleteUserLocation);

module.exports = router;
