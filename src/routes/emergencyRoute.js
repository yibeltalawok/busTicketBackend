// routes/emergencyContactRoutes.js
const express = require('express');
const router = express.Router();
const emergencyContactController = require('../controllers/emergencyController');
router.get('/emergencyContacts', emergencyContactController.getAllEmergencyContacts);
router.get('/emergencyContacts/:id', emergencyContactController.getEmergencyContactById);
router.post('/emergencyContacts', emergencyContactController.createEmergencyContact);
router.put('/emergencyContacts/:id', emergencyContactController.updateEmergencyContact);
router.delete('/emergencyContacts/:id', emergencyContactController.deleteEmergencyContact);

module.exports = router;
