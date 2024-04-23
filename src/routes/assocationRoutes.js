// routes/associationRoutes.js
const express = require('express');
const associationController = require('../controllers/assocationController');

const router = express.Router();

// Routes
router.post('/associations', associationController.createAssociation);
router.get('/associations', associationController.getAllAssociations);
router.get('/associations/:id', associationController.getAssociationById);
router.put('/associations/:id', associationController.updateAssociation);
router.delete('/associations/:id', associationController.deleteAssociation);

module.exports = router;
