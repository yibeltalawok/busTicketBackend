// routes/TerminalRoutes.js
const express = require('express');
const router = express.Router();
const TariffController = require('../controllers/tariffController');

router.post('/tariff-scales', TariffController.createTariffScale);
router.get('/tariff-scales', TariffController.getAllTarrifScale);
router.get('/tariff-scales/:id', TariffController.getTariffById);
router.put('/tariff-scales/:id', TariffController.updateTariffScale);
module.exports = router;
