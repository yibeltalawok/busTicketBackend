// routes/lostAndFoundRoute.js
const express = require('express');
const router = express.Router();
const lostAndFoundController = require('../controllers/lostController');

// Routes for Lost and Found Material module
router.post('/materials', lostAndFoundController.createMaterial);
router.get('/materials', lostAndFoundController.getAllMaterials);
router.get('/materials/:id', lostAndFoundController.getMaterialById);
router.put('/materials/:id', lostAndFoundController.updateMaterial);
router.delete('/materials/:id', lostAndFoundController.deleteMaterial);

module.exports = router;
