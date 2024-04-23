const express = require('express');
const { body, query, param } = require('express-validator');
const router = express.Router();

const {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRouteById,
  deleteRouteById,
  getRoutesByParams,
} = require('../controllers/bookingController');

// Validation middleware for createRoute
const createRouteValidation = [
  body('sourceStationId').isInt(),
  body('destinationStationId').isInt(),
  body('distance').optional().isString(),
  body('date').optional().isString(),
  body('cost').isString(),
  body('estimatedTime').optional().isString(),
  body('servicePayment').optional().isString(),
];

// Validation middleware for updateRouteById
const updateRouteValidation = [
  param('id').isInt(),
  body('sourceStationId').isInt(),
  body('destinationStationId').isInt(),
  body('distance').optional().isString(),
  body('date').optional().isString(),
  body('cost').isString(),
  body('estimatedTime').optional().isString(),
  body('servicePayment').optional().isString(),
];

// Validation middleware for getRoutesByParams
const getRoutesByParamsValidation = [
  query('sourceStationId').optional().isInt(),
  query('destinationStationId').optional().isInt(),
  query('date').optional().isString(),
  body('servicePayment').optional().isString(),
];

// Routes
router.post('/routes', createRouteValidation, createRoute);
router.get('/routes', getAllRoutes);
router.get('/routes/:id', param('id').isInt(), getRouteById);
router.put('/routes/:id', updateRouteValidation, updateRouteById);
router.delete('/routes/:id', param('id').isInt(), deleteRouteById);

// Custom endpoint to retrieve routes based on destinationStationId, sourceStationId, and date
router.get('/filter-route', getRoutesByParamsValidation, getRoutesByParams);

module.exports = router;
