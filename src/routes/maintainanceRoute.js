const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintainnaceController');

// Routes for Maintenance records
router.post('/maintenance', maintenanceController.createMaintenance);
router.get('/maintenance', maintenanceController.getAllMaintenance);
router.get('/maintenance/:id', maintenanceController.getMaintenanceById);
router.put('/maintenance/:id', maintenanceController.updateMaintenance);
router.delete('/maintenance/:id', maintenanceController.deleteMaintenance);

module.exports = router;
