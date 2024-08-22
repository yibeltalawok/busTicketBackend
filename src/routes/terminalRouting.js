// routes/TerminalRoutes.js
const express = require('express');
const router = express.Router();
const TerminalController = require('../controllers/terminalController');

router.post('/terminals', TerminalController.createTerminal);
router.get('/terminals', TerminalController.getAllTerminals);
router.get('/terminals/:id', TerminalController.getTerminalById);
router.put('/terminals/:id', TerminalController.updateTerminal);
module.exports = router;
