// controllers/driverController.js
const multer = require('multer');
const fs = require('fs/promises');
const path = require('path');
const Driver = require('../models/driverModel');
const Bus=require('../models/busModel');
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

exports.createDriver = async (req, res, next) => {
  try {
    const { name, licenseNumber, contactNumber, email } = req.body;

    const baseDirectory = '/src/uploads/'; // Update this with your actual base directory path

    const photo = req.files && req.files['photo'] ? baseDirectory + req.files['photo'][0].filename : null;
    const licenseDocument = req.files && req.files['licenseDocument'] ? baseDirectory + req.files['licenseDocument'][0].filename : null;

    const newDriver = await Driver.create({
      name,
      licenseNumber,
      contactNumber,
      email,
      photo,
      licenseDocument,
    });

    res.status(201).json(newDriver);
  } catch (error) {
    console.error('Error creating Driver:', error);
    next(error);
  }
};
exports.getAllDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);
  } catch (error) {
    next(error);
  }
};

exports.getDriverById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByPk(id, );
    if (!driver) {
      res.status(404).json({ error: 'Driver not found.' });
    } else {
      res.json(driver);
    }
  } catch (error) {
    next(error);
  }
};
exports.updateDriver = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, licenseNumber, contactNumber, email } = req.body;

    const existingDriver = await Driver.findByPk(id);

    if (!existingDriver) {
      res.status(404).json({ error: 'Driver not found.' });
      return;
    }

    // Delete existing files before updating
    if (existingDriver.photo) {
      await fs.unlink(`./${existingDriver.photo}`);
    }
    if (existingDriver.licenseDocument) {
      await fs.unlink(`./${existingDriver.licenseDocument}`);
    }

    const updatedDriver = await existingDriver.update({
      name,
      licenseNumber,
      contactNumber,
      email,
      photo: req.files && req.files['photo'][0].filename,
      licenseDocument: req.files && req.files['licenseDocument'][0].filename,
    });

    res.json(updatedDriver);
  } catch (error) {
    next(error);
  }
};

exports.deleteDriver = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingDriver = await Driver.findByPk(id);

    if (!existingDriver) {
      res.status(404).json({ error: 'Driver not found.' });
      return;
    }

    // Delete associated files
    if (existingDriver.photo) {
      await fs.unlink(`./${existingDriver.photo}`);
    }
    if (existingDriver.licenseDocument) {
      await fs.unlink(`./${existingDriver.licenseDocument}`);
    }

    await existingDriver.destroy();

    res.json({ message: 'Driver deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
