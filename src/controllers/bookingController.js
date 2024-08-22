const { validationResult } = require('express-validator');
const Booking = require('../models/bookingModel');
const Station = require('../models/stationModel');
const BusAssignation = require('../models/busAssignationModel');
const Bus = require('../models/busModel');
const Route = require('../models/terminalModel');

// Create a new booking
const createRoute = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      sourceStationId,
      destinationStationId,
      distance,
      date,
      cost,
      estimatedTime,
      busId,
      assignId,
      servicePayment
    } = req.body;

    // Check if source and destination stations exist
    const sourceStation = await Station.findByPk(sourceStationId);
    const destinationStation = await Station.findByPk(destinationStationId);

    if (!sourceStation || !destinationStation) {
      return res.status(404).json({ error: 'Source or destination station not found' });
    }

    const route = await Booking.create({
      sourceStationId,
      destinationStationId,
      distance,
      date,
      cost,
      busId,
      assignId,
      estimatedTime,
      servicePayment
    });

    res.status(201).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all routes
const getAllRoutes = async (req, res) => {
  try {
     const routes = await Booking.findAll({
          include: [
            { model: Station, as: 'sourceStation' },
            { model: Station, as: 'destinationStation' },
            { model: BusAssignation, as: 'assignedBus',
            include: [{ model: Route, as: 'route'}]}, // Use the correct alias
            { model: Bus, as: 'bus' }, // Use the correct alias
              ],
            });


    const formattedRoutes = routes.map((route) => {
      if (!route.sourceStation) {
        route.sourceStation = null;
      }
      if (!route.destinationStation) {
        route.destinationStation = null;
      }
      if (!route.BusAssignations) {
        route.BusAssignations = null;
      }
      if (!route.Buses) {
        route.Buses = null;
      }

      return route;
    });

    res.status(200).json(formattedRoutes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

// Get route by ID
const getRouteById = async (req, res) => {
  try {
   // In getRouteById function
const route = await Booking.findByPk(req.params.id, {
     include: [
       { model: Station, as: 'sourceStation' },
       { model: Station, as: 'destinationStation' },
       { model: BusAssignation, as: 'assignedBus',
       include: [{ model: Route, as: 'route'}]}, // Use the correct alias
       { model: Bus, as: 'bus' }, // Use the correct alias
     ],
   });

    if (!route) {
      return res.status(404).json({ error: 'Route not found11' });
    }

    if (!route.sourceStation) {
      route.sourceStation = null;
    }
    if (!route.destinationStation) {
      route.destinationStation = null;
    }
    if (!route.BusAssignations) {
      route.BusAssignations = null;
    }
    if (!route.Buses) {
      route.Buses = null;
    }

    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update route by ID
const updateRouteById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const route = await Booking.findByPk(req.params.id);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    const {
      sourceStationId,
      destinationStationId,
      distance,
      date,
      cost,
      busId,
      assignId,
      estimatedTime,
      servicePayment,
    } = req.body;

    // Check if source and destination stations exist
    const sourceStation = await Station.findByPk(sourceStationId);
    const destinationStation = await Station.findByPk(destinationStationId);

    if (!sourceStation || !destinationStation) {
      return res.status(404).json({ error: 'Source or destination station not found' });
    }

    await route.update({
      sourceStationId,
      destinationStationId,
      distance,
      date,
      cost,
      busId,
      assignId,
      estimatedTime,
      servicePayment
    });

    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete route by ID
const deleteRouteById = async (req, res) => {
  try {
    const route = await Booking.findByPk(req.params.id);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    await route.destroy();

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Custom endpoint to retrieve routes based on destinationStationId, sourceStationId, and date
const getRoutesByParams = async (req, res) => {
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

    const routes = await Booking.findAll({
      where: { destinationStationId:destinationStationId,
               sourceStationId:sourceStationId,
               date:date
       },
      include: [
        { model: Station, as: 'sourceStation' },
        { model: Station, as: 'destinationStation' },
        { model: BusAssignation, as: 'assignedBus',
        include: [{ model: Route, as: 'route'}]}, // Use the correct alias
        { model: Bus, as: 'bus' },
      ],
    });
    console.log(routes)

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


module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRouteById,
  deleteRouteById,
  getRoutesByParams,
};
