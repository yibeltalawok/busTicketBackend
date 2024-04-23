// routes/communicationRoutes.js
const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');

// CRUD routes

// Routes for Communication module
router.post('/messages', communicationController.sendMessage);
router.get('/messages', communicationController.getAllMessages);
router.get('/messages/:id', communicationController.getMessageById);
router.put('/messages/:id', communicationController.updateMessage); // Added route for updating messages
router.delete('/messages/:id', communicationController.deleteMessage);

module.exports = router;
