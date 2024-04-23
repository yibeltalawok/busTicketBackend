// routes/accidentRoutes.js
const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accidentController');

router.post('/accidents', accidentController.createAccident);
router.get('/accidents', accidentController.getAllAccidents);
router.get('/accidents/:id', accidentController.getAccidentById);
router.put('/accidents/:id', accidentController.updateAccident);
router.delete('/accidents/:id', accidentController.deleteAccident);

module.exports = router;
