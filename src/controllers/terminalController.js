// controllers/busRoutingController.js
const Route = require('../models/terminalModel');
const Station = require('../models/stationModel');

exports.createTerminal = async (req, res, next) => {
  try {
  const { sourceStationId, destinationStationId,cost, graveDistance,asphaltDistance,servicePayment,estimatedTime } = req.body;
    // Validate if source and destination stations exist
    const sourceStation = await Station.findByPk(sourceStationId);
    const destinationStation = await Station.findByPk(destinationStationId);
    if (!sourceStation || !destinationStation) {
      res.status(400).json({ error: 'Source or destination station not found.' });
      return;
    }

    const newTerminal = await Route.create({
      sourceStationId,
      destinationStationId,
      graveDistance,
       asphaltDistance,
       cost,
       servicePayment,
       estimatedTime
    });

    res.status(201).json(newTerminal);
  } catch (error) {
    next(error);
  }
};


exports.getAllTerminals = async (req, res, next) => {
     try {
       const terminals = await Route.findAll({
         include: [
           { model: Station, as: 'sourceStation' },
           { model: Station, as: 'destinationStation' },
         ],
       });

       res.json(terminals);
     } catch (error) {
       next(error);
     }
   };

   exports.getTerminalById = async (req, res, next) => {
     const { id } = req.params;
     try {
       const busRouting = await Route.findByPk(id, {
         include: [
           { model: Station, as: 'sourceStation' },
           { model: Station, as: 'destinationStation' },
         ],
       });

       if (!busRouting) {
         res.status(404).json({ error: 'Route not found try again.' });
       } else {
         res.status(200).json(busRouting);
       }
     } catch (error) {
       next(error);
     }
   };

exports.updateTerminal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sourceStationId, destinationStationId, cost, graveDistance, asphaltDistance,servicePayment,estimatedTime} = req.body;

    const existingTerminal = await Route.findByPk(id);

    if (!existingTerminal) {
      res.status(404).json({ error: 'Bus routing not found.' });
      return;
    }

    // Validate if source and destination stations exist
    const sourceStation = await Station.findByPk(sourceStationId);
    const destinationStation = await Station.findByPk(destinationStationId);

    if (!sourceStation || !destinationStation) {
      res.status(400).json({ error: 'Source or destination station not found.' });
      return;
    }

    const updatedTerminal = await existingTerminal.update({
      sourceStationId,
      destinationStationId,
      graveDistance,
      cost,
       asphaltDistance,
       servicePayment,
       estimatedTime
    });

    res.json(updatedTerminal);
  } catch (error) {
    next(error);
  }
};

exports.deleteTerminal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingTerminal = await Route.findByPk(id);

    if (!existingTerminal) {
      res.status(404).json({ error: 'Bus routing not found.' });
      return;
    }

    await existingTerminal.destroy();

    res.json({ message: 'Bus routing deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
