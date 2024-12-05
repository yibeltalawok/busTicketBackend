// controllers/busAssignationController.js
const BusAssignation = require('../models/busAssignationModel');
const Bus = require('../models/busModel');
const Station = require('../models/stationModel');
const Route = require('../models/terminalModel');
const { validationResult } = require('express-validator');

// CREATE a new bus assignation
exports.createBusAssignation = async (req, res) => {
  try {
            // Check if the bus exists 
            const busId  =req.body.busId
            const existingBus = await BusAssignation.findOne({ where: { busId } });
            if (existingBus) {
              return res.status(400).json({ error: 'Bus is already Assigned' });
             }
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
      where: {id: busAssignationId },
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
// Custom endpoint to retrieve routes based on destinationStationId, sourceStationId, and date
exports.getRoutesByParams = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { destinationStationId, sourceStationId, date } = req.query;
    // Validate if destinationStationId, sourceStationId, and date are present
    if (!destinationStationId || !sourceStationId || !date) {
      return res.status(400).json({ error: 'destinationStationId, sourceStationId, and date are required parameters' });
    }

    const routes = await BusAssignation.findAll({
      where: {
        destinationStationId,
        sourceStationId,
        date
      },
      include: [
        { model: Route, as: 'route', include: [
          { model: Station, as: 'sourceStation' },
          { model: Station, as: 'destinationStation' }
           ] },
        { model: Bus, as: 'bus' },
      ],
    });
    const formattedRoutes = routes.map((route) => {
      if (!route.sourceStation) {
        route.sourceStation = null;
      }
      if (!route.destinationStation) {
        route.destinationStation = null;
      }
      if (!route.assignedBus) {
        route.assignedBus = null;
      }
      if (!route.bus) {
        route.bus = null;
      }
      return route;
    });
    res.status(200).json(formattedRoutes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};