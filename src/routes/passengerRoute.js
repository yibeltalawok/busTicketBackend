const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

// Routes for CRUD operations of passengers
router.get('/passengers', passengerController.getAllPassengers);
router.get('/passengers/:id', passengerController.getPassengerById);
router.post('/passengers', passengerController.createPassenger);
router.put('/passengers/:id', passengerController.updatePassenger);
router.delete('/passengers/:id', passengerController.deletePassenger);
// Route for passenger login
router.post('/passengers/login', passengerController.loginPassenger);

module.exports = router;
