const { Op } = require('sequelize');
const Bus = require('../models/busModel');
const BusOwner = require('../models/busOwnerModel');
const Association = require('../models/assocationModel');
const Driver = require('../models/driverModel');

// CREATE a new bus
exports.createBus = async (req, res) => {
  try {
    // const { driverId, ...busData } = req.body;

    // // Check if the driver exists for other buses
    // const existingBus = await Bus.findOne({ where: { driverId } });
    // if (existingBus) {
    //   return res.status(400).json({ error: 'Driver is already assigned to another bus.' });
    // }

    // // Check if the driver exists in the system
    // const driver = await Driver.findByPk(driverId);
    // if (!driver) {
    //   return res.status(404).json({ error: 'Driver not found.' });
    // }

    // Create the bus
    // const newBus = await Bus.create({ ...busData, driverId });
        // Check if the bus exists 
       const talga  =req.body.talga
       const existingBus = await Bus.findOne({ where: { talga } });
       if (existingBus) {
         return res.status(400).json({ error: 'Bus is already exist' });
        }
       const newBus = await Bus.create({ ...req.body });
       res.status(201).json(newBus);
    } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      res.status(500).json({ error: error });
    }
  }
};
exports.getAllBuses = async (req, res) => {
  try {
    const allBuses = await Bus.findAll({
      include: [
        // { model: BusOwner },
        { model: Association,as: 'association'},
        // { model: Driver, as: 'driver' } // Specify the alias 'driver'
      ],
    });
    res.status(200).json(allBuses);
  } catch (error) {
    console.error('Error retrieving all buses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBusById = async (req, res) => {
  const busId = req.params.id;

  try {
    const bus = await Bus.findByPk(busId, {
      include: [
        // { model: BusOwner },
        { model: Association,as: 'association'},
        // { model: Driver, as: 'driver' } // Specify the alias 'driver'
      ],
    });

    if (bus) {
      res.status(200).json(bus);
    } else {
      res.status(404).json({ error: 'Bus not found' });
    }
  } catch (error) {
    console.error('Error retrieving bus by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// UPDATE a bus by ID
exports.updateBusById = async (req, res) => {
  const busId = req.params.id;
  const updateData = req.body;

  try {
    // Check if the bus exists
    const existingBus = await Bus.findByPk(busId);

    if (!existingBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    // Perform the update
    const [updatedRowsCount, updatedRows] = await Bus.update(updateData, {
      where: { id: busId },
      returning: true,
    });

    if (updatedRowsCount !== 0) {
      // Return the updated bus
      res.status(200).json(updatedRows[0]);
    } else {
      // If no rows were updated, respond with 404
      res.status(404).json({ error: 'Bus not found' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error in updateBusById:', error);

    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// DELETE a bus by ID
exports.deleteBusById = async (req, res) => {
  const busId = req.params.id;
  try {
    const deletedRowCount = await Bus.destroy({
      where: { id: busId },
    });
    if (deletedRowCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
