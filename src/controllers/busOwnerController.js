const BusOwner = require('../models/busOwnerModel');
const Association = require('../models/assocationModel');
// Create a new BusOwner
// Create a new BusOwner
exports.createBusOwner = async (req, res, next) => {
  try {
    const newBusOwner = await BusOwner.create(req.body);
    res.status(201).json(newBusOwner);
  } catch (error) {
    console.error('Error creating BusOwner:', error);
    next(error);
  }
};


// Get all BusOwners
exports.getAllBusOwners = async (req, res, next) => {
  try {
    const busOwners = await BusOwner.findAll({
      include: Association // Include the Association model
    });
    res.json(busOwners);
  } catch (error) {
    next(error);
  }
};


// Get BusOwner by ID
exports.getBusOwnerById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const busOwner = await BusOwner.findByPk(id, {
      include: Association // Include the Association model
    });
    if (!busOwner) {
      res.status(404).json({ error: 'BusOwner not found.' });
    } else {
      res.json(busOwner);
    }
  } catch (error) {
    next(error);
  }
};


// Update BusOwner by ID
exports.updateBusOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedBusOwner] = await BusOwner.update(req.body, {
      where: { busOwnerId: id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'BusOwner not found.' });
    } else {
      res.json(updatedBusOwner[0]);
    }
  } catch (error) {
    next(error);
  }
};

// Delete BusOwner by ID
exports.deleteBusOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await BusOwner.destroy({
      where: { busOwnerId: id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: 'BusOwner not found.' });
    } else {
      res.json({ message: 'BusOwner deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
