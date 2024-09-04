// routes/busAssignationRoutes.js
const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const busAssignationController = require('../controllers/busAssignationController');
  // Validation middleware for getRoutesByParams
const getRoutesByParamsValidation = [
    query('sourceStationId').optional().isInt(),
    query('destinationStationId').optional().isInt(),
    query('date').optional().isString(),
    body('servicePayment').optional().isString(),
  ];
// Routes for bus assignations
router.post('/assignations', busAssignationController.createBusAssignation);
router.get('/assignations', busAssignationController.getAllBusAssignations);
router.get('/assignations/:id', busAssignationController.getBusAssignationById);
router.put('/assignations/:id', busAssignationController.updateBusAssignationById);
router.delete('/assignations/:id', busAssignationController.deleteBusAssignationById);
router.get('/filter-route', getRoutesByParamsValidation,busAssignationController.getRoutesByParams);
module.exports = router;