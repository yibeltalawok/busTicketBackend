const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

// CRUD routes for Station
router.post('/stations', stationController.createStation);
router.get('/stations', stationController.getAllStations);
router.get('/stations/:id', stationController.getStationById);
router.put('/stations/:id', stationController.updateStation);
router.delete('/stations/:id', stationController.deleteStation);

module.exports = router;
