// routes/busRoutes.js
const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

// Create a new bus
router.post('/buses', busController.createBus);

// Get all buses
router.get('/buses', busController.getAllBuses);

// Get a specific bus by ID
router.get('/buses/:id', busController.getBusById);

// Update a bus by ID
router.put('/buses/:id', busController.updateBusById);

// Delete a bus by ID
router.delete('/buses/:id', busController.deleteBusById);

module.exports = router;
