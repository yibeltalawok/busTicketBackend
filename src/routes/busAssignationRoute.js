// routes/busAssignationRoutes.js
const express = require('express');
const router = express.Router();
const busAssignationController = require('../controllers/busAssignationController');

// Routes for bus assignations
router.post('/assignations', busAssignationController.createBusAssignation);
router.get('/assignations', busAssignationController.getAllBusAssignations);
router.get('/assignations/:id', busAssignationController.getBusAssignationById);
router.put('/assignations/:id', busAssignationController.updateBusAssignationById);
router.delete('/assignations/:id', busAssignationController.deleteBusAssignationById);

module.exports = router;