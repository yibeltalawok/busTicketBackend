const express = require('express');
const router = express.Router();
const busOwnerController = require('../controllers/busOwnerController');
const { validationResult } = require('express-validator');

// Validate BusOwner data
validateBusOwner = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// Create a new BusOwner
router.post('/bus-owners', validateBusOwner, busOwnerController.createBusOwner);

// Get all BusOwners
router.get('/bus-owners', busOwnerController.getAllBusOwners);

// Get BusOwner by ID
router.get('/bus-owners/:id', busOwnerController.getBusOwnerById);

// Update BusOwner by ID
router.put('/bus-owners/:id', validateBusOwner, busOwnerController.updateBusOwner);

// Delete BusOwner by ID
router.delete('/bus-owners/:id', busOwnerController.deleteBusOwner);

module.exports = router;
