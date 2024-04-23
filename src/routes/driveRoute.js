// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');  // Add this line to import multer
const driverController = require('../controllers/driverController');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Assuming you want to upload files for creating and updating drivers
router.post('/drivers', upload.fields([{ name: 'photo' }, { name: 'licenseDocument' }]), driverController.createDriver);
router.get('/drivers', driverController.getAllDrivers);
router.get('/drivers/:id', driverController.getDriverById);
router.put('/drivers/:id', upload.fields([{ name: 'photo' }, { name: 'licenseDocument' }]), driverController.updateDriver);
router.delete('/drivers/:id', driverController.deleteDriver);

module.exports = router;
