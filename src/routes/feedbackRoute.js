// feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.get('/feedbacks', feedbackController.getAllFeedbacks);
router.get('/feedbacks/:id', feedbackController.getFeedbackById);
router.post('/feedbacks', feedbackController.createFeedback);
router.put('/feedbacks/:id', feedbackController.updateFeedback);
router.delete('/feedbacks/:id', feedbackController.deleteFeedback);

module.exports = router;
