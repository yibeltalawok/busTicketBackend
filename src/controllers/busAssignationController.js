// controllers/busAssignationController.js
const BusAssignation = require('../models/busAssignationModel');
const Driver = require('../models/driverModel');
const Bus = require('../models/busModel');
const Station = require('../models/stationModel');
const Route = require('../models/terminalModel');

// CREATE a new bus assignation
exports.createBusAssignation = async (req, res) => {
  try {
    const newBusAssignation = await BusAssignation.create(req.body);
    res.status(201).json(newBusAssignation);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.errors });
    } else if (
      error.name === 'SequelizeForeignKeyConstraintError' &&
      error.parent &&
      error.parent.code === 'ER_NO_REFERENCED_ROW_2'
    ) {
      res.status(400).json({ error: 'Foreign key constraint error', details: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }
};

// READ all bus assignations
exports.getAllBusAssignations = async (req, res) => {
  try {
    const allBusAssignations = await BusAssignation.findAll({
      include: [
        { model: Route, as: 'route', include: [
          { model: Station, as: 'sourceStation' },
          { model: Station, as: 'destinationStation' }
        ] },
        { model: Bus, as: 'bus' },
      ],});
      console.log(res)
    res.status(200).json(allBusAssignations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// READ a specific bus assignation by ID
exports.getBusAssignationById = async (req, res) => {
  const busAssignationId = req.params.id;
   try {
     const busAssignation = await BusAssignation.findByPk(busAssignationId, {
      include: [
        { model: Route, as: 'route', include: [
          { model: Station, as: 'sourceStation' },
          { model: Station, as: 'destinationStation' }
        ] },
        { model: Bus, as: 'bus' },
      ],
    });
    if (busAssignation) {
      res.status(200).json(busAssignation);
    } else {
      res.status(404).json({ error: 'Bus assignation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
   }
 };

// UPDATE a bus assignation by ID
exports.updateBusAssignationById = async (req, res) => {
  const busAssignationId = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await BusAssignation.update(req.body, {
      where:{ id: busAssignationId },
      returning: true,
    });
    if (updatedRowsCount !== 0) {
      res.status(200).json(updatedRows[0]);
    } else {
      res.status(404).json({ error: 'Bus assignation not found' });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// DELETE a bus assignation by ID
exports.deleteBusAssignationById = async (req, res) => {
  const busAssignationId = req.params.id;

  try {
    const deletedRowCount = await BusAssignation.destroy({
      where: { id: busAssignationId },
    });
    if (deletedRowCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Bus assignation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
