// routes/servicePaymentRoutes.js
const express = require('express');
const router = express.Router();
const servicePaymentController = require('../controllers/servicePaymnetController');

router.get('/servicePayments', servicePaymentController.getAllServicePayments);
router.get('/servicePayments/:id', servicePaymentController.getServicePaymentById);
router.post('/servicePayments', servicePaymentController.createServicePayment);
router.put('/servicePayments/:id', servicePaymentController.updateServicePayment);
router.delete('/servicePayments/:id', servicePaymentController.deleteServicePayment);

module.exports = router;
