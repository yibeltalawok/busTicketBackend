const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const {
  createTicketOrder,
  getAllTicketOrders,
  getTicketOrderById,
  updateTicketOrderById,
  deleteTicketOrderById,
  getTicketOrdersByBus,
  getTicketOrdersByRoute,
  getTicketOrdersByDate,
  getTicketOrdersByPassenger,
  getFreeSeatNumbersByBus,
  checkSeatReservation
} = require('../controllers/ticketsController');

// Validation middleware for the createTicketOrder endpoint
const createTicketOrderValidation = [
  body('seatNumber').notEmpty().isString(),
  body('reservationDate').notEmpty().isISO8601(), // Added validation for reservationDate
  body('PassengerId').notEmpty().isNumeric(),
  body('BusId').notEmpty().isNumeric(),
  body('RouteId').notEmpty().isNumeric() // Added validation for RouteId
];

// Validation middleware for the updateTicketOrderById endpoint
const updateTicketOrderValidation = [
  param('id').notEmpty().isNumeric(),
  body('seatNumber').optional().isString(),
  body('reservationDate').optional().isISO8601(), // Added validation for reservationDate
  body('PassengerId').optional().isNumeric(),
  body('BusId').optional().isNumeric(),
  body('RouteId').optional().isNumeric()
];
// Routes
router.post('/ticket', createTicketOrderValidation, createTicketOrder);
router.get('/ticket', getAllTicketOrders);
router.get('/ticket/:id', param('id').isNumeric(), getTicketOrderById);
router.put('/ticket/:id', updateTicketOrderValidation, updateTicketOrderById);
router.delete('/ticket/:id', param('id').isNumeric(), deleteTicketOrderById);
router.get('/get-free-seat', getFreeSeatNumbersByBus); // Corrected the route path
router.post('/check-bus-seat-reservation', checkSeatReservation); // Changed to POST method and corrected the route path
router.get('/ticket/bus/:BusId', param('BusId').isNumeric(), getTicketOrdersByBus);
router.get('/ticket/route/:RouteId', param('RouteId').isNumeric(), getTicketOrdersByRoute);
router.get('/ticket/date/:date', param('date').isISO8601(), getTicketOrdersByDate); // Added validation for date
router.get('/ticket/passenger/:passengerId', param('passengerId').isNumeric(), getTicketOrdersByPassenger);

module.exports = router;
