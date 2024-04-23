const express = require('express');
const router = express.Router();
const driverServicePaymentController = require('../controllers/driverServicePayment');

router.post('/driver-service-payments', driverServicePaymentController.createDriverServicePayment);
router.get('/driver-service-payments', driverServicePaymentController.getAllDriverServicePayments);
router.get('/driver-service-payments/:id', driverServicePaymentController.getDriverServicePaymentById);
router.put('/driver-service-payments/:id', driverServicePaymentController.updateDriverServicePaymentById);
router.delete('/driver-service-payments/:id', driverServicePaymentController.deleteDriverServicePaymentById);

module.exports = router;
