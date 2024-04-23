const Station = require('../models/stationModel');

// Create a new station
exports.createStation = async (req, res, next) => {
  try {
    const newStation = await Station.create(req.body);
    res.status(201).json({ success: true, message: 'Station created successfully', data: newStation });
  } catch (error) {
    console.error('Error creating Station:', error);
    next(error);
  }
};

// Get all stations
exports.getAllStations = async (req, res, next) => {
  try {
    const stations = await Station.findAll();
    res.json( stations );
  } catch (error) {
    next(error);
  }
};

// Get station by ID
exports.getStationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const station = await Station.findByPk(id);
    if (!station) {
      res.status(404).json({ success: false, error: 'Station not found.' });
    } else {
      res.json( station );
    }
  } catch (error) {
    next(error);
  }
};

// Update station by ID
exports.updateStation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedStation] = await Station.update(req.body, {
      where: { stationId: id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ success: false, error: 'Station not found.' });
    } else {
      res.json({ success: true, message: 'Station updated successfully', data: updatedStation[0] });
    }
  } catch (error) {
    next(error);
  }
};

// Delete station by ID
exports.deleteStation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await Station.destroy({
      where: { stationId: id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ success: false, error: 'Station not found.' });
    } else {
      res.json({ success: true, message: 'Station deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};
