const express = require('express');
const router = express.Router();
const driverBookingController = require('../controllers/driverBookingController');

// Create a new driver booking
router.post('/driverBooking', driverBookingController.createDriverBooking);

// Get all driver driverBooking
router.get('/driverBooking', driverBookingController.getAllDriverBookings);

// Get driver booking by ID
router.get('/driverBooking/:id', driverBookingController.getDriverBookingById);

// Update driver booking by ID
router.put('/driverBooking/:id', driverBookingController.updateDriverBookingById);

// Delete driver booking by ID
router.delete('/driverBooking/:id', driverBookingController.deleteDriverBookingById);

module.exports = router;
