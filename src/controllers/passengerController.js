// controllers/passengerController.js
const Passenger = require('../models/passengerModel');
const Ticket=require('../models/ticketsModel')
const multer = require('multer');
const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/passangerphoto/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

exports.getAllPassengers = async (req, res, next) => {
  try {
    const passengers = await Passenger.findAll();
    res.json(passengers);
  } catch (error) {
    next(error);
  }
};


exports.getPassengerById = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Fetch data from the Passenger table
    const passenger = await Passenger.findByPk(id);

    if (!passenger) {
      res.status(404).json({ error: 'Passenger not found.' });
      return;
    }

    // Fetch corresponding data from the Tickets table based on passangerId
    const tickets = await Ticket.findAll({
      where: { passengerId : id }, // Adjust the field name accordingly
    });

    // Combine passenger and ticket data
    const passengerWithData = {
      passenger,
      tickets,
    };

    res.json(passengerWithData);
  } catch (error) {
    next(error);
  }
};
exports.createPassenger = async (req, res, next) => {
  const { name, phoneNumber, age, gender, password } = req.body;
  try {
    // Check if all required fields are present
    if (!name || !phoneNumber || !age || !gender || !password) {
      return res.status(400).json({ error: 'Missing required fields', name, phoneNumber, age, gender, password });
    }

    const baseDirectory = '/src/uploads/passangerphoto/'; // Update this with your actual base directory path
    const photo = req.files && req.files['photo'] ? baseDirectory + req.files['photo'][0].filename : null;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPassenger = await Passenger.create({ name, phoneNumber, age, gender, password: hashedPassword, photo });
    res.status(201).json(newPassenger);
  } catch (error) {
    next(error);
  }
};

exports.updatePassenger = async (req, res, next) => {
  const { id } = req.params;
  const { name, phoneNumber, age, gender, password } = req.body;
  try {
    const baseDirectory = '/src/uploads/passangerphoto/'; // Update this with your actual base directory path
    const photo = req.files && req.files['photo'] ? baseDirectory + req.files['photo'][0].filename : null;
    const passenger = await Passenger.findByPk(id);
    if (!passenger) {
      res.status(404).json({ error: 'Passenger not found.' });
    } else {
      // Only include properties that you want to update
      await passenger.update({ name, phoneNumber, age, gender, password,photo });
      res.json(passenger);
    }
  } catch (error) {
    next(error);
  }
};


exports.deletePassenger = async (req, res, next) => {
  const { id } = req.params;
  try {
    const passenger = await Passenger.findByPk(id);
    if (!passenger) {
      res.status(404).json({ error: 'Passenger not found.' });
    } else {
      await passenger.destroy();
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.loginPassenger = async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  try {
    // Find the passenger by their phoneNumber
    const passenger = await Passenger.findOne({ where: { phoneNumber } });

    // If passenger not found, return error
    if (!passenger) {
      return res.status(404).json({ error: 'Passenger not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, passenger.password);

    // If passwords match, login successful, otherwise return error
    if (passwordMatch) {
      // You can customize the response as per your requirements
      res.status(200).json({ message: 'Login successful', passenger });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};
