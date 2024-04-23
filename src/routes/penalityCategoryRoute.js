// routes/penaltyCategoryRoutes.js
const express = require('express');
const router = express.Router();
const penaltyCategoryController = require('../controllers/penalityCategoryController');

router.get('/penalty-category', penaltyCategoryController.getAllPenaltyCategories);
router.post('/penalty-category', penaltyCategoryController.createPenaltyCategory);
router.get('/penalty-category/:id', penaltyCategoryController.getPenaltyCategory);
router.put('/penalty-category/:id', penaltyCategoryController.updatePenaltyCategory);
router.delete('/penalty-category/:id', penaltyCategoryController.deletePenaltyCategory);

module.exports = router;
