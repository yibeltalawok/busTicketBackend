// routes/punishmentRoutes.js
const express = require('express');
const router = express.Router();
const punishmentController = require('../controllers/punishmentController');

router.get('/punishments', punishmentController.getAllPunishments);
router.get('/punishments/:id', punishmentController.getPunishmentById);
router.post('/punishments', punishmentController.createPunishment);
router.put('/punishments/:id', punishmentController.updatePunishment);
router.delete('/punishments/:id', punishmentController.deletePunishment);

module.exports = router;
